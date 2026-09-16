import type { Metadata } from 'next';
import { siteConfig, generalFaqs } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Escort Service in Gurgaon (Gurugram) | VIP Escorts Service ALINA VIP',
  description:
    'ALINA VIP provides premier escort service in Gurgaon (Gurugram). Verified VIP call girls, top escorts service, and discreet 20-30 min 5-star hotel outcalls across DLF, Cyber City, and Golf Course Road.',
  keywords: siteConfig.keywords,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: 'Escort Service in Gurgaon (Gurugram) | VIP Escorts Service ALINA VIP',
    description:
      'ALINA VIP provides premier escort service in Gurgaon (Gurugram). Verified VIP call girls, top escorts service, and discreet 20-30 min 5-star hotel outcalls across DLF, Cyber City, and Golf Course Road.',
    url: siteConfig.url,
    type: 'website',
  },
};

import Link from 'next/link';
import Image from 'next/image';
import HomeBookingForm from '@/components/HomeBookingForm';
import {
  Phone,
  ShieldCheck,
  BadgeCheck,
  Clock,
  Lock,
  Star,
  Crown,
  Gem,
  GraduationCap,
  User,
  Plane,
  Camera,
  Award,
  Luggage,
  Sparkles,
  UtensilsCrossed,
  Calendar,
  PartyPopper,
  Briefcase,
  MapPin,
  ArrowRight,
  Building2,
} from 'lucide-react';
import CTASection from '@/components/CTASection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { categories } from '@/data/categories';
import { services } from '@/data/content';
import { blogPosts } from '@/data/blogs';

import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Crown,
  Star,
  Gem,
  GraduationCap,
  User,
  Plane,
  Camera,
  Award,
  Luggage,
  Sparkles,
  UtensilsCrossed,
  Calendar,
  PartyPopper,
  Briefcase,
};

const homeCategoryImageMap: Record<string, string> = {
  'russian-call-girls': '/images/categories/russian-escorts.webp',
  'vip-call-girls': '/images/categories/vip-escorts.webp',
  'high-profile-girls': '/images/categories/high-profile-girls.webp',
  'college-girls': '/images/categories/college-girls.webp',
  'independent-girls': '/images/categories/independent-escorts.webp',
  'air-hostess': '/images/categories/air-hostess.webp',
  'model-escorts': '/images/categories/model-escorts.webp',
  'celebrity-escorts': '/images/categories/celebrity-escorts.webp',
  'travel-escorts': '/images/categories/travel-escorts.webp',
  'housewife-escorts': '/images/categories/housewife-escorts.webp',
  'premium-escorts': '/images/categories/default.webp',
};

const whyChooseUs = [
  {
    icon: ShieldCheck,
    title: '100% Verified Profiles',
    description:
      'Every profile undergoes a thorough in-person verification process to ensure authenticity, genuine photos, and client safety.',
  },
  {
    icon: Lock,
    title: 'Complete Ironclad Discretion',
    description:
      'Your privacy is our utmost priority. All bookings, conversations, and client information are kept strictly confidential.',
  },
  {
    icon: Clock,
    title: '24/7 Rapid NCR Dispatch',
    description:
      'Our concierge desk operates round the clock with rapid 20 to 30 minute arrival across all Gurgaon and Delhi NCR hotels.',
  },
  {
    icon: BadgeCheck,
    title: 'Premium Handpicked Quality',
    description:
      'We select only cultured, educated models who meet our exacting standards of elegance, grace, and sophisticated conversation.',
  },
  {
    icon: Star,
    title: 'Elite Diverse Selection',
    description:
      'From VIP models and European escorts to independent call girls and air hostesses, choose from the finest roster in India.',
  },
  {
    icon: Phone,
    title: 'Dedicated VIP Support',
    description:
      'Our dedicated booking team provides personalized assistance from your initial inquiry until the conclusion of your rendezvous.',
  },
];

const howItWorks = [
  {
    number: '01',
    title: 'Browse Profiles',
    description:
      'Explore our curated portfolio of verified escort profiles across specialized categories and premier Gurgaon locations.',
  },
  {
    number: '02',
    title: 'Contact Our Desk',
    description:
      'Call us directly or send a discreet WhatsApp message with your location, timing, and preferred escort.',
  },
  {
    number: '03',
    title: 'Instant Confirmation',
    description:
      'Our booking team confirms availability within minutes and coordinates discreet in-call or out-call arrangements.',
  },
  {
    number: '04',
    title: 'Enjoy Luxury Rendezvous',
    description:
      'Meet your verified escort at your hotel suite or residence and experience an unforgettable, premium engagement.',
  },
];

// Clean, user-friendly spotlight locations
const primeLocations = [
  { slug: 'cyber-city', name: 'Cyber City' },
  { slug: 'mg-road', name: 'MG Road' },
  { slug: 'golf-course-road', name: 'Golf Course Road' },
  { slug: 'dlf-phase-1', name: 'DLF Phase 1' },
  { slug: 'dlf-phase-2', name: 'DLF Phase 2' },
  { slug: 'dlf-phase-3', name: 'DLF Phase 3' },
  { slug: 'dlf-phase-4', name: 'DLF Phase 4' },
  { slug: 'dlf-phase-5', name: 'DLF Phase 5' },
  { slug: 'sohna-road', name: 'Sohna Road' },
  { slug: 'sushant-lok', name: 'Sushant Lok' },
  { slug: 'sector-29', name: 'Sector 29' },
  { slug: 'huda-city-centre', name: 'HUDA City Centre' },
  { slug: 'golf-course-extension-road', name: 'Golf Course Ext' },
  { slug: 'manesar', name: 'Manesar' },
  { slug: 'aerocity', name: 'Aerocity' },
  { slug: 'mahipalpur', name: 'Mahipalpur' },
  { slug: 'dwarka', name: 'Dwarka' },
  { slug: 'south-delhi', name: 'South Delhi' },
  { slug: 'sector-14', name: 'Sector 14' },
  { slug: 'sector-56', name: 'Sector 56' },
];

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

      {/* 1. Dramatic Luxury Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#050508] via-[#0C0B14] to-[#141022]">
        {/* Ambient Subtle Glows */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-float transform-gpu" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float transform-gpu"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="container-luxury relative z-10 text-center pt-24 pb-16">
          <p className="section-subtitle text-gold-400 font-sans text-xs md:text-sm tracking-ultra uppercase mb-4 animate-fade-down">
            #1 Premier Escort Agency • Gurgaon &amp; Gurugram
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-up leading-tight">
            Escort Service in <span className="text-gradient-gold">Gurgaon</span>
          </h1>

          <p
            className="text-charcoal-300 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Gurgaon&apos;s leading verified <Link href="/services" className="text-gold-400 hover:underline font-medium">escorts service in Gurgaon</Link> (Gurugram). Elite <Link href="/category/vip-call-girls" className="text-gold-400 hover:underline font-medium">VIP call girls</Link> with genuine profiles and 20–30 min discreet outcalls across all sectors.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up mb-12"
            style={{ animationDelay: '0.4s' }}
          >
            <Link
              href="/services"
              className="btn-gold shadow-lg shadow-gold-500/20"
            >
              Explore Profiles <ArrowRight size={16} />
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="btn-outline-gold">
              <Phone size={16} /> {siteConfig.phoneDisplay}
            </a>
          </div>

          {/* Clean Trust Pillars Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-charcoal-700/60">
            {[
              {
                icon: ShieldCheck,
                title: 'Certified Real Models',
                desc: 'Strict zero-catfish policy',
              },
              {
                icon: Lock,
                title: 'Absolute Secrecy',
                desc: 'Zero client footprint',
              },
              {
                icon: Clock,
                title: '20-30 Min Arrival',
                desc: 'Direct hotel & home dispatch',
              },
              {
                icon: Star,
                title: 'Cash On Delivery',
                desc: 'Verify call girl first',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-left p-2"
                >
                  <Icon size={20} className="text-gold-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white font-medium">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-charcoal-400">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
        </div>
      </section>

      {/* 2. Rapid Booking Banner */}
      <section className="py-14 bg-charcoal-800 border-y border-charcoal-700">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-gold-500 font-sans text-xs tracking-ultra uppercase mb-2 font-semibold">
                Prompt 20-30 Minute Outcall Across Gurgaon &amp; NCR
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-white font-light">
                Bespoke call girl reservations For Distinguished Hotel Suites &amp; Residences
              </h2>
            </div>
            <div className="flex gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn-gold whitespace-nowrap"
              >
                <Phone size={16} /> Call Now: {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Section (Warm White Luxury) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="section-subtitle text-gold-600">Discover ALINA VIP India</p>
              <h2 className="section-title mb-6 text-[#0F172A]">
                The Gold Standard of{' '}
                <span className="text-gradient-gold font-normal">
                  Escort Service in Gurgaon
                </span>
              </h2>
              <div className="gold-divider mb-8" />
              <div className="space-y-4 text-gray-700 leading-relaxed text-base">
                <p>
                  <strong className="text-[#0F172A]">ALINA VIP India</strong> stands as the definitive luxury <Link href="/services" className="text-gold-600 hover:underline font-medium">escort service in Gurgaon</Link> (Gurugram), dedicated to coordinating exceptional <Link href="/category/vip-call-girls" className="text-gold-600 hover:underline font-medium">call girls</Link> and verified <Link href="/services" className="text-gold-600 hover:underline font-medium">escorts service</Link> for high-profile business dinners, executive celebrations, jet-setting travel, and confidential hotel suite appointments.
                </p>
                <p>
                  Rooted in deep familiarity with Gurgaon&apos;s luxury enclaves—from <Link href="/locations/cyber-city" className="text-gold-600 hover:underline font-medium">DLF Cyber City</Link> to the <Link href="/locations/golf-course-road" className="text-gold-600 hover:underline font-medium">Golf Course Road</Link> corridor—our concierge team enforces strict operational secrecy, prompt dispatch times, and transparent zero-advance payment policies across all sectors of Gurugram.
                </p>
                <p>
                  Each model in our roster is personally verified to ensure unmatched poise, engaging intellectual conversation, and impeccable presentation—delivering a 100% photo-accurate experience with top <Link href="/category/russian-call-girls" className="text-gold-600 hover:underline font-medium">Russian call girls</Link> and elite models every single time.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link href="/about" className="btn-outline-gold">
                  Learn More <ArrowRight size={16} />
                </Link>
                <a
                  href={siteConfig.url}
                  className="text-gold-600 hover:text-gold-700 font-semibold flex items-center gap-2 text-sm"
                >
                  Visit {siteConfig.domain} <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Clean Statistics Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '500+', label: 'Verified Profiles' },
                { value: '108', label: 'Locations in Gurgaon & NCR' },
                { value: '11', label: 'Curated Categories' },
                { value: '24/7', label: 'Service Available' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-8 text-center rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all"
                >
                  <p className="font-serif text-4xl md:text-5xl text-gold-600 font-light mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 tracking-wider uppercase font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (Soft Ivory #faf6f2) */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Why Choose Us</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              The <span className="text-gradient-gold">ALINA VIP</span> Difference
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
              We provide the highest level of confidentiality, verified profile safety, and personalized five-star service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 border border-gold-500/30 flex items-center justify-center mb-6 group-hover:border-gold-500 group-hover:bg-gold-50/50 transition-colors rounded-lg">
                    <Icon size={24} className="text-gold-500" />
                  </div>
                  <h3 className="font-serif text-xl text-[#0F172A] mb-3 font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Verified & Authenticated Standards (Pure White) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Client Confidence</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Rigorous <span className="text-gradient-gold">Verification Standards</span>
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
              Every profile on ALINA VIP undergoes a comprehensive screening process to ensure total authenticity, safety, and mutual peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Identity Verified',
                description:
                  'All profiles provide valid government identification securely verified by our concierge team prior to profile listing.',
                icon: BadgeCheck,
              },
              {
                title: 'Photos Verified',
                description:
                  'Profile galleries are verified to be recent, genuine representations with zero misleading edits or false representations.',
                icon: Camera,
              },
              {
                title: 'Background Checked',
                description:
                  'We conduct thorough background checks to maintain highest standards of safety, professional etiquette, and client discretion.',
                icon: ShieldCheck,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-gray-50 p-8 text-center rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all group"
                >
                  <div className="w-16 h-16 mx-auto border-2 border-gold-500/30 rounded-full flex items-center justify-center mb-6 group-hover:border-gold-500 group-hover:bg-gold-50 transition-colors">
                    <Icon size={28} className="text-gold-500" />
                  </div>
                  <h3 className="font-serif text-xl text-[#0F172A] mb-3 font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Tailored Services (Soft Ivory #faf6f2) */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Bespoke Engagements</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Tailored <span className="text-gradient-gold">VIP Escort</span> Services
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm">
              Discover customized engagements designed for corporate gatherings, dinner dates, travel accompaniment, and private rendezvous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Sparkles;
              return (
                <Link
                  key={service.slug}
                  href="/services"
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 border border-gold-500/30 flex items-center justify-center mb-6 group-hover:border-gold-500 group-hover:bg-gold-50 transition-colors rounded-lg">
                      <Icon size={24} className="text-gold-500" />
                    </div>
                    <h3 className="font-serif text-xl text-[#0F172A] mb-3 font-bold group-hover:text-gold-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>
                  </div>
                  <span className="text-xs text-gold-600 tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-all font-semibold">
                    Learn More <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Top Categories (Pure White) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Curated Roster</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Explore Service <span className="text-gradient-gold">Categories</span>
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm">
              Select from curated categories meeting every preference in beauty, personality, and background.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((cat) => {
              const imageSrc =
                homeCategoryImageMap[cat.slug] ||
                '/images/categories/default.webp';
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-gold-300 transition-all duration-500 group flex flex-col"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
                    <Image
                      src={imageSrc}
                      alt={`${cat.name} - VIP Call Girls in Gurgaon`}
                      title={`${cat.name} - VIP Call Girls in Gurgaon`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 286px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-gold-400 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-gold-500/30">
                      <ShieldCheck className="w-3 h-3 text-gold-400" />
                      <span>Verified</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-serif text-base md:text-lg text-white font-bold leading-tight drop-shadow-sm group-hover:text-gold-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-gray-300 line-clamp-1 mt-0.5">
                        {cat.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between bg-white text-xs">
                    <span className="text-gray-500 font-medium">5-Star Outcall</span>
                    <span className="text-gold-600 font-bold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      View Profiles <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="btn-outline-gold inline-flex items-center gap-2"
            >
              View All 11 Categories <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Prime Locations (Soft Ivory #faf6f2) */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Service Locations</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Rapid Outcall Coverage Across <span className="text-gradient-gold">Gurgaon &amp; NCR</span>
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
              Prompt 20 to 30 minute dispatch to premier luxury hotels, serviced residences, and private suites across all key sectors and commercial hubs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 mb-10">
            {primeLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="flex items-center gap-2.5 p-4 bg-white border border-gray-200 hover:border-gold-500 hover:shadow-lg transition-all rounded-xl group"
              >
                <MapPin
                  size={16}
                  className="text-gold-500 flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <span className="text-xs text-gray-700 group-hover:text-gold-600 transition-colors font-semibold">
                  {loc.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/locations"
              className="btn-outline-gold inline-flex items-center gap-2"
            >
              Explore All 108 Locations &amp; Sectors <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. How It Works (Pure White) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">How It Works</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Simple &amp; <span className="text-gradient-gold">Discreet Process</span>
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <div
                key={i}
                className="text-center group p-6 rounded-2xl bg-gray-50 hover:bg-gold-50/50 transition-all border border-gray-100 hover:border-gold-300"
              >
                <div className="font-serif text-6xl text-gold-500/20 font-light mb-4 group-hover:text-gold-500/40 transition-colors">
                  {item.number}
                </div>
                <h3 className="font-serif text-xl text-[#0F172A] mb-3 font-bold">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Client Testimonials (Light Theme) */}
      <TestimonialsSection theme="light" />

      {/* 11. Latest Blog Insights (Soft Ivory #faf6f2) */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Editorial &amp; Insights</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Luxury Lifestyle &amp; <span className="text-gradient-gold">Etiquette</span>
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-gold-300 group flex flex-col"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={post.image || `/images/blog/${post.slug}.webp`}
                    alt={post.title}
                    title={post.title}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 390px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <span className="absolute top-4 left-4 bg-gold-600 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#0F172A] mt-2 mb-3 font-bold leading-tight group-hover:text-gold-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="btn-outline-gold inline-flex items-center gap-2"
            >
              View All Articles <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 12. FAQ Section (Pure White) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Frequently Asked Questions</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Help &amp; <span className="text-gradient-gold">Common Inquiries</span>
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {generalFaqs.slice(0, 8).map((faq, i) => (
              <details
                key={i}
                className="bg-gray-50 rounded-2xl border border-gray-100 hover:border-gold-300 transition-all group"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-[#0F172A] text-lg pr-4">
                    {faq.question}
                  </span>
                  <span className="text-gold-600 text-2xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faq"
              className="btn-outline-gold inline-flex items-center gap-2"
            >
              View All FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 13. Client Information & Quality Overview */}
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6">
              The Executive Guide to Escort Service in Gurgaon (Gurugram)
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Positioned as India&apos;s leading corporate cyber hub, Gurgaon (officially renamed Gurugram, and often searched as Gurugaon) attracts Fortune 500 executives, venture capitalists, and international travellers demanding premier standards of hospitality. ALINA VIP India provides the top-rated <Link href="/services" className="text-gold-600 hover:underline font-medium">escort service in Gurgaon</Link> and <Link href="/services" className="text-gold-600 hover:underline font-medium">escorts service in Gurgaon</Link>, offering educated, refined <Link href="/services" className="text-gold-600 hover:underline font-medium">escort girls</Link> and verified <Link href="/category/vip-call-girls" className="text-gold-600 hover:underline font-medium">call girls</Link> tailored for five-star hotel suites, dinner parties, and quiet evening intimacy.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">
              Verified Escort Service &amp; Absolute Photo Authenticity in Gurugram
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Navigating the escort market in Delhi NCR requires caution due to fake classifieds and misleading portfolio pictures. At ALINA VIP India, every model in our <Link href="/services" className="text-gold-600 hover:underline font-medium">escort service in Gurugram</Link> is authenticated through a multi-stage background check and in-person photography verification. When you browse our <Link href="/gallery" className="text-gold-600 hover:underline font-medium">verified photo gallery</Link>, you can be 100% confident that the model arriving at your door mirrors her gallery photos precisely.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              From charming <Link href="/category/russian-call-girls" className="text-gold-600 hover:underline font-medium">Russian call girls</Link> to cosmopolitan <Link href="/category/air-hostess" className="text-gold-600 hover:underline font-medium">air hostess escorts</Link>, our roster represents verified professionals who understand high-society etiquette, cultural sensitivity, and warm conversational chemistry.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">
              Ironclad Discretion with Gurgaon&apos;s #1 Escorts Service
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              We operate under an unyielding confidentiality charter. Recognizing that our clientele includes notable public figures, industrialists, and senior professionals, we maintain zero client data logs, practice secure ephemeral communication, and dispatch models in unmarked executive vehicles.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Whether meeting at The Oberoi, The Leela Ambience, Trident, Grand Hyatt, or upscale condominiums along <Link href="/locations/golf-course-road" className="text-gold-600 hover:underline font-medium">Golf Course Road</Link>, complete anonymity and professional privacy are guaranteed. Learn more in our <Link href="/faq" className="text-gold-600 hover:underline font-medium">escort service FAQ</Link>.
            </p>

            <h3 className="text-2xl font-bold text-[#0F172A] mt-8 mb-4">
              Lightning 20-30 Minute Outcall Dispatch Across Gurgaon &amp; Gurugram
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Your time is invaluable. Our strategically located escorts network across <Link href="/locations/cyber-city" className="text-gold-600 hover:underline font-medium">Cyber City</Link>, DLF Phases 1 through 5, Sohna Road, Golf Course Extension, and Aerocity guarantees swift 20 to 30-minute outcall arrival across all sectors of Gurgaon and Gurugram.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              No tedious upfront deposits, no deceptive transaction fees—only transparent cash on delivery and verified elite call girls with ALINA VIP India.
            </p>
          </div>
        </div>
      </section>

      {/* 14. Contact Section (Pure White with Midnight Reservation Card) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle text-gold-600">Get In Touch</p>
              <h2 className="section-title mb-6 text-[#0F172A]">
                Reserve Your <span className="text-gradient-gold">Private Appointment</span>
              </h2>
              <div className="gold-divider mb-8" />
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-gold-500/30 flex items-center justify-center flex-shrink-0 rounded-lg">
                    <Phone size={20} className="text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-ultra uppercase text-gray-500 mb-1 font-bold">
                      Phone VIP
                    </h3>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-[#0F172A] hover:text-gold-600 transition-colors font-bold text-lg"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-gold-500/30 flex items-center justify-center flex-shrink-0 rounded-lg">
                    <Building2 size={20} className="text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-ultra uppercase text-gray-500 mb-1 font-bold">
                      Location
                    </h3>
                    <p className="text-[#0F172A] font-medium">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 border border-gold-500/30 flex items-center justify-center flex-shrink-0 rounded-lg">
                    <Clock size={20} className="text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-ultra uppercase text-gray-500 mb-1 font-bold">
                      Availability
                    </h3>
                    <p className="text-[#0F172A] font-bold">
                      24 Hours, 7 Days a Week
                    </p>
                    <p className="text-sm text-gray-500">
                      Concierge booking desk available anytime across NCR
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href={siteConfig.url}
                  className="text-gold-600 hover:text-gold-700 font-semibold flex items-center gap-2"
                >
                  Visit {siteConfig.domain} <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Midnight Luxury Booking Card */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-8 rounded-3xl shadow-2xl border border-gold-500/20">
              <HomeBookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* 15. Bottom CTA Section */}
      <CTASection />
    </>
  );
}
