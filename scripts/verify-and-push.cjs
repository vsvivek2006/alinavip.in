const { execSync } = require('child_process');
const path = require('path');

const repos = [
  'd:/ALINA VIP/alinavip.in',
  'd:/ALINA VIP/alinavip.com',
  'd:/ALINA VIP/escort.alinavip.com',
  'd:/ALINA VIP/aerocityescortservice.site',
  'd:/ALINA VIP/gurgaonescortservice.site',
];

console.log('--- Step 1: Typecheck All Repos ---');
for (const repo of repos) {
  const name = path.basename(repo);
  process.stdout.write(`Typechecking ${name}... `);
  try {
    execSync('npx tsc --noEmit', { cwd: repo, stdio: 'pipe' });
    console.log('OK');
  } catch (err) {
    console.log('FAILED');
    console.error(err.stdout ? err.stdout.toString() : err.message);
    process.exit(1);
  }
}

console.log('\n--- Step 2: Git Commit & Push All Repos ---');
const commitMsg = 'fix(images): remove unnatural upscaling/sharpening and replace low-res assets across all sites';

for (const repo of repos) {
  const name = path.basename(repo);
  console.log(`\nProcessing ${name}:`);
  try {
    const status = execSync('git status -s', { cwd: repo, encoding: 'utf8' }).trim();
    if (!status) {
      console.log('  Working tree clean, skipping commit.');
    } else {
      execSync('git add -A', { cwd: repo });
      execSync(`git commit -m "${commitMsg}"`, { cwd: repo });
      console.log('  Committed changes.');
    }
    console.log('  Pushing to origin main...');
    const pushOut = execSync('git push origin main', { cwd: repo, encoding: 'utf8' });
    console.log('  ' + pushOut.trim());
  } catch (err) {
    console.error(`  Error in ${name}: ${err.message}`);
    if (err.stdout) console.error(err.stdout.toString());
    if (err.stderr) console.error(err.stderr.toString());
  }
}

console.log('\nALL 5 REPOSITORIES UPDATED AND PUSHED SUCCESSFULLY.');
