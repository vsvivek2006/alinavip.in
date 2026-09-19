import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Hotel,
} from 'lucide-react';
import CTASection from '@/components/CTASection';
import LocationsDirectory, { CompactLocation } from '@/components/LocationsDirectory';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';
import { locations } from '@/data/locations';
import { isLocationRedirect } from '@/data/locationManifest';
import { getAssetUrl } from '@/lib/assets';

export const metadata: Metadata = {
  title: 'Escort Service Locations in Gurgaon & Delhi NCR | 108 Verified Sectors | ALINA VIP',
  description:
    'Find premium escort service across prime locations in Gurgaon and Delhi NCR. Cyber City, Golf Course Road, DLF Phases 1-5, Sohna Road, Aerocity & more. Rapid 20-30 min outcall.',
  keywords: [
    'escort service locations Gurgaon',
    'call girl service areas Gurgaon',
    'outcall escort locations',
    ...(siteConfig.keywords || []).slice(0, 15),
  ],
  alternates: {
    canonical: `${siteConfig.url}/locations`,
    languages: getAlternateLanguages('/locations'),
  },
  openGraph: {
    title: 'Escort Service Locations in Gurgaon & Delhi NCR | ALINA VIP',
    description:
      'Find premium escort service across prime locations in Gurgaon and Delhi NCR. Cyber City, Golf Course Road, DLF Phases 1-5, Sohna Road, Aerocity & more. Rapid 20-30 min outcall.',
    url: 'https://alinavip.in/locations',
    type: 'website',
  },
};

const topLocationCards = [
  {
    title: 'MG Road, Gurgaon',
    slug: 'mg-road',
    image: '/images/assets/Escort_Service_In_Mg_Road.jpg',
    desc: 'Bustling commercial hub with rapid 20-min 5-star hotel outcalls.',
  },
  {
    title: 'Mahipalpur, Delhi NCR',
    slug: 'mahipalpur',
    image: '/images/assets/Escort_Service_In_Mahipalpur_Img.jpg',
    desc: 'Airport transit hotels and luxury suites call girl service.',
  },
  {
    title: 'Aerocity Hospitality District',
    slug: 'aerocity',
    image: '/images/assets/Escort_Service_In_Aerocity_Img.jpg',
    desc: 'Elite outcalls to JW Marriott, Pullman, Andaz, and Roseate.',
  },
  {
    title: 'Dwarka, Delhi NCR',
    slug: 'dwarka',
    image: '/images/assets/Escorts_Service_In_Dwarka_IMG.jpg',
    desc: 'Sophisticated call girl models serving Dwarka expressway hotels.',
  },
  {
    title: 'DLF Cyber City, Gurgaon',
    slug: 'cyber-city',
    image: '/images/assets/Escort_Service_DLF_Gurgaon.jpg',
    desc: 'Corporate VIP dinner call girls and executive suite visits.',
  },
  {
    title: 'Golf Course Road, Gurgaon',
    slug: 'golf-course-road',
    image: '/images/assets/Book_Escorts_Girl_In_Delhi.jpg',
    desc: 'Ultra-luxury condominiums including The Camellias & Magnolias.',
  },
];

export default function LocationsPage() {
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

  return (
    <div className="bg-[#FFFDF6] min-h-screen text-[#2d2d2d]">
      {/* 1. Page Title Bar */}
      <section className="relative bg-[#671725] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-luxury-gold shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Escort Service Locations in Gurgaon &amp; Delhi NCR
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto">
            108+ Verified Sectors with Rapid 20-30 Minute 5-Star Hotel Outcalls Available 24/7
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs md:text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-luxury-gold font-semibold">Locations</span>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="bg-[#671725] text-white py-4 px-4 shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-2">
            <Clock size={18} className="text-luxury-gold" />
            <strong>20-30 Minute Outcall Dispatch</strong>
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-luxury-gold" />
            <strong>100% Cash on Delivery — No Advance</strong>
          </span>
          <span className="flex items-center gap-2">
            <Hotel size={18} className="text-luxury-gold" />
            <strong>All 5-Star Luxury Hotels Covered</strong>
          </span>
        </div>
      </section>

      {/* 3. Top Locations Highlight Grid (ALINA VIP Blush Cards with Wine Borders) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-wine">
            Prime Destination Hubs
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
            Top Escort Outcall Locations in Gurgaon
          </h2>
          <div className="w-16 h-1 bg-primary-wine mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Our most frequently requested sectors for prompt 5-star hotel visits, business dinners, and residential outcalls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topLocationCards.map((loc, idx) => (
            <Link
              key={idx}
              href={`/locations/${loc.slug}`}
              className="location-section-card group relative block rounded-xl overflow-hidden bg-[#F9E1E5] border-2 border-primary-wine p-4 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 w-full rounded-lg overflow-hidden mb-3 bg-gray-100">
                <Image
                  src={getAssetUrl(loc.image)}
                  alt={`Escort service in ${loc.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-bold text-[#111827] group-hover:text-primary-wine transition-colors mb-1">
                {loc.title}
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed mb-3">
                {loc.desc}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-wine group-hover:translate-x-1 transition-transform">
                Explore Location <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Complete Directory Filter Search */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              Complete Gurgaon Sectors &amp; Corridor Directory
            </h2>
            <div className="w-16 h-1 bg-primary-wine mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-600">
              Filter and search through our comprehensive network of over 108 verified escort service sectors.
            </p>
          </div>

          <LocationsDirectory locations={compactLocations} />
        </div>
      </section>

      {/* 5. Five-Star Hotel Outcall Protocols */}
      <section className="py-16 bg-[#FFFDF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-wine">
                Luxury Hospitality Protocols
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mt-1 mb-4">
                Five-Star Hotel Outcalls in Gurgaon &amp; Aerocity
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                ALINA VIP specializes in seamless outcall appointments to elite hospitality properties across Gurgaon and Delhi NCR. Our escorts arrive dressed in immaculate contemporary attire suitable for high-end hotel lobbies and private executive floors.
              </p>
              <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary-wine shrink-0" />
                  <span>The Oberoi, Trident, and The Leela Ambience Gurgaon</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary-wine shrink-0" />
                  <span>Grand Hyatt, ITC Grand Bharat, and DoubleTree by Hilton</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary-wine shrink-0" />
                  <span>Aerocity 5-Star District: JW Marriott, Pullman, Andaz</span>
                </div>
              </div>
            </div>

            <div className="bg-[#F9E1E5] p-6 rounded-xl border border-primary-wine/30 text-center">
              <h4 className="text-lg font-bold text-primary-wine mb-2">
                Need Rapid Hotel Outcall?
              </h4>
              <p className="text-xs text-gray-700 mb-6 leading-relaxed">
                Connect with our concierge directly via telephone or WhatsApp. Mention your hotel property and suite number for swift 20-30 minute dispatch.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="px-6 py-3 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs"
                >
                  Call: {siteConfig.phoneDisplay}
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20ALINA%20VIP,%20I%20need%20hotel%20outcall%20in%20Gurgaon.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs font-bold rounded-xl"
                >
                  WhatsApp Booking
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
