import type { Metadata } from 'next';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `${siteConfig.city} Escorts Official Phone Number & Booking Hotline | ${siteConfig.name}`,
  description:
    'Direct 24/7 hotline and WhatsApp concierge phone number for Gurgaon escort services. 20-30 minute hotel delivery with zero advance payment.',
  alternates: {
    canonical: `${siteConfig.url}/phone-number`,
    languages: getAlternateLanguages('/phone-number'),
  },
  openGraph: {
    title: `Official Contact & Phone Number | ${siteConfig.name} Escorts ${siteConfig.city}`,
    description: `Direct phone number and WhatsApp contact for ${siteConfig.name} escort agency in ${siteConfig.city}. 24/7 confidential bookings and outcall service.`,
    url: `${siteConfig.url}/phone-number`,
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Official Contact & Phone Number | ${siteConfig.name} Escorts ${siteConfig.city}`,
    description: `Direct phone number and WhatsApp contact for ${siteConfig.name} escort agency in ${siteConfig.city}.`,
    images: ['/og-image.jpg'],
  },
};

export default function PhoneNumberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
