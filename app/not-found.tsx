import Link from 'next/link';
import { Phone, Home, Compass, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function NotFound() {
  return (
    <section className="min-h-[75vh] flex items-center justify-center bg-[#FFFDF6] py-20 px-4 text-[#2d2d2d]">
      <div className="max-w-2xl w-full text-center">
        <span className="inline-block px-4 py-1 bg-primary-wine/10 text-primary-wine rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          404 Error
        </span>

        <h1 className="text-7xl md:text-9xl font-extrabold text-[#671725] mb-2 tracking-tight">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
          Page or Profile Not Found
        </h2>

        <p className="text-gray-600 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
          The requested escort profile or directory page may have moved, been renamed, or is currently unavailable. Please explore our verified roster or reach out to our concierge desk.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs"
          >
            <Home size={16} /> Return to Homepage
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/90 hover:bg-white text-[#671725] border border-rose-200/90 hover:border-[#671725] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 font-bold rounded-xl text-xs"
          >
            <Compass size={16} /> View Photo Gallery
          </Link>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
          <span>Need immediate assistance?</span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-1.5 text-[#111827] hover:text-primary-wine font-bold"
          >
            <Phone size={14} className="text-luxury-gold" /> {siteConfig.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold"
          >
            <MessageCircle size={14} /> WhatsApp Concierge
          </a>
        </div>
      </div>
    </section>
  );
}
