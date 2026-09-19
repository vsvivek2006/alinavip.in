import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteConfig';

// /faqs permanently redirects to /faq — point canonical there so any
// cached copies Google has also resolve to the canonical URL
export const metadata: Metadata = {
  alternates: {
    canonical: `${siteConfig.url}/faq`,
  },
  robots: { index: false, follow: false },
};

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
