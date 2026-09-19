import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  Heart,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';
import { getAssetUrl } from '@/lib/assets';
import exactManifest from '@/data/exact_manifest.json';

const hotelsManifest = exactManifest.hotels;

export const metadata: Metadata = {
  title: `Top 5-Star Hotels Escorts Service in ${siteConfig.city} | ${siteConfig.name}`,
  description: `Luxury hotel outcall escort services across ${siteConfig.city}. Prompt 20-30 min arrival to premier luxury hotel properties.`,
  alternates: {
    canonical: `${siteConfig.url}/hotels`,
  },
};

const topHotels = [
  {
    name: 'The Oberoi Hotel Gurgaon',
    area: 'Udyog Vihar / DLF Phase 2',
    stars: '5 Star Luxury',
    desc: 'Our escort service offers attractive call girl escorts near The Oberoi Hotel and you can choose the girl of your dreams.',
    slug: 'escort-service-near-the-oberoi-hotel',
    image: '/images/assets/Dinner_Dates_And_Social_Engagements.jpg',
  },
  {
    name: 'The Leela Ambience Hotel',
    area: 'Ambience Island, NH-8',
    stars: '5 Star Deluxe',
    desc: 'Sexy call girl escorts near Leela Ambience Hotel are available 24/7 to entertain their clients with utmost discretion.',
    slug: 'escort-service-near-leela-ambience-hotel',
    image: '/images/assets/Escort_Service_In_Aerocity_Img.jpg',
  },
  {
    name: 'The Pllazio Hotel',
    area: 'Sector 29, City Centre',
    stars: '4 Star Boutique',
    desc: 'Here you will discover proficient escort benefits in Gurgaon close to The Pllazio Hotel for memorable evenings.',
    slug: 'escort-service-near-pllazio-hotel',
    image: '/images/assets/Escorts_24x7_Availability.jpg',
  },
  {
    name: 'The Bristol Hotel',
    area: 'DLF Phase 1, MG Road',
    stars: '5 Star Luxury',
    desc: 'Spice up your night with these gorgeous escorts available near Bristol Hotel in Gurgaon.',
    slug: 'escort-service-near-bristol-hotel',
    image: '/images/assets/Escort_Service_In_Mg_Road.jpg',
  },
  {
    name: 'Taj City Centre Gurugram',
    area: 'Sector 44, HUDA City Centre',
    stars: '5 Star Luxury',
    desc: 'Sophisticated VIP escorts for clients staying near HUDA City Centre metro and Sector 44 institutional area.',
    slug: 'escort-service-near-taj-city-centre-hotel',
    image: '/images/assets/Escort_Service_DLF_Gurgaon.jpg',
  },
  {
    name: 'ITC Grand Bharat Luxury Resort',
    area: 'Hasanpur, Tauru / Manesar',
    stars: '5 Star Luxury Resort',
    desc: 'Resort retreat call girls for outstation relaxation, golf weekends, and secluded overnight escort service.',
    slug: 'escort-service-near-itc-grand-bharat-hotel',
    image: '/images/assets/Overnight_Stays_And_Weekend_Getaways.jpg',
  },
  {
    name: 'Trident Hotel Gurgaon',
    area: 'DLF Phase 2, Udyog Vihar',
    stars: '5 Star Luxury',
    desc: 'World-class corporate escorts for business delegates staying at Trident. Perfect dinner dates and private intimate nights.',
    slug: 'escort-service-near-trident-hotel',
    image: '/images/assets/High_Profile_Escorts_Girl_In_Delhi.jpg',
  },
  {
    name: 'The Westin Gurgaon',
    area: 'Sector 29 / MG Road',
    stars: '5 Star Luxury',
    desc: 'Located adjacent to Sector 29 nightlife corridor. High-energy party call girls and sensual massage specialists.',
    slug: 'escort-service-near-westin-hotel',
    image: '/images/assets/Escorts_24x7_Availability.jpg',
  },
  {
    name: 'Hyatt Regency Gurugram',
    area: 'Sector 83, New Gurgaon',
    stars: '5 Star Luxury',
    desc: 'Quick 20-minute suite dispatch along NH-48. English speaking, high profile call girls for executives and tourists.',
    slug: 'escort-service-near-hyatt-regency-hotel',
    image: '/images/assets/Diverse_Portfolio.jpg',
  },
  {
    name: 'Courtyard by Marriott',
    area: 'Block B, Sushant Lok Phase 1',
    stars: '4 Star Deluxe',
    desc: 'Comfortable business hotel outcalls with charming college escorts and educated independent girls.',
    slug: 'escort-service-near-courtyard-by-marriott-hotel',
    image: '/images/assets/Benefits_of_Booking_Through_a_Professional_Escort_.jpg',
  },
  {
    name: 'Crowne Plaza Today Gurugram',
    area: 'Sector 29, City Centre',
    stars: '5 Star Luxury',
    desc: 'Adjacent to Kingdom of Dreams and IFFCO Chowk. Luxury call girls ready to join you in your room or dinner.',
    slug: 'escort-service-near-crowne-plaza-hotel',
    image: '/images/assets/Hiring_a_Gurgaon_escort_for_the_first_time_Best_ti.jpg',
  },
  {
    name: 'Radisson Hotel Gurugram',
    area: 'Udyog Vihar Phase 3',
    stars: '5 Star Deluxe',
    desc: 'Express dispatch for travelers arriving late from IGI Airport. Fast, discreet, and reliable call girls.',
    slug: 'escort-service-near-radisson-hotel',
    image: '/images/assets/Escort_Service_In_Mahipalpur_Img.jpg',
  },
];

export default function HotelsPage() {
  const introSection = hotelsManifest.sections[0];

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* 1. Header Banner */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FFD700] shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="mb-3">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Hotels' }]} />
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#FFD700] text-xs font-semibold uppercase tracking-wider mb-2">
            ★ 5-Star Hotel Outcalls &bull; 20-30 Min Arrival
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {siteConfig.city} Luxury Hotel Escort Services
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100 font-light max-w-3xl leading-relaxed">
            Relax with your partner in world-class hotels across {siteConfig.city}. Discreet in-room call girl delivery with zero advance payment and verified profiles.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20${encodeURIComponent(siteConfig.name)},%20I%20am%20staying%20at%20a%20hotel%20in%20${encodeURIComponent(siteConfig.city)}%20and%20need%20an%20escort`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp Inquiry
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="px-6 py-2.5 bg-white/90 hover:bg-white text-[#671725] border border-rose-200/90 hover:border-[#671725] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <Phone size={16} /> Call: {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Trust Bar */}
      <div className="bg-[#52121d] text-white py-3.5 px-4 shadow-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-[#FFD700]" />
            <strong>20-30 Min Doorstep Delivery</strong>
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#FFD700]" />
            <strong>Complete Discretion &amp; Confidentiality</strong>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={16} className="text-[#FFD700]" />
            <strong>Pay Cash in Hotel Room</strong>
          </span>
        </div>
      </div>

      {/* 3. Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Exact Long-Form Scraped Intro (All 3 Paragraphs) */}
        {introSection && (
          <article className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827] border-b border-gray-100 pb-3 flex items-center gap-2">
              <Heart size={18} className="text-[#671725] shrink-0" />
              <span>{introSection.title || 'Relax With Your Partner in World-Class Hotels'}</span>
            </h2>
            <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
              {introSection.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </article>
        )}

        {/* View {siteConfig.city} Top Hotels Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#671725]">
              Featured Venues
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
              View {siteConfig.city} Top Hotels
            </h2>
            <div className="w-16 h-1 bg-[#671725] mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topHotels.map((hotel, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={getAssetUrl(hotel.image)}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#671725] text-[#FFD700] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {hotel.stars}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-[#111827] group-hover:text-[#671725] transition-colors">
                      <Link href={`/hotels/${hotel.slug}`}>{hotel.name}</Link>
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin size={12} className="text-[#671725] shrink-0" />
                      <span>{hotel.area}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mt-2.5">
                      {hotel.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/hotels/${hotel.slug}`}
                      className="text-xs font-bold text-[#671725] hover:underline flex items-center gap-1"
                    >
                      <span>Hotel Details</span>
                      <ArrowRight size={12} />
                    </Link>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20am%20staying%20at%20${encodeURIComponent(hotel.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs font-bold rounded-lg"
                    >
                      Book Outcall
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <CTASection />
    </div>
  );
}
