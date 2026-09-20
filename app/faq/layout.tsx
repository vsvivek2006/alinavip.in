import type { Metadata } from 'next';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `Frequently Asked Questions (FAQ) | ${siteConfig.city} Escorts | ${siteConfig.name}`,
  description:
    `Answers to common questions regarding booking escorts in ${siteConfig.city}, verification, rates, cash on delivery, and 5-star hotel outcall procedures.`,
  alternates: {
    canonical: `${siteConfig.url}/faq`,
    languages: getAlternateLanguages('/faq'),
  },
  openGraph: {
    title: `Frequently Asked Questions | ${siteConfig.name} Escorts ${siteConfig.city}`,
    description: `Answers to common questions regarding booking escorts in ${siteConfig.city}, verification, rates, cash on delivery, and 5-star hotel outcall procedures.`,
    url: `${siteConfig.url}/faq`,
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Frequently Asked Questions | ${siteConfig.name} Escorts ${siteConfig.city}`,
    description: `Escort booking FAQ, verification, rates, cash on delivery, and 5-star hotel outcall procedures.`,
    images: ['/og-image.jpg'],
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
