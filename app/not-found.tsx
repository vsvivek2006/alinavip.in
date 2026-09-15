import Link from 'next/link';
import { Phone, Home, Compass, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#050508] via-[#0C0B14] to-[#141022] py-24 md:py-32">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="container-luxury relative z-10 text-center max-w-2xl px-4">
        <span className="inline-block px-4 py-1.5 border border-gold-500/30 rounded-full text-gold-400 text-xs font-semibold tracking-wider uppercase mb-6 bg-gold-500/10 backdrop-blur-sm">
          404 Error
        </span>

        <h1 className="font-serif text-6xl md:text-8xl text-white font-light mb-4">
          4<span className="text-gold-500 font-normal">0</span>4
        </h1>

        <h2 className="font-serif text-2xl md:text-3xl text-white font-medium mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed font-light">
          The page or profile you are looking for may have moved, been updated, or is no longer available. Explore our premier VIP escorts or contact our 24/7 concierge desk.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-neutral-950 font-bold px-7 py-3.5 rounded-full text-sm transition-all shadow-lg hover:shadow-xl"
          >
            <Home size={16} /> Return to Homepage
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 px-7 py-3.5 rounded-full font-semibold text-sm transition-all"
          >
            <Compass size={16} /> View All Escort Services
          </Link>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
          <span>Need immediate assistance?</span>
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 font-medium"
          >
            <Phone size={14} /> {siteConfig.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <MessageCircle size={14} /> WhatsApp Concierge
          </a>
        </div>
      </div>
    </section>
  );
}
