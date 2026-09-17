import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import {
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Clock,
  Star,
  MessageCircle,
  Building2,
  ArrowRight,
  CheckCircle2,
  Hotel,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import TestimonialsSection from '@/components/TestimonialsSection';
import LocationBookingForm from '@/components/LocationBookingForm';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';
import { getLocation, locations } from '@/data/locations';
import { categories } from '@/data/categories';
import {
  isLocationIndexable,
  isLocationRedirect,
  getRedirectDestination,
} from '@/data/locationManifest';

interface LocationPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return locations
    .filter((loc) => !isLocationRedirect(loc.slug))
    .map((loc) => ({
      slug: loc.slug,
    }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) {
    notFound();
  }

  if (isLocationRedirect(slug)) {
    return {
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const isIndexable = isLocationIndexable(slug);

  const title =
    location.slug === 'gurgaon'
      ? 'Gurgaon Escorts Directory & Sector Guide | 108 Verified Locations | ALINA VIP'
      : location.region === 'Gurgaon'
      ? `Escort Service in ${location.name}, Gurgaon (Gurugram) | ALINA VIP`
      : location.metaTitle;
  const description =
    location.slug === 'gurgaon'
      ? 'Comprehensive directory of verified call girls and escort service in Gurgaon across all 108 sectors, DLF, and Golf Course Road with 20-30 min 5-star hotel dispatch.'
      : location.region === 'Gurgaon'
      ? `Discreet 24/7 escort service in ${location.name}, Gurgaon (Gurugram). Verified VIP call girls, Russian models, and 20-30 min 5-star hotel outcalls with ALINA VIP.`
      : location.metaDescription;
  const canonicalUrl = `${siteConfig.url}/locations/${location.slug}`;

  return {
    title,
    description,
    keywords: [
      `${location.name.toLowerCase()} escort service`,
      `${location.name.toLowerCase()} escorts`,
      `escort service in ${location.name.toLowerCase()}`,
      `call girls in ${location.name.toLowerCase()}`,
      `call girls ${location.name.toLowerCase()}`,
      `${location.name.toLowerCase()} call girl service`,
      `vip escorts ${location.name.toLowerCase()}`,
      `russian escorts ${location.name.toLowerCase()}`,
      ...(siteConfig.keywords || []).slice(0, 10),
    ],
    robots: {
      index: isIndexable,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(`/locations/${location.slug}`),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  if (isLocationRedirect(slug)) {
    const target = getRedirectDestination(slug);
    if (target) {
      redirect(target);
    }
    notFound();
  }

  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  // Resolve genuine nearby areas from factual location data
  const nearbyLocationLinks = location.nearbyAreas
    .map((area) => {
      const match = locations.find(
        (l) =>
          l.name.toLowerCase() === area.toLowerCase() ||
          l.area.toLowerCase() === area.toLowerCase() ||
          l.slug.toLowerCase() === area.toLowerCase().replace(/\s+/g, '-')
      );
      return match || null;
    })
    .filter(Boolean);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: location.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbItems: { name: string; path?: string }[] = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: '/locations' },
  ];
  if (!location.isHub) {
    if (location.region === 'Gurgaon') {
      breadcrumbItems.push({ name: 'Gurgaon', path: '/locations/gurgaon' });
    } else if (location.region === 'Delhi') {
      breadcrumbItems.push({ name: 'Delhi', path: '/locations/delhi' });
    } else if (location.region === 'Noida') {
      breadcrumbItems.push({ name: 'Noida', path: '/locations/noida' });
    }
  }
  breadcrumbItems.push({ name: location.name });

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path ? `${siteConfig.url}${item.path}` : `${siteConfig.url}/locations/${location.slug}`,
    })),
  };

  return (
    <>
      {/* Server-Rendered JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': [breadcrumbSchema, faqSchema] }) }}
      />

      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative bg-[#671725] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-luxury-gold shadow-md">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-6 py-2 border border-luxury-gold/50 rounded-full text-luxury-gold text-sm font-semibold tracking-wider uppercase mb-6 bg-black/30 backdrop-blur-sm">
            ★ {location.city} • {location.region}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans font-bold tracking-wide">
            {location.slug === 'gurgaon' ? (
              <>Gurgaon Escort Directory &amp; <span className="text-luxury-gold">Local Areas</span></>
            ) : (
              <>
                Escort Service in <span className="text-luxury-gold">{location.name}</span>
                {location.region === 'Gurgaon' ? ', Gurgaon' : `, ${location.region}`}
              </>
            )}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            {location.shortDescription} ALINA VIP provides verified, discreet, and premium escort services across {location.name} and surrounding regional corridors.
          </p>
          <div className="w-16 h-1 bg-luxury-gold mx-auto mt-4 mb-6 rounded-full" />

          {/* Quick Trust Bar */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold uppercase tracking-wider text-gray-200">
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-luxury-gold">
              <ShieldCheck size={16} /> 100% Verified Profiles
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-luxury-gold">
              <Clock size={16} /> 20-30 Min Outcall Dispatch
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-luxury-gold">
              <Hotel size={16} /> 5-Star Hotel Outcalls
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 font-bold text-sm"
            >
              <Phone className="w-5 h-5" /> Call Concierge: {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-sm font-bold rounded-xl"
            >
              Explore Profiles <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content (2-Column Editorial with Sticky Sidebar) */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Comprehensive Local Guide */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-5 font-sans font-bold">
                  Premium Luxury Escort Service in {location.name}
                </h2>
                <div className="w-16 h-1 bg-primary-wine mt-2 mb-4 rounded-full" />

                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  {location.about?.intro ? (
                    <>
                      <p>{location.about.intro}</p>
                      <p>{location.about.historyVibe}</p>
                      <p>{location.about.commercialProfile}</p>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>ALINA VIP</strong> provides premier luxury escort services in {location.name}, one of the most distinguished areas in {location.city}. Known for its upscale lifestyle and vibrant commercial landscape, {location.name} attracts discerning gentlemen who demand discretion, elegance, and authentic hospitality.
                      </p>
                      <p>
                        Whether staying at premier five-star luxury suites or hosting private dinners, our verified <Link href="/category/vip-call-girls" className="text-primary-wine hover:underline font-medium">VIP call girls</Link> and <Link href="/services" className="text-primary-wine hover:underline font-medium">escort girls</Link> provide charismatic social presence tailored to your highest expectations.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Key Landmarks */}
              {location.about?.landmarks && location.about.landmarks.length > 0 && (
                <div className="p-8 bg-[#FFFDF6] rounded-2xl border border-gray-200/60 shadow-sm">
                  <h3 className="text-2xl font-bold text-[#111827] mb-4 font-sans font-bold flex items-center gap-2">
                    <MapPin className="text-primary-wine w-6 h-6" />
                    Key Landmarks &amp; Hotspots in {location.name}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    {location.about.landmarks.map((landmark, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100">
                        <CheckCircle2 size={16} className="text-primary-wine flex-shrink-0" />
                        <span className="font-semibold">{landmark}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose Us in this location */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6 font-sans font-bold">
                  Why Choose ALINA VIP in {location.name}?
                </h3>
                {location.whyChoose?.overview ? (
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg leading-relaxed">{location.whyChoose.overview}</p>
                    <div className="grid sm:grid-cols-2 gap-4 mt-6">
                      {location.whyChoose.reasons.map((r, idx) => (
                        <div key={idx} className="p-6 bg-[#FFFDF6] rounded-2xl border border-gray-200/50">
                          <h4 className="text-base font-bold text-[#111827] mb-2">{r.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      {
                        title: '100% Verified Profiles',
                        desc: 'Real untouched photos and in-person verification for all call girls in Gurgaon.',
                        icon: ShieldCheck,
                      },
                      {
                        title: 'Rapid 20-30m Arrival',
                        desc: `Quick discreet outcall to all luxury hotels and residences in ${location.name}.`,
                        icon: Clock,
                      },
                      {
                        title: 'Absolute Privacy',
                        desc: 'Complete confidentiality and client protection for all booking records.',
                        icon: Star,
                      },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="p-6 bg-[#FFFDF6] rounded-2xl border border-gray-200/50">
                          <Icon className="w-8 h-8 text-primary-wine mb-3" />
                          <h4 className="text-base font-bold text-[#111827] mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Service Options */}
              {location.serviceOptions?.overview && (
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4 font-sans font-bold">
                    Service Options in {location.name}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">{location.serviceOptions.overview}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {location.serviceOptions.options.map((opt, idx) => (
                      <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-primary-wine/40 transition-all shadow-sm">
                        <h4 className="text-lg font-bold text-[#111827] mb-2 font-sans font-bold">{opt.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Local Area Connectivity & Hospitality */}
              {location.localCharacteristics?.connectivity && (
                <div className="p-8 bg-[#FFFDF6] rounded-2xl border border-gray-200/60 shadow-sm">
                  <h3 className="text-2xl font-bold text-[#111827] mb-3 font-sans font-bold flex items-center gap-2">
                    <Navigation className="text-primary-wine w-6 h-6" />
                    Connectivity &amp; Five-Star Hotels Served
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">{location.localCharacteristics.connectivity}</p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {location.localCharacteristics.hotels && location.localCharacteristics.hotels.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-primary-wine font-bold mb-3 flex items-center gap-1.5">
                          <Hotel size={16} /> Partner Hotels &amp; Outcall Venues
                        </h4>
                        <ul className="space-y-2">
                          {location.localCharacteristics.hotels.map((h, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-primary-wine rounded-full" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {location.localCharacteristics.metroStations && location.localCharacteristics.metroStations.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-primary-wine font-bold mb-3 flex items-center gap-1.5">
                          <Building2 size={16} /> Transit &amp; Metro Connectivity
                        </h4>
                        <ul className="space-y-2">
                          {location.localCharacteristics.metroStations.map((m, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-primary-wine rounded-full" />
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Hotel Outcall Protocol & Booking Safety */}
              <div className="p-8 bg-[#FFFDF6] rounded-2xl border border-gray-200/60 shadow-sm space-y-4">
                <h3 className="text-2xl font-bold text-[#111827] font-sans font-bold flex items-center gap-2">
                  <ShieldCheck className="text-primary-wine w-6 h-6" />
                  Private Outcall Protocol &amp; Hotel Etiquette in {location.name}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Booking an outcall escort service in {location.name} with <strong>ALINA VIP</strong> is organized to provide maximum convenience, privacy, and peace of mind. Whether you are staying at an executive business hotel, a five-star luxury suite, or a private serviced residence, our escorts arrive punctually and conduct themselves with refined social poise.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-[#111827] text-xs uppercase tracking-wider mb-1 text-primary-wine">
                      Discreet Arrival
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Escorts arrive via private, unmarked executive chauffeur directly at your chosen venue in {location.name}, ensuring your meeting remains strictly confidential from reception to suite.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-[#111827] text-xs uppercase tracking-wider mb-1 text-primary-wine">
                      Zero Advance Fees
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      To protect you from fraud and deceptive advance-fee schemes, ALINA VIP supports Cash on Delivery. You meet and verify your call girl in person before settling the booking fee.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 pt-2 border-t border-gray-200/40">
                  Need assistance with reservations in {location.name}? Contact our 24/7 concierge desk at{' '}
                  <a href={`tel:${siteConfig.phone}`} className="text-primary-wine font-bold hover:underline">
                    {siteConfig.phoneDisplay}
                  </a>{' '}
                  or chat directly on WhatsApp.
                </p>
              </div>

              {/* Master Hub Links if Applicable */}
              {location.isHub && location.hubDetails && (
                <div className="space-y-6 pt-4 border-t border-gray-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#111827] font-sans font-bold">
                    {location.name} Regional Master Directory
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{location.hubDetails.overview}</p>
                  {location.hubDetails.corridors.map((corridor, idx) => (
                    <div key={idx} className="mb-6 p-6 bg-[#FFFDF6] rounded-2xl border border-gray-200/50">
                      <h4 className="text-lg font-bold text-[#111827] mb-2">{corridor.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{corridor.desc}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                        {corridor.slugs.map((subSlug) => {
                          const subLoc = locations.find((l) => l.slug === subSlug);
                          return (
                            <Link
                              key={subSlug}
                              href={`/locations/${subSlug}`}
                              className="flex items-center gap-2 p-2.5 bg-white border border-gray-200 hover:border-primary-wine rounded-lg text-xs text-gray-700 hover:text-primary-wine transition-colors font-medium"
                            >
                              <Navigation size={12} className="text-primary-wine flex-shrink-0" />
                              <span className="truncate">{subLoc ? subLoc.name : subSlug.replace(/-/g, ' ')}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Sticky Concierge Showcase */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Hotel Outcall Dispatch Card */}
              <div className="p-6 bg-white text-[#2d2d2d] rounded-2xl shadow-lg border border-gray-200 text-center">
                <div className="w-12 h-12 rounded-full bg-primary-wine/10 flex items-center justify-center mx-auto mb-4 border border-primary-wine/30">
                  <Hotel className="w-6 h-6 text-luxury-gold" />
                </div>
                <span className="text-xs uppercase tracking-ultra text-luxury-gold font-bold block mb-1">
                  Private Outcall Desk
                </span>
                <h3 className="font-sans font-bold text-2xl text-white font-medium mb-2">
                  {location.name} Dispatch
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed mb-6">
                  Discreet arrival within 20 to 30 minutes to all major 5-star hotels and luxury residences in {location.name}.
                </p>

                <div className="space-y-3">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs"
                  >
                    <Phone size={16} /> Call Now: {siteConfig.phoneDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ALINA%20VIP,%20I%20would%20like%20to%20book%20an%20escort%20in%20${encodeURIComponent(location.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs"
                  >
                    <MessageCircle size={16} /> WhatsApp Booking
                  </a>
                </div>
              </div>

              {/* Rating Card */}
              <div className="bg-[#FFFDF6] p-6 rounded-2xl border border-gray-200/80 text-center shadow-sm">
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>
                <p className="font-bold text-[#111827] text-lg font-sans font-bold">Top Rated in {location.name}</p>
                <p className="text-gray-600 text-xs mt-1">
                  100% verified call girls and escorts with complete privacy.
                </p>
              </div>

              {/* Quick Categories Navigation */}
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-sans font-bold text-lg font-bold text-[#111827]">
                    Service Categories
                  </h4>
                  <Link href="/services" className="text-xs text-primary-wine hover:underline font-semibold">
                    All Services &rarr;
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="p-2 rounded-lg hover:bg-[#F9E1E5] text-xs font-semibold text-gray-700 hover:text-primary-wine transition-colors truncate"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contextual Hospitality Guide Link */}
              {['cyber-city', 'aerocity', 'golf-course-road', 'gurgaon', 'dlf-phase-1', 'mg-road'].includes(location.slug) && (
                <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <p className="text-[11px] uppercase font-bold tracking-wider text-primary-wine mb-1">Local Area Guide</p>
                  <Link
                    href="/blog/luxury-hotels-gurgaon-guide"
                    className="font-sans font-bold text-sm font-bold text-[#111827] hover:text-primary-wine transition-colors block"
                  >
                    Top Luxury Hotels in Gurgaon for Discreet Stays &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Areas Section */}
      <section className="py-16 md:py-20 bg-[#FFFDF6] text-gray-800 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-subtitle text-primary-wine">Nearby Corridors</p>
            <h2 className="section-title mb-4 text-[#111827]">
              Locations Near <span className="text-luxury-gold">{location.name}</span>
            </h2>
            <div className="w-16 h-1 bg-primary-wine mx-auto mt-2 mb-4 rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {nearbyLocationLinks.map(
              (loc) =>
                loc && (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="flex items-center gap-2.5 p-4 bg-white border border-gray-200 hover:border-primary-wine hover:shadow-md transition-all rounded-xl group"
                  >
                    <Navigation size={15} className="text-primary-wine flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-xs text-gray-700 group-hover:text-primary-wine font-semibold transition-colors">
                      {loc.name}
                    </span>
                  </Link>
                )
            )}
          </div>
        </div>
      </section>

      {/* Local FAQ Section */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="section-subtitle text-primary-wine">Local Area FAQ</p>
            <h2 className="section-title mb-4 text-[#111827]">
              Frequently Asked Questions – <span className="text-luxury-gold">{location.name}</span>
            </h2>
            <div className="w-16 h-1 bg-primary-wine mx-auto mt-2 mb-4 rounded-full" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {location.faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-[#FFFDF6] rounded-2xl border border-gray-200/50 hover:border-primary-wine transition-all group overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-[#111827] text-base pr-4">
                    {faq.question}
                  </span>
                  <span className="text-primary-wine text-2xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-200/40 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 md:py-24 bg-[#FFFDF6]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-subtitle text-primary-wine">Direct Reservation</p>
            <h2 className="section-title mb-4 text-[#111827]">
              Book Escort Service in <span className="text-luxury-gold">{location.name}</span>
            </h2>
            <div className="w-16 h-1 bg-primary-wine mx-auto mt-2 mb-4 rounded-full" />
          </div>
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border-2 border-primary-wine text-left">
            <LocationBookingForm locationName={location.name} locationCity={location.city} />
          </div>
        </div>
      </section>

      <TestimonialsSection theme="light" />
      <CTASection />
    </>
  );
}
