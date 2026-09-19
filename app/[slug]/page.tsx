import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, Shield, CheckCircle, BookOpen } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';
import { escortModels } from '@/data/models';
import pagesData from '@/data/catalog_pages.json';
import postsData from '@/data/catalog_posts.json';

interface Section {
  heading: string;
  level: number;
  paragraphs: string[];
  listItems: string[];
}

interface ContentItem {
  slug: string;
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  type: string;
  sections: Section[];
  images?: { src: string; alt: string }[];
}

const reserved = new Set([
  'about', 'about-us', 'blog', 'categories', 'category', 'contact', 'contact-us', 'disclaimer',
  'erotic-massage-in-gurgaon', 'escort-service-for-1-2-3-hours', 'escort-service-full-night',
  'escort-service-in-gurgaon', 'escorts', 'escorts-categories', 'faq', 'faqs',
  'full-body-sensual-massage', 'gallery', 'girlfriend-experience-in-gurgaon',
  'gurgaon-escorts-phone-number', 'gurgaon-escorts-rates', 'hotels',
  'in-out-call-girls-gurgaon', 'locations', 'phone-number', 'privacy-policy',
  'rates', 'services', 'terms', 'shop'
]);

const validPages = (pagesData as ContentItem[]).filter(
  (p) => !p.slug.includes('/') && !reserved.has(p.slug) && p.slug !== ''
);

const validPosts = (postsData as ContentItem[]).filter(
  (p) => !p.slug.includes('/') && !reserved.has(p.slug) && p.slug !== ''
);

const allItems = [...validPages, ...validPosts];
const itemsBySlug = new Map(allItems.map((item) => [item.slug, item]));

export const dynamicParams = false;

export function generateStaticParams() {
  return allItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = itemsBySlug.get(slug);

  if (!item) {
    return {
      title: 'Gurgaon Escorts – ALINA VIP',
    };
  }

  return {
    title: item.title,
    description: item.metaDescription || `${item.h1} – 24/7 Verified In-Call & Out-Call Escort Service in Gurgaon with ALINA VIP.`,
    alternates: {
      canonical: `${siteConfig.url}/${slug}`,
    },
  };
}

export default async function DynamicSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = itemsBySlug.get(slug);

  if (!item) {
    notFound();
  }

  const isPost = item.type === 'post';
  const availableModels = escortModels.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* 1. Header Hero Banner */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-rose-900/40">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                isPost ? { label: 'Blog', href: '/blog' } : { label: 'Escorts', href: '/escorts' },
                { label: item.h1 },
              ]}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFD700] text-xs font-semibold uppercase tracking-wider mb-3">
            {isPost ? (
              <>
                <BookOpen size={14} /> VIP Escort &amp; Dating Guide
              </>
            ) : (
              <>
                <Shield size={14} /> 100% Real &amp; Verified Service
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {item.h1}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-rose-100/90 font-light max-w-3xl leading-relaxed">
            {isPost
              ? 'Expert advice, romantic tips, and insider knowledge from Gurgaon’s premier escort agency.'
              : 'Top-class female escort service in Gurgaon with doorstep outcalls to luxury hotels and residences.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20am%20inquiring%20about%20${encodeURIComponent(item.h1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2"
            >
              <MessageCircle size={16} />
              <span>Book via WhatsApp</span>
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="px-6 py-2.5 bg-white/90 hover:bg-white text-[#671725] border border-rose-200/90 hover:border-[#671725] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2"
            >
              <Phone size={16} />
              <span>Direct Call: {siteConfig.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {item.sections.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-4"
              >
                {sec.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111827] border-b border-gray-100 pb-3">
                    {sec.heading}
                  </h2>
                )}

                {sec.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-gray-700 text-sm sm:text-base leading-relaxed"
                  >
                    {p}
                  </p>
                ))}

                {sec.listItems.length > 0 && (
                  <ul className="space-y-2 pt-2">
                    {sec.listItems.map((li, lIdx) => (
                      <li
                        key={lIdx}
                        className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700"
                      >
                        <CheckCircle
                          size={17}
                          className="text-[#671725] shrink-0 mt-0.5"
                        />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Rates Table (if location/service page) */}
            {!isPost && (
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-[#111827]">
                  Gurgaon Escort Service Rates &amp; Packages
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-[#FFFDF6] p-4 rounded-lg border border-gray-200 text-center">
                    <span className="block text-xs text-gray-500 font-medium">1 - 2 Hours</span>
                    <span className="text-lg font-black text-[#671725]">₹15,000</span>
                  </div>
                  <div className="bg-[#FFFDF6] p-4 rounded-lg border border-gray-200 text-center">
                    <span className="block text-xs text-gray-500 font-medium">2 - 4 Hours</span>
                    <span className="text-lg font-black text-[#671725]">₹20,000</span>
                  </div>
                  <div className="bg-[#FFFDF6] p-4 rounded-lg border border-gray-200 text-center">
                    <span className="block text-xs text-gray-500 font-medium">5 - 6 Hours</span>
                    <span className="text-lg font-black text-[#671725]">₹25,000</span>
                  </div>
                  <div className="bg-[#FFFDF6] p-4 rounded-lg border border-gray-200 text-center">
                    <span className="block text-xs text-gray-500 font-medium">Full Night</span>
                    <span className="text-lg font-black text-[#671725]">₹30,000+</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* VIP Guarantee Box */}
            <div className="bg-[#671725] text-white p-6 rounded-xl shadow-md space-y-4">
              <h3 className="text-lg font-bold text-[#FFD700] flex items-center gap-2">
                <Shield size={18} /> Why Choose ALINA VIP?
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-100">
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-[#FFD700] shrink-0 mt-0.5" />
                  <span>100% Genuine, verified profile pictures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-[#FFD700] shrink-0 mt-0.5" />
                  <span>No upfront payment required (Pay on arrival)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-[#FFD700] shrink-0 mt-0.5" />
                  <span>Doorstep 5-star hotel delivery in 20-30 mins</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-[#FFD700] shrink-0 mt-0.5" />
                  <span>Absolute privacy and client confidentiality</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-white/10">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="w-full block py-2.5 bg-white text-[#671725] hover:bg-rose-50 text-center text-xs font-bold rounded shadow transition-all"
                >
                  Call 24/7 Concierge Hotline
                </a>
              </div>
            </div>

            {/* Featured Call Girls */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-[#111827]">
                Featured Escorts in Gurgaon
              </h4>
              <div className="space-y-3">
                {availableModels.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/escorts/${m.slug}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100 group"
                  >
                    <div className="relative w-14 h-16 rounded overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h5 className="font-bold text-sm text-[#111827] truncate group-hover:text-[#671725]">
                        {m.name}
                      </h5>
                      <span className="text-xs text-gray-500 block truncate">
                        {m.category} • {m.age} Yrs
                      </span>
                      <span className="text-xs font-bold text-[#671725]">
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

      {/* 3. Bottom CTA Section */}
      <CTASection />
    </div>
  );
}
