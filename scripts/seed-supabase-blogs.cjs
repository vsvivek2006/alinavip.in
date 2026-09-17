/**
 * Seed existing static blogs into Supabase multi-tenant posts table
 */

const https = require('https');

const SUPABASE_URL = 'pmhzuqaczgctmzjpslpg.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtaHp1cWFjemdjdG16anBzbHBnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTY0MjAyMywiZXhwIjoyMTA1MjE4MDIzfQ.g4KCNHLY0jZUEhGEdsheF5OXzWvR4txkdc493tWa-8g';
const SITE_SLUG = 'alinavip-in';

async function request(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: SUPABASE_URL,
      path,
      method,
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {})
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data ? JSON.parse(data) : null);
        } else {
          reject(new Error(`[${res.statusCode}] ${data}`));
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function run() {
  console.log(`Fetching site_id for slug "${SITE_SLUG}"...`);
  const sites = await request(`/rest/v1/sites?slug=eq.${SITE_SLUG}&select=id,name`);
  if (!sites || sites.length === 0) {
    console.error(`Site ${SITE_SLUG} not found in Supabase!`);
    process.exit(1);
  }
  const siteId = sites[0].id;
  console.log(`Found site: ${sites[0].name} (ID: ${siteId})\n`);

  // Sample static blogs to seed
  const sampleBlogs = [
    {
      site_id: siteId,
      slug: 'best-escort-service-gurgaon-guide',
      title: 'The Discerning Gentleman’s Guide to Elite Escort Services in Gurgaon (2026 Edition)',
      excerpt: 'Navigate Gurgaon’s luxury call girls and escort girls market with confidence. Learn how to verify authentic profiles, ensure complete discretion, and book 5-star hotel outcalls safely.',
      cover_image: 'https://ik.imagekit.io/uum5sguzw/shared/Benefits_of_Booking_Through_a_Professional_Escort_.jpg?tr=f-auto,q-85',
      author: 'ALINA VIP India',
      status: 'published',
      ai_generated: false,
      seo_title: 'Gurgaon Escorts Guide 2026 | Discerning Gentlemen Tips | ALINA VIP',
      seo_description: 'Discover how to book luxury verified companion services in Gurgaon safely with zero advance and complete discretion.',
      tags: ['Escort Service', 'Gurgaon Escorts', 'VIP Call Girls', 'Client Safety'],
      published_at: new Date('2026-01-20').toISOString(),
      content: {
        type: 'doc',
        paragraphs: [
          'Gurgaon has established itself as India’s undisputed financial and technology powerhouse, drawing corporate leaders, international entrepreneurs, and high-net-worth travelers.',
          'Selecting the best escort service in Gurgaon requires understanding the critical distinction between generic online directories and premier boutique agencies.',
          'At ALINA VIP India, we emphasize transparent booking practices with a strict zero-advance policy: payment is settled in person only after your selected call girl arrives at your suite and you are completely satisfied.',
          'When scheduling an outcall to renowned five-star hotels—such as The Oberoi Gurgaon on Udyog Vihar, The Leela Ambience near CyberHub, or Trident Gurgaon—discretion is essential.',
          'To make an inquiry, distinguished patrons can connect with our 24/7 private concierge via encrypted WhatsApp or direct line.'
        ]
      }
    },
    {
      site_id: siteId,
      slug: 'russian-escorts-gurgaon-guide',
      title: 'Slavic Elegance: Why Russian Escorts in Gurgaon Remain the Gold Standard',
      excerpt: 'Explore the unmatched allure, statuesque beauty, and cosmopolitan charm of verified Russian call girls and European call girls in Gurgaon.',
      cover_image: 'https://ik.imagekit.io/uum5sguzw/shared/Gurgaon_Escorts_are_Perfect_for_VIP_Cients_Heres_H.jpg?tr=f-auto,q-85',
      author: 'ALINA VIP India',
      status: 'published',
      ai_generated: false,
      seo_title: 'Russian Escorts Gurgaon | Slavic Models & VIP Call Girls Guide',
      seo_description: 'The complete guide to booking authentic verified Russian and Slavic companion models in Gurgaon five-star hotels.',
      tags: ['Russian Escorts', 'Slavic Models', 'Gurgaon Escorts', 'Luxury Hotel Outcalls'],
      published_at: new Date('2026-02-15').toISOString(),
      content: {
        type: 'doc',
        paragraphs: [
          'Among luxury escort girls and call girls categories in the National Capital Region, Russian escorts in Gurgaon hold an enduring appeal for discerning patrons.',
          'Beyond their striking physical aesthetics, Slavic call girls are celebrated for their poise and conversational versatility.',
          'Booking a Russian call girl in Gurgaon through ALINA VIP India guarantees full credential authenticity and zero advance deposit.'
        ]
      }
    }
  ];

  for (const post of sampleBlogs) {
    process.stdout.write(`Seeding post "${post.slug}"... `);
    try {
      await request('/rest/v1/posts', 'POST', post);
      console.log('✓ OK');
    } catch (e) {
      console.log(`Note: ${e.message}`);
    }
  }

  console.log('\nSupabase posts table populated successfully!');
}

run().catch(console.error);
