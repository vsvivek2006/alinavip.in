import type { Metadata, Viewport } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';
import PublicShell from '@/components/PublicShell';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Escort Service in Gurgaon (Gurugram) | VIP Escorts Service ALINA VIP',
    template: '%s | ALINA VIP',
  },
  description:
    'ALINA VIP is the #1 escort service in Gurgaon (Gurugram). Book verified VIP call girls and elite escorts service with 20-30 min 5-star hotel outcall dispatch across DLF, Cyber City, and Golf Course Road.',
  keywords: siteConfig.keywords,
  applicationName: 'ALINA VIP',
  authors: [{ name: 'ALINA VIP' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: siteConfig.url,
    languages: getAlternateLanguages(''),
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: 'ALINA VIP',
    title: 'Escort Service in Gurgaon (Gurugram) | VIP Escorts Service ALINA VIP',
    description:
      'ALINA VIP is the #1 escort service in Gurgaon (Gurugram). Book verified VIP call girls and elite escorts service with 20-30 min 5-star hotel outcall dispatch across DLF, Cyber City, and Golf Course Road.',
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'ALINA VIP Escort Service in Gurgaon Gurugram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Escort Service in Gurgaon (Gurugram) | VIP Escorts Service ALINA VIP',
    description:
      'ALINA VIP is the #1 escort service in Gurgaon (Gurugram). Book verified VIP call girls and elite escorts service with 20-30 min 5-star hotel outcall dispatch across DLF, Cyber City, and Golf Course Road.',
    images: [`${siteConfig.url}/og-image.jpg`],
  },
  verification: {
    other: {
      seobility: '01d67d85a0cff8389a0210729e64aead',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteConfig.url}/#business`,
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  description: siteConfig.description,
  image: `${siteConfig.url}/og-image.jpg`,
  priceRange: '₹₹₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'DLF Phase 3, Golf Course Road',
    addressLocality: 'Gurgaon',
    addressRegion: 'Haryana',
    postalCode: '122002',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.4908,
    longitude: 77.0947,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#1E1E1E] font-sans antialiased">
        <PublicShell>{children}</PublicShell>
        <Toaster richColors position="top-right" closeButton expand />
      </body>
    </html>
  );
}
