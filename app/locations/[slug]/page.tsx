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
import { siteConfig } from '@/data/siteConfig';
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
      ? 'Gurgaon Escort Service Directory & Local Areas | ALINA VIP'
      : location.region === 'Gurgaon'
      ? `Escort Service in ${location.name}, Gurgaon | VIP Call Girls | ALINA VIP`
      : location.metaTitle;
  const description =
    location.slug === 'gurgaon'
      ? 'Gurgaon central outcall directory and VIP escort service. Verified call girls, luxury hotel outcalls, 20-30 min arrival across Cyber City, DLF & Golf Course Rd.'
      : location.metaDescription;
  const canonicalUrl = `${siteConfig.url}/locations/${location.slug}`;

  return {
    title,
    description,
    robots: {
      index: isIndexable,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
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

  return (
    <>
      {/* Server-Rendered JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#2d1b0e] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="container-luxury relative z-10 text-center">
          <span className="inline-block px-6 py-2 border border-gold-500/30 rounded-full text-gold-400 text-sm font-semibold tracking-wider uppercase mb-6 bg-gold-500/10 backdrop-blur-sm">
            ★ {location.city} • {location.region}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-wide">
            {location.slug === 'gurgaon' ? (
              <>Gurgaon Escort Directory &amp; <span className="text-gradient-gold">Local Areas</span></>
            ) : (
              <>
                Escort Service in <span className="text-gradient-gold">{location.name}</span>
                {location.region === 'Gurgaon' ? ', Gurgaon' : `, ${location.region}`}
              </>
            )}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            {location.shortDescription} ALINA VIP provides verified, discreet, and premium escort services across {location.name} and surrounding regional corridors.
          </p>
          <div className="gold-divider mx-auto mt-8 mb-8" />

          {/* Quick Trust Bar */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold uppercase tracking-wider text-charcoal-300">
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold-400">
              <ShieldCheck size={16} /> 100% Verified Profiles
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold-400">
              <Clock size={16} /> 20-30 Min Outcall Dispatch
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gold-400">
              <Hotel size={16} /> 5-Star Hotel Outcalls
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-neutral-900 px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5" /> Call Concierge: {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border-2 border-gold-500/50 hover:bg-gold-500/10 text-gold-400 px-8 py-4 rounded-full font-bold text-base transition-all"
            >
              Explore Profiles <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content (2-Column Editorial with Sticky Sidebar) */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Comprehensive Local Guide */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-5 font-serif">
                  Premium Luxury Escort Service in {location.name}
                </h2>
                <div className="gold-divider mb-6" />

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
                        Whether staying at premier five-star luxury suites or hosting private dinners, our verified escorts provide charismatic social accompaniment tailored to your highest expectations.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Key Landmarks */}
              {location.about?.landmarks && location.about.landmarks.length > 0 && (
                <div className="p-8 bg-[#faf6f2] rounded-2xl border border-gold-200/60 shadow-sm">
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4 font-serif flex items-center gap-2">
                    <MapPin className="text-gold-600 w-6 h-6" />
                    Key Landmarks &amp; Hotspots in {location.name}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 mt-4">
                    {location.about.landmarks.map((landmark, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700 bg-white p-3 rounded-xl border border-gray-100">
                        <CheckCircle2 size={16} className="text-gold-600 flex-shrink-0" />
                        <span className="font-semibold">{landmark}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose Us in this location */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-6 font-serif">
                  Why Choose ALINA VIP in {location.name}?
                </h3>
                {location.whyChoose?.overview ? (
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg leading-relaxed">{location.whyChoose.overview}</p>
                    <div className="grid sm:grid-cols-2 gap-4 mt-6">
                      {location.whyChoose.reasons.map((r, idx) => (
                        <div key={idx} className="p-6 bg-[#faf6f2] rounded-2xl border border-gold-200/50">
                          <h4 className="text-base font-bold text-[#1a1a2e] mb-2">{r.title}</h4>
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
                        <div key={idx} className="p-6 bg-[#faf6f2] rounded-2xl border border-gold-200/50">
                          <Icon className="w-8 h-8 text-gold-600 mb-3" />
                          <h4 className="text-base font-bold text-[#1a1a2e] mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Service Options */}
              {location.companionshipOptions?.overview && (
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-4 font-serif">
                    Service Options in {location.name}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">{location.companionshipOptions.overview}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {location.companionshipOptions.options.map((opt, idx) => (
                      <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-gold-300 transition-all shadow-sm">
                        <h4 className="text-lg font-bold text-[#1a1a2e] mb-2 font-serif">{opt.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Local Area Connectivity & Hospitality */}
              {location.localCharacteristics?.connectivity && (
                <div className="p-8 bg-[#faf6f2] rounded-2xl border border-gold-200/60 shadow-sm">
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3 font-serif flex items-center gap-2">
                    <Navigation className="text-gold-600 w-6 h-6" />
                    Connectivity &amp; Five-Star Hotels Served
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6">{location.localCharacteristics.connectivity}</p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {location.localCharacteristics.hotels && location.localCharacteristics.hotels.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-gold-700 font-bold mb-3 flex items-center gap-1.5">
                          <Hotel size={16} /> Partner Hotels &amp; Outcall Venues
                        </h4>
                        <ul className="space-y-2">
                          {location.localCharacteristics.hotels.map((h, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-gold-600 rounded-full" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {location.localCharacteristics.metroStations && location.localCharacteristics.metroStations.length > 0 && (
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-gold-700 font-bold mb-3 flex items-center gap-1.5">
                          <Building2 size={16} /> Transit &amp; Metro Connectivity
                        </h4>
                        <ul className="space-y-2">
                          {location.localCharacteristics.metroStations.map((m, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-gold-600 rounded-full" />
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
              <div className="p-8 bg-[#faf6f2] rounded-2xl border border-gold-200/60 shadow-sm space-y-4">
                <h3 className="text-2xl font-bold text-[#1a1a2e] font-serif flex items-center gap-2">
                  <ShieldCheck className="text-gold-600 w-6 h-6" />
                  Private Outcall Protocol &amp; Hotel Etiquette in {location.name}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Booking an outcall escort service in {location.name} with <strong>ALINA VIP</strong> is organized to provide maximum convenience, privacy, and peace of mind. Whether you are staying at an executive business hotel, a five-star luxury suite, or a private serviced residence, our escorts arrive punctually and conduct themselves with refined social poise.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-[#1a1a2e] text-xs uppercase tracking-wider mb-1 text-gold-700">
                      Discreet Arrival
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Escorts arrive via private, unmarked executive chauffeur directly at your chosen venue in {location.name}, ensuring your meeting remains strictly confidential from reception to suite.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-[#1a1a2e] text-xs uppercase tracking-wider mb-1 text-gold-700">
                      Zero Advance Fees
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      To protect you from fraud and deceptive advance-fee schemes, ALINA VIP supports Cash on Delivery. You meet and verify your companion in person before settling the booking fee.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 pt-2 border-t border-gold-200/40">
                  Need assistance with reservations in {location.name}? Contact our 24/7 concierge desk at{' '}
                  <a href={`tel:${siteConfig.phone}`} className="text-gold-600 font-bold hover:underline">
                    {siteConfig.phoneDisplay}
                  </a>{' '}
                  or chat directly on WhatsApp.
                </p>
              </div>

              {/* Master Hub Links if Applicable */}
              {location.isHub && location.hubDetails && (
                <div className="space-y-6 pt-4 border-t border-gray-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] font-serif">
                    {location.name} Regional Master Directory
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{location.hubDetails.overview}</p>
                  {location.hubDetails.corridors.map((corridor, idx) => (
                    <div key={idx} className="mb-6 p-6 bg-[#faf6f2] rounded-2xl border border-gold-200/50">
                      <h4 className="text-lg font-bold text-[#1a1a2e] mb-2">{corridor.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{corridor.desc}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                        {corridor.slugs.map((subSlug) => {
                          const subLoc = locations.find((l) => l.slug === subSlug);
                          return (
                            <Link
                              key={subSlug}
                              href={`/locations/${subSlug}`}
                              className="flex items-center gap-2 p-2.5 bg-white border border-gray-200 hover:border-gold-500 rounded-lg text-xs text-gray-700 hover:text-gold-600 transition-colors font-medium"
                            >
                              <Navigation size={12} className="text-gold-600 flex-shrink-0" />
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
              <div className="p-6 bg-gradient-to-br from-[#1a1a2e] to-[#2d1b0e] text-white rounded-3xl shadow-2xl border border-gold-500/20 text-center">
                <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto mb-4 border border-gold-500/40">
                  <Hotel className="w-6 h-6 text-gold-400" />
                </div>
                <span className="text-xs uppercase tracking-ultra text-gold-400 font-bold block mb-1">
                  Private Outcall Desk
                </span>
                <h3 className="font-serif text-2xl text-white font-medium mb-2">
                  {location.name} Dispatch
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed mb-6">
                  Discreet arrival within 20 to 30 minutes to all major 5-star hotels and luxury residences in {location.name}.
                </p>

                <div className="space-y-3">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-950 font-bold rounded-xl text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    <Phone size={16} /> Call Now: {siteConfig.phoneDisplay}
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ALINA%20VIP,%20I%20would%20like%20to%20book%20an%20escort%20in%20${encodeURIComponent(location.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl text-sm shadow-lg hover:shadow-xl transition-all"
                  >
                    <MessageCircle size={16} /> WhatsApp Booking
                  </a>
                </div>
              </div>

              {/* Rating Card */}
              <div className="bg-[#faf6f2] p-6 rounded-2xl border border-gold-200/80 text-center shadow-sm">
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="font-bold text-[#1a1a2e] text-lg font-serif">Top Rated in {location.name}</p>
                <p className="text-gray-600 text-xs mt-1">
                  100% verified call girls and escorts with complete privacy.
                </p>
              </div>

              {/* Quick Categories Navigation */}
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif text-lg font-bold text-[#1a1a2e]">
                    Service Categories
                  </h4>
                  <Link href="/services" className="text-xs text-gold-600 hover:underline font-semibold">
                    All Services &rarr;
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="p-2 rounded-lg hover:bg-gold-50 text-xs font-semibold text-gray-700 hover:text-gold-700 transition-colors truncate"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contextual Hospitality Guide Link */}
              {['cyber-city', 'aerocity', 'golf-course-road', 'gurgaon', 'dlf-phase-1', 'mg-road'].includes(location.slug) && (
                <div className="p-5 bg-white rounded-2xl border border-gold-200 shadow-sm">
                  <p className="text-[11px] uppercase font-bold tracking-wider text-gold-600 mb-1">Local Area Guide</p>
                  <Link
                    href="/blog/luxury-hotels-gurgaon-guide"
                    className="font-serif text-sm font-bold text-[#1a1a2e] hover:text-gold-600 transition-colors block"
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
      <section className="py-16 md:py-20 bg-[#faf6f2] text-gray-800 border-t border-gray-200">
        <div className="container-luxury">
          <div className="text-center mb-10">
            <p className="section-subtitle text-gold-600">Nearby Corridors</p>
            <h2 className="section-title mb-4 text-[#1a1a2e]">
              Locations Near <span className="text-gradient-gold">{location.name}</span>
            </h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {nearbyLocationLinks.map(
              (loc) =>
                loc && (
                  <Link
                    key={loc.slug}
                    href={`/locations/${loc.slug}`}
                    className="flex items-center gap-2.5 p-4 bg-white border border-gray-200 hover:border-gold-500 hover:shadow-md transition-all rounded-xl group"
                  >
                    <Navigation size={15} className="text-gold-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-xs text-gray-700 group-hover:text-gold-600 font-semibold transition-colors">
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
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Local Area FAQ</p>
            <h2 className="section-title mb-4 text-[#1a1a2e]">
              Frequently Asked Questions – <span className="text-gradient-gold">{location.name}</span>
            </h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {location.faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-[#faf6f2] rounded-2xl border border-gold-200/50 hover:border-gold-400 transition-all group overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-[#1a1a2e] text-base pr-4">
                    {faq.question}
                  </span>
                  <span className="text-gold-600 text-2xl font-light group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gold-200/40 pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 md:py-24 bg-[#faf6f2]">
        <div className="container-luxury max-w-2xl">
          <div className="text-center mb-10">
            <p className="section-subtitle text-gold-600">Direct Reservation</p>
            <h2 className="section-title mb-4 text-[#1a1a2e]">
              Book Escort Service in <span className="text-gradient-gold">{location.name}</span>
            </h2>
            <div className="gold-divider mx-auto" />
          </div>
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b0e] p-8 md:p-10 rounded-3xl shadow-2xl border border-gold-500/20">
            <LocationBookingForm locationName={location.name} locationCity={location.city} />
          </div>
        </div>
      </section>

      <TestimonialsSection theme="light" />
      <CTASection />
    </>
  );
}
