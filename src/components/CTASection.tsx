'use client';

import Link from 'next/link';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-[#FFFDF6] border-t border-b border-[#EFE8DC] text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#671725] leading-tight">
          Ready For An Ultimate Evening With One of Our Beautiful Escorts?
        </h2>

        <div className="w-16 h-1 bg-[#671725] mx-auto rounded-full" />

        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Contact ALINA VIP today and find the perfect female escort for an unforgettable intimate experience in Gurgaon.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white/90 hover:bg-white text-[#671725] border border-rose-200/90 hover:border-[#671725] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs md:text-sm font-semibold rounded-xl"
          >
            <span>About Us</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs md:text-sm font-semibold rounded-xl"
          >
            <span>Escort Profiles</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href={"tel:" + siteConfig.phone}
            className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs md:text-sm font-semibold rounded-xl"
          >
            <Phone size={14} />
            <span>{siteConfig.phoneDisplay}</span>
          </a>

          <a
            href={"https://wa.me/" + siteConfig.whatsapp + "?text=Hi%20ALINA%20VIP,%20I%20want%20to%20book%20an%20escort."}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs md:text-sm font-bold rounded-xl"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
