import type { Metadata } from 'next';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Gurgaon Escorts | ALINA VIP',
  description:
    'Answers to common questions regarding booking escorts in Gurgaon, verification, rates, cash on delivery, and 5-star hotel outcall procedures.',
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
