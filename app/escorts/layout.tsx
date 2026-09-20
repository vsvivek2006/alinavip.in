import type { Metadata } from 'next';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `Verified Escorts in ${siteConfig.city} | 100% Real Model Directory | ${siteConfig.name}`,
  description:
    `Browse verified profiles of high-profile, Russian, celebrity, college, and independent escorts in ${siteConfig.city}. Genuine photos, direct booking, and prompt 20-30 min hotel outcall arrival.`,
  alternates: {
    canonical: `${siteConfig.url}/escorts`,
    languages: getAlternateLanguages('/escorts'),
  },
  openGraph: {
    title: `Verified Escorts in ${siteConfig.city} | 100% Real Model Directory | ${siteConfig.name}`,
    description: `Browse verified profiles of high-profile, Russian, celebrity, college, and independent escorts in ${siteConfig.city}. Genuine photos, direct booking, and prompt 20-30 min hotel outcall arrival.`,
    url: `${siteConfig.url}/escorts`,
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Verified Escorts in ${siteConfig.city} | 100% Real Model Directory | ${siteConfig.name}`,
    description: `Verified escort directory in ${siteConfig.city}. Genuine photos, direct booking.`,
    images: ['/og-image.jpg'],
  },
};

export default function EscortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
