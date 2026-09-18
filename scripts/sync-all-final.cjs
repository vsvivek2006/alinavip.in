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

const filesToSync = [
  'src/lib/assets.ts',
  'src/lib/supabaseBlog.ts',
  'app/about/page.tsx',
  'app/category/[slug]/page.tsx',
  'app/gallery/page.tsx',
  'app/hotels/page.tsx',
  'app/services/[slug]/page.tsx',
  'app/services/page.tsx',
  'app/shop/page.tsx',
  'app/escorts/[slug]/[profile]/page.tsx',
  'src/components/home/CategoriesGridSection.tsx',
  'src/components/home/EditorialGuideSection.tsx',
  'src/components/home/ServicesOfferedSection.tsx',
];

console.log('=== Copying updated files to all 4 sister repos ===');
for (const repo of sisterRepos) {
  const name = path.basename(repo);
  console.log(`\nSyncing to: ${name}`);
  let count = 0;
  for (const rel of filesToSync) {
    const src = path.join(sourceRoot, rel);
    const dst = path.join(repo, rel);
    if (!fs.existsSync(src)) {
      console.log(`  [MISSING SRC]: ${rel}`);
      continue;
    }
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    count++;
  }
  console.log(`  Copied ${count} files.`);
}

console.log('\n=== Running TypeScript Verification on All 5 Repos ===');
const allRepos = [sourceRoot, ...sisterRepos];
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

console.log('\n=== Committing and Pushing All 5 Repos ===');
const msg = 'fix(images): remove unnatural upscale/sharpening, fix low-res images, remove local fallback and make 100% ImageKit dependent';

for (const repo of allRepos) {
  const name = path.basename(repo);
  console.log(`\nPushing ${name}:`);
  try {
    const status = execSync('git status -s', { cwd: repo, encoding: 'utf8' }).trim();
    if (status) {
      execSync('git add -A', { cwd: repo });
      execSync(`git commit -m "${msg}"`, { cwd: repo });
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

console.log('\nALL 5 SITES SUCCESSFULLY UPDATED, VERIFIED AND PUSHED TO GITHUB!');
