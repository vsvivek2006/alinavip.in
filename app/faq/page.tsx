import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import FAQAccordion from '@/components/FAQAccordion';
import { siteConfig, generalFaqs, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: `Frequently Asked Questions (FAQ) | VIP Escort Service in ${siteConfig.city} | ${siteConfig.name}`,
  description: `Find answers to common questions about booking VIP escorts in ${siteConfig.city}: outcall arrival times, verified photos, zero-advance cash payment, and client privacy.`,
  alternates: {
    canonical: `${siteConfig.url}/faq`,
    languages: getAlternateLanguages('/faq'),
  },
  openGraph: {
    title: `Frequently Asked Questions | ${siteConfig.name} ${siteConfig.city}`,
    description: `Everything you need to know about booking verified call girls, outcall timing, hotel visits, and privacy policies.`,
    url: `${siteConfig.url}/faq`,
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Frequently Asked Questions | ${siteConfig.name}`,
    description: `Answers about VIP escort booking, cash on delivery, and hotel outcalls in ${siteConfig.city}.`,
    images: ['/og-image.jpg'],
  },
};

export default function FAQPage() {
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

      {/* 1. Page Title Bar */}
      <section className="relative bg-[#671725] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-luxury-gold shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'FAQ', href: '/faq' },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto">
            Everything You Need to Know About VIP Escort Bookings, Hotel Outcalls, and Rates in {siteConfig.city}
          </p>
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

            <FAQAccordion items={generalFaqs} />
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
                    `Hello ${siteConfig.name}, I have an inquiry about escort bookings in ${siteConfig.city}.`
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
                    <span>{siteConfig.city} Sectors</span>
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
