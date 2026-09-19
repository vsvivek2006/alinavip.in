import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';
import { getAssetUrl } from '@/lib/assets';
import productsData from '@/data/catalog_products.json';

interface ProductItem {
  slug: string;
  h1: string;
  modelImage?: string;
}

export const metadata: Metadata = {
  title: `${siteConfig.city} Escorts Catalog – Book High-Class Call Girls | ${siteConfig.name}`,
  description:
    'Browse our complete catalog of verified VIP, Russian, independent, and high-profile call girls in ${siteConfig.city}. 24/7 doorstep 5-star hotel delivery.',
  alternates: {
    canonical: `${siteConfig.url}/shop`,
  },
};

export default function ShopPage() {
  const modelProds = (productsData as ProductItem[]).filter(
    (p) => p.slug.startsWith('escorts/') && p.slug.split('/').length >= 3
  );

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* 1. Hero Banner */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-rose-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Escorts Shop' },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            {siteConfig.city} Escorts – Complete Catalog &amp; Profiles
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100/90 font-light max-w-3xl leading-relaxed">
            Choose from over 200+ verified independent, Russian, college, and celebrity escorts in {siteConfig.city} available for 24/7 hotel outcall service.
          </p>
        </div>
      </div>

      {/* 2. Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {modelProds.map((prod) => {
            const rawName = prod.h1.split('|')[0].replace(/Gurgaon Escorts/i, '').trim();
            const modelName = rawName || prod.slug.split('/').pop()?.replace(/-/g, ' ');
            const categoryPart = prod.slug.split('/')[1]?.replace(/-/g, ' ');
            const imgSrc = getAssetUrl(prod.modelImage);
            const price = '₹15,000';

            return (
              <div
                key={prod.slug}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <img
                    src={imgSrc}
                    alt={modelName}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#671725]/90 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                    Verified
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-[#FFD700] text-[11px] font-semibold px-2 py-0.5 rounded">
                    {categoryPart}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-[#111827] group-hover:text-[#671725] transition-colors truncate">
                      {modelName}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                      <span>Gurgaon</span>
                      <span className="font-black text-[#671725] text-sm">{price}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20book%20${encodeURIComponent(modelName || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs font-bold rounded-xl text-center"
                    >
                      WhatsApp
                    </a>
                    <Link
                      href={`/${prod.slug}`}
                      className="py-2.5 px-4 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs text-center flex items-center justify-center"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
