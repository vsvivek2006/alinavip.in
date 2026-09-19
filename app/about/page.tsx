import type { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle, Phone, MessageCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';
import { getAssetUrl } from '@/lib/assets';
import pagesData from '@/data/catalog_pages.json';

interface Section {
  heading: string;
  level: number;
  paragraphs: string[];
  listItems?: string[];
}

interface PageItem {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  sections: Section[];
}

const aboutData = (pagesData as PageItem[]).find((p) => p.slug === 'about-us');

export const metadata: Metadata = {
  title: aboutData?.title ? aboutData.title.replace('ALINA VIP', siteConfig.name) : 'About Us | ALINA VIP',
  description: (aboutData && aboutData.metaDescription) ? aboutData.metaDescription : 'ALINA VIP is the premier luxury escort service in Gurgaon and Aerocity, providing 100% verified VIP call girls, discreet hotel outcalls, and 24/7 private concierge booking.',
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const sections = aboutData?.sections || [];

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* 1. Hero Title Banner */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-rose-900/40">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-4 flex justify-center">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#FFD700] text-xs font-semibold uppercase tracking-wider mb-3">
            ★ Premier Escort Agency in Gurgaon
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            About {siteConfig.name}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100/90 font-light max-w-2xl mx-auto leading-relaxed">
            Your trusted destination for genuine escort service, 100% verified independent profiles, and 5-star hotel outcall delivery across Gurgaon &amp; Delhi NCR.
          </p>
        </div>
      </div>

      {/* 2. Main Editorial Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Intro Highlight Box with Authentic Asset */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              {siteConfig.name} Gurgaon Escort Agency – Your Place To Seek 100% Satisfaction
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Our Gurgaon escort agency is the leading destination for exotic fun and pleasure. It is the one stop destination for gentlemen seeking refined women for love making and adult entertainment. Our escort agency has years of experience in the luxury hospitality and adult entertainment industry.
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              We have been dealing with clients for many years and have always satisfied their needs and desires. What makes our agency so special is the availability of high-end escort services and top-tier girls. We always bring exciting and top ranking escorts to accompany you 24/7.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20${encodeURIComponent(siteConfig.name)},%20I%20want%20to%20know%20more%20about%20your%20services`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm flex items-center gap-2"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="px-5 py-2.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm flex items-center gap-2"
              >
                <Phone size={16} /> Call: {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="md:col-span-5 relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-md">
            <Image
              src={getAssetUrl('/images/about-hero.webp')}
              alt="About ALINA VIP Escort Service in Gurgaon"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>
        </div>

        {/* All Remaining Exact Long-Form Scraped Sections */}
        {sections.slice(1).map((sec: Section, idx: number) => {
          const hasListItems = sec.listItems && sec.listItems.length > 0;
          if (!sec.heading && sec.paragraphs.length === 0 && !hasListItems) return null;
          return (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-4"
            >
              {sec.heading && (
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827] border-b border-gray-100 pb-3">
                  {sec.heading.replace(/ALINA VIP/gi, siteConfig.name).replace(/ALINA VIP/gi, siteConfig.name)}
                </h3>
              )}
              {sec.paragraphs.map((p: string, pIdx: number) => (
                <p key={pIdx} className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {p.replace(/ALINA VIP/gi, siteConfig.name).replace(/ALINA VIP/gi, siteConfig.name)}
                </p>
              ))}
              {sec.listItems && sec.listItems.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {sec.listItems.map((li: string, lIdx: number) => (
                    <li key={lIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700">
                      <CheckCircle size={16} className="text-[#671725] shrink-0 mt-1" />
                      <span>{li.replace(/ALINA VIP/gi, siteConfig.name).replace(/ALINA VIP/gi, siteConfig.name)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <CTASection />
    </div>
  );
}
