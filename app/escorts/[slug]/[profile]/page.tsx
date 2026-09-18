import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, Star, CheckCircle, MapPin, Clock } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';
import { escortModels } from '@/data/models';
import { getAssetUrl } from '@/lib/assets';
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
      slug: parts[0],
      profile: parts.slice(1).join('/'),
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; profile: string }>;
}): Promise<Metadata> {
  const { slug, profile } = await params;
  const targetSlug = `escorts/${slug}/${profile}`;
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
      canonical: `${siteConfig.url}/escorts/${slug}/${profile}`,
    },
  };
}

export default async function ProductModelPage({
  params,
}: {
  params: Promise<{ slug: string; profile: string }>;
}) {
  const { slug, profile } = await params;
  const targetSlug = `escorts/${slug}/${profile}`;
  const prod = allProducts.find((p) => p.slug === targetSlug);

  if (!prod) {
    notFound();
  }

  // Model Name
  const rawName = prod.h1.split('|')[0].replace(/Gurgaon Escorts/i, '').trim();
  const modelName = rawName || profile.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const categoryLabel = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // Model Image with reliable fallback
  const fallbackImages = [
    '/images/assets/Karina.jpg',
    '/images/assets/Tanya.jpg',
    '/images/assets/Neha.jpg',
    '/images/assets/Escort_Service_DLF_Gurgaon.jpg',
    '/images/assets/Mia.jpg',
    '/images/assets/Nithya_High_Profile_Escort_In_Mahipalpur.jpg',
    '/images/assets/Sheena_Indian_Escort_In_Gurgaon.jpg',
    '/images/assets/Geet.jpg',
    '/images/assets/Pallavi.jpg',
  ];
  // Deterministic fallback based on profile slug hash
  const hash = profile.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const fallbackImg = fallbackImages[hash % fallbackImages.length];
  // Ensure all profile images strictly route through our ImageKit CDN
  const isImageKit = prod.modelImage && prod.modelImage.includes('ik.imagekit.io');
  const displayImage = getAssetUrl(isImageKit ? prod.modelImage : fallbackImg);

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
                <Image
                  src={displayImage}
                  alt={`${modelName} - ${categoryLabel} in Gurgaon`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-4 left-4 bg-[#671725] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-[#FFD700]" />
                  <span>100% Real &amp; Verified</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#671725]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
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
                  className="py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs text-center flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="py-3 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs text-center flex items-center justify-center gap-1.5"
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
                    <p key={pIdx} className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {p}
                    </p>
                  ))}
                  {sec.listItems && sec.listItems.length > 0 && (
                    <ul className="space-y-1.5 pl-5 list-disc text-gray-700 text-sm sm:text-base">
                      {sec.listItems.map((li, lIdx) => (
                        <li key={lIdx}>{li}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Specifications Details Table */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xl font-black text-[#111827] border-b border-gray-100 pb-3">
                Complete Specifications &amp; Attributes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Base Location</span>
                  <span className="font-semibold text-gray-900">{baseCity}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Nationality</span>
                  <span className="font-semibold text-gray-900">{nationality}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Age</span>
                  <span className="font-semibold text-gray-900">{age} Years</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Height</span>
                  <span className="font-semibold text-gray-900">{height}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Measurements</span>
                  <span className="font-semibold text-gray-900">{body}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Languages</span>
                  <span className="font-semibold text-gray-900">{languages}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Smoker</span>
                  <span className="font-semibold text-gray-900">{smoker}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500">Service Area</span>
                  <span className="font-semibold text-gray-900">Gurgaon &amp; Delhi NCR</span>
                </div>
              </div>
            </div>

            {/* In-Call / Out-Call Notice */}
            <div className="bg-[#671725] text-white p-6 rounded-xl space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock size={18} className="text-[#FFD700]" />
                <span>Express Doorstep Delivery Across Gurgaon</span>
              </h3>
              <p className="text-sm text-rose-100/90 leading-relaxed">
                {modelName} is available for rapid dispatch to luxury 5-star hotels across DLF Cyber City, Golf Course Road, Sector 29, Sohna Road, and Ambience Island. Typical arrival window is 20 to 30 minutes from reservation confirmation.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="bg-white/10 px-3 py-1 rounded-full">✓ 100% Cash On Delivery</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">✓ No Advance Payment</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">✓ Direct Hotel Outcall</span>
              </div>
            </div>

            {/* Related Profiles Carousel/Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#111827]">
                  Other Verified Escorts in Gurgaon
                </h3>
                <Link
                  href="/escorts"
                  className="text-xs font-bold text-[#671725] hover:underline"
                >
                  View All Escorts →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedModels.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/escorts/${m.slug}`}
                    className="group block rounded-xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
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
