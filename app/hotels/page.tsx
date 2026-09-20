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
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';
import { getAssetUrl } from '@/lib/assets';
import exactManifest from '@/data/exact_manifest.json';
import pagesData from '@/data/catalog_pages.json';

const hotelsManifest = exactManifest.hotels;

export const metadata: Metadata = {
  title: `Top 5-Star Hotels Escorts Service in ${siteConfig.city} | ${siteConfig.name}`,
  description: `Luxury hotel outcall escort services across ${siteConfig.city}. Prompt 20-30 min arrival to premier luxury hotel properties.`,
  alternates: {
    canonical: `${siteConfig.url}/hotels`,
    languages: getAlternateLanguages('/hotels'),
  },
  openGraph: {
    title: `Top 5-Star Hotels Escorts Service in ${siteConfig.city} | ${siteConfig.name}`,
    description: `Luxury hotel outcall escort services across ${siteConfig.city}. Prompt 20-30 min arrival to premier luxury hotel properties.`,
    url: `${siteConfig.url}/hotels`,
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Top 5-Star Hotels Escorts Service in ${siteConfig.city} | ${siteConfig.name}`,
    description: `Luxury hotel outcall escort services across ${siteConfig.city}. Prompt 20-30 min arrival.`,
    images: ['/og-image.jpg'],
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
  {
    name: 'Ramada Gurgaon Central',
    area: 'Sector 44, City Centre',
    stars: '4 Star Deluxe',
    desc: 'Upscale business hotel near HUDA City Centre. Verified VIP escorts available for in-room visits and dinner dates.',
    slug: 'escort-services-near-ramada-gurgaon-central',
    image: '/images/assets/Overnight_Stays_And_Weekend_Getaways.jpg',
  },
  {
    name: 'Quality Inn Hotel Gurgaon',
    area: 'NH-48, Gurgaon',
    stars: '3 Star',
    desc: 'Affordable business hotel with reliable 24/7 escort service. Same-day verified call girl booking available.',
    slug: 'escort-services-near-quality-inn-hotel',
    image: '/images/assets/Escorts_24x7_Availability.jpg',
  },
  {
    name: 'Hotel DS Clarks Inn',
    area: 'Gurgaon City',
    stars: '3 Star',
    desc: 'Central Gurgaon hotel with rapid 20-min escort delivery. Discreet in-room and out-call services.',
    slug: 'escort-services-near-hotel-ds-clarks-inn',
    image: '/images/assets/Escort_Service_DLF_Gurgaon.jpg',
  },
  {
    name: 'Staayz Premium Hotel',
    area: 'Gurgaon',
    stars: '3 Star',
    desc: 'Premium serviced apartment stays with discreet escort companionship available around the clock.',
    slug: 'escort-services-near-staayz-premium-hotel',
    image: '/images/assets/Diverse_Portfolio.jpg',
  },
  {
    name: 'Hotel Tavisha Villa',
    area: 'Sector 15, Gurgaon',
    stars: '3 Star',
    desc: 'Classic Gurgaon hotel near Sector 15. Verified call girls for hotel visits and companion evenings.',
    slug: 'escort-services-near-hotel-tavisha-villa',
    image: '/images/assets/Travel_Companions.jpg',
  },
  {
    name: 'Citrus Check Inns Gurgaon',
    area: 'NH-48, Gurgaon',
    stars: '3 Star',
    desc: 'Budget business hotel with professional escort service. 24/7 booking — no advance payment required.',
    slug: 'escort-services-near-citrus-check-inns',
    image: '/images/assets/High_Profile_Escorts_Girl_In_Delhi.jpg',
  },
  {
    name: 'HollyHocks Residency Hotel',
    area: 'Gurgaon',
    stars: '3 Star',
    desc: 'Boutique residency hotel with full escort companion service. Discreet, verified, and elegant call girls.',
    slug: 'escort-services-near-hollyhocks-residency-hotel',
    image: '/images/assets/Benefits_of_Booking_Through_a_Professional_Escort_.jpg',
  },
  {
    name: 'Central Park Resorts',
    area: 'Sector 42, Gurgaon',
    stars: '4 Star',
    desc: 'Luxurious resort community near Golf Course Road. VIP escort models for overnight stays and private events.',
    slug: 'escort-service-near-central-park-resorts',
    image: '/images/assets/Book_Escorts_Girl_In_Delhi.jpg',
  },
  {
    name: 'Hotel Indiyaah Inn',
    area: 'Gurgaon',
    stars: '3 Star',
    desc: 'Comfortable city hotel with reliable escort companion delivery. Discreet in-room call girl service.',
    slug: 'escort-services-near-hotel-indiyaah-inn',
    image: '/images/assets/Escort_Service_In_Mg_Road.jpg',
  },
  {
    name: 'Chaupal Hotel and Banquet',
    area: 'Gurgaon',
    stars: '3 Star',
    desc: 'Banquet hotel with privacy-first escort service. Verified companions available for all occasions.',
    slug: 'escort-services-near-chaupal-hotel-and-banquet',
    image: '/images/assets/Escort_Service_In_Mahipalpur_Img.jpg',
  },
  {
    name: 'Beverly Park 2 Gurgaon',
    area: 'MG Road, Gurgaon',
    stars: '4 Star',
    desc: 'Upscale residential complex near MG Road. Elite escort service with premium model companions.',
    slug: 'escort-service-near-beverly-park-2',
    image: '/images/assets/Dinner_Dates_And_Social_Engagements.jpg',
  },
  {
    name: 'Sobha City Escort Service',
    area: 'Sector 108, Gurgaon',
    stars: '3 Star',
    desc: 'Modern residential enclave near Dwarka Expressway. Discreet in-call and hotel visit escort service.',
    slug: 'escort-service-near-sobha-city',
    image: '/images/assets/Escort_Service_In_Aerocity_Img.jpg',
  },
  {
    name: 'Treebo IFFCO Chowk',
    area: 'IFFCO Chowk, Gurgaon',
    stars: '3 Star',
    desc: 'Budget hotel near IFFCO Chowk. Rapid 15-min call girl delivery available 24/7.',
    slug: 'escort-services-near-treebo-iffco-chowk',
    image: '/images/assets/Escorts_Service_In_Dwarka_IMG.jpg',
  },
  {
    name: 'Escort Service Near Societies',
    area: 'Gurgaon Residential Societies',
    stars: '3 Star',
    desc: 'Discreet residential society escort service across all major Gurgaon sectors. No-advance, verified profiles.',
    slug: 'escort-service-near-societies',
    image: '/images/assets/Escort_Service_In_Mg_Road.jpg',
  },
  {
    name: 'Treo Skyon Hotel',
    area: 'Sector 109, Dwarka Expressway',
    stars: '4 Star',
    desc: 'Modern sky-rise hotel on Dwarka Expressway. Premium escort service with rapid 20-min delivery available.',
    slug: 'escort-service-near-treo-skyon',
    image: '/images/assets/Escort_Service_In_Aerocity_Img.jpg',
  },
  {
    name: 'Ahuja Residency DLF Phase 2',
    area: 'DLF Phase 2, Gurgaon',
    stars: '3 Star',
    desc: 'Corporate residency near DLF Phase 2. Discreet escort service with verified call girls available around the clock.',
    slug: 'escort-services-near-ahuja-residency-dif-phase-2',
    image: '/images/assets/Escort_Service_DLF_Gurgaon.jpg',
  },
  {
    name: 'De Pavilion Hotel',
    area: 'Gurgaon City Centre',
    stars: '3 Star',
    desc: 'City centre business hotel with same-day escort delivery. No advance payment required.',
    slug: 'escorts-service-near-de-pavilion-hotel',
    image: '/images/assets/Travel_Companions.jpg',
  },
  {
    name: 'Hotel Viva Palace',
    area: 'Gurgaon',
    stars: '3 Star',
    desc: 'Affordable comfort hotel with professional escort companion service. Verified profiles, discreet delivery.',
    slug: 'escorts-service-near-hotel-viva-palace',
    image: '/images/assets/High_Profile_Escorts_Girl_In_Delhi.jpg',
  },
  {
    name: 'Radisson Blu Hotel',
    area: 'Gurgaon',
    stars: '5 Star Deluxe',
    desc: 'Luxury Radisson Blu hotel escort service in Gurgaon. VIP call girls for upscale hotel stays, 24/7 availability.',
    slug: 'escorts-service-near-radisson-blu-hotel',
    image: '/images/assets/Book_Escorts_Girl_In_Delhi.jpg',
  },
];


const allHotelAccommodations = (pagesData as { slug: string; title: string; h1: string }[]).filter(
  (p) =>
    p.slug &&
    (p.slug.startsWith('hotels/') ||
      p.slug.includes('escort-service-near-') ||
      p.slug.includes('escort-services-near-') ||
      p.slug.includes('escorts-service-near-'))
);

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
        {/* Complete Hotels & Luxury Accommodations Directory */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#671725]">
              Complete Hotel &amp; Residency Directory
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
              All 5-Star Hotels, Luxury Suites &amp; Residences in {siteConfig.city}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Discreet 24/7 outcall delivery with verified models to all top hotels, serviced suites, and private residences across {siteConfig.city}.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
            {allHotelAccommodations.map((h) => (
              <Link
                key={h.slug}
                href={`/${h.slug}`}
                className="text-xs text-gray-700 hover:text-[#671725] hover:underline p-2.5 rounded-lg bg-gray-50 hover:bg-rose-50/50 border border-gray-100 transition-colors block truncate"
                title={h.h1 || h.title}
              >
                {h.h1 || h.title}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <CTASection />
    </div>
  );
}
