import type { Metadata } from 'next';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Gurgaon Escorts Official Phone Number & Booking Hotline | ALINA VIP',
  description:
    'Direct 24/7 hotline and WhatsApp concierge phone number for Gurgaon escort services. 20-30 minute hotel delivery with zero advance payment.',
  alternates: {
    canonical: `${siteConfig.url}/phone-number`,
    languages: getAlternateLanguages('/phone-number'),
  },
};

export default function PhoneNumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
