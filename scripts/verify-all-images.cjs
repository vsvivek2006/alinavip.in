const http = require('http');

const routes = [
  '/',
  '/escorts',
  '/escorts/karina',
  '/escorts/high-profile/swati',
  '/services',
  '/services/girlfriend-experience-in-gurgaon',
  '/hotels',
  '/hotels/escort-service-near-the-oberoi-hotel',
  '/locations',
  '/gallery',
  '/categories',
  '/category/russian-call-girls',
  '/blog',
  '/blog/best-escort-service-gurgaon-guide',
  '/about',
  '/contact',
  '/shop'
];

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('========================================================================');
  console.log('         ALINAVIP.IN - COMPLETE IMAGEKIT CDN DELIVERY AUDIT            ');
  console.log('========================================================================\n');

  let grandTotal = 0;
  let grandIk = 0;
  let grandLocal = 0;
  const issues = [];

  for (const r of routes) {
    try {
      const { status, data: html } = await fetchPage(r);
      if (status !== 200) {
        console.log(`${r.padEnd(45)} HTTP ERROR: ${status}`);
        continue;
      }

      // Match all img tags
      const imgTags = [...html.matchAll(/<img[^>]+>/g)].map(m => m[0]);
      let pageIk = 0;
      let pageLocal = 0;

      for (const tag of imgTags) {
        const srcMatch = tag.match(/src="([^"]+)"/);
        if (!srcMatch) continue;
        let src = srcMatch[1];
        if (src.startsWith('/_next/image?url=')) {
          const urlParam = new URL('http://localhost:3000' + src).searchParams.get('url');
          src = urlParam || src;
        }

        if (src.includes('ik.imagekit.io')) {
          pageIk++;
        } else if (src.includes('/images/') || src.endsWith('.jpg') || src.endsWith('.png') || src.endsWith('.webp')) {
          pageLocal++;
          issues.push({ route: r, src });
        }
      }

      const total = pageIk + pageLocal;
      grandTotal += total;
      grandIk += pageIk;
      grandLocal += pageLocal;
      const statusIcon = pageLocal === 0 ? '✓ PASS' : '✗ FAIL';
      console.log(`${statusIcon} ${r.padEnd(45)} Total: ${String(total).padStart(2)} | ImageKit CDN: ${String(pageIk).padStart(2)} | Local: ${String(pageLocal).padStart(2)}`);
    } catch (e) {
      console.error(r, e.message);
    }
  }

  console.log('\n------------------------------------------------------------------------');
  console.log(`TOTAL IMAGES AUDITED ACROSS 16 MAJOR ROUTES: ${grandTotal}`);
  console.log(`IMAGEKIT CDN SERVED:                        ${grandIk} (${Math.round(grandIk / (grandTotal || 1) * 100)}%)`);
  console.log(`LOCAL ASSETS REMAINING:                     ${grandLocal}`);
  console.log('------------------------------------------------------------------------\n');

  if (issues.length > 0) {
    console.log('FAILURES FOUND (Still local):');
    issues.forEach(iss => console.log(`  - [${iss.route}] -> ${iss.src}`));
  } else {
    console.log('PERFECT 100%: ALL IMAGES ARE BEING SERVED FROM IMAGEKIT CDN!');
  }

  // Next.js optimizer check on homepage images
  console.log('\nTesting Next.js image optimizer resolution...');
  const { data: homeHtml } = await fetchPage('/');
  const optMatches = [...homeHtml.matchAll(/src="(\/_next\/image\?url=[^"]+)"/g)].map(m => m[1]);
  let optOk = 0;
  for (let i = 0; i < Math.min(5, optMatches.length); i++) {
    const rawUrl = optMatches[i].replace(/&amp;/g, '&');
    const { status } = await fetchPage(rawUrl);
    if (status === 200) optOk++;
  }
  console.log(`Optimizer check: ${optOk}/${Math.min(5, optMatches.length)} sample images returned HTTP 200 OK.`);
}

run();
