import { siteConfig } from '@/data/siteConfig';
import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '@/components/LegalPages';
import { getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Our privacy policy outlines how ${siteConfig.name} protects client confidentiality, data handling practices, and zero-trace privacy guarantees.`,
  keywords: [
    ...siteConfig.keywords.slice(0, 10),
    'privacy policy, discreet escort service, client confidentiality',
  ],
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
    languages: getAlternateLanguages('/privacy-policy'),
  },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy policy and client confidentiality practices of ${siteConfig.name}.`,
    url: `${siteConfig.url}/privacy-policy`,
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Privacy Policy | ${siteConfig.name}`,
    description: `Privacy policy and client confidentiality practices of ${siteConfig.name}.`,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function Page() {
  return <PrivacyPolicyPage />;
}
