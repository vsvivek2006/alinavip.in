/**
 * Bulk Upload 70 Master Assets to ImageKit CDN
 * 
 * Usage:
 *   node scripts/upload-to-imagekit.js <IMAGEKIT_PRIVATE_KEY> <IMAGEKIT_URL_ENDPOINT>
 * 
 * Or set environment variables:
 *   IMAGEKIT_PRIVATE_KEY=your_key
 *   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
 *   node scripts/upload-to-imagekit.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const PRIVATE_KEY = process.argv[2] || process.env.IMAGEKIT_PRIVATE_KEY;
const URL_ENDPOINT = process.argv[3] || process.env.IMAGEKIT_URL_ENDPOINT;
const ASSETS_DIR = path.resolve(__dirname, '../../Alina VIp Assets');

if (!PRIVATE_KEY) {
  console.error('ERROR: ImageKit Private API Key required.');
  console.log('Usage: node scripts/upload-to-imagekit.js <IMAGEKIT_PRIVATE_KEY> [IMAGEKIT_URL_ENDPOINT]');
  process.exit(1);
}

if (!fs.existsSync(ASSETS_DIR)) {
  console.error(`ERROR: Master assets directory not found at: ${ASSETS_DIR}`);
  process.exit(1);
}

const files = fs.readdirSync(ASSETS_DIR).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
console.log(`Found ${files.length} images to upload into ImageKit folder "/shared/"\n`);

async function uploadFile(fileName) {
  const filePath = path.join(ASSETS_DIR, fileName);
  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString('base64');

  const postData = new URLSearchParams({
    file: base64Data,
    fileName: fileName,
    folder: '/shared',
    useUniqueFileName: 'false', // Keeps original filename intact
  }).toString();

  const authHeader = 'Basic ' + Buffer.from(PRIVATE_KEY + ':').toString('base64');

  return new Promise((resolve, reject) => {
    const req = https.request(
      'https://upload.imagekit.io/api/v1/files/upload',
      {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const json = JSON.parse(body);
              resolve({ success: true, url: json.url, name: fileName });
            } catch (e) {
              resolve({ success: true, raw: body, name: fileName });
            }
          } else {
            reject(new Error(`[${res.statusCode}] ${body}`));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    process.stdout.write(`[${i + 1}/${files.length}] Uploading ${f}... `);
    try {
      const res = await uploadFile(f);
      console.log('✓ OK');
      successCount++;
    } catch (err) {
      console.log(`✗ FAIL: ${err.message}`);
      failCount++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Finished: ${successCount} succeeded, ${failCount} failed.`);
  console.log(`All uploaded images available at:`);
  console.log(`${URL_ENDPOINT || 'https://ik.imagekit.io/<your_id>'}/shared/<fileName>?tr=f-auto,q-85`);
  console.log(`========================================\n`);
}

run();
