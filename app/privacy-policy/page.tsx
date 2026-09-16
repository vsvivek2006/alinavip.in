import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '@/components/LegalPages';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy | ALINA VIP Escort Service',
  description: 'Our privacy policy outlines how ALINA VIP protects client confidentiality, data handling practices, and zero-trace privacy guarantees.',
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
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
