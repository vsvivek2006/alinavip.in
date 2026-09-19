import { MetadataRoute } from 'next';
import { locations } from '@/data/locations';
import { categories } from '@/data/categories';
import { getPublishedBlogPosts } from '@/lib/supabaseBlog';
import { isLocationRedirect } from '@/data/locationManifest';
import { siteConfig } from '@/data/siteConfig';
import pagesData from '@/data/catalog_pages.json';
import postsData from '@/data/catalog_posts.json';
import productsData from '@/data/catalog_products.json';

const BASE_URL = siteConfig.url.replace(/\/+$/, '');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();
  const urlSet = new Set<string>();
  const sitemapEntries: MetadataRoute.Sitemap = [];

  function addUrl(path: string, priority = 0.8, changeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly') {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const fullUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;
    if (!urlSet.has(fullUrl)) {
      urlSet.add(fullUrl);
      sitemapEntries.push({
        url: fullUrl,
        lastModified: currentDate,
        changeFrequency,
        priority,
      });
    }
  }

  // 1. Core Static Routes
  addUrl('/', 1.0, 'daily');
  addUrl('/about', 0.8, 'weekly');
  addUrl('/rates', 0.9, 'daily');
  addUrl('/hotels', 0.9, 'daily');
  addUrl('/categories', 0.9, 'daily');
  addUrl('/services', 0.9, 'daily');
  addUrl('/escorts', 0.9, 'daily');
  addUrl('/gallery', 0.8, 'weekly');
  addUrl('/blog', 0.8, 'daily');
  addUrl('/contact', 0.8, 'weekly');
  addUrl('/faq', 0.8, 'weekly');
  addUrl('/locations', 0.9, 'daily');
  addUrl('/shop', 0.9, 'daily');
  addUrl('/privacy-policy', 0.3, 'monthly');
  addUrl('/terms', 0.3, 'monthly');
  addUrl('/disclaimer', 0.3, 'monthly');

  // High-Priority Alias Pages
  addUrl('/phone-number', 0.85, 'weekly');
  addUrl('/escort-service-for-1-2-3-hours', 0.85, 'weekly');
  addUrl('/escort-service-full-night', 0.85, 'weekly');
  addUrl('/full-body-sensual-massage', 0.85, 'weekly');
  addUrl('/erotic-massage-in-gurgaon', 0.85, 'weekly');
  addUrl('/girlfriend-experience-in-gurgaon', 0.85, 'weekly');
  addUrl('/in-out-call-girls-gurgaon', 0.85, 'weekly');

  interface SimpleSlug {
    slug: string;
  }

  // Redirect slugs — excluded from sitemap to avoid 'canonicalized URL in XML sitemap' audit issue
  const sitemapExcludedSlugs = new Set(['about-us', 'contact-us', 'faqs', 'escorts-categories', 'gurgaon-escorts-rates', 'gurgaon-escorts-phone-number', 'sitemap']);

  // 2. All 207 Pages from page-sitemap.xml
  (pagesData as SimpleSlug[]).forEach((p) => {
    if (p.slug && !sitemapExcludedSlugs.has(p.slug)) {
      addUrl(`/${p.slug}`, 0.85, 'weekly');
    }
  });

  // 3. All 57 Posts from post-sitemap.xml
  (postsData as SimpleSlug[]).forEach((p) => {
    if (p.slug) {
      addUrl(`/${p.slug}`, 0.75, 'monthly');
    }
  });

  // 4. All 216 Products from product-sitemap.xml
  (productsData as SimpleSlug[]).forEach((p) => {
    if (p.slug) {
      addUrl(`/${p.slug}`, 0.8, 'weekly');
    }
  });

  // 5. Locations directory items
  locations
    .filter((loc) => !isLocationRedirect(loc.slug))
    .forEach((loc) => {
      addUrl(`/locations/${loc.slug}`, 0.85, 'weekly');
    });

  // 6. Category directory items
  categories.forEach((cat) => {
    addUrl(`/category/${cat.slug}`, 0.85, 'weekly');
  });

  // 7. Blog directory items
  const liveBlogPosts = await getPublishedBlogPosts();
  liveBlogPosts.forEach((post) => {
    addUrl(`/blog/${post.slug}`, 0.75, 'monthly');
  });

  return sitemapEntries;
}
