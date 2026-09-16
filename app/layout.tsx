import type { Metadata, Viewport } from 'next';
import { Jost, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Escort Service in Gurgaon (Gurugram) | VIP Escorts Service ALINA VIP',
    template: '%s',
  },
  description:
    'ALINA VIP is the #1 escort service in Gurgaon (Gurugram). Book verified VIP call girls and elite escorts service with 20-30 min 5-star hotel outcall dispatch across DLF, Cyber City, and Golf Course Road.',
  keywords: siteConfig.keywords,
  applicationName: 'ALINA VIP',
  authors: [{ name: 'ALINA VIP' }],
  generator: 'Next.js',
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
  themeColor: '#0A0A0B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jost.variable}`}>
      <body className="bg-charcoal-900 text-charcoal-100 font-sans antialiased">
        <div className="min-h-screen flex flex-col bg-luxury-gradient overflow-x-hidden">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
