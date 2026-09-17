/**
 * Verify Image CDN / Preview Deployment Assets
 * 
 * Usage:
 *   node scripts/verify-image-cdn.js <BASE_URL>
 * 
 * Example:
 *   node scripts/verify-image-cdn.js https://ik.imagekit.io/<your_id>/shared
 *   node scripts/verify-image-cdn.js https://alinavip-preview.vercel.app/images/assets
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = (process.argv[2] || process.env.NEXT_PUBLIC_IMAGE_CDN_URL || '').replace(/\/$/, '');
const ASSETS_DIR = path.resolve(__dirname, '../../Alina VIp Assets');

if (!BASE_URL) {
  console.error('ERROR: Base URL required.');
  console.log('Usage: node scripts/verify-image-cdn.js <BASE_URL>');
  process.exit(1);
}

const files = fs.readdirSync(ASSETS_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
console.log(`Checking ${files.length} images against:\n${BASE_URL}\n`);

function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (CDN Verifier)' } }, (res) => {
      resolve({
        statusCode: res.statusCode,
        contentType: res.headers['content-type'],
        contentLength: res.headers['content-length'] || 0,
      });
      res.resume();
    });
    req.on('error', (e) => resolve({ statusCode: 500, error: e.message }));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve({ statusCode: 408, error: 'Timeout' });
    });
  });
}

async function run() {
  let passed = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const target = `${BASE_URL}/${encodeURIComponent(f)}`;
    process.stdout.write(`[${i + 1}/${files.length}] ${f}... `);

    const res = await checkUrl(target);
    if (res.statusCode === 200) {
      console.log(`✓ 200 OK (${res.contentType})`);
      passed++;
    } else {
      console.log(`✗ FAIL: ${res.statusCode} ${res.error || ''}`);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Verification Complete: ${passed} passed, ${failed} failed.`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

run();
