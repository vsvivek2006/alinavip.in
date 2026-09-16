import type { Metadata } from 'next';
import { TermsPage } from '@/components/LegalPages';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Terms & Conditions | ALINA VIP Escort Service',
  description: 'Terms and conditions governing the booking and provision of luxury escort services by ALINA VIP.',
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
