import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import LocationsDirectory, { CompactLocation } from '@/components/LocationsDirectory';
import { siteConfig } from '@/data/siteConfig';
import { locations } from '@/data/locations';
import { isLocationRedirect } from '@/data/locationManifest';

export const metadata: Metadata = {
  title: 'Gurgaon Escort Service Locations & Hotel Outcall Directory | ALINA VIP India',
  description:
    'Find verified VIP escorts and luxury call girls across Gurgaon, Aerocity, and Delhi NCR. Cyber City, DLF Phases 1-5, Golf Course Road & Sohna Road. 20-30 min hotel outcall.',
  alternates: {
    canonical: `${siteConfig.url}/locations`,
  },
  openGraph: {
    title: 'Gurgaon Escort Service Locations & Hotel Outcall Directory | ALINA VIP India',
    description:
      'Find verified VIP escorts and luxury call girls across Gurgaon, Aerocity, and Delhi NCR. Cyber City, DLF Phases 1-5, Golf Course Road & Sohna Road. 20-30 min hotel outcall.',
    url: `${siteConfig.url}/locations`,
    type: 'website',
  },
};

export default function LocationsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: 'Home', path: '/' }, { name: 'Locations' }]} />

      {/* Hero Header Section */}
      <section className="py-16 md:py-24 bg-charcoal-900 border-b border-charcoal-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="container-luxury relative z-10 text-center">
          <p className="section-subtitle text-gold-500 font-sans text-xs tracking-ultra uppercase mb-3 font-semibold">
            Service Coverage Directory
          </p>
          <h1 className="section-title mb-6 font-serif text-4xl md:text-6xl text-white font-light">
            Serving <span className="text-gradient-gold font-normal">Gurgaon &amp; Delhi NCR</span>
          </h1>
          <div className="gold-divider mb-6" />

          {/* Clean Informative Lead */}
          <p className="text-charcoal-300 max-w-3xl mx-auto text-base md:text-lg leading-relaxed font-light">
            ALINA VIP India coordinates discreet, verified escort services across all premier residential sectors, corporate hubs, and five-star hospitality districts in Gurgaon, Aerocity, and Delhi NCR. Select your district below for verified companions with 20 to 30-minute outcall dispatch.
          </p>

          {(() => {
            const compactLocations: CompactLocation[] = locations
              .filter((loc) => !isLocationRedirect(loc.slug))
              .map((loc) => ({
                slug: loc.slug,
                name: loc.name,
                area: loc.area,
                city: loc.city,
                region: loc.region,
                corridor: loc.corridor,
                isHub: loc.isHub,
                shortDescription: loc.shortDescription,
              }));
            return <LocationsDirectory locations={compactLocations} />;
          })()}
        </div>
      </section>

      {/* Hotel & Hospitality Context Section */}
      <section className="py-16 md:py-24 bg-charcoal-800 border-y border-charcoal-700">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-subtitle text-gold-500">Luxury Hospitality</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-6">
                Five-Star Hotel &amp; Luxury Residence Outcalls
              </h2>
              <div className="gold-divider mb-8" />
              <div className="space-y-4 text-charcoal-300 leading-relaxed text-sm md:text-base">
                <p>
                  ALINA VIP caters extensively to guests staying at prestigious five-star hotel properties across Gurgaon and Delhi NCR. Our verified models are adept in five-star hotel etiquette, arriving discreetly dressed in tasteful attire suitable for executive lobbies and luxury suites.
                </p>
                <p>
                  We provide continuous outcall service to premier hotel clusters including The Oberoi Gurgaon, The Trident, The Leela Ambience, Grand Hyatt Gurgaon, ITC Grand Bharat, The Westin Gurgaon, and JW Marriott Aerocity. For location-specific hotel etiquette and booking advice, review our{' '}
                  <Link href="/blog/luxury-hotels-gurgaon-guide" className="text-gold-400 hover:underline font-medium">
                    Gurgaon luxury hotel guide
                  </Link>
                  .
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-charcoal-900/60 border border-charcoal-700 rounded-sm">
                  <Clock className="w-5 h-5 text-gold-400 mb-2" />
                  <p className="text-xs font-bold text-white uppercase tracking-wider">20-30 Min Arrival</p>
                  <p className="text-[11px] text-charcoal-400 mt-1">Prompt dispatch across major corridors</p>
                </div>
                <div className="p-4 bg-charcoal-900/60 border border-charcoal-700 rounded-sm">
                  <ShieldCheck className="w-5 h-5 text-gold-400 mb-2" />
                  <p className="text-xs font-bold text-white uppercase tracking-wider">100% Confidential</p>
                  <p className="text-[11px] text-charcoal-400 mt-1">Private chauffeur &amp; unmarked drop-off</p>
                </div>
              </div>
            </div>

            <div className="luxury-card p-8 bg-gradient-to-br from-charcoal-850 to-charcoal-900 border border-gold-500/20 rounded-2xl">
              <h3 className="font-serif text-2xl text-white mb-4 font-light">
                Need Fast Location Dispatch?
              </h3>
              <p className="text-sm text-charcoal-300 leading-relaxed mb-6">
                Whether you are staying in DLF Phase 1-5, Golf Course Road, Cyber City, or near IGI Airport Aerocity, our VIP concierge team can arrange your verified booking within minutes.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-charcoal-200">
                  <CheckCircle2 size={16} className="text-gold-400 flex-shrink-0" />
                  <span>Immediate room outcalls to any verified luxury hotel suite</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal-200">
                  <CheckCircle2 size={16} className="text-gold-400 flex-shrink-0" />
                  <span>Private residential condominium visits with gated security</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal-200">
                  <CheckCircle2 size={16} className="text-gold-400 flex-shrink-0" />
                  <span>Personalized profile selection based on your preference</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`tel:${siteConfig.phone}`} className="btn-gold flex-1 text-center justify-center">
                  <Phone size={16} /> Call: {siteConfig.phoneDisplay}
                </a>
                <Link href="/contact" className="btn-outline-gold flex-1 text-center justify-center">
                  Reserve Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Editorial Prose Section */}
      <section className="py-20 md:py-28 bg-charcoal-900">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto prose-luxury">
            <h2>Comprehensive Escort Services Across Gurgaon &amp; Delhi NCR</h2>
            <p>
              At ALINA VIP, our mission is to provide accessible, seamless, and thoroughly discreet escort service throughout Gurgaon and the broader National Capital Region. With comprehensive dedicated location guides, our network blankets every prominent business enclave, high-density residential phase, and luxury hotel corridor.
            </p>
            <p>
              From corporate executives attending summits in <Link href="/locations/cyber-city" className="text-gold-400 hover:underline">Cyber City</Link> and <Link href="/locations/golf-course-road" className="text-gold-400 hover:underline">Golf Course Road</Link>, to residents seeking private escort services in <Link href="/locations/dlf-phase-1" className="text-gold-400 hover:underline">DLF Phase 1</Link> or <Link href="/locations/dlf-phase-5" className="text-gold-400 hover:underline">DLF Phase 5</Link>, our verified <Link href="/services" className="text-gold-400 hover:underline">call girls</Link> provide the perfect blend of glamour, emotional intelligence, and discretion.
            </p>
            <p>
              International visitors and domestic transit flyers arriving at Indira Gandhi International Airport benefit from our rapid dispatch service in <Link href="/locations/aerocity" className="text-gold-400 hover:underline">Aerocity</Link> and <Link href="/locations/mahipalpur" className="text-gold-400 hover:underline">Mahipalpur</Link>, enabling enjoyable rendezvous during brief flight layovers or corporate retreats.
            </p>
            <p>
              Browse our complete location roster above or contact our 24/7 concierge desk at{' '}
              <a href={`tel:${siteConfig.phone}`} className="text-gold-400 hover:underline font-bold">
                {siteConfig.phoneDisplay}
              </a>{' '}
              to discuss custom arrangements in any Gurgaon sector or NCR locality.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
