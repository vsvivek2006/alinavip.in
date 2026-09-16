import Link from 'next/link';
import { Phone, ArrowRight, ShieldCheck, Lock, Clock, Star } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

const trustPillars = [
  { icon: ShieldCheck, title: 'Certified Real Models', desc: 'Strict zero-catfish policy' },
  { icon: Lock, title: 'Absolute Secrecy', desc: 'Zero client footprint' },
  { icon: Clock, title: '20-30 Min Arrival', desc: 'Direct hotel & home dispatch' },
  { icon: Star, title: 'Cash On Delivery', desc: 'Verify call girl first' },
];

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#050508] via-[#0C0B14] to-[#141022]">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-float transform-gpu" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float transform-gpu"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="container-luxury relative z-10 text-center pt-24 pb-16">
          <p className="section-subtitle text-gold-400 font-sans text-xs md:text-sm tracking-ultra uppercase mb-4 animate-fade-down">
            #1 Premier Escort Agency • Gurgaon
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-up leading-tight">
            Escort Service in <span className="text-gradient-gold">Gurgaon</span>
          </h1>

          <p
            className="text-charcoal-300 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Gurgaon&apos;s leading verified <Link href="/services" className="text-gold-400 hover:underline font-medium">escorts service in Gurgaon</Link>. Elite <Link href="/category/vip-call-girls" className="text-gold-400 hover:underline font-medium">VIP call girls</Link> with genuine profiles and 20–30 min discreet outcalls across all sectors.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up mb-12"
            style={{ animationDelay: '0.4s' }}
          >
            <Link
              href="/services"
              className="btn-gold shadow-lg shadow-gold-500/20"
            >
              Explore Profiles <ArrowRight size={16} />
            </Link>
            <a href={`tel:${siteConfig.phone}`} className="btn-outline-gold">
              <Phone size={16} /> {siteConfig.phoneDisplay}
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-charcoal-700/60">
            {trustPillars.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 text-left p-2">
                  <Icon size={20} className="text-gold-400 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white font-medium">{item.title}</p>
                    <p className="text-[10px] text-charcoal-400">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
        </div>
      </section>

      <section className="py-14 bg-charcoal-800 border-y border-charcoal-700">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-gold-500 font-sans text-xs tracking-ultra uppercase mb-2 font-semibold">
                Prompt 20-30 Minute Outcall Across Gurgaon &amp; NCR
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-white font-light">
                Bespoke call girl reservations For Distinguished Hotel Suites &amp; Residences
              </h2>
            </div>
            <div className="flex gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn-gold whitespace-nowrap"
              >
                <Phone size={16} /> Call Now: {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
