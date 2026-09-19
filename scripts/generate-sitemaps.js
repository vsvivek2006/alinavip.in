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

// 3. Read Blogs from local_posts.json (tenant-isolated) or fallback blogs.ts
let blogSlugs = [];
try {
  const localPostsPath = path.join(rootDir, 'src/data/local_posts.json');
  if (fs.existsSync(localPostsPath)) {
    const localPosts = JSON.parse(fs.readFileSync(localPostsPath, 'utf8'));
    let siteId = null;
    const sbPath = path.join(rootDir, 'src/lib/supabaseBlog.ts');
    if (fs.existsSync(sbPath)) {
      const sbContent = fs.readFileSync(sbPath, 'utf8');
      const m = sbContent.match(/SITE_ID\s*=\s*(?:process\.env\.NEXT_PUBLIC_SITE_ID\s*\|\|\s*)?'([^']+)'/);
      if (m) siteId = m[1];
    }
    const filtered = siteId ? localPosts.filter(p => p.site_id === siteId && p.status !== 'draft') : localPosts;
    blogSlugs = filtered.map(p => p.slug);
  }
} catch (e) {
  console.warn('Could not read local_posts.json, falling back to blogs.ts:', e.message);
}

if (blogSlugs.length === 0) {
  try {
    const blogContent = fs.readFileSync(path.join(rootDir, 'src/data/blogs.ts'), 'utf8');
    blogSlugs = [...blogContent.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1]);
  } catch (e) {}
}

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

const nowIso = new Date().toISOString();

// 6. Read Escort Models from models.ts
let modelUrls = [];
try {
  const modelsContent = fs.readFileSync(path.join(rootDir, 'src/data/models.ts'), 'utf8');
  const modelSlugs = [...modelsContent.matchAll(/^\s+slug:\s*'([^']+)'/gm)].map(m => m[1]);
  modelUrls = modelSlugs.map(slug => ({
    loc: `${baseUrl}/escorts/${slug}`,
    lastmod: nowIso,
    changefreq: 'weekly',
    priority: '0.85'
  }));
  console.log(`[SITEMAP GENERATOR] Escort models: ${modelUrls.length}`);
} catch (e) {
  console.warn('Could not read models.ts:', e.message);
}

// 7. Read Catalog Pages, Posts, Products
let catalogPages = [];
try {
  catalogPages = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/catalog_pages.json'), 'utf8'));
} catch (e) {}

let catalogPosts = [];
try {
  catalogPosts = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/catalog_posts.json'), 'utf8'));
} catch (e) {}

let catalogProducts = [];
try {
  catalogProducts = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/data/catalog_products.json'), 'utf8'));
} catch (e) {}


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

const catalogPageUrls = catalogPages.map(p => ({
  loc: `${baseUrl}/${p.slug}`,
  lastmod: nowIso,
  changefreq: 'weekly',
  priority: '0.85'
}));

const catalogPostUrls = catalogPosts.map(p => ({
  loc: `${baseUrl}/${p.slug}`,
  lastmod: nowIso,
  changefreq: 'monthly',
  priority: '0.75'
}));

const catalogProdUrls = catalogProducts.map(p => ({
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
[...pageUrls, ...catalogPageUrls, ...catalogPostUrls, ...catalogProdUrls, ...locationUrls, ...catUrls, ...blogUrls, ...modelUrls].forEach(u => {
  if (!urlMap.has(u.loc)) {
    urlMap.set(u.loc, u);
  }
});
const allUrls = Array.from(urlMap.values());

// Write individual XML files to public/
fs.writeFileSync(path.join(publicDir, 'sitemap-pages.xml'), buildUrlset([...pageUrls, ...catalogPageUrls]), 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap-locations.xml'), buildUrlset(locationUrls), 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap-categories.xml'), buildUrlset(catUrls), 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap-blogs.xml'), buildUrlset([...blogUrls, ...catalogPostUrls]), 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap-escorts.xml'), buildUrlset(modelUrls), 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap-all.xml'), buildUrlset(allUrls), 'utf8');

// Ensure public/sitemap.xml does NOT exist so app/sitemap.ts dynamically serves /sitemap.xml without 500 conflict
const conflictingSitemapPath = path.join(publicDir, 'sitemap.xml');
if (fs.existsSync(conflictingSitemapPath)) {
  fs.unlinkSync(conflictingSitemapPath);
}
console.log(`[SITEMAP GENERATOR] Total URLs: ${allUrls.length}`);

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
  <sitemap>
    <loc>${baseUrl}/sitemap-escorts.xml</loc>
    <lastmod>${nowIso}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndexXml, 'utf8');

console.log(`[SITEMAP GENERATOR] Successfully generated sitemaps:
  - sitemap.xml (${allUrls.length} total URLs)
  - sitemap-index.xml
  - sitemap-pages.xml (${pageUrls.length + catalogPageUrls.length} URLs)
  - sitemap-locations.xml (${locationUrls.length} URLs)
  - sitemap-categories.xml (${catUrls.length} URLs)
  - sitemap-blogs.xml (${blogUrls.length + catalogPostUrls.length} URLs)`);
