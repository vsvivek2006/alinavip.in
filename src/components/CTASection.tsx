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
            className="inline-flex items-center gap-2 px-7 py-3 border border-[#671725] text-[#671725] hover:bg-[#671725] hover:text-white text-xs md:text-sm font-semibold rounded shadow-xs transition-all duration-300"
          >
            <span>About Us</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#671725] hover:bg-[#52121d] text-white text-xs md:text-sm font-semibold rounded shadow-md transition-all duration-300"
          >
            <span>Escort Profiles</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href={"tel:" + siteConfig.phone}
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#0B2154] hover:bg-[#07173b] text-white text-xs md:text-sm font-semibold rounded shadow-md transition-all duration-300"
          >
            <Phone size={14} />
            <span>{siteConfig.phoneDisplay}</span>
          </a>

          <a
            href={"https://wa.me/" + siteConfig.whatsapp + "?text=Hi%20ALINA%20VIP,%20I%20want%20to%20book%20an%20escort."}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs md:text-sm font-semibold rounded shadow-md transition-all duration-300"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
