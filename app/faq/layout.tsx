import type { Metadata } from 'next';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `Frequently Asked Questions (FAQ) | ${siteConfig.city} Escorts | ${siteConfig.name}`,
  description:
    'Answers to common questions regarding booking escorts in ${siteConfig.city}, verification, rates, cash on delivery, and 5-star hotel outcall procedures.',
  alternates: {
    canonical: `${siteConfig.url}/faq`,
    languages: getAlternateLanguages('/faq'),
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
