import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = 'd:/ALINA VIP/alinavip.in';
const targets = [
  'd:/ALINA VIP/alinavip.com',
  'd:/ALINA VIP/escorts.alinavip.com',
  'd:/ALINA VIP/aerocityescortservice.site',
  'd:/ALINA VIP/gurgaonescortservice.site',
];

const filesToCopy = [
  'src/data/exact_manifest.json',
  'src/data/roshni_home_manifest.json',
  'src/components/Header.tsx',
  'src/components/home/FeaturedProfilesSection.tsx',
  'src/components/home/CategoriesGridSection.tsx',
  'src/components/home/ServicesOfferedSection.tsx',
  'src/components/home/TrustStandardsSection.tsx',
  'src/components/home/BookingProcessSection.tsx',
  'src/components/home/TestimonialsSection.tsx',
  'src/components/home/LocationGridSection.tsx',
  'src/components/home/EditorialGuideSection.tsx',
  'src/components/home/HomeFaqSection.tsx',
  'app/services/page.tsx',
  'app/escort-service-in-gurgaon/page.tsx',
  'app/services/[slug]/page.tsx',
  'app/girlfriend-experience-in-gurgaon/page.tsx',
  'app/erotic-massage-in-gurgaon/page.tsx',
  'app/in-out-call-girls-gurgaon/page.tsx',
  'app/escort-service-for-1-2-3-hours/page.tsx',
  'app/escort-service-full-night/page.tsx',
  'app/full-body-sensual-massage/page.tsx',
  'app/full-body-sensual-massage/layout.tsx',
  'app/rates/page.tsx',
  'app/gurgaon-escorts-rates/page.tsx',
  'app/categories/page.tsx',
  'app/escorts-categories/page.tsx',
  'app/hotels/page.tsx',
  'app/hotels/[slug]/page.tsx',
  'app/gallery/page.tsx',
  'app/escorts/page.tsx',
  'app/escorts/layout.tsx',
  'app/escorts/[slug]/page.tsx',
  'app/faq/page.tsx',
  'app/faq/layout.tsx',
  'app/faqs/page.tsx',
  'app/faqs/layout.tsx',
  'app/phone-number/page.tsx',
  'app/phone-number/layout.tsx',
  'app/gurgaon-escorts-phone-number/page.tsx',
  'app/gurgaon-escorts-phone-number/layout.tsx',
  'app/about/page.tsx',
  'app/about-us/page.tsx',
  'app/contact/page.tsx',
  'app/contact-us/page.tsx',
  'app/disclaimer/page.tsx',
  'app/privacy-policy/page.tsx',
  'app/terms/page.tsx',
  'app/[slug]/page.tsx',
  'scripts/generate-sitemaps.js',
  'public/_redirects',
  'next.config.js',
];

for (const target of targets) {
  if (!fs.existsSync(target)) {
    console.log(`[SKIP] Target does not exist: ${target}`);
    continue;
  }
  console.log(`\n=== Syncing to: ${target} ===`);
  let count = 0;
  for (const relPath of filesToCopy) {
    const srcFile = path.join(sourceRoot, relPath);
    const destFile = path.join(target, relPath);
    if (!fs.existsSync(srcFile)) {
      console.log(`[WARN] Source file missing: ${srcFile}`);
      continue;
    }
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.copyFileSync(srcFile, destFile);
    count++;
  }
  console.log(`[SUCCESS] Copied ${count} files to ${target}`);
}
