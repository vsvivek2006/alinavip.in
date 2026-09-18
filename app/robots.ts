import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/siteConfig';

const baseUrl = siteConfig.url.replace(/\/+$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
      crawlDelay: 1,
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-index.xml`,
      `${baseUrl}/sitemap-locations.xml`,
      `${baseUrl}/sitemap-categories.xml`,
      `${baseUrl}/sitemap-blogs.xml`,
      `${baseUrl}/sitemap-pages.xml`,
    ],
  };
}
