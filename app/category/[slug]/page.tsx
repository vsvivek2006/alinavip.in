import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Phone,
  ArrowRight,
  Crown,
  Camera,
  Heart,
  GraduationCap,
  User,
  Star,
  Plane,
  Sparkles,
  ShieldCheck,
  Lock,
  Clock,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';
import { getCategory, categories } from '@/data/categories';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const categoryImageMap: Record<string, string> = {
  'russian-call-girls': '/images/categories/russian-escorts.webp',
  'russian-escorts': '/images/categories/russian-escorts.webp',
  'vip-call-girls': '/images/categories/vip-escorts.webp',
  'vip-escorts': '/images/categories/vip-escorts.webp',
  'high-profile-girls': '/images/categories/high-profile-girls.webp',
  'model-escorts': '/images/categories/model-escorts.webp',
  'college-girls': '/images/categories/college-girls.webp',
  'housewife-escorts': '/images/categories/housewife-escorts.webp',
  'independent-girls': '/images/categories/independent-escorts.webp',
  'independent-escorts': '/images/categories/independent-escorts.webp',
  'air-hostess': '/images/categories/air-hostess.webp',
  'celebrity-escorts': '/images/categories/celebrity-escorts.webp',
  'travel-escorts': '/images/categories/travel-escorts.webp',
};

const categoryIconMap: Record<string, React.ElementType> = {
  'russian-call-girls': Crown,
  'russian-escorts': Crown,
  'vip-call-girls': Crown,
  'vip-escorts': Crown,
  'high-profile-girls': Star,
  'model-escorts': Camera,
  'college-girls': GraduationCap,
  'housewife-escorts': Heart,
  'independent-girls': User,
  'independent-escorts': User,
  'air-hostess': Plane,
  'celebrity-escorts': Sparkles,
  'travel-escorts': Plane,
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) {
    notFound();
  }

  const title = `${category.h1Title || `${category.name} in Gurgaon`} | VIP Escorts & Call Girls | ALINA VIP`;
  const description = `${category.shortDescription} ALINA VIP India offers verified ${category.name.toLowerCase()} in Gurgaon & Delhi NCR. 100% confidential 5-star hotel outcalls within 20-30 mins.`;
  const canonicalUrl = `${siteConfig.url}/category/${category.slug}`;
  const imageSrc = categoryImageMap[category.slug] || '/images/categories/default.webp';
  const ogImageUrl = imageSrc.startsWith('http') ? imageSrc : `${siteConfig.url}${imageSrc}`;

  const categoryKeywords = [
    `${category.name.toLowerCase()} escort service`,
    `${category.name.toLowerCase()} in Gurgaon`,
    `${category.name.toLowerCase()} call girls`,
    `hire ${category.name.toLowerCase()} Gurgaon`,
    `top ${category.name.toLowerCase()}`,
    ...(siteConfig.keywords || []).slice(0, 10),
  ];

  return {
    title,
    keywords: categoryKeywords,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(`/category/${category.slug}`),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          alt: category.name,
        },
      ],
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const IconComponent = categoryIconMap[category.slug] || Crown;
  const imageSrc = categoryImageMap[category.slug] || '/images/categories/default.webp';

  const faqs = category.faqs && category.faqs.length > 0 ? category.faqs : [
    {
      question: `How do I book a ${category.name.toLowerCase()} in Gurgaon?`,
      answer: `Booking is simple and 100% confidential. Call our private booking concierge at ${siteConfig.phone} or message us via WhatsApp with your preferred timing, location, and call girl choice. We confirm availability and dispatch within minutes.`,
    },
    {
      question: `Are ${category.name.toLowerCase()} photos 100% genuine?`,
      answer: 'Yes. Every call girl is photographed and verified in person by our management team. We guarantee that the call girl who arrives at your suite matches the profile you selected.',
    },
    {
      question: 'What is the typical outcall arrival time in Gurgaon?',
      answer: 'Call Girls typically arrive within 20 to 30 minutes for central Gurgaon locations like Cyber City, DLF Phases 1–5, and Golf Course Road. For extended corridors like Sohna Road or Manesar, arrival is usually within 35 to 45 minutes.',
    },
    {
      question: 'Is my personal information kept confidential?',
      answer: 'Absolutely. We maintain a zero-trace privacy policy. Client phone numbers, names, and booking details are never saved in permanent databases and are discarded immediately following the booking.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      {/* Server-Rendered JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: category.name },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#050508] via-[#0C0B14] to-[#141022] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="container-luxury relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-6 py-2 border border-gold-500/30 rounded-full text-gold-400 text-sm font-semibold tracking-wider uppercase mb-6 bg-gold-500/10 backdrop-blur-sm">
                ★ Premium Escort Service
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight">
                {category.h1Title ? (
                  category.h1Title
                ) : (
                  <>
                    {category.name} <br />
                    <span className="text-gradient-gold">in Gurgaon</span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {category.subheading || category.shortDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> Book Now
                </a>
                <Link
                  href="/contact"
                  className="border-2 border-gold-500 hover:bg-gold-500/10 text-gold-400 px-8 py-4 rounded-full font-bold text-base transition-all"
                >
                  Contact Us
                </Link>
                <a
                  href={siteConfig.url}
                  className="border-2 border-gold-500/40 hover:bg-gold-500/10 text-gold-300 px-8 py-4 rounded-full font-bold text-base transition-all"
                >
                  Visit {siteConfig.domain}
                </a>
              </div>
            </div>

            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-gold-200/50 bg-neutral-900 group">
              <Image
                src={imageSrc}
                alt={`${category.name} - Escort Service in Gurgaon | Call Girls`}
                title={`${category.name} - Escort Service in Gurgaon | Call Girls`}
                fill
                priority
                sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 48px), 584px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left Column (2 Cols): Editorial & Value Props */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-[#0F172A] mb-4 font-serif">
                  About Our {category.name}
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  {category.longDescription && category.longDescription.length > 0 ? (
                    category.longDescription.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))
                  ) : (
                    <>
                      <p>{category.description}</p>
                      <p>
                        At <strong>ALINA VIP</strong>, we take pride in offering the finest{' '}
                        <Link href="/services" className="text-gold-600 hover:underline font-medium">
                          escort service in Gurgaon
                        </Link>
                        . Each {category.name.toLowerCase()} has been carefully selected through our rigorous verification process, which includes identity verification, photo authentication, and background screening. This ensures that every{' '}
                        <Link href="/services" className="text-gold-600 hover:underline font-medium">
                          call girl
                        </Link>{' '}
                        profile is genuine and that our clients can book with complete confidence.
                      </p>
                      <p>
                        Our{' '}
                        <Link href={`/category/${category.slug}`} className="text-gold-600 hover:underline font-medium">
                          {category.name.toLowerCase()}
                        </Link>{' '}
                        are available for a variety of engagements, including dinner dates, social events, corporate functions, travel, and private engagements. They are discreet, professional, and committed to providing an exceptional{' '}
                        <Link href="/services" className="text-gold-600 hover:underline font-medium">
                          escort service
                        </Link>{' '}
                        experience.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Feature Badges / Key Highlights */}
              <div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-4 font-serif">
                  Why Choose Our {category.name}?
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {category.keyHighlights && category.keyHighlights.length > 0 ? (
                    category.keyHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-[#FDFBF7] rounded-2xl border border-gold-200/50">
                        <ShieldCheck className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-sm">{hl.title}</h4>
                          <p className="text-gray-600 text-xs mt-1">{hl.desc}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start gap-3 p-4 bg-[#FDFBF7] rounded-2xl border border-gold-200/50">
                        <ShieldCheck className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-sm">Verified Call Girls</h4>
                          <p className="text-gray-600 text-xs mt-1">
                            100% genuine <Link href="/services" className="text-gold-600 hover:underline font-medium">call girls</Link> with photo authentication
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-[#FDFBF7] rounded-2xl border border-gold-200/50">
                        <Lock className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-sm">100% Discreet</h4>
                          <p className="text-gray-600 text-xs mt-1">
                            Complete privacy guaranteed for all <Link href="/services" className="text-gold-600 hover:underline font-medium">escorts</Link> bookings
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-[#FDFBF7] rounded-2xl border border-gold-200/50">
                        <Clock className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-sm">24/7 Availability</h4>
                          <p className="text-gray-600 text-xs mt-1">
                            Book <Link href="/services" className="text-gold-600 hover:underline font-medium">call girls</Link> anytime, day or night
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-[#FDFBF7] rounded-2xl border border-gold-200/50">
                        <MapPin className="w-5 h-5 text-gold-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#0F172A] text-sm">All Gurgaon Areas</h4>
                          <p className="text-gray-600 text-xs mt-1">
                            <Link href="/locations/cyber-city" className="text-gold-600 hover:underline font-medium">Cyber City</Link>,{' '}
                            <Link href="/locations/mg-road" className="text-gold-600 hover:underline font-medium">MG Road</Link>,{' '}
                            <Link href="/locations/golf-course-road" className="text-gold-600 hover:underline font-medium">Golf Course Road</Link> &amp; more
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Selection Standards & Verification */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#0F172A] font-serif">
                  Selection Standards &amp; Quality Assurance for {category.name}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  At <strong>ALINA VIP</strong>, our {category.name.toLowerCase()} represent the highest standard of elegance, poise, and VIP escort service. We understand that discerning gentlemen and corporate executives require absolute assurance when making a reservation. That is why every profile in this collection undergoes an in-person vetting process to authenticate credentials, appearance, and social etiquette.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-[#FDFBF7] rounded-xl border border-gold-200/40">
                    <h4 className="font-bold text-[#0F172A] text-sm mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-600" /> Untouched Real Photography
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      We never use misleading stock photos or artificial imagery. Every photo in our gallery accurately portrays the profile’s natural appearance.
                    </p>
                  </div>
                  <div className="p-4 bg-[#FDFBF7] rounded-xl border border-gold-200/40">
                    <h4 className="font-bold text-[#0F172A] text-sm mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-600" /> Conversational Fluency
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Our models possess exceptional communication skills, emotional intelligence, and cosmopolitan charm suited for high-society engagements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Occasion & Etiquette Guide */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#0F172A] font-serif">
                  Ideal Occasions &amp; Etiquette Guidelines
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  Whether you are attending an exclusive business dinner at Cyber Hub, hosting an intimate corporate gala on Golf Course Road, or unwinding in the private sanctuary of a luxury hotel suite, our {category.name.toLowerCase()} seamlessly adapt to your schedule and setting.
                </p>
                <ul className="space-y-2.5 text-sm text-gray-700">
                  {category.occasions && category.occasions.length > 0 ? (
                    category.occasions.map((occ, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-gold-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{occ}</span>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-gold-600 rounded-full mt-2 flex-shrink-0" />
                        <span><strong>Fine Dining &amp; Gala Evenings:</strong> Impeccable formal dressing, graceful social etiquette, and engaging conversation at Gurgaon&apos;s finest Michelin-star and luxury restaurants.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-gold-600 rounded-full mt-2 flex-shrink-0" />
                        <span><strong>Executive Travel &amp; Retreats:</strong> Dependable, well-travelled accompaniment for business conferences, luxury resorts, and weekend getaways across NCR and beyond.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-gold-600 rounded-full mt-2 flex-shrink-0" />
                        <span><strong>Private Hotel Outcalls:</strong> Effortless, confidential escort service tailored for relaxing stays at premier five-star hospitality suites.</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Discreet Outcall & Safety Protocols */}
              <div className="p-6 bg-[#FDFBF7] rounded-2xl border border-gold-200/60 space-y-4">
                <h3 className="text-xl font-bold text-[#0F172A] font-serif">
                  Discreet Outcall Coordination Across Gurgaon
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We specialize in prompt, confidential outcall dispatch to all luxury destinations across Gurgaon, including DLF Phase 1–5, <Link href="/locations/cyber-city" className="text-gold-600 hover:underline font-medium">Cyber City</Link>, <Link href="/locations/golf-course-road" className="text-gold-600 hover:underline font-medium">Golf Course Road</Link>, Sohna Road, MG Road, and <Link href="/locations/aerocity" className="text-gold-600 hover:underline font-medium">Aerocity</Link>. Our verified escort girls arrive punctually via private executive transport, blending seamlessly into high-end hotel lobbies and private residential complexes.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  To ensure complete trust, ALINA VIP adheres to a strict zero-advance policy: you settle the agreed call girl or escort fee directly in person upon arrival. Your personal details, contact number, and booking records are never shared, logged, or retained, guaranteeing complete peace of mind.
                </p>
              </div>

              {/* Category FAQs */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#0F172A] font-serif">
                  Frequently Asked Questions – {category.name}
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <details key={idx} className="bg-white rounded-xl border border-gray-200 p-4 group">
                      <summary className="font-semibold text-[#0F172A] text-sm cursor-pointer list-none flex items-center justify-between">
                        <span>{faq.question}</span>
                        <span className="text-gold-600 text-lg group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <p className="text-xs text-gray-600 mt-3 leading-relaxed border-t border-gray-100 pt-3">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              {/* Areas We Serve in Gurgaon */}
              <div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-4 font-serif">
                  Areas We Serve in Gurgaon
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  <Link
                    href="/locations/cyber-city"
                    className="px-4 py-2 bg-gray-100 hover:bg-gold-100 text-gray-700 hover:text-gold-800 rounded-full text-xs font-semibold transition-colors"
                  >
                    Cyber City Call Girls
                  </Link>
                  <Link
                    href="/locations/mg-road"
                    className="px-4 py-2 bg-gray-100 hover:bg-gold-100 text-gray-700 hover:text-gold-800 rounded-full text-xs font-semibold transition-colors"
                  >
                    MG Road Escorts
                  </Link>
                  <Link
                    href="/locations/golf-course-road"
                    className="px-4 py-2 bg-gray-100 hover:bg-gold-100 text-gray-700 hover:text-gold-800 rounded-full text-xs font-semibold transition-colors"
                  >
                    Golf Course Road Escorts
                  </Link>
                  <Link
                    href="/locations/dlf-phase-1"
                    className="px-4 py-2 bg-gray-100 hover:bg-gold-100 text-gray-700 hover:text-gold-800 rounded-full text-xs font-semibold transition-colors"
                  >
                    DLF City Call Girls
                  </Link>
                  <Link
                    href="/locations/sohna-road"
                    className="px-4 py-2 bg-gray-100 hover:bg-gold-100 text-gray-700 hover:text-gold-800 rounded-full text-xs font-semibold transition-colors"
                  >
                    Sohna Road Escorts
                  </Link>
                  <Link
                    href="/locations/sector-29"
                    className="px-4 py-2 bg-gray-100 hover:bg-gold-100 text-gray-700 hover:text-gold-800 rounded-full text-xs font-semibold transition-colors"
                  >
                    Sector 29 Call Girls
                  </Link>
                </div>
              </div>

              {/* Call Card */}
              <div className="p-6 bg-gradient-to-r from-gold-50 via-amber-50 to-gold-50 rounded-2xl border-2 border-gold-200 text-center shadow-sm">
                <p className="text-xl font-bold text-[#0F172A] font-serif">
                  📞 Book Your {category.name} Today
                </p>
                <p className="text-gray-600 mt-2 text-sm">
                  Call us 24/7 at{' '}
                  <a href={`tel:${siteConfig.phone}`} className="text-gold-600 hover:underline font-bold">
                    {siteConfig.phoneDisplay}
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Official Portal:{' '}
                  <a href={siteConfig.url} className="text-gold-600 hover:underline font-semibold">
                    {siteConfig.domain}
                  </a>
                </p>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Category Highlight Card */}
              <div className="bg-gradient-to-br from-gold-50 to-amber-50 p-8 rounded-2xl text-center border-2 border-gold-200 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4 text-gold-600">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] font-serif">{category.name}</h3>
                <p className="text-gray-600 text-xs mt-2">
                  Verified premium escorts in Gurgaon
                </p>
              </div>

              {/* Book Now Dark Card */}
              <div className="bg-[#1a1a2e] p-6 rounded-2xl text-center text-white shadow-md">
                <h4 className="text-white font-bold text-lg mb-3 font-serif">Reserve Now</h4>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="block bg-gold-600 hover:bg-gold-700 text-white py-3.5 rounded-full font-bold transition-all text-sm shadow-md"
                >
                  Call Now: {siteConfig.phoneDisplay}
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ALINA%20VIP,%20I%20am%20interested%20in%20booking%20${encodeURIComponent(category.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2.5 bg-[#25D366] text-white py-3.5 rounded-full font-bold transition-all text-sm shadow-md"
                >
                  WhatsApp Booking
                </a>
                <Link
                  href="/contact"
                  className="block mt-3 text-gold-400 hover:underline text-xs"
                >
                  Or Request Online &rarr;
                </Link>
              </div>

              {/* Related Service Categories */}
              <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gold-200/60 shadow-sm">
                <h4 className="font-bold text-[#0F172A] mb-4 font-serif text-base">
                  Explore Related Categories
                </h4>
                <div className="space-y-2.5">
                  {categories
                    .filter((c) => c.slug !== category.slug)
                    .slice(0, 6)
                    .map((sibling) => {
                      const SiblingIcon = categoryIconMap[sibling.slug] || Sparkles;
                      return (
                        <Link
                          key={sibling.slug}
                          href={`/category/${sibling.slug}`}
                          className="flex items-center justify-between text-gray-700 hover:text-gold-600 transition-colors text-sm p-1.5 rounded-lg hover:bg-white/60"
                        >
                          <span className="flex items-center gap-2">
                            <SiblingIcon className="w-4 h-4 text-gold-600" /> {sibling.name}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
                        </Link>
                      );
                    })}
                </div>
              </div>

              {/* Contextual Guide Link */}
              {category.slug === 'russian-call-girls' && (
                <div className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm">
                  <p className="text-xs uppercase font-bold tracking-wider text-gold-600 mb-1">Recommended Guide</p>
                  <Link
                    href="/blog/russian-escorts-gurgaon-guide"
                    className="font-serif text-sm font-bold text-[#0F172A] hover:text-gold-600 transition-colors block"
                  >
                    Russian Escorts Gurgaon Guide &amp; Booking Etiquette &rarr;
                  </Link>
                </div>
              )}
              {category.slug === 'vip-call-girls' && (
                <div className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm">
                  <p className="text-xs uppercase font-bold tracking-wider text-gold-600 mb-1">Recommended Guide</p>
                  <Link
                    href="/blog/vip-call-girls-gurgaon"
                    className="font-serif text-sm font-bold text-[#0F172A] hover:text-gold-600 transition-colors block"
                  >
                    VIP Call Girls Gurgaon: Complete Discretion Guide &rarr;
                  </Link>
                </div>
              )}
              {category.slug === 'model-escorts' && (
                <div className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm">
                  <p className="text-xs uppercase font-bold tracking-wider text-gold-600 mb-1">Recommended Guide</p>
                  <Link
                    href="/blog/best-escort-service-gurgaon-guide"
                    className="font-serif text-sm font-bold text-[#0F172A] hover:text-gold-600 transition-colors block"
                  >
                    How to Choose the Best Escort Service in Gurgaon &rarr;
                  </Link>
                </div>
              )}

              {/* 4.9/5 Rating Card */}
              <div className="bg-gold-50 p-6 rounded-2xl border border-gold-200 text-center shadow-sm">
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="font-bold text-[#0F172A] text-base font-serif">4.9/5 Rating</p>
                <p className="text-gray-600 text-xs mt-1">
                  500+ verified client reviews for our{' '}
                  <Link href="/services" className="text-gold-600 hover:underline">
                    escort service
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action Card */}
          <div className="text-center mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-600 mb-4 text-base">
              To book our {category.name.toLowerCase()}, simply call us or fill out our contact form.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="bg-gold-600 hover:bg-gold-700 text-white px-10 py-4 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> Book Now
              </a>
              <Link
                href="/contact"
                className="border-2 border-gold-600 text-gold-700 hover:bg-gold-600 hover:text-white px-10 py-4 rounded-full font-bold text-base transition-all"
              >
                Contact Us
              </Link>
              <a
                href={siteConfig.url}
                className="border-2 border-gold-600 text-gold-700 hover:bg-gold-600 hover:text-white px-10 py-4 rounded-full font-bold text-base transition-all"
              >
                Visit {siteConfig.domain}
              </a>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection theme="light" />
      <CTASection />
    </>
  );
}
