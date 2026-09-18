import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, Shield, CheckCircle, Heart, Sparkles, Clock, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';
import { escortModels } from '@/data/models';
import { getAssetUrl } from '@/lib/assets';
import exactManifest from '@/data/exact_manifest.json';

interface ManifestItem {
  title: string;
  h1: string;
  sections: {
    tag: string;
    title: string;
    paragraphs: string[];
    listItems: string[];
  }[];
}

const slugToManifestKey: Record<string, keyof typeof exactManifest> = {
  'girlfriend-experience': 'girlfriendExperience',
  'girlfriend-experience-in-gurgaon': 'girlfriendExperience',
  'erotic-massage': 'eroticMassage',
  'erotic-massage-in-gurgaon': 'eroticMassage',
  'sensual-massage': 'eroticMassage',
  'in-out-call': 'inOutCall',
  'in-out-call-girls': 'inOutCall',
  'in-out-call-girls-gurgaon': 'inOutCall',
  '1-2-3-hours': 'hours123',
  'escort-service-for-1-2-3-hours': 'hours123',
  'full-night': 'fullNight',
  'escort-service-full-night': 'fullNight',
};

const serviceImages: Record<string, string> = {
  girlfriendExperience: '/images/assets/Girlfriend_Experience.png',
  eroticMassage: '/images/assets/Full_Body_Sensual_Massage.jpg',
  inOutCall: '/images/assets/In_Call_And_Out_Call_Services.jpg',
  hours123: '/images/assets/Independent_Escorts_To_Meet_On_Hourly_Basis.jpg',
  fullNight: '/images/assets/Escort_At_Night_24x7_Service.png',
};

export function generateStaticParams() {
  return [
    { slug: 'girlfriend-experience' },
    { slug: 'girlfriend-experience-in-gurgaon' },
    { slug: 'erotic-massage' },
    { slug: 'erotic-massage-in-gurgaon' },
    { slug: 'sensual-massage' },
    { slug: 'in-out-call' },
    { slug: 'in-out-call-girls' },
    { slug: 'in-out-call-girls-gurgaon' },
    { slug: '1-2-3-hours' },
    { slug: 'escort-service-for-1-2-3-hours' },
    { slug: 'full-night' },
    { slug: 'escort-service-full-night' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = slugToManifestKey[slug];
  const item = key ? (exactManifest[key] as ManifestItem) : null;

  if (!item) {
    return {
      title: 'Luxury Escort Services in Gurgaon | ALINA VIP',
    };
  }

  return {
    title: `${item.title.replace(/Roshni\s*Khanna/gi, siteConfig.name)} | ${siteConfig.name}`,
    description: `Discover premium ${item.h1} in Gurgaon. 100% real verified call girls, 20-30 min hotel arrival, cash on delivery with ALINA VIP.`,
    alternates: {
      canonical: `${siteConfig.url}/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const key = slugToManifestKey[slug];
  const item = key ? (exactManifest[key] as ManifestItem) : null;

  if (!item) {
    notFound();
  }

  const heroImage = serviceImages[key as string] || '/images/assets/Diverse_Portfolio.jpg';
  const availableModels = escortModels.slice(0, 6);

  // Filter out empty or duplicate nav sections
  const validSections = item.sections.filter((s) => {
    if (!s.title && s.paragraphs.length === 0) return false;
    const t = s.title.toLowerCase();
    if (t.includes('main menu') || t.includes('categories') || t.includes('gurgaon locations') || t.includes('contact details') || t.includes('age verification') || t.includes('feeling naughty?')) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* 1. Hero Header Banner */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FFD700] shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: item.h1 },
              ]}
            />
          </div>

          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#FFD700] text-xs font-semibold uppercase tracking-wider mb-3">
            ★ VIP Escort Services in Gurgaon
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {item.h1}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-rose-100/90 font-light max-w-3xl leading-relaxed">
            Experience the finest luxury escort companionship in Gurgaon. 100% verified profiles, 24/7 outcalls, zero advance payment.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20am%20inquiring%20about%20${encodeURIComponent(item.h1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2"
            >
              <MessageCircle size={16} /> Book via WhatsApp
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="px-6 py-2.5 bg-white/90 hover:bg-white text-[#671725] border border-rose-200/90 hover:border-[#671725] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2"
            >
              <Phone size={16} /> Direct Call: {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Trust Bar */}
      <div className="bg-[#52121d] text-white py-3.5 px-4 shadow-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-2">
            <Shield size={16} className="text-[#FFD700]" />
            <strong>100% Real &amp; Verified Profiles</strong>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={16} className="text-[#FFD700]" />
            <strong>Zero Advance Payment – Pay on Arrival</strong>
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-[#FFD700]" />
            <strong>24/7 Rapid Outcall in 20-30 Mins</strong>
          </span>
        </div>
      </div>

      {/* 3. Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Featured Image & Highlight Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#671725]">
              Exclusive Adult Entertainment
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              Premium {item.h1} with ALINA VIP
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Indulge in an unmatched encounter of passion, intimacy, and complete relaxation. Our female companions are hand-selected for high etiquette, exceptional beauty, and genuine passion.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-rose-50 text-[#671725] text-xs font-semibold rounded-full border border-rose-200">
                100% Cash on Delivery
              </span>
              <span className="px-3 py-1 bg-rose-50 text-[#671725] text-xs font-semibold rounded-full border border-rose-200">
                5-Star Hotel Outcalls
              </span>
              <span className="px-3 py-1 bg-rose-50 text-[#671725] text-xs font-semibold rounded-full border border-rose-200">
                24/7 Available
              </span>
            </div>
          </div>
          <div className="md:col-span-5 relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-md bg-gray-100">
            <Image
              src={getAssetUrl(heroImage)}
              alt={`${item.h1} in Gurgaon`}
              fill
              sizes="(max-width: 768px) 100vw, 450px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* All Authentic Scraped Sections from Roshni Khanna */}
        <div className="space-y-8">
          {validSections.map((sec, idx) => (
            <article
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-4"
            >
              {sec.title && (
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827] border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Heart size={18} className="text-[#671725] shrink-0" />
                  <span>{sec.title}</span>
                </h2>
              )}

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {p}
                </p>
              ))}

              {sec.listItems && sec.listItems.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {sec.listItems.map((li, lIdx) => (
                    <li key={lIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <Sparkles size={13} className="text-[#FFD700] shrink-0" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {/* Top Escort Profiles Available for Appointment */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#671725]">
              Verified Roster
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
              Top Escort Profiles Available for Appointment
            </h2>
            <div className="w-16 h-1 bg-[#671725] mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {availableModels.map((m) => (
              <div
                key={m.slug}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-md transition-all text-center group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={m.image}
                    alt={`${m.name} - ${m.category} in Gurgaon`}
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
                  <h3 className="font-bold text-xs sm:text-sm text-[#111827] truncate">{m.name}</h3>
                  <p className="text-[11px] text-[#671725] font-semibold truncate">{m.category}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{m.rates.oneShot}</p>
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
      </div>

      <CTASection />
    </div>
  );
}
