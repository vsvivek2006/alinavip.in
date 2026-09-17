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
  'app/services/page.tsx',
  'app/escort-service-in-gurgaon/page.tsx',
  'app/services/[slug]/page.tsx',
  'app/girlfriend-experience-in-gurgaon/page.tsx',
  'app/erotic-massage-in-gurgaon/page.tsx',
  'app/in-out-call-girls-gurgaon/page.tsx',
  'app/escort-service-for-1-2-3-hours/page.tsx',
  'app/escort-service-full-night/page.tsx',
  'app/rates/page.tsx',
  'app/gurgaon-escorts-rates/page.tsx',
  'app/categories/page.tsx',
  'app/escorts-categories/page.tsx',
  'app/hotels/page.tsx',
  'app/about-us/page.tsx',
  'app/faqs/page.tsx',
  'app/contact-us/page.tsx',
  'app/[slug]/page.tsx',
  'src/components/home/FeaturedProfilesSection.tsx',
  'src/components/home/CategoriesGridSection.tsx',
  'src/components/home/ServicesOfferedSection.tsx',
  'src/components/home/TrustStandardsSection.tsx',
  'src/components/home/BookingProcessSection.tsx',
  'src/components/home/TestimonialsSection.tsx',
  'src/components/home/LocationGridSection.tsx',
  'src/components/home/EditorialGuideSection.tsx',
  'src/components/home/HomeFaqSection.tsx',
];

for (const target of targets) {
  if (!fs.existsSync(target)) {
    console.log(`[SKIP] Target does not exist: ${target}`);
    continue;
  }
  console.log(`\n=== Syncing to: ${target} ===`);
  for (const relPath of filesToCopy) {
    const srcFile = path.join(sourceRoot, relPath);
    const destFile = path.join(target, relPath);
    if (!fs.existsSync(srcFile)) {
      console.log(`[WARN] Source file missing: ${srcFile}`);
      continue;
    }
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.copyFileSync(srcFile, destFile);
  }
  console.log(`[SUCCESS] Copied ${filesToCopy.length} files to ${target}`);
}
