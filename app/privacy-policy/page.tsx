import { siteConfig } from '@/data/siteConfig';
import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '@/components/LegalPages';
import { getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy | ALINA VIP Escort Service',
  description: 'Our privacy policy outlines how ALINA VIP protects client confidentiality, data handling practices, and zero-trace privacy guarantees.',
  keywords: [
    ...siteConfig.keywords.slice(0, 10),
    'privacy policy, discreet escort service, client confidentiality',
  ],
  alternates: {
    canonical: 'https://alinavip.in/privacy-policy',
    languages: getAlternateLanguages('/privacy-policy'),
  },
  robots: {
    index: false,
    follow: true,
  },
};


export default function Page() {
  return <PrivacyPolicyPage />;
}
