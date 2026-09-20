import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import CTASection from '@/components/CTASection';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';
import { getAssetUrl } from '@/lib/assets';

export const metadata: Metadata = {
  title: `Verified Photo Gallery | VIP Call Girls & ${siteConfig.city} Escorts | ${siteConfig.name}`,
  description: `Browse 100% verified, authentic photographs of VIP call girls and elite escorts in ${siteConfig.city}. Genuine Russian escorts, independent models, college call girls, and 5-star hotel outcalls.`,
  keywords: [
    ...siteConfig.keywords.slice(0, 10),
    'verified escort gallery, real call girl photos gurgaon, genuine escort profiles',
  ],
  alternates: {
    canonical: `${siteConfig.url}/gallery`,
    languages: getAlternateLanguages('/gallery'),
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.city} Escorts Photo Gallery | 100% Verified Real Photos | ${siteConfig.name}`,
    description: `Browse genuine, unedited photos of VIP escorts, Russian models, and independent call girls in ${siteConfig.city}.`,
    images: ['/og-image.jpg'],
  },
  openGraph: {
    title: `Verified Photo Gallery | VIP Call Girls & ${siteConfig.city} Escorts | ${siteConfig.name}`,
    description: `Browse 100% verified, authentic photographs of VIP call girls and elite escorts in ${siteConfig.city}. Genuine Russian escorts, independent models, college call girls, and 5-star hotel outcalls.`,
    url: `${siteConfig.url}/gallery`,
    type: 'website',
  },
};

interface GalleryModel {
  name: string;
  category: string;
  categorySlug: string;
  location: string;
  image: string;
  rates: string;
  age: number;
}

const verifiedModels: GalleryModel[] = [
  {
    name: 'Karina',
    category: 'Russian Escort',
    categorySlug: 'russian-call-girls',
    location: 'Huda City Centre, Gurgaon',
    image: '/images/assets/Karina.jpg',
    rates: '₹15,000 / Shot',
    age: 22,
  },
  {
    name: 'Tanya',
    category: 'VIP Model Escort',
    categorySlug: 'vip-call-girls',
    location: 'Cyber City, Gurgaon',
    image: '/images/assets/Tanya.jpg',
    rates: '₹20,000 / Shot',
    age: 23,
  },
  {
    name: 'Neha',
    category: 'Independent Escort',
    categorySlug: 'independent-girls',
    location: 'Golf Course Road, Gurgaon',
    image: '/images/assets/Neha.jpg',
    rates: '₹12,000 / Shot',
    age: 21,
  },
  {
    name: 'Siya',
    category: 'Celebrity Escort',
    categorySlug: 'celebrity-escorts',
    location: 'DLF Phase 1, Gurgaon',
    image: '/images/assets/Escort_Service_DLF_Gurgaon.jpg',
    rates: '₹25,000 / Shot',
    age: 24,
  },
  {
    name: 'Mia',
    category: 'Russian High Profile',
    categorySlug: 'russian-call-girls',
    location: 'Sohna Road, Gurgaon',
    image: '/images/assets/Mia.jpg',
    rates: '₹18,000 / Shot',
    age: 23,
  },
  {
    name: 'Nithya Rai',
    category: 'High Profile Escort',
    categorySlug: 'high-profile-girls',
    location: 'Mahipalpur & Aerocity',
    image: '/images/assets/Nithya_High_Profile_Escort_In_Mahipalpur.jpg',
    rates: '₹15,000 / Shot',
    age: 22,
  },
  {
    name: 'Sheena',
    category: 'Indian Model Escort',
    categorySlug: 'model-escorts',
    location: 'MG Road, Gurgaon',
    image: '/images/assets/Sheena_Indian_Escort_In_Gurgaon.jpg',
    rates: '₹14,000 / Shot',
    age: 24,
  },
  {
    name: 'Geet',
    category: 'Air Hostess Escort',
    categorySlug: 'air-hostess',
    location: 'DLF Cyber City, Gurgaon',
    image: '/images/assets/Geet.jpg',
    rates: '₹16,000 / Shot',
    age: 25,
  },
  {
    name: 'Pallavi',
    category: 'College Girl Escort',
    categorySlug: 'college-girls',
    location: 'Sector 29, Gurgaon',
    image: '/images/assets/Pallavi.jpg',
    rates: '₹10,000 / Shot',
    age: 20,
  },
];

const categoryPortfolios = [
  {
    title: 'Russian Call Girls',
    slug: 'russian-call-girls',
    image: '/images/categories/russian-escorts.webp',
    count: '24 Profiles',
    desc: 'Fair-complexioned, aristocratic European & Russian call girl models.',
  },
  {
    title: 'VIP Call Girls',
    slug: 'vip-call-girls',
    image: '/images/categories/vip-escorts.webp',
    count: '32 Profiles',
    desc: 'Elite high-society models for corporate galas and 5-star hotel luxury.',
  },
  {
    title: 'High Profile Girls',
    slug: 'high-profile-girls',
    image: '/images/categories/high-profile-girls.webp',
    count: '28 Profiles',
    desc: 'Fashion influencers and luxury models offering five-star escort service.',
  },
  {
    title: 'Model Escorts',
    slug: 'model-escorts',
    image: '/images/categories/model-escorts.webp',
    count: '30 Profiles',
    desc: 'Runway fashionistas and beauty pageant models with photogenic grace.',
  },
  {
    title: 'College Call Girls',
    slug: 'college-girls',
    image: '/images/categories/college-girls.webp',
    count: '35 Profiles',
    desc: 'Charming, vibrant college students with youthful freshness and warmth.',
  },
  {
    title: 'Housewife Escorts',
    slug: 'housewife-escorts',
    image: '/images/categories/housewife-escorts.webp',
    count: '22 Profiles',
    desc: 'Mature, understanding homemakers offering deep emotional intimacy.',
  },
  {
    title: 'Independent Girls',
    slug: 'independent-girls',
    image: '/images/categories/independent-escorts.webp',
    count: '40 Profiles',
    desc: 'Direct independent call girls with no intermediaries and fast booking.',
  },
  {
    title: 'Air Hostess Escorts',
    slug: 'air-hostess',
    image: '/images/categories/air-hostess.webp',
    count: '18 Profiles',
    desc: 'Cultured aviation crew members available during hotel transit layovers.',
  },
  {
    title: 'Celebrity Escorts',
    slug: 'celebrity-escorts',
    image: '/images/assets/image_270x450_21.jpg',
    count: '12 Profiles',
    desc: 'Ultra-exclusive screen artists and ramp models for high-profile clients.',
  },
  {
    title: 'Travel Escorts',
    slug: 'travel-escorts',
    image: '/images/assets/image_270x450_22.jpg',
    count: '26 Profiles',
    desc: 'Sophisticated globetrotters ready for international and domestic holidays.',
  },
  {
    title: 'Busty Call Girls',
    slug: '/busty-escorts-in-gurgaon',
    image: '/images/assets/image_270x450_23.jpg',
    count: '20 Profiles',
    desc: 'Voluptuous, curvaceous models with breathtaking hourglass proportions.',
  },
  {
    title: 'Elite Delhi NCR Escorts',
    slug: 'high-profile-girls',
    image: '/images/assets/High_Profile_Escorts_Girl_In_Delhi.jpg',
    count: '45 Profiles',
    desc: 'Top-rated call girl escorts serving Gurgaon, Delhi, and Aerocity suites.',
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-[#FFFDF6] min-h-screen text-[#2d2d2d]">
      {/* 1. Page Title Bar (ALINA VIP exact page-title-bar-01) */}
      <section className="relative bg-[#671725] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-luxury-gold shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Verified Escort Photo Gallery
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto">
            100% Genuine, Authenticated Photographs of Luxury Escorts and VIP Call Girls in {siteConfig.city}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs md:text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-luxury-gold font-semibold">Photo Gallery</span>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="bg-[#671725] text-white py-4 px-4 shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-luxury-gold" />
            <strong>100% Verified Recent Photos</strong>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={18} className="text-luxury-gold" />
            <strong>Zero Advance Payment Required</strong>
          </span>
          <span className="flex items-center gap-2">
            <Sparkles size={18} className="text-luxury-gold" />
            <strong>20-30 Min 5-Star Hotel Outcalls</strong>
          </span>
        </div>
      </section>

      {/* 3. Featured Models Showcase (3x3 Grid) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-wine">
            Authentic Photographs
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
            Featured Model Profiles
          </h2>
          <div className="w-16 h-1 bg-primary-wine mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            All models displayed below are active, verified in-person, and available for immediate outcall to luxury hotels across DLF Phase 1-5, Cyber City, and Golf Course Road.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {verifiedModels.map((model, idx) => (
            <article
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/80 flex flex-col justify-between group"
            >
              <div className="relative h-[380px] w-full overflow-hidden bg-gray-100">
                <Image
                  src={getAssetUrl(model.image)}
                  alt={`${model.name} - ${model.category} in Gurgaon`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#671725] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                  VERIFIED
                </div>
                <div className="absolute top-3 right-3 bg-[#671725]/90 text-luxury-gold text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                  {model.rates}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-bold text-[#111827]">{model.name}</h3>
                    <span className="text-xs font-bold text-gray-500">{model.age} Yrs</span>
                  </div>
                  <p className="text-xs font-semibold text-primary-wine mb-2">{model.category}</p>
                  <p className="text-xs text-gray-600 mb-3">{model.location}</p>
                  <div className="text-luxury-gold text-sm mb-4">★★★★★</div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                      `Hello ${siteConfig.name}, I want to book ${model.name} (${model.category})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs font-bold rounded-xl"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs font-bold rounded-xl"
                  >
                    <Phone size={14} className="text-luxury-gold" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 4. Category Portfolios Grid */}
        <div className="mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-wine">
              Roster Diversity
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
              Browse Categories &amp; Model Portfolios
            </h2>
            <div className="w-16 h-1 bg-primary-wine mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Explore specialized categories featuring verified national and international call girls in {siteConfig.city}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryPortfolios.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.slug.startsWith('/') ? cat.slug : `/category/${cat.slug}`}
                className="category-inner-col group relative block rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 min-h-[420px]"
              >
                <Image
                  src={getAssetUrl(cat.image)}
                  alt={`${cat.title} ${siteConfig.city} Escorts`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute top-4 right-4 bg-primary-wine/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  {cat.count}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-luxury-gold transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-200 leading-relaxed opacity-90 mb-3">
                    {cat.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-luxury-gold group-hover:underline">
                    View Portfolio <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <CTASection />
    </div>
  );
}
