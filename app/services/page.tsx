import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Phone,
  UtensilsCrossed,
  Calendar,
  Plane,
  Sparkles,
  Briefcase,
  Lock,
  Crown,
  Star,
  Heart,
  ShieldCheck,
  Clock,
  MapPin,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { siteConfig } from '@/data/siteConfig';
import { services } from '@/data/content';
import { categories } from '@/data/categories';

export const metadata: Metadata = {
  title: 'Our Escort Services in Gurgaon | Service Categories | ALINA VIP',
  description:
    'Explore our full range of luxury escort services in Gurgaon. Russian call girls, VIP escorts, models, college girls & celebrity escorts. Available 24/7.',
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: 'Our Escort Services in Gurgaon | Service Categories | ALINA VIP',
    description:
      'Explore our full range of luxury escort services in Gurgaon. Russian call girls, VIP escorts, models, college girls & celebrity escorts. Available 24/7.',
    url: `${siteConfig.url}/services`,
    type: 'website',
  },
};

const serviceIcons: Record<string, React.ElementType> = {
  'dinner-escort-service': UtensilsCrossed,
  'event-escort-service': Calendar,
  'travel-escort-service': Plane,
  'party-escort-service': Sparkles,
  'business-escort-service': Briefcase,
  'private-escort-service': Lock,
};

const categoryImageMap: Record<string, string> = {
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

export default function ServicesPage() {
  return (
    <>
      {/* SEO metadata handled server-side */}

      <Breadcrumb items={[{ name: 'Home', path: '/' }, { name: 'Our Services' }]} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#2d1b0e] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="container-luxury relative z-10 text-center">
          <span className="inline-block px-6 py-2 border border-gold-500/30 rounded-full text-gold-400 text-sm font-semibold tracking-wider uppercase mb-6 bg-gold-500/10 backdrop-blur-sm">
            ★ Our Services
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-wide">
            Explore Profiles &amp; <span className="text-gradient-gold">Escort Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-gold-400 font-semibold">ALINA VIP</strong> offers tailored escort arrangements across Gurgaon and Delhi NCR. Browse verified profiles across specialized categories including{' '}
            <Link href="/category/russian-call-girls" className="text-gold-400 hover:underline font-medium">
              Russian escorts
            </Link>
            ,{' '}
            <Link href="/category/model-escorts" className="text-gold-400 hover:underline font-medium">
              model escorts
            </Link>
            , and{' '}
            <Link href="/category/vip-call-girls" className="text-gold-400 hover:underline font-medium">
              VIP escorts
            </Link>
            . Each rendezvous is delivered with uncompromising discretion and professional hospitality.
          </p>
          <div className="gold-divider mx-auto mt-8" />

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-neutral-900 px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" /> Book Now
            </a>
            <Link href="/contact"
              className="inline-flex items-center gap-2 border-2 border-gold-500 hover:bg-gold-500/10 text-gold-400 px-8 py-4 rounded-full font-bold text-base transition-all"
            >
              Contact Us
            </Link>
            <a
              href={siteConfig.url}
              className="inline-flex items-center gap-2 border-2 border-gold-500/40 hover:bg-gold-500/10 text-gold-300 px-8 py-4 rounded-full font-bold text-base transition-all"
            >
              Visit {siteConfig.domain}
            </a>
          </div>
        </div>
      </section>

      {/* Section 1: Escort Services Grid */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Our Escort Services</p>
            <h2 className="section-title mb-4 text-[#1a1a2e]">
              Premium <span className="text-gradient-gold">Call Girls</span> Services
            </h2>
            <div className="gold-divider mx-auto" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed text-base">
              <strong className="text-[#1a1a2e]">ALINA VIP</strong> offers a comprehensive range of premium{' '}
              <Link href="/services" className="text-gold-600 hover:underline font-medium">
                escort service in Gurgaon
              </Link>{' '}
              designed to meet the diverse needs of our discerning clientele. Each service is delivered with the highest standards of quality, discretion, and professionalism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services.map((service) => {
              const IconComponent = serviceIcons[service.slug] || Sparkles;
              return (
                <div
                  key={service.slug}
                  className="bg-[#faf6f2] p-8 rounded-2xl border border-gold-200/50 hover:border-gold-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-5 text-gold-600 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#1a1a2e] mb-3 group-hover:text-gold-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <Link href="/contact"
                    className="text-xs text-gold-600 font-semibold tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-all pt-2 border-t border-gold-200/40"
                  >
                    Book Call Girls <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Section 2: Call Girls Categories */}
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Call Girls Categories</p>
            <h2 className="section-title mb-4 text-[#1a1a2e]">
              Explore Our <span className="text-gradient-gold">Escort Categories</span>
            </h2>
            <div className="gold-divider mx-auto" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-4 leading-relaxed text-base">              Browse our verified{' '}
              <Link href="/services" className="text-gold-600 hover:underline font-medium">
                call girls
              </Link>{' '}
              and{' '}
              <Link href="/services" className="text-gold-600 hover:underline font-medium">
                escorts
              </Link>{' '}
              categories. Find the perfect profile for your{' '}
              <Link href="/services" className="text-gold-600 hover:underline font-medium">
                escort service
              </Link>{' '}
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const imageSrc = categoryImageMap[cat.slug] || '/images/categories/default.webp';
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gold-200/60 hover:border-gold-400 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                    <Image
                      src={imageSrc}
                      alt={`${cat.name} - Escort Service Gurgaon`}
                      fill
                      sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 390px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-gold-400 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-gold-500/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                      <span>Verified</span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors drop-shadow-sm">
                        {cat.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between bg-[#faf6f2]">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {cat.description}
                    </p>
                    <span className="text-xs text-gold-700 font-bold tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-all pt-3 border-t border-gold-200/60">
                      View Call Girls Profiles <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Supporting Guides */}
      <section className="py-16 bg-[#faf6f2]">
        <div className="container-luxury">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] font-serif">
              Featured <span className="text-gold-600">Client Guides</span>
            </h3>
            <p className="text-gray-600 text-sm mt-2 max-w-xl mx-auto">
              Read our comprehensive editorial guides on executive etiquette, luxury hotels, and booking protocols.
            </p>
            <div className="gold-divider mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Russian Escorts Gurgaon Guide',
                desc: 'Comprehensive advice on European escort bookings, discretion standards, and outcall expectations.',
                href: '/blog/russian-escorts-gurgaon-guide',
                icon: Crown,
              },
              {
                title: 'VIP Call Girls & Executive Etiquette',
                desc: 'Guidelines for corporate galas, private dinners, and maintaining complete discretion.',
                href: '/blog/vip-call-girls-gurgaon',
                icon: Star,
              },
              {
                title: 'How to Choose the Best Escort Service',
                desc: 'Key verification checks, safety protocols, and avoiding online listing scams in Gurgaon.',
                href: '/blog/best-escort-service-gurgaon-guide',
                icon: ShieldCheck,
              },
              {
                title: 'Gurgaon Luxury Hotel Guide',
                desc: 'Top five-star hotels on Golf Course Road, Cyber City, and Aerocity for discreet rendezvous.',
                href: '/blog/luxury-hotels-gurgaon-guide',
                icon: Sparkles,
              },
              {
                title: 'Gurgaon Nightlife & Dining Spots',
                desc: 'Curated lounges, fine-dining restaurants, and upscale social venues for dinner dates.',
                href: '/blog/gurgaon-nightlife-guide',
                icon: UtensilsCrossed,
              },
              {
                title: 'First Rendezvous Etiquette & Tips',
                desc: 'Essential courtesy principles and preparation advice for a seamless private engagement.',
                href: '/blog/first-date-tips-luxury',
                icon: Heart,
              },
            ].map((guide, idx) => {
              const GuideIcon = guide.icon;
              return (
                <Link
                  key={idx}
                  href={guide.href}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-gold-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                      <GuideIcon className="w-6 h-6 text-gold-600" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#1a1a2e] mb-2 group-hover:text-gold-600 transition-colors">
                      {guide.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {guide.desc}
                    </p>
                  </div>
                  <span className="text-xs text-gold-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Guide &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Operational Standards */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-[#faf6f2] rounded-2xl border border-gold-200/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-gold-600" />
              </div>
              <h4 className="font-bold text-[#1a1a2e] text-xl mb-2 font-serif">100% Verified Profiles</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every profile is verified through an in-person authentication process with recent, genuine portfolio photos.
              </p>
            </div>

            <div className="text-center p-8 bg-[#faf6f2] rounded-2xl border border-gold-200/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-7 h-7 text-gold-600" />
              </div>
              <h4 className="font-bold text-[#1a1a2e] text-xl mb-2 font-serif">24/7 Concierge Desk</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our reservation desk operates round the clock to accommodate your schedule, travel timing, and private requests.
              </p>
            </div>

            <div className="text-center p-8 bg-[#faf6f2] rounded-2xl border border-gold-200/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-gold-600" />
              </div>
              <h4 className="font-bold text-[#1a1a2e] text-xl mb-2 font-serif">Comprehensive Coverage</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Rapid 20 to 30 minute outcall dispatch across major Gurgaon business hubs and regional Delhi NCR corridors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Editorial Overview */}
      <section className="py-16 md:py-20 bg-[#faf6f2] text-gray-800">
        <div className="container-luxury max-w-4xl">
          <div className="prose-luxury bg-white p-8 md:p-12 rounded-2xl border border-gold-200/60 shadow-sm">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6 font-serif">
              Bespoke Services Tailored to Your Occasion
            </h2>
            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>
                <strong>ALINA VIP</strong> provides high-caliber escort services for gentlemen who demand discretion, elegance, and genuine conversation. Whether attending executive dinners, social galas, international business functions, or enjoying a private evening at a luxury suite, our agency ensures an experience defined by grace and sophistication.
              </p>
              <p>
                Each engagement is managed directly through our dedicated concierge desk. We respect client confidentiality above all else, ensuring that identity records, communications, and booking details remain private and secure.
              </p>
              <p>
                To reserve an appointment or explore specific requests, speak with our reservation coordinators at{' '}
                <a href={`tel:${siteConfig.phone}`} className="text-gold-600 hover:underline font-bold">
                  {siteConfig.phoneDisplay}
                </a>{' '}
                or submit an inquiry through our{' '}
                <Link href="/contact" className="text-gold-600 hover:underline font-semibold">
                  confidential booking form
                </Link>
                . You can also view our full list of service sectors in the{' '}
                <Link href="/locations" className="text-gold-600 hover:underline font-semibold">
                  locations directory
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials & CTA */}
      <TestimonialsSection theme="light" />
      <CTASection />
    </>
  );
}
