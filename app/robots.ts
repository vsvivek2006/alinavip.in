import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/siteConfig';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
      crawlDelay: 1,
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
