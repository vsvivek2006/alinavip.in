'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ChevronDown,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import CTASection from '@/components/CTASection';
import { siteConfig, generalFaqs } from '@/data/siteConfig';

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-[#FFFDF6] min-h-screen text-[#2d2d2d]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* 1. Page Title Bar (Roshni Khanna exact page-title-bar-01) */}
      <section className="relative bg-[#671725] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-luxury-gold shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto">
            Everything You Need to Know About VIP Escort Bookings, Hotel Outcalls, and Rates in Gurgaon
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs md:text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-luxury-gold font-semibold">FAQ</span>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="bg-[#671725] text-white py-4 px-4 shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-luxury-gold" />
            <strong>100% Genuine Verified Profiles</strong>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-luxury-gold" />
            <strong>No Advance Payment — Cash On Delivery</strong>
          </span>
          <span className="flex items-center gap-2">
            <Clock size={18} className="text-luxury-gold" />
            <strong>24/7 Instant Hotel Outcalls</strong>
          </span>
        </div>
      </section>

      {/* 3. Main FAQ Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Interactive FAQ Accordions */}
          <div className="lg:col-span-2 space-y-4">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-wine flex items-center gap-1.5">
                <HelpCircle size={15} /> Transparent Answers
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
                Client Questions &amp; Verification Protocol
              </h2>
              <div className="w-16 h-1 bg-primary-wine mt-3 rounded-full" />
            </div>

            {generalFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#671725] bg-white shadow-md'
                      : 'border-gray-200 bg-white hover:border-[#671725]/50'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-base md:text-lg text-[#111827] focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className={isOpen ? 'text-[#671725]' : 'text-[#111827]'}>
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#671725] text-white rotate-180'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-4 bg-[#FFFDF6]">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Booking Card */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-[#671725] text-white p-8 rounded-2xl shadow-xl text-center border-2 border-luxury-gold/50">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={28} className="text-luxury-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">Have More Questions?</h3>
              <p className="text-xs text-gray-200 leading-relaxed mb-6">
                Our confidential reservation coordinators are available 24/7 on WhatsApp or direct phone call.
              </p>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    'Hello ALINA VIP, I have an inquiry about escort bookings in Gurgaon.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle size={18} />
                  <span>Inquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="w-full py-3.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Phone size={17} className="text-luxury-gold" />
                  <span>Call: {siteConfig.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-[#111827] text-sm mb-3">Popular Directories</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li>
                  <Link href="/gallery" className="hover:text-primary-wine flex items-center justify-between">
                    <span>Verified Photo Gallery</span>
                    <span>&rarr;</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-primary-wine flex items-center justify-between">
                    <span>All Luxury Services</span>
                    <span>&rarr;</span>
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="hover:text-primary-wine flex items-center justify-between">
                    <span>108 Gurgaon Sectors</span>
                    <span>&rarr;</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary-wine flex items-center justify-between">
                    <span>Contact Concierge Desk</span>
                    <span>&rarr;</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>

        </div>
      </main>

      <CTASection />
    </div>
  );
}
