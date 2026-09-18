const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceRoot = 'd:/ALINA VIP/alinavip.in';
const sisterRepos = [
  'd:/ALINA VIP/alinavip.com',
  'd:/ALINA VIP/escort.alinavip.com',
  'd:/ALINA VIP/aerocityescortservice.site',
  'd:/ALINA VIP/gurgaonescortservice.site',
];

const filesToCopy = [
  'src/data/catalog_pages.json',
  'src/data/catalog_posts.json',
  'src/data/catalog_products.json',
  'src/lib/assets.ts',
  'next.config.js',
  'app/globals.css',
  'app/about/page.tsx',
  'app/categories/page.tsx',
  'app/escorts/[slug]/[profile]/page.tsx',
  'app/faq/page.tsx',
  'app/faqs/page.tsx',
  'app/gallery/page.tsx',
  'app/hotels/[slug]/page.tsx',
  'app/locations/page.tsx',
  'app/rates/page.tsx',
  'app/services/page.tsx',
  'app/services/[slug]/page.tsx',
  'app/shop/page.tsx',
  'app/sitemap.ts',
  'app/[slug]/page.tsx',
  'scripts/generate-sitemaps.js',
  'src/components/Footer.tsx',
  'src/components/home/BookingProcessSection.tsx',
  'src/components/home/CategoriesGridSection.tsx',
  'src/components/home/FeaturedProfilesSection.tsx',
  'src/components/home/HeroSection.tsx',
  'src/components/home/HomeBlogSection.tsx',
  'src/components/home/LocationGridSection.tsx',
  'src/components/home/ServicesOfferedSection.tsx',
  'src/components/home/TestimonialsSection.tsx',
  'src/components/home/TrustStandardsSection.tsx',
  'src/components/WhatsAppButton.tsx',
  'tailwind.config.js',
];

const filesToDelete = [
  'src/data/roshni_pages.json',
  'src/data/roshni_posts.json',
  'src/data/roshni_products.json',
  'src/data/roshni_home_manifest.json',
  'public/images/assets/Roshni_Khanna.jpg',
  'public/images/assets/Roshni_Khanna.png',
  'public/images/assets/Roshni_Khanna_Gurgaon_Escorts.png',
  'tsconfig.tsbuildinfo',
];

console.log('=== Step 1: Sync scrubbed files to sister repos ===');
for (const repo of sisterRepos) {
  const name = path.basename(repo);
  console.log(`\nSyncing to: ${name}`);

  // Delete obsolete files
  for (const del of filesToDelete) {
    const targetPath = path.join(repo, del);
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      console.log(`  Deleted obsolete: ${del}`);
    }
  }

  // Copy scrubbed files
  let copied = 0;
  for (const rel of filesToCopy) {
    const src = path.join(sourceRoot, rel);
    const dst = path.join(repo, rel);
    if (!fs.existsSync(src)) {
      console.log(`  [MISSING SRC]: ${rel}`);
      continue;
    }
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    copied++;
  }
  console.log(`  Copied ${copied} clean files.`);
}

console.log('\n=== Step 2: Verify zero occurrences of roshni across all 5 repos ===');
const allRepos = [sourceRoot, ...sisterRepos];
for (const repo of allRepos) {
  const name = path.basename(repo);
  let hits = 0;

  function scanDir(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (['node_modules', '.git', '.next', '.codegraph', 'scratch'].includes(e.name)) continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) scanDir(p);
      else {
        if (p.includes('sync-scrubbed-sites.cjs')) continue;
        try {
          const c = fs.readFileSync(p, 'utf8');
          if (/roshni/i.test(c) || /roshnikhanna/i.test(c)) {
            console.log(`  Hit in ${name}: ${path.relative(repo, p)}`);
            hits++;
          }
        } catch (err) {}
      }
    }
  }
  scanDir(repo);
  console.log(`${name}: ${hits === 0 ? 'CLEAN (0 hits)' : `${hits} hits found`}`);
  if (hits > 0) process.exit(1);
}

console.log('\n=== Step 3: Verify TypeScript across all 5 repos ===');
for (const repo of allRepos) {
  const name = path.basename(repo);
  process.stdout.write(`Typechecking ${name}... `);
  try {
    execSync('npx tsc --noEmit', { cwd: repo, stdio: 'pipe' });
    console.log('PASS');
  } catch (err) {
    console.log('FAIL');
    console.error(err.stdout ? err.stdout.toString() : err.message);
    process.exit(1);
  }
}

console.log('\n=== Step 4: Commit and Push All 5 Repos ===');
const commitMsg = 'chore: completely purge all references, URLs, filenames, and data of roshnikhanna';

for (const repo of allRepos) {
  const name = path.basename(repo);
  console.log(`\nPushing ${name}:`);
  try {
    const status = execSync('git status -s', { cwd: repo, encoding: 'utf8' }).trim();
    if (status) {
      execSync('git add -A', { cwd: repo });
      execSync(`git commit -m "${commitMsg}"`, { cwd: repo });
      console.log('  Committed changes.');
    } else {
      console.log('  No changes to commit.');
    }
    const pushResult = execSync('git push origin main', { cwd: repo, encoding: 'utf8' });
    console.log('  Push result:\n  ' + pushResult.trim().split('\n').join('\n  '));
  } catch (err) {
    console.error(`  Error in ${name}: ${err.message}`);
    if (err.stdout) console.error(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
    process.exit(1);
  }
}

console.log('\nALL 5 SITES SUCCESSFULLY PURGED OF ROSHNIKHANNA AND PUSHED TO GITHUB!');
