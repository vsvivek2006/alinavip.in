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
const locationSlugs = manifest.filter(m => m.indexable).map(m => m.slug);

// 5. Core Static Pages
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.9', changefreq: 'daily' },
  { path: '/locations', priority: '0.9', changefreq: 'daily' },
  { path: '/rates', priority: '0.9', changefreq: 'daily' },
  { path: '/hotels', priority: '0.9', changefreq: 'daily' },
  { path: '/categories', priority: '0.9', changefreq: 'daily' },
  { path: '/escorts', priority: '0.9', changefreq: 'daily' },
  { path: '/shop', priority: '0.9', changefreq: 'daily' },
  { path: '/phone-number', priority: '0.9', changefreq: 'daily' },
  { path: '/about', priority: '0.8', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.3', changefreq: 'monthly' },
  { path: '/gurgaon-escorts-rates', priority: '0.9', changefreq: 'daily' },
  { path: '/escorts-categories', priority: '0.9', changefreq: 'daily' },
  { path: '/gurgaon-escorts-phone-number', priority: '0.85', changefreq: 'weekly' },
  { path: '/escort-service-for-1-2-3-hours', priority: '0.85', changefreq: 'weekly' },
  { path: '/escort-service-full-night', priority: '0.85', changefreq: 'weekly' },
  { path: '/full-body-sensual-massage', priority: '0.85', changefreq: 'weekly' },
  { path: '/erotic-massage-in-gurgaon', priority: '0.85', changefreq: 'weekly' },
  { path: '/girlfriend-experience-in-gurgaon', priority: '0.85', changefreq: 'weekly' },
  { path: '/in-out-call-girls-gurgaon', priority: '0.85', changefreq: 'weekly' },
];

// 6. Read Roshni Scraped Pages, Posts, Products
let roshniPages = [];
try {
  roshniPages = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/roshni_pages.json'), 'utf8'));
} catch (e) {}

let roshniPosts = [];
try {
  roshniPosts = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/roshni_posts.json'), 'utf8'));
} catch (e) {}

let roshniProducts = [];
try {
  roshniProducts = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/roshni_products.json'), 'utf8'));
} catch (e) {}

const nowIso = new Date().toISOString();

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

const pageUrls = staticPages.map(p => ({
  loc: `${baseUrl}${p.path}`,
  lastmod: nowIso,
  changefreq: p.changefreq,
  priority: p.priority
}));

const roshniPageUrls = roshniPages.map(p => ({
  loc: `${baseUrl}/${p.slug}`,
  lastmod: nowIso,
  changefreq: 'weekly',
  priority: '0.85'
}));

const roshniPostUrls = roshniPosts.map(p => ({
  loc: `${baseUrl}/${p.slug}`,
  lastmod: nowIso,
  changefreq: 'monthly',
  priority: '0.75'
}));

const roshniProdUrls = roshniProducts.map(p => ({
  loc: `${baseUrl}/${p.slug}`,
  lastmod: nowIso,
  changefreq: 'weekly',
  priority: '0.8'
}));

const locationUrls = locationSlugs.map(slug => ({
  loc: `${baseUrl}/locations/${slug}`,
  lastmod: nowIso,
  changefreq: 'weekly',
  priority: '0.85'
}));

const catUrls = catSlugs.map(slug => ({
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

// Build unique master list
const urlMap = new Map();
[...pageUrls, ...roshniPageUrls, ...roshniPostUrls, ...roshniProdUrls, ...locationUrls, ...catUrls, ...blogUrls].forEach(u => {
  if (!urlMap.has(u.loc)) {
    urlMap.set(u.loc, u);
  }
});
const allUrls = Array.from(urlMap.values());

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildUrlset(allUrls), 'utf8');
console.log(`[SITEMAP GENERATOR] Successfully generated sitemap.xml with ${allUrls.length} total URLs.`);
