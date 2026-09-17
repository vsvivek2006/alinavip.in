import fs from 'node:fs';
import { execSync } from 'node:child_process';

const sitemapXmlOld = execSync('git -C "d:\\ALINA VIP\\alinavip.com" show db92995:public/sitemap.xml', { encoding: 'utf8' });
const oldUrls = [...sitemapXmlOld.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
console.log('Original indexed URLs count in db92995:', oldUrls.length);

const pre = JSON.parse(fs.readFileSync('d:/ALINA VIP/alinavip.com/.next/prerender-manifest.json', 'utf8'));
const prerenderedRoutes = new Set(Object.keys(pre.routes));
prerenderedRoutes.add('/');

const rm = JSON.parse(fs.readFileSync('d:/ALINA VIP/alinavip.com/.next/routes-manifest.json', 'utf8'));
const redirectsMap = new Map();
rm.redirects.forEach(r => redirectsMap.set(r.source, r.destination));

const results = {
  ok200: [],
  redirected: [],
  notFound404: []
};

for (const fullUrl of oldUrls) {
  let path = fullUrl.replace(/https?:\/\/[^\/]+/, '') || '/';
  if (redirectsMap.has(path)) {
    results.redirected.push({ url: fullUrl, path, to: redirectsMap.get(path) });
  } else if (prerenderedRoutes.has(path)) {
    results.ok200.push({ url: fullUrl, path });
  } else {
    results.notFound404.push({ url: fullUrl, path });
  }
}

console.log('Original 137 URLs status:');
console.log('200 OK count:', results.ok200.length);
console.log('Redirected count:', results.redirected.length);
console.log('404 Not Found count:', results.notFound404.length);

if (results.redirected.length > 0) {
  console.log('Redirected details:', results.redirected);
}
if (results.notFound404.length > 0) {
  console.log('404 Not Found details:', results.notFound404);
}
