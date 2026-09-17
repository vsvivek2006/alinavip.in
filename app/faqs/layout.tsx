import type { Metadata } from 'next';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions About Escorts Services | ALINA VIP',
  description:
    'Comprehensive answers to 21+ essential questions about Gurgaon call girls, booking protocols, safety standards, rates, and hotel appointments.',
  alternates: {
    canonical: `${siteConfig.url}/faqs`,
    languages: getAlternateLanguages('/faqs'),
  },
};

export default function FaqsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
