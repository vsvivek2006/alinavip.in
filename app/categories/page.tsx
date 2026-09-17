import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Heart,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';
import exactManifest from '@/data/exact_manifest.json';

const catManifest = exactManifest.categories;

export const metadata: Metadata = {
  title: 'Now You Can Meet Different Categories of Escorts | ALINA VIP',
  description:
    'Explore diverse categories of escorts in Gurgaon: Russian, College, Model, High Profile, Housewife, Air Hostess, and Independent call girls. 100% verified with cash on delivery.',
  alternates: {
    canonical: `${siteConfig.url}/categories`,
  },
};

const categoryVisualGrid = [
  {
    name: 'Russian Escorts in Gurgaon',
    slug: '/gurgaon-russian-escorts',
    image: '/images/assets/Russian_Escorts_Girl_In_Delhi.jpg',
    tag: 'European Charm',
    price: 'From ₹25,000',
  },
  {
    name: 'Independent Escorts in Gurgaon',
    slug: '/independent-escorts-in-gurgaon',
    image: '/images/assets/Independent_Escorts_Delhi.jpg',
    tag: 'Direct & Discreet',
    price: 'From ₹15,000',
  },
  {
    name: 'Model Escorts in Gurgaon',
    slug: '/models-escorts-in-gurgaon',
    image: '/images/assets/High_Profile_Escorts_Girl_In_Delhi.jpg',
    tag: 'Runway Glamour',
    price: 'From ₹25,000',
  },
  {
    name: 'VIP Call Girls in Gurgaon',
    slug: '/vip-escorts-in-gurgaon',
    image: '/images/assets/VIP_Call_Girls_Delhi.jpg',
    tag: 'Elite Class',
    price: 'From ₹20,000',
  },
  {
    name: 'College Call Girls in Gurgaon',
    slug: '/college-call-girls-gurgaon',
    image: '/images/assets/College_Girl_Escorts_Delhi.jpg',
    tag: 'Young & Lively',
    price: 'From ₹15,000',
  },
  {
    name: 'Air Hostess Escorts in Gurgaon',
    slug: '/air-hostess-escorts-gurgaon',
    image: '/images/assets/Air_Hostess_Escorts_Delhi.jpg',
    tag: 'Polished Poise',
    price: 'From ₹20,000',
  },
  {
    name: 'High Profile Escorts in Gurgaon',
    slug: '/high-profile-escorts-gurgaon',
    image: '/images/assets/Diverse_Portfolio.jpg',
    tag: 'Executive Society',
    price: 'From ₹30,000',
  },
  {
    name: 'Housewife Escorts in Gurgaon',
    slug: '/housewife-escorts-gurgaon',
    image: '/images/assets/Housewife_Escorts_Delhi.jpg',
    tag: 'Mature Sensuality',
    price: 'From ₹15,000',
  },
  {
    name: 'Celebrity Escorts in Gurgaon',
    slug: '/celebrity-escorts-gurgaon',
    image: '/images/assets/Celebrity_Escorts_Delhi.jpg',
    tag: 'A-List Stature',
    price: 'From ₹50,000',
  },
  {
    name: 'Busty Escorts in Gurgaon',
    slug: '/busty-escorts-in-gurgaon',
    image: '/images/assets/image_290x280_3.jpg',
    tag: 'Curvaceous Assets',
    price: 'From ₹18,000',
  },
  {
    name: 'Affordable Escorts in Gurgaon',
    slug: '/affordable-escorts-in-gurgaon',
    image: '/images/assets/image_290x280_4.jpg',
    tag: 'Budget Friendly',
    price: 'From ₹12,000',
  },
  {
    name: 'Asian Escorts in Gurgaon',
    slug: '/asian-escorts-in-gurgaon',
    image: '/images/assets/image_290x280_5.jpg',
    tag: 'Exotic Allure',
    price: 'From ₹20,000',
  },
];

export default function CategoriesPage() {
  // Filter out any menu/footer sections
  const validSections = catManifest.sections.filter((s) => {
    if (!s.title && s.paragraphs.length === 0) return false;
    const t = s.title.toLowerCase();
    if (
      t.includes('main menu') ||
      t.includes('gurgaon locations') ||
      t.includes('contact details') ||
      t.includes('age verification') ||
      t.includes('feeling naughty?') ||
      t.includes('top escort profiles')
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* 1. Header Banner */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FFD700] shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="mb-3">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Categories' }]} />
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#FFD700] text-xs font-semibold uppercase tracking-wider mb-2">
            ★ All Companion Categories &bull; 100% Verified
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Meet Different Categories of Escorts in Gurgaon
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100 font-light max-w-3xl leading-relaxed">
            Choose from a rich portfolio of Russian, Indian, college, and independent female escorts for an unforgettable experience. Easy booking with zero advance payment.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20inquire%20about%20escort%20categories`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#13bc18] hover:bg-[#0fa714] text-white text-xs sm:text-sm font-bold rounded-lg shadow transition-all flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="px-5 py-2.5 bg-white text-[#671725] hover:bg-rose-50 text-xs sm:text-sm font-bold rounded-lg shadow transition-all flex items-center gap-2"
            >
              <Phone size={16} /> Call: {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Trust Bar */}
      <div className="bg-[#52121d] text-white py-3.5 px-4 shadow-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#FFD700]" />
            <strong>100% Genuine Verified Photos</strong>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={16} className="text-[#FFD700]" />
            <strong>Zero Advance – Cash on Delivery</strong>
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-[#FFD700]" />
            <strong>24/7 Outcalls to All Gurgaon 5-Star Hotels</strong>
          </span>
        </div>
      </div>

      {/* 3. Main Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Visual Category Cards Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#671725]">
              Curated Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
              Explore Our Top Escort Categories
            </h2>
            <div className="w-16 h-1 bg-[#671725] mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryVisualGrid.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#671725] text-[#FFD700] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {cat.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 text-white text-[11px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                    {cat.price}
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-sm text-[#111827] group-hover:text-[#671725] transition-colors">
                    <Link href={cat.slug}>{cat.name}</Link>
                  </h3>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={cat.slug}
                      className="text-xs font-bold text-[#671725] hover:underline flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight size={12} />
                    </Link>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20am%20interested%20in%20${encodeURIComponent(cat.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-[#13bc18] hover:bg-[#0fa714] text-white text-xs font-bold rounded shadow-xs"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Authentic Scraped Editorial Sections from Roshni Khanna */}
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
      </div>

      <CTASection />
    </div>
  );
}
