import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { Phone, MessageCircle, ArrowRight, ShieldCheck, Clock, Hotel } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#2d1b0e] text-white border-t border-gold-500/20">
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="container-luxury relative z-10 text-center max-w-4xl px-4">
        <span className="inline-block px-5 py-2 border border-gold-500/30 rounded-full text-gold-400 text-xs font-semibold tracking-wider uppercase mb-5 bg-gold-500/10 backdrop-blur-sm">
          ★ Reserve Your Booking
        </span>

        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
          Reserve Your Private <span className="text-gradient-gold font-normal">Rendezvous in Gurgaon</span>
        </h2>

        <div className="gold-divider mx-auto mb-6" />

        <p className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed text-base md:text-lg font-light">
          Experience the pinnacle of luxury companionship with ALINA VIP India. Our private concierge desk coordinates in-person verified call girls, Russian models, and elite companions for confidential 5-star hotel suite and residential outcalls across Gurgaon and Delhi NCR.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <a
            href={`tel:${siteConfig.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-neutral-950 font-bold px-8 py-4 rounded-full text-sm transition-all shadow-xl hover:shadow-gold-500/20"
          >
            <Phone size={16} /> Call: {siteConfig.phoneDisplay}
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ALINA%20VIP,%20I%20would%20like%20to%20inquire%20about%20your%20escort%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-emerald-500/60 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50 font-bold text-sm transition-all shadow-md"
          >
            <MessageCircle size={16} className="text-emerald-400" /> WhatsApp
          </a>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 px-8 py-4 rounded-full font-semibold text-sm transition-all"
          >
            Book Online <ArrowRight size={16} />
          </Link>
        </div>

        {/* Bottom Trust Highlights */}
        <div className="flex flex-wrap justify-center items-center gap-6 pt-8 border-t border-white/10 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-gold-400" /> 100% In-Person Verified
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={15} className="text-gold-400" /> 20-30 Min Rapid Dispatch
          </span>
          <span className="flex items-center gap-1.5">
            <Hotel size={15} className="text-gold-400" /> 5-Star Hotel &amp; Residence Outcall
          </span>
        </div>
      </div>
    </section>
  );
}
