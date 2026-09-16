import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

// 1. Read Base URL from siteConfig
let baseUrl = 'https://alinavip.in';
try {
  const configContent = fs.readFileSync(path.join(rootDir, 'src/data/siteConfig.ts'), 'utf8');
  const urlMatch = configContent.match(/url:\s*'([^']+)'/);
  if (urlMatch) baseUrl = urlMatch[1].replace(/\/+$/, '');
} catch (e) {
  console.warn('Could not read siteConfig, defaulting to', baseUrl);
}

console.log(`[SITEMAP GENERATOR] Base URL: ${baseUrl}`);

// 2. Read Categories
const catContent = fs.readFileSync(path.join(rootDir, 'src/data/categories.ts'), 'utf8');
const catSlugs = [...catContent.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);

// 3. Read Blogs
const blogContent = fs.readFileSync(path.join(rootDir, 'src/data/blogs.ts'), 'utf8');
const blogSlugs = [...blogContent.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);

// 4. Update and Read Location Manifest
const manifestPath = path.join(rootDir, 'src/data/final_location_manifest.json');
let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Ensure all non-redirect locations are marked indexable and sitemapIncluded
manifest = manifest.map(entry => {
  if (entry.disposition === 'REDIRECT') {
    return {
      ...entry,
      indexable: false,
      sitemapIncluded: false,
      canonical: null
    };
  }
  return {
    ...entry,
    disposition: 'INDEX',
    indexable: true,
    sitemapIncluded: true,
    canonical: `${baseUrl}${entry.url}`
  };
});

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`[SITEMAP GENERATOR] Manifest updated: ${manifest.length} locations (Indexable: ${manifest.filter(m => m.indexable).length}, Redirects: ${manifest.filter(m => !m.indexable).length})`);

const locationSlugs = manifest.filter(m => m.indexable).map(m => m.slug);

// 5. Core Static Pages
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.9', changefreq: 'daily' },
  { path: '/locations', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.3', changefreq: 'monthly' },
];

const nowIso = new Date().toISOString();

// XML helper
function buildUrlset(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod || nowIso}</lastmod>
    <changefreq>${u.changefreq || 'weekly'}</changefreq>
    <priority>${u.priority || '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
}

// Build sub-sitemaps
const pageUrls = staticPages.map(p => ({
  loc: `${baseUrl}${p.path}`,
  lastmod: nowIso,
  changefreq: p.changefreq,
  priority: p.priority
}));

const locationUrls = locationSlugs.map(slug => ({
  loc: `${baseUrl}/locations/${slug}`,
  lastmod: nowIso,
  changefreq: 'weekly',
  priority: '0.85'
}));

const categoryUrls = catSlugs.map(slug => ({
  loc: `${baseUrl}/category/${slug}`,
  lastmod: nowIso,
  changefreq: 'weekly',
  priority: '0.85'
}));

const blogUrls = blogSlugs.map(slug => ({
  loc: `${baseUrl}/blog/${slug}`,
  lastmod: nowIso,
  changefreq: 'monthly',
  priority: '0.75'
}));

const allUrls = [
  ...pageUrls,
  ...locationUrls,
  ...categoryUrls,
  ...blogUrls
];

// Write individual XML files to public/
fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), buildUrlset(pageUrls), 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap-locations.xml'), buildUrlset(locationUrls), 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap-categories.xml'), buildUrlset(categoryUrls), 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap-blogs.xml'), buildUrlset(blogUrls), 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildUrlset(allUrls), 'utf8');

// Build Sitemap Index XML
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-pages.xml</loc>
    <lastmod>${nowIso}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-locations.xml</loc>
    <lastmod>${nowIso}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-categories.xml</loc>
    <lastmod>${nowIso}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blogs.xml</loc>
    <lastmod>${nowIso}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndexXml, 'utf8');

// Update robots.txt
const robotsTxt = `User-Agent: *
Allow: /
Disallow: /api/
Crawl-delay: 1

Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/sitemap-index.xml
Sitemap: ${baseUrl}/sitemap-locations.xml
Sitemap: ${baseUrl}/sitemap-categories.xml
Sitemap: ${baseUrl}/sitemap-blogs.xml
Sitemap: ${baseUrl}/sitemap-pages.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

console.log(`[SITEMAP GENERATOR] Successfully generated:
  - sitemap.xml (${allUrls.length} total URLs)
  - sitemap-index.xml (Sitemap Index)
  - sitemap-pages.xml (${pageUrls.length} URLs)
  - sitemap-locations.xml (${locationUrls.length} URLs)
  - sitemap-categories.xml (${categoryUrls.length} URLs)
  - sitemap-blogs.xml (${blogUrls.length} URLs)
  - robots.txt updated with all sitemaps`);
