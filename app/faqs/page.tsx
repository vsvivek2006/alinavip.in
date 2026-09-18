'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Phone,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';
import pagesData from '@/data/catalog_pages.json';

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
  sections: Section[];
}

const faqsData = (pagesData as ContentItem[]).find((p) => p.slug === 'faqs');
const rawSections = faqsData?.sections || [];

// Filter out nav/footer sections
const faqItems = rawSections.filter((s) => {
  if (!s.heading || s.paragraphs.length === 0) return false;
  const h = s.heading.toLowerCase();
  return (
    !h.includes('main menu') &&
    !h.includes('categories') &&
    !h.includes('gurgaon locations') &&
    !h.includes('contact details') &&
    !h.includes('age verification')
  );
});

export default function FAQsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-[#FFFDF6] min-h-screen text-[#2d2d2d]">
      {/* 1. Header Banner */}
      <section className="relative bg-[#671725] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FFD700] shadow-md">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQs' }]} />
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#FFD700] text-xs font-semibold uppercase tracking-wider mb-3">
            ★ 24/7 Client Help &amp; Guidance
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Frequently Asked Questions About Escorts Services
          </h1>
          <p className="text-sm md:text-base text-rose-100 max-w-2xl mx-auto leading-relaxed font-light">
            Find answers to commonly asked questions about our verified escort services, in-call/outcall appointments, and booking procedures in Gurgaon.
          </p>
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
            <CheckCircle2 size={18} className="text-[#FFD700]" />
            <strong>Zero Advance Payment Required</strong>
          </span>
          <span className="flex items-center gap-2">
            <Clock size={18} className="text-[#FFD700]" />
            <strong>24/7 Rapid Response</strong>
          </span>
        </div>
      </section>

      {/* 3. Main FAQ Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Everything You Need To Know
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-2 rounded-full" />
        </div>

        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            const questionText = item.heading
              .replace(/&rsquo;/g, "'")
              .replace(/&lsquo;/g, "'")
              .replace(/&amp;/g, '&');

            return (
              <div
                key={idx}
                className="border border-gray-200/90 rounded-xl overflow-hidden bg-white shadow-xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 text-left font-bold text-sm sm:text-base text-[#111827] flex items-center justify-between gap-4 hover:text-[#671725] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-3">
                    <HelpCircle size={18} className="text-[#671725] shrink-0 mt-0.5" />
                    <span>{questionText}</span>
                  </span>
                  <span
                    className={`p-1 rounded-full transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-rose-50 text-[#671725]' : 'text-gray-400'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-[#FFFDF6]/50 space-y-2">
                    {item.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>
                        {p
                          .replace(/\+91-?9971819077/g, siteConfig.phoneDisplay)
                          .replace(/&times;/g, 'x')
                          .replace(/&rsquo;/g, "'")
                          .replace(/&lsquo;/g, "'")
                          .replace(/&rdquo;/g, '"')
                          .replace(/&ldquo;/g, '"')
                          .replace(/&#8377;/g, '₹')}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Help Card */}
        <div className="bg-white p-6 rounded-xl border border-gray-200/80 shadow-sm text-center space-y-3 mt-10">
          <h3 className="font-bold text-base text-[#111827]">Still Have Questions?</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Our private concierge is available 24 hours a day, 7 days a week to answer any question or arrange immediate hotel dispatch.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ALINA%20VIP,%20I%20have%20a%20question%20about%20your%20services`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp Inquiry
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="px-5 py-2.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm flex items-center gap-2"
            >
              <Phone size={16} /> Call: {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </main>

      <CTASection />
    </div>
  );
}
