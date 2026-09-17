import { siteConfig } from '@/data/siteConfig';
import type { Metadata } from 'next';
import { TermsPage } from '@/components/LegalPages';
import { getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ALINA VIP Escort Service',
  description: 'Terms and conditions governing the booking and provision of luxury escort services by ALINA VIP.',
  keywords: [
    ...siteConfig.keywords.slice(0, 10),
    'terms of service, booking policies, client agreement',
  ],
  alternates: {
    canonical: `${siteConfig.url}/terms`,
    languages: getAlternateLanguages('/terms'),
  },
  robots: {
    index: false,
    follow: true,
  },
};


export default function Page() {
  return <TermsPage />;
}
