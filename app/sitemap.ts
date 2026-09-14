import { MetadataRoute } from 'next';
import { locations } from '@/data/locations';
import { categories } from '@/data/categories';
import { blogPosts } from '@/data/blogs';
import { isLocationIndexable } from '@/data/locationManifest';
import { siteConfig } from '@/data/siteConfig';

const BASE_URL = siteConfig.url;
const SITE_RELEASE_DATE = new Date('2026-09-15T00:00:00.000Z');
const ENRICHMENT_UPDATE_DATE = new Date('2026-09-15T00:00:00.000Z');

const ENRICHED_SLUGS = new Set([
  'sector-32',
  'sector-47',
  'sector-51',
  'sector-74',
  'sector-86',
  'noida-sector-63',
  'noida-sector-137',
  'noida-sector-142',
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: SITE_RELEASE_DATE,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const locationRoutes: MetadataRoute.Sitemap = locations
    .filter((loc) => isLocationIndexable(loc.slug))
    .map((loc) => ({
      url: `${BASE_URL}/locations/${loc.slug}`,
      lastModified: ENRICHED_SLUGS.has(loc.slug) ? ENRICHMENT_UPDATE_DATE : SITE_RELEASE_DATE,
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: SITE_RELEASE_DATE,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date || '2026-09-01T00:00:00.000Z'),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...locationRoutes,
    ...categoryRoutes,
    ...blogRoutes,
  ];
}
