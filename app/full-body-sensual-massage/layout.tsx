import type { Metadata } from 'next';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Sensual & Erotic Full Body Massage in Gurgaon | ALINA VIP',
  description:
    'Experience blissful sensual and erotic massage therapy with verified companions in Gurgaon. Relieve stress with complete privacy and cash on delivery.',
  alternates: {
    canonical: `${siteConfig.url}/services/erotic-massage-in-gurgaon`,
    languages: getAlternateLanguages('/services/erotic-massage-in-gurgaon'),
  },
};

export default function SensualMassageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
