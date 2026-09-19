import Link from 'next/link';
import { Compass, Home, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function CategoryNotFound() {
  return (
    <section className="min-h-[75vh] flex items-center justify-center bg-[#FFFDF6] py-20 px-4 text-[#2d2d2d]">
      <div className="max-w-2xl w-full text-center">
        <span className="inline-block px-4 py-1 bg-primary-wine/10 text-primary-wine rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          Category Not Found
        </span>

        <h1 className="text-7xl md:text-9xl font-extrabold text-[#671725] mb-2 tracking-tight">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
          Escort Category Unavailable
        </h2>

        <p className="text-gray-600 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
          The escort category or classification you requested is not available. Please explore our verified escort categories or photo gallery.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 bg-[#671725] hover:bg-[#50121d] text-white font-bold px-7 py-3.5 rounded-xl text-xs transition-colors shadow-md"
          >
            <Compass size={16} /> All Escort Categories
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-2 border-primary-wine text-primary-wine hover:bg-primary-wine hover:text-white px-7 py-3.5 rounded-xl font-bold text-xs transition-colors"
          >
            <Home size={16} /> Return to Homepage
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
            className="inline-flex items-center gap-1.5 text-[#13bc18] hover:text-[#0fa814] font-bold"
          >
            <MessageCircle size={14} /> WhatsApp Concierge
          </a>
        </div>
      </div>
    </section>
  );
}
