import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export interface Crumb {
  name?: string;
  path?: string;
  label?: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  const normalized = items.map((it) => ({
    name: it.name || it.label || '',
    path: it.path || it.href,
  }));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: normalized.map((item, index) => {
      const crumbUrl = item.path
        ? (item.path.startsWith('http') ? item.path : `${siteConfig.url}${item.path.startsWith('/') ? item.path : `/${item.path}`}`)
        : undefined;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(crumbUrl ? { item: crumbUrl } : {}),
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-rose-200/90">
          {normalized.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {item.path ? (
                <Link href={item.path} className="hover:text-white transition-colors underline decoration-rose-300/40">
                  {item.name}
                </Link>
              ) : (
                <span className="text-white font-semibold">{item.name}</span>
              )}
              {i < normalized.length - 1 && <ChevronRight size={12} className="text-rose-300/70" />}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
