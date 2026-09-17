import fs from 'node:fs';
import path from 'node:path';

const siteDir = process.argv[2] || 'd:/ALINA VIP/alinavip.in';

const pairs = [
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

function getCanonical(targetDir, urlPath) {
  let file = path.join(targetDir, '.next/server/app', urlPath + '.html');
  if (!fs.existsSync(file)) {
    file = path.join(targetDir, '.next/server/app', urlPath, 'page.html');
  }
  if (!fs.existsSync(file)) return 'NOT_BUILT';
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
            html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return m ? m[1] : 'NONE';
}

console.log(`=== CANONICAL TAGS ON DUPLICATE / ALIAS PAIRS (${siteDir}) ===`);
for (const p of pairs) {
  console.log(`${p.a} => canonical: ${getCanonical(siteDir, p.a)}`);
  console.log(`${p.b} => canonical: ${getCanonical(siteDir, p.b)}`);
  console.log('---');
}
