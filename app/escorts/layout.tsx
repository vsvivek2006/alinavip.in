import type { Metadata } from 'next';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Verified Escorts in Gurgaon | 100% Real Model Directory | ALINA VIP',
  description:
    'Browse verified profiles of high-profile, Russian, celebrity, college, and independent escorts in Gurgaon. Genuine photos, direct booking, and prompt 20-30 min hotel outcall arrival.',
  alternates: {
    canonical: `${siteConfig.url}/escorts`,
    languages: getAlternateLanguages('/escorts'),
  },
};

export default function EscortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
