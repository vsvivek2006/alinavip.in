import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const SITES = [
  { name: 'alinavip.in', dir: 'd:/ALINA VIP/alinavip.in', domain: 'https://alinavip.in' },
  { name: 'alinavip.com', dir: 'd:/ALINA VIP/alinavip.com', domain: 'https://alinavip.com' },
  { name: 'escorts.alinavip.com', dir: 'd:/ALINA VIP/escorts.alinavip.com', domain: 'https://escort.alinavip.com' },
  { name: 'aerocityescortservice.site', dir: 'd:/ALINA VIP/aerocityescortservice.site', domain: 'https://aerocityescortservice.site' },
  { name: 'gurgaonescortservice.site', dir: 'd:/ALINA VIP/gurgaonescortservice.site', domain: 'https://www.gurgaonescortservice.site' },
];

console.log('====================================================');
console.log('STARTING SENIOR LEVEL DEEP AUDIT ACROSS ALL 5 WEBSITES');
console.log('====================================================\n');

// Helper to safely load JSON
function loadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

// 1. Audit Original 137 Pages on alinavip.com
console.log('--- 1. AUDITING 137 ORIGINAL INDEXED PAGES OF ALINAVIP.COM ---');
let old137Urls = [];
try {
  const oldSitemap = execSync('git -C "d:/ALINA VIP/alinavip.com" show db92995:public/sitemap.xml', { encoding: 'utf8' });
  old137Urls = [...oldSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log(`Extracted ${old137Urls.length} original URLs from commit db92995.`);
} catch (e) {
  console.error('Failed to get old sitemap:', e.message);
}

const comPre = loadJson('d:/ALINA VIP/alinavip.com/.next/prerender-manifest.json');
const comRoutes = comPre ? new Set(Object.keys(comPre.routes)) : new Set();
comRoutes.add('/');

const comRm = loadJson('d:/ALINA VIP/alinavip.com/.next/routes-manifest.json');
const comRedirects = new Map();
if (comRm && comRm.redirects) {
  comRm.redirects.forEach(r => comRedirects.set(r.source, r.destination));
}

const original137Audit = {
  ok200: [],
  redirected: [],
  notFound404: [],
  canonicalIssues: []
};

for (const u of old137Urls) {
  const p = u.replace(/https?:\/\/[^\/]+/, '') || '/';
  if (comRedirects.has(p)) {
    original137Audit.redirected.push({ url: u, path: p, to: comRedirects.get(p) });
  } else if (comRoutes.has(p)) {
    original137Audit.ok200.push({ url: u, path: p });
    // Check canonical in built HTML if possible
    let htmlPath = path.join('d:/ALINA VIP/alinavip.com/.next/server/app', p === '/' ? 'index.html' : `${p}.html`);
    if (!fs.existsSync(htmlPath)) {
      htmlPath = path.join('d:/ALINA VIP/alinavip.com/.next/server/app', p, 'page.html');
    }
    if (fs.existsSync(htmlPath)) {
      const html = fs.readFileSync(htmlPath, 'utf8');
      const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                         html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
      if (canonMatch) {
        const canon = canonMatch[1];
        if (!canon.includes('alinavip.com')) {
          original137Audit.canonicalIssues.push({ path: p, canon, issue: 'Points to wrong domain!' });
        }
      } else {
        original137Audit.canonicalIssues.push({ path: p, issue: 'Missing canonical tag!' });
      }
    }
  } else {
    original137Audit.notFound404.push({ url: u, path: p });
  }
}

console.log(`Original 137 URLs: 200 OK: ${original137Audit.ok200.length} / 137`);
console.log(`Original 137 URLs: Redirected: ${original137Audit.redirected.length}`);
console.log(`Original 137 URLs: 404 Not Found: ${original137Audit.notFound404.length}`);
console.log(`Original 137 URLs: Canonical tag issues: ${original137Audit.canonicalIssues.length}\n`);

// 2. Audit each site
const siteAudits = [];

for (const site of SITES) {
  console.log(`--- AUDITING SITE: ${site.name} (${site.domain}) ---`);
  const audit = {
    site: site.name,
    domain: site.domain,
    prerenderedCount: 0,
    sitemapCount: 0,
    sitemap404s: [],
    sitemapRedirects: [],
    internalBrokenLinks: [],
    wrongDomainCanonicals: [],
    redirectIssues: [],
    duplicateSlugCollisions: [],
    potentialDuplicatePairs: []
  };

  const pre = loadJson(path.join(site.dir, '.next/prerender-manifest.json'));
  const prerendered = pre ? Object.keys(pre.routes) : [];
  prerendered.push('/');
  const routeSet = new Set(prerendered);
  audit.prerenderedCount = prerendered.length;

  const rm = loadJson(path.join(site.dir, '.next/routes-manifest.json'));
  const redirects = rm && rm.redirects ? rm.redirects : [];
  const redirectMap = new Map();
  redirects.forEach(r => redirectMap.set(r.source, r.destination));

  // Check redirects pointing to 404 or active pages
  for (const r of redirects) {
    if (r.internal) continue;
    // Check if source is also a prerendered page! (Shadowing)
    if (routeSet.has(r.source)) {
      audit.redirectIssues.push({
        source: r.source,
        destination: r.destination,
        type: 'SHADOWING_PRERENDERED_ROUTE',
        details: `Route ${r.source} was prerendered as a page, but redirect overrides it to ${r.destination}!`
      });
    }
    // Check if destination exists
    if (!routeSet.has(r.destination)) {
      audit.redirectIssues.push({
        source: r.source,
        destination: r.destination,
        type: 'DESTINATION_404',
        details: `Destination ${r.destination} does not exist in prerendered routes!`
      });
    }
  }

  // Read sitemap.xml
  const sitemapPath = path.join(site.dir, 'public/sitemap.xml');
  let sitemapUrls = [];
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    sitemapUrls = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    audit.sitemapCount = sitemapUrls.length;

    for (const url of sitemapUrls) {
      let p = url.replace(/https?:\/\/[^\/]+/, '') || '/';
      if (p.endsWith('/') && p !== '/') p = p.slice(0, -1);

      if (redirectMap.has(p)) {
        audit.sitemapRedirects.push({ url, path: p, redirectDestination: redirectMap.get(p) });
      } else if (!routeSet.has(p) && !routeSet.has(p + '/')) {
        audit.sitemap404s.push({ url, path: p });
      }
    }
  }

  // Scan generated HTML files for internal links and canonicals
  const appServerDir = path.join(site.dir, '.next/server/app');
  function scanHtmlFiles(dir) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        files.push(...scanHtmlFiles(full));
      } else if (ent.name.endsWith('.html') && !ent.name.includes('_not-found')) {
        files.push(full);
      }
    }
    return files;
  }

  const htmlFiles = scanHtmlFiles(appServerDir);
  const checkedLinks = new Set();

  for (const f of htmlFiles) {
    const content = fs.readFileSync(f, 'utf8');
    
    // 1. Canonical tag check
    const canonMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
                       content.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
    if (canonMatch) {
      const canon = canonMatch[1];
      const canonDomain = (new URL(canon)).origin;
      const expectedOrigin = (new URL(site.domain)).origin;
      if (canonDomain !== expectedOrigin) {
        audit.wrongDomainCanonicals.push({
          file: path.relative(appServerDir, f),
          canon,
          expectedOrigin
        });
      }
    }

    // 2. Extract internal links
    const hrefMatches = content.matchAll(/href=["'](\/[^"']*)["']/g);
    for (const hm of hrefMatches) {
      let link = hm[1].split('#')[0].split('?')[0];
      if (link.endsWith('/') && link !== '/') link = link.slice(0, -1);
      if (link === '' || link.startsWith('/_next') || link.startsWith('/api') || checkedLinks.has(link)) continue;
      checkedLinks.add(link);

      // Check if link is a redirect
      if (redirectMap.has(link)) {
        // noted
      } else if (!routeSet.has(link) && !fs.existsSync(path.join(site.dir, 'public', link))) {
        audit.internalBrokenLinks.push({
          sourceFile: path.relative(appServerDir, f),
          targetLink: link
        });
      }
    }
  }

  // Duplicate pairs analysis
  const duplicatePairs = [
    { a: '/rates', b: '/gurgaon-escorts-rates' },
    { a: '/services', b: '/escort-service-in-gurgaon' },
    { a: '/about', b: '/about-us' },
    { a: '/contact', b: '/contact-us' },
    { a: '/faq', b: '/faqs' },
    { a: '/categories', b: '/escorts-categories' },
    { a: '/phone-number', b: '/gurgaon-escorts-phone-number' },
    { a: '/girlfriend-experience-in-gurgaon', b: '/services/girlfriend-experience-in-gurgaon' },
    { a: '/erotic-massage-in-gurgaon', b: '/services/erotic-massage-in-gurgaon' },
    { a: '/in-out-call-girls-gurgaon', b: '/services/in-out-call-girls-gurgaon' },
    { a: '/escort-service-for-1-2-3-hours', b: '/services/escort-service-for-1-2-3-hours' },
    { a: '/escort-service-full-night', b: '/services/escort-service-full-night' }
  ];

  for (const pair of duplicatePairs) {
    const hasA = routeSet.has(pair.a);
    const hasB = routeSet.has(pair.b);
    if (hasA && hasB) {
      audit.potentialDuplicatePairs.push(pair);
    }
  }

  siteAudits.push(audit);
  console.log(`  - Prerendered routes: ${audit.prerenderedCount}`);
  console.log(`  - Sitemap URLs: ${audit.sitemapCount}`);
  console.log(`  - Sitemap 404s: ${audit.sitemap404s.length}`);
  console.log(`  - Sitemap Redirects: ${audit.sitemapRedirects.length}`);
  console.log(`  - Internal Broken Links: ${audit.internalBrokenLinks.length}`);
  console.log(`  - Wrong Domain Canonicals: ${audit.wrongDomainCanonicals.length}`);
  console.log(`  - Redirect Issues (Shadowing/404): ${audit.redirectIssues.length}`);
  console.log(`  - Potential Duplicate Content Pairs: ${audit.potentialDuplicatePairs.length}\n`);
}

// Write out complete results to scratch
fs.writeFileSync('d:/ALINA VIP/alinavip.in/scratch/full_deep_audit_results.json', JSON.stringify({
  timestamp: new Date().toISOString(),
  original137Audit,
  siteAudits
}, null, 2), 'utf8');

console.log('Results written to d:/ALINA VIP/alinavip.in/scratch/full_deep_audit_results.json');
