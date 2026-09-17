'use client';


import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';

const topHotels = [
  {
    name: 'The Oberoi Hotel Gurgaon',
    area: 'Udyog Vihar / DLF Phase 2',
    stars: '5 Star Luxury',
    desc: 'Ultra-exclusive 5-star outcalls with aristocratic Russian and model companions delivered directly to your private suite in 20 minutes.',
    slug: 'the-oberoi-hotel',
    image: '/images/assets/High_Profile_Escorts_Girl_In_Delhi.jpg',
  },
  {
    name: 'The Leela Ambience Hotel',
    area: 'Ambience Island, NH-8',
    stars: '5 Star Deluxe',
    desc: 'Glamorous companionship for executive travelers at Leela Ambience. Discreet room entry without awkward lobby questions.',
    slug: 'leela-ambience-hotel',
    image: '/images/assets/Russian_Escorts_Girl_In_Delhi.jpg',
  },
  {
    name: 'Taj City Centre Gurugram',
    area: 'Sector 44, HUDA City Centre',
    stars: '5 Star Luxury',
    desc: 'Sophisticated VIP escorts for clients staying near HUDA City Centre metro and Sector 44 institutional area.',
    slug: 'taj-city-centre-hotel',
    image: '/images/assets/Escort_Service_In_Mg_Road.jpg',
  },
  {
    name: 'ITC Grand Bharat Luxury Collection',
    area: 'Hasanpur, Tauru / Manesar',
    stars: '5 Star Luxury Resort',
    desc: 'Resort retreat companions for outstation relaxation, golf weekends, and secluded overnight companionship.',
    slug: 'itc-grand-bharat-hotel',
    image: '/images/assets/Diverse_Portfolio.jpg',
  },
  {
    name: 'Trident Hotel Gurgaon',
    area: 'DLF Phase 2, Udyog Vihar',
    stars: '5 Star Luxury',
    desc: 'World-class corporate escorts for business delegates staying at Trident. Perfect dinner dates and private intimate nights.',
    slug: 'trident-hotel',
    image: '/images/assets/Independent_Escorts_Delhi.jpg',
  },
  {
    name: 'The Westin Gurgaon',
    area: 'Sector 29 / MG Road',
    stars: '5 Star Luxury',
    desc: 'Located adjacent to Sector 29 nightlife corridor. High-energy party companions and sensual massage specialists.',
    slug: 'westin-hotel',
    image: '/images/assets/VIP_Call_Girls_Delhi.jpg',
  },
  {
    name: 'Hyatt Regency Gurugram',
    area: 'Sector 83, NH-8',
    stars: '5 Star Deluxe',
    desc: 'Seamless outcall delivery to new Gurgaon corridors and Manesar business hub with 100% genuine verified profiles.',
    slug: 'hyatt-regency-hotel',
    image: '/images/assets/Female_Escorts_Delhi.jpg',
  },
  {
    name: 'Crowne Plaza Today Gurgaon',
    area: 'Sector 29, City Centre',
    stars: '5 Star Business',
    desc: 'Premier business hotel outcalls with bilingual, educated companions who blend seamlessly into 5-star executive lounges.',
    slug: 'crowne-plaza-hotel',
    image: '/images/assets/College_Girl_Escorts_Delhi.jpg',
  },
  {
    name: 'Courtyard by Marriott',
    area: 'Sector 27 / Sushant Lok Phase 1',
    stars: '4 Star Deluxe',
    desc: 'Affordable luxury escort services for guests staying near Galleria Market and Sushant Lok corridors.',
    slug: 'courtyard-marriott',
    image: '/images/assets/Housewife_Escorts_Delhi.jpg',
  },
  {
    name: 'Radisson Gurugram Udyog Vihar',
    area: 'Udyog Vihar Phase 3',
    stars: '4 Star Deluxe',
    desc: 'Fast 15-minute response time for travelers staying near DLF Cyber Hub and Delhi-Gurgaon toll border.',
    slug: 'radisson-hotel',
    image: '/images/assets/Air_Hostess_Escorts_Delhi.jpg',
  },
  {
    name: 'The Pllazio Hotel',
    area: 'Sector 29 City Centre',
    stars: '4 Star Luxury',
    desc: 'European-themed boutique hotel escort outcalls with young, vivacious college companions.',
    slug: 'pllazio-hotel',
    image: '/images/assets/Busty_Escorts_Delhi.jpg',
  },
  {
    name: 'Hilton Garden Inn Gurgaon Baani Square',
    area: 'Sector 50, Nirvana Country',
    stars: '4 Star Deluxe',
    desc: 'Convenient Golf Course Extension Road outcall delivery with zero prepayment and complete doorstep privacy.',
    slug: 'hilton-garden-inn',
    image: '/images/assets/Slim_Escorts_Delhi.jpg',
  },
];

export default function HotelsDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* Page Title Bar */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Hotels' },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Escort Services Near 4-5 Star Hotels in Gurgaon
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100 font-light max-w-2xl">
            Relax with your dream companion in world-class 5-star hotels across Gurgaon and Delhi NCR with rapid 20-30 min door outcalls.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#671725] uppercase tracking-widest">Discreet Five-Star Hospitality</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-2">
            Relax With Your Partner in World-Class Hotels
          </h2>
          <p className="text-gray-600 text-sm mt-3">
            Whether you are on a business summit at Cyber City or vacationing in Gurgaon, our companions arrive impeccably dressed to match the prestige of top international luxury hotels.
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topHotels.map((hotel) => (
            <div
              key={hotel.name}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={hotel.image}
                    alt={`Escorts near ${hotel.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#671725] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                    {hotel.stars}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#671725]/90 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded shadow flex items-center gap-1">
                    <MapPin size={12} className="text-rose-300" />
                    <span>{hotel.area}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-[#111827] group-hover:text-[#671725] transition-colors">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600 text-xs mt-3 leading-relaxed">
                    {hotel.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Clock size={12} /> 20-30 Min Arrival
                    </span>
                    <span className="text-gray-500 font-medium">
                      Zero Advance
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20am%20staying%20at%20${encodeURIComponent(hotel.name)}%20and%20need%20a%20companion`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 bg-[#671725] hover:bg-[#52121d] text-white text-xs font-bold rounded-lg shadow transition-colors"
                >
                  Book Escort to This Hotel &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Star Booking Standards */}
        <div className="mt-20 bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#671725] uppercase tracking-widest">Protocol &amp; Discretion</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
              How Hotel Outcalls Work with ALINA VIP
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-600">
            <div className="space-y-2 p-4 rounded-lg bg-[#FFFDF6] border border-gray-100">
              <span className="w-7 h-7 rounded-full bg-[#671725] text-white font-bold flex items-center justify-center text-xs">1</span>
              <h4 className="font-bold text-[#111827] text-sm">Select Your Preferred Hotel</h4>
              <p>Share your room number and hotel details via WhatsApp or direct phone call. If you haven&apos;t booked yet, we can suggest companion-friendly hotels.</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-[#FFFDF6] border border-gray-100">
              <span className="w-7 h-7 rounded-full bg-[#671725] text-white font-bold flex items-center justify-center text-xs">2</span>
              <h4 className="font-bold text-[#111827] text-sm">Select Your Companion</h4>
              <p>Choose from real, verified Russian, Indian, or celebrity escort profiles with exact pictures and confirmed rates.</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-[#FFFDF6] border border-gray-100">
              <span className="w-7 h-7 rounded-full bg-[#671725] text-white font-bold flex items-center justify-center text-xs">3</span>
              <h4 className="font-bold text-[#111827] text-sm">Doorstep Delivery &amp; Pay Cash</h4>
              <p>She arrives within 20-30 minutes, dressed impeccably. Greet her, verify, and pay in cash directly to her. Zero prepayment.</p>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
