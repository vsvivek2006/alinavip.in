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
    default: `${siteConfig.tagline} | ${siteConfig.name}`,
    template: '%s',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
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
    siteName: siteConfig.name,
    title: `${siteConfig.tagline} | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Escort Service in ${siteConfig.city}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.tagline} | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og-image.jpg`],
  },
  verification: {
    other: {
      seobility: '01d67d85a0cff8389a0210729e64aead',
    },
  }
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1
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
    ...siteConfig.structuredAddress,
  },
  geo: {
    '@type': 'GeoCoordinates',
    ...siteConfig.geo,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ]
};

import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${poppins.variable}`}>
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
