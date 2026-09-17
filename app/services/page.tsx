import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Heart,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';
import { escortModels } from '@/data/models';
import exactManifest from '@/data/exact_manifest.json';

const hub = exactManifest.serviceHub;

export const metadata: Metadata = {
  title: 'Escort Service in Gurgaon 24*7 | VIP Gurgaon Escorts Services | ALINA VIP',
  description:
    'Are you searching for escort service in Gurgaon? Get instant booking 24/7 for VIP escorts in Gurgaon with COD available. 100% verified call girls at 5-star hotels & residences.',
  keywords: [
    ...siteConfig.keywords.slice(0, 10),
    'escort service in gurgaon',
    'vip gurgaon escorts services',
    'girlfriend experience gurgaon',
    'erotic massage in gurgaon',
    'in out call girls gurgaon',
    'escort service for 1 2 3 hours',
    'escort service full night',
  ],
  alternates: {
    canonical: `${siteConfig.url}/services`,
    languages: getAlternateLanguages('/services'),
  },
  openGraph: {
    title: 'Escort Service in Gurgaon 24*7 | VIP Gurgaon Escorts Services | ALINA VIP',
    description:
      'Are you searching for escort service in Gurgaon? Get instant booking 24/7 for VIP escorts in Gurgaon with COD available.',
    url: `${siteConfig.url}/services`,
    type: 'website',
  },
};

const serviceSubpages = [
  {
    title: 'Girlfriend Experience (GFE)',
    slug: '/girlfriend-experience-in-gurgaon',
    image: '/images/assets/Girlfriend_Experience.png',
    snippet:
      'Escorts can provide you with an experience similar to a girlfriend. But the only difference is that she will be much better with you than your girlfriend.',
    features: ['Intimate emotional bond', 'Passionate French kissing', 'Sweet romantic cuddling'],
  },
  {
    title: 'Erotic Massage in Gurgaon',
    slug: '/erotic-massage-in-gurgaon',
    image: '/images/assets/Full_Body_Sensual_Massage.jpg',
    snippet:
      'A sensual full body massage provides relaxation and rejuvenation to the body. It is also a great sex booster as it opens all the blocked blood vessels and relieves all stress.',
    features: ['Body-to-body sensual rub', 'Warm aromatherapy oils', 'Erotic happy ending'],
  },
  {
    title: 'In-Call & Out-Call Services',
    slug: '/in-out-call-girls-gurgaon',
    image: '/images/assets/In_Call_And_Out_Call_Services.jpg',
    snippet:
      'Escort services are available anytime, anywhere in Gurgaon as per your need. Escorts operate either with agencies or independently for total comfort and discretion.',
    features: ['20-30 min hotel arrival', 'Private luxury suites', 'Strict anonymity guaranteed'],
  },
  {
    title: 'Escort Service for 1/2/3 Hours',
    slug: '/escort-service-for-1-2-3-hours',
    image: '/images/assets/image_290x280_1.jpg',
    snippet:
      'Beauty of our escort agency is nothing but there is a chance for each and everyone to choose the escort girls on their own taste for short, intense, revitalizing encounters.',
    features: ['Rapid lunchtime dispatch', '1-2 rounds of passion', 'No advance cash on delivery'],
  },
  {
    title: 'Escort Service Full Night',
    slug: '/escort-service-full-night',
    image: '/images/assets/image_290x280_2.jpg',
    snippet:
      'It is our pleasure to have you here, where you will find the most exotic and high-end Gurgaon escort service for full night unhurried romantic pleasures until dawn.',
    features: ['Full 10 PM - 8 AM intimacy', 'Morning breakfast companion', 'Unlimited intimate rounds'],
  },
];

const serviceRates = [
  { duration: '1-2 Hours', shots: '1 Shot', price: '₹15,000', note: 'Short & revitalizing' },
  { duration: '2-4 Hours', shots: '2 Shots', price: '₹20,000', note: 'Most requested package' },
  { duration: '5-6 Hours', shots: '3 Shots', price: '₹25,000', note: 'Dinner date & evening' },
  { duration: 'Full Night (8-10 Hrs)', shots: 'Unlimited', price: '₹30,000+', note: 'VIP overnight romance' },
];

export default function ServicesPage() {
  const introSection = hub.sections[0];
  const servicesOfferedSection = hub.sections[1];
  const remainingEditorialSections = hub.sections.slice(2);
  const featuredModels = escortModels.slice(0, 6);

  return (
    <div className="bg-[#FFFDF6] min-h-screen text-[#2d2d2d]">
      {/* 1. Hero Header Banner */}
      <section className="relative bg-[#671725] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FFD700] shadow-md">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#FFD700] text-xs font-semibold uppercase tracking-wider mb-3">
            ★ 24/7 VIP Companionship &amp; Outcalls
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            {hub.h1 || 'Get Premium Escort Service in Gurgaon 24*7'}
          </h1>
          <p className="text-sm md:text-base text-rose-100 max-w-3xl mx-auto leading-relaxed font-light">
            Are you searching for escort service in Gurgaon? Get instant booking 24/7 for VIP escorts in Gurgaon with cash on delivery available.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ALINA%20VIP,%20I%20want%20to%20inquire%20about%20Escort%20Services%20in%20Gurgaon`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp Inquiry
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="px-6 py-2.5 bg-white text-[#671725] hover:bg-rose-50 font-bold text-xs sm:text-sm rounded-lg shadow transition-all flex items-center gap-2"
            >
              <Phone size={16} /> Direct Call: {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="bg-[#52121d] text-white py-3.5 px-4 shadow-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#FFD700]" />
            <strong>100% Real &amp; Verified Call Girls</strong>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={18} className="text-[#FFD700]" />
            <strong>Zero Advance Payment Required</strong>
          </span>
          <span className="flex items-center gap-2">
            <Clock size={18} className="text-[#FFD700]" />
            <strong>20-30 Min 5-Star Hotel Outcalls</strong>
          </span>
        </div>
      </section>

      {/* 3. Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Intro Editorial Article (100% Exact from Roshni Khanna) */}
        {introSection && (
          <article className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#671725]">
              <Sparkles size={14} className="text-[#FFD700]" />
              <span>Elite Companionship in Gurugram</span>
            </div>
            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              {introSection.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </article>
        )}

        {/* Services Offered Section (100% Exact Copy from Roshni Khanna Section 1 + Subpage Navigation Cards) */}
        <section className="space-y-8">
          <article className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200/80 shadow-sm space-y-5">
            <div className="border-b border-gray-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#671725]">
                What We Offer
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
                {servicesOfferedSection ? servicesOfferedSection.title : 'Services Offered'}
              </h2>
              <div className="w-16 h-1 bg-[#671725] mt-2 rounded-full" />
            </div>

            {/* All 6 Authentic Paragraphs from Roshni Khanna Services Offered Section */}
            {servicesOfferedSection && servicesOfferedSection.paragraphs && (
              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                {servicesOfferedSection.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            )}
          </article>

          {/* 5 Core Specialized Sub-Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceSubpages.map((service, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={service.image}
                    alt={`${service.title} in Gurgaon`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#671725] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    VIP SERVICE #{sIdx + 1}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#671725] transition-colors">
                      <Link href={service.slug}>{service.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                      {service.snippet}
                    </p>
                    <div className="space-y-1.5 mt-3">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-xs text-gray-700">
                          <Sparkles size={12} className="text-[#FFD700] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <Link
                      href={service.slug}
                      className="text-xs font-bold text-[#671725] hover:underline flex items-center gap-1"
                    >
                      <span>Read More</span>
                      <ArrowRight size={13} />
                    </Link>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20am%20interested%20in%20${encodeURIComponent(service.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs font-bold rounded-lg flex items-center gap-1.5"
                    >
                      <MessageCircle size={13} /> Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rates & Pricing Table */}
        <section className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200/80 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#671725]">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
              Escort Service Rates &amp; Packages in Gurgaon
            </h2>
            <div className="w-16 h-1 bg-[#671725] mx-auto mt-2 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              All prices are transparent, all-inclusive, with zero advance payment. Pay strictly cash on delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceRates.map((rate, rIdx) => (
              <div
                key={rIdx}
                className="bg-[#FFFDF6] border border-rose-200/60 rounded-xl p-5 text-center flex flex-col justify-between hover:border-[#671725] transition-colors shadow-xs"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#671725] uppercase tracking-wider">
                    {rate.note}
                  </span>
                  <h3 className="text-base font-bold text-[#111827] mt-1">{rate.duration}</h3>
                  <div className="text-2xl font-extrabold text-[#671725] my-2">{rate.price}</div>
                  <p className="text-xs text-gray-600 mb-4">{rate.shots}</p>
                </div>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20book%20the%20${encodeURIComponent(rate.duration)}%20package`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs text-center"
                >
                  Book This Package
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* All Remaining Exact Long-Form Editorial Sections from Roshni Khanna */}
        <div className="space-y-8">
          {remainingEditorialSections.map((sec, idx) => (
            <article
              key={idx}
              className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200/80 shadow-sm space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] border-b border-gray-100 pb-3 flex items-center gap-2">
                <Heart size={18} className="text-[#671725] shrink-0" />
                <span>{sec.title}</span>
              </h2>
              <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Available Companion Escorts Gallery */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#671725]">
              100% Genuine Girls
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
              Top Escort Profiles Available for Appointment
            </h2>
            <div className="w-16 h-1 bg-[#671725] mx-auto mt-2 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Select your dream partner from our roster of Russian, independent, and high-profile models.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredModels.map((model) => (
              <div
                key={model.slug}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition-all text-center group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={model.image}
                    alt={`${model.name} - ${model.category} in Gurgaon`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    VERIFIED
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-xs sm:text-sm text-[#111827] truncate">
                    {model.name}
                  </h3>
                  <p className="text-[11px] text-[#671725] font-semibold truncate">{model.category}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{model.rates.oneShot}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center pt-2">
            <Link
              href="/escorts"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm"
            >
              <span>View All 200+ Escort Profiles</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>

      <CTASection />
    </div>
  );
}
