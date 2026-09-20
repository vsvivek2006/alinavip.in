import type { Metadata } from 'next';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `${siteConfig.city} Escorts Phone Number | 24/7 VIP Concierge | ${siteConfig.name}`,
  description:
    `Call our official 24/7 booking concierge for verified escort outcalls across ${siteConfig.city} sectors, Cyber City, and Golf Course Road.`,
  alternates: {
    canonical: `${siteConfig.url}/phone-number`,
    languages: getAlternateLanguages('/phone-number'),
  },
};

export default function GurgaonPhoneNumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
