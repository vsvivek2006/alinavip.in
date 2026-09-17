import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, Star, CheckCircle, MapPin, Clock } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';
import { escortModels } from '@/data/models';
import productsData from '@/data/roshni_products.json';

interface Section {
  heading: string;
  level: number;
  paragraphs: string[];
  listItems: string[];
}

interface ProductItem {
  slug: string;
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  type: string;
  sections: Section[];
  specs?: Record<string, string>;
  modelImage?: string;
  images?: { src: string; alt: string }[];
}

const allProducts = (productsData as ProductItem[]).filter(
  (p) => p.slug.startsWith('escorts/') && p.slug.split('/').length >= 3
);

export function generateStaticParams() {
  return allProducts.map((p) => {
    const parts = p.slug.replace(/^escorts\//, '').split('/');
    return {
      category: parts[0],
      slug: parts.slice(1).join('/'),
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const targetSlug = `escorts/${category}/${slug}`;
  const prod = allProducts.find((p) => p.slug === targetSlug);

  if (!prod) {
    return {
      title: 'Gurgaon Escorts Profile | ALINA VIP',
    };
  }

  return {
    title: prod.title,
    description: prod.metaDescription || `Book verified escort ${prod.h1} in Gurgaon. 24/7 5-star hotel outcall and in-call available.`,
    alternates: {
      canonical: `${siteConfig.url}/escorts/${category}/${slug}`,
    },
  };
}

export default async function ProductModelPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const targetSlug = `escorts/${category}/${slug}`;
  const prod = allProducts.find((p) => p.slug === targetSlug);

  if (!prod) {
    notFound();
  }

  // Model Name
  const rawName = prod.h1.split('|')[0].replace(/Gurgaon Escorts/i, '').trim();
  const modelName = rawName || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const categoryLabel = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // Model Image with reliable fallback
  const fallbackImages = [
    '/images/assets/Karina_450x587.jpg',
    '/images/assets/Tanya_450x587.jpg',
    '/images/assets/Neha_450x587.jpg',
    '/images/assets/Siya_450x587.jpg',
    '/images/assets/Mia_450x587.jpg',
    '/images/assets/Nithya_Rai_450x587.jpg',
    '/images/assets/Sheena_450x587.jpg',
    '/images/assets/Geet_450x587.jpg',
    '/images/assets/Pallavi_450x587.jpg',
  ];
  // Deterministic fallback based on slug hash
  const hash = slug.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const fallbackImg = fallbackImages[hash % fallbackImages.length];
  const displayImage = prod.modelImage && prod.modelImage.startsWith('http') ? prod.modelImage : fallbackImg;

  const specs = prod.specs || {};
  const baseCity = specs.base_city || 'Gurgaon';
  const nationality = specs.nationality || 'Indian';
  const age = specs.age || '23';
  const body = specs.body__cm_ || '34-26-34';
  const height = specs.height || "5'5\"";
  const languages = specs.languages || 'English, Hindi';
  const smoker = specs.smoker || 'No';

  const relatedModels = escortModels.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* 1. Header Bar */}
      <div className="bg-[#671725] text-white py-10 px-4 sm:px-6 lg:px-8 shadow-inner border-b border-rose-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Escorts', href: '/escorts' },
                { label: categoryLabel, href: `/categories` },
                { label: modelName },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {prod.h1}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-rose-100/90 font-light max-w-2xl">
            Verified {categoryLabel} companion available for 5-star hotel outcalls and discrete in-call rendezvous in Gurgaon.
          </p>
        </div>
      </div>

      {/* 2. Main Profile Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Portrait Photo & Quick Stats */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white p-4 rounded-xl border border-gray-100 shadow-md">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={displayImage}
                  alt={`${modelName} - ${categoryLabel} in Gurgaon`}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#671725] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-[#FFD700]" />
                  <span>100% Real &amp; Verified</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#0B2154]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                  <MapPin size={13} className="text-rose-300" />
                  <span>{baseCity}</span>
                </div>
              </div>

              {/* Quick Specs Badges */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 text-center">
                <div className="bg-[#FFFDF6] p-2.5 rounded border border-gray-100">
                  <span className="block text-[11px] text-gray-500">Age</span>
                  <span className="font-bold text-[#671725] text-sm">{age} Yrs</span>
                </div>
                <div className="bg-[#FFFDF6] p-2.5 rounded border border-gray-100">
                  <span className="block text-[11px] text-gray-500">Height</span>
                  <span className="font-bold text-[#671725] text-sm">{height}</span>
                </div>
                <div className="bg-[#FFFDF6] p-2.5 rounded border border-gray-100">
                  <span className="block text-[11px] text-gray-500">Figure</span>
                  <span className="font-bold text-[#671725] text-sm">{body}</span>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20book%20${encodeURIComponent(modelName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 bg-[#13bc18] hover:bg-[#0fa714] text-white text-xs font-bold rounded-lg shadow text-center flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="py-3 bg-[#671725] hover:bg-[#52121d] text-white text-xs font-bold rounded-lg shadow text-center flex items-center justify-center gap-1.5 transition-all"
                >
                  <Phone size={15} />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Rates, Specs Table, & Availability */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header & Status */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <span className="inline-block text-xs font-semibold text-[#671725] uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded">
                    {categoryLabel}
                  </span>
                  <h2 className="text-3xl font-black text-[#111827] mt-1">
                    {modelName}
                  </h2>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                    <span className="text-xs font-bold text-gray-600 ml-1">(5.0 ★)</span>
                  </div>
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 justify-end mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Available Right Now for Outcalls
                  </span>
                </div>
              </div>

              {/* Rates Card */}
              <div className="bg-[#F9E1E5]/40 border border-rose-200/60 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-600 uppercase tracking-wider block">Rates</span>
                  <span className="text-2xl font-black text-[#671725]">₹15,000</span>
                  <span className="text-xs text-gray-500 ml-1">/ 1-2 Hours</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-600 uppercase tracking-wider block">Full Night</span>
                  <span className="text-2xl font-black text-[#671725]">₹30,000+</span>
                  <span className="text-xs text-gray-500 ml-1">/ Overnight</span>
                </div>
              </div>

              {/* Bio & Content Paragraphs */}
              {prod.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-3 pt-2">
                  {sec.heading && (
                    <h3 className="text-lg font-bold text-[#111827]">
                      {sec.heading}
                    </h3>
                  )}
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {sec.listItems.length > 0 && (
                    <ul className="space-y-1.5 pl-2">
                      {sec.listItems.map((li, lIdx) => (
                        <li key={lIdx} className="text-sm text-gray-700 flex items-center gap-2">
                          <CheckCircle size={14} className="text-[#671725]" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Detailed Model Stats Table */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-[#111827]">
                Model Specifications &amp; Details
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Base City</span>
                  <span className="font-semibold text-gray-900">{baseCity}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Nationality</span>
                  <span className="font-semibold text-gray-900">{nationality}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Age</span>
                  <span className="font-semibold text-gray-900">{age} Years</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Body Measurements</span>
                  <span className="font-semibold text-gray-900">{body}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Height</span>
                  <span className="font-semibold text-gray-900">{height}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Languages</span>
                  <span className="font-semibold text-gray-900">{languages}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Smoker</span>
                  <span className="font-semibold text-gray-900">{smoker}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Services</span>
                  <span className="font-semibold text-gray-900">In-Call &amp; Out-Call</span>
                </div>
              </div>
            </div>

            {/* 24/7 Availability Table */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <Clock size={18} className="text-[#671725]" /> Working Hours &amp; Availability
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex justify-between p-2 rounded bg-gray-50 border border-gray-100">
                    <span className="font-medium text-gray-900">{day}</span>
                    <span className="text-emerald-600 font-semibold">00:00 – 24:00 (24/7)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Profiles */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-[#111827]">
                Other Top Companions in Gurgaon
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedModels.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/escorts/${m.slug}`}
                    className="group flex flex-col rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-[3/4] w-full bg-gray-100">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-2.5 bg-white text-center">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate group-hover:text-[#671725]">
                        {m.name}
                      </h4>
                      <span className="text-[11px] text-gray-500 block truncate">
                        {m.category}
                      </span>
                      <span className="text-xs font-black text-[#671725] block mt-0.5">
                        {m.rates.oneShot}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom CTA */}
      <CTASection />
    </div>
  );
}
