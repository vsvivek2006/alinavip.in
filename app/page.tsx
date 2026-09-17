import type { Metadata } from 'next';
import { siteConfig, generalFaqs, getAlternateLanguages } from '@/data/siteConfig';

import HeroSection from '@/components/home/HeroSection';
import TrustBannerSection from '@/components/home/TrustBannerSection';
import FeaturedProfilesSection from '@/components/home/FeaturedProfilesSection';
import CategoriesGridSection from '@/components/home/CategoriesGridSection';
import ServicesOfferedSection from '@/components/home/ServicesOfferedSection';
import TrustStandardsSection from '@/components/home/TrustStandardsSection';
import BookingProcessSection from '@/components/home/BookingProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import LocationGridSection from '@/components/home/LocationGridSection';
import EditorialGuideSection from '@/components/home/EditorialGuideSection';
import HomeFaqSection from '@/components/home/HomeFaqSection';
import HomeBlogSection from '@/components/home/HomeBlogSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Gurgaon Escorts – 24/7 In-Call & Out-Call Gurgaon Escort Service | ALINA VIP',
  description:
    'ALINA VIP provides premier escort service in Gurgaon (Gurugram). 100% verified Russian, independent, and high-profile call girls with 20-30 min 5-star hotel outcalls across DLF, Cyber City, and Golf Course Road.',
  keywords: siteConfig.keywords,
  alternates: {
    canonical: siteConfig.url,
    languages: getAlternateLanguages(''),
  },
  openGraph: {
    title: 'Gurgaon Escorts – 24/7 In-Call & Out-Call Gurgaon Escort Service | ALINA VIP',
    description:
      'ALINA VIP provides premier escort service in Gurgaon (Gurugram). 100% verified Russian, independent, and high-profile call girls with 20-30 min 5-star hotel outcalls across DLF, Cyber City, and Golf Course Road.',
    url: siteConfig.url,
    type: 'website',
  },
};

export default function HomePage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    alternateName: [
      'ALINA VIP Escorts Service Gurgaon',
      'ALINA VIP Escort Service Gurugram',
    ],
    url: siteConfig.url,
    phone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: ['Gurgaon', 'Gurugram', 'Delhi NCR', 'DLF Phase 1-5', 'Cyber City', 'Golf Course Road'],
    knowsAbout: [
      'Escort Service in Gurgaon',
      'Escorts Service in Gurgaon',
      'Escort Service in Gurugram',
      'VIP Call Girls in Gurgaon',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DLF Phase 3, Golf Course Road',
      addressLocality: 'Gurgaon',
      addressRegion: 'Haryana',
      postalCode: '122002',
      addressCountry: 'IN',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/blog?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    alternateName: 'ALINA VIP Escort Service in Gurgaon Gurugram',
    description: 'Premier VIP escort service in Gurgaon (Gurugram) providing discreet 5-star hotel outcalls with verified call girls.',
    image: `${siteConfig.url}/og-image.jpg`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    priceRange: '$$$',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Cash on Delivery',
    areaServed: [
      {
        '@type': 'City',
        name: 'Gurgaon',
      },
      {
        '@type': 'City',
        name: 'Gurugram',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'DLF Phase 3, Golf Course Road',
      addressLocality: 'Gurgaon (Gurugram)',
      addressRegion: 'Haryana',
      postalCode: '122002',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4595,
      longitude: 77.0266,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema,
      websiteSchema,
      localBusinessSchema,
      faqSchema,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeSchema),
        }}
      />

      {/* 1. Hero Banner */}
      <HeroSection />

      {/* 2. 4-Pillar Trust Banner */}
      <TrustBannerSection />

      {/* 3. Featured Profiles (3x3 Grid) */}
      <FeaturedProfilesSection />

      {/* 4. Browse Escorts by Category */}
      <CategoriesGridSection />

      {/* 5. Services Offered */}
      <ServicesOfferedSection />

      {/* 6. Trust & Professional Standards */}
      <TrustStandardsSection />

      {/* 7. Simple Booking Process */}
      <BookingProcessSection />

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 9. Top Locations Grid */}
      <LocationGridSection />

      {/* 10. Editorial Guides & Sensual Getaway */}
      <EditorialGuideSection />

      {/* 11. Frequently Asked Questions */}
      <HomeFaqSection />

      {/* 12. Latest Blog Articles */}
      <HomeBlogSection />

      {/* 13. Bottom CTA Banner */}
      <CTASection />
    </>
  );
}
