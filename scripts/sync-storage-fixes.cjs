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

console.log('=== Syncing next.config.js, .vercelignore, and package.json to sister repos ===');

const vercelIgnoreContent = fs.readFileSync(path.join(sourceRoot, '.vercelignore'), 'utf8');
const nextConfigContent = fs.readFileSync(path.join(sourceRoot, 'next.config.js'), 'utf8');

for (const repo of sisterRepos) {
  const name = path.basename(repo);
  console.log(`\nConfiguring ${name}...`);

  // 1. .vercelignore
  fs.writeFileSync(path.join(repo, '.vercelignore'), vercelIgnoreContent);

  // 2. next.config.js
  fs.writeFileSync(path.join(repo, 'next.config.js'), nextConfigContent);

  // 3. package.json postbuild
  const pkgPath = path.join(repo, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.postbuild = "node -e \"const fs=require('fs'); fs.rmSync('.next/cache', { recursive: true, force: true });\"";
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  }

  console.log(`  Updated next.config.js, .vercelignore, package.json for ${name}`);
}

console.log('\n=== Verifying tsc across all 5 repos ===');
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
const msg = 'fix(vercel): enable image optimization, purge build cache in postbuild, and add .vercelignore to solve deployment storage bloat';

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
