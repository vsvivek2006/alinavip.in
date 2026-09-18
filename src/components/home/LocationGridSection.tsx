'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '@/lib/assets';

const topLocations = [
  {
    name: 'Escorts Service in MG Road',
    slug: 'mg-road',
    desc: 'Men always face issues while searching for the best independent escorts in MG Road. That is why we are here with the most genuine, high profile independent girls. They will give you the best adult entertainment.',
    image: '/images/assets/Escort_Service_In_Mg_Road.jpg',
  },
  {
    name: 'Escorts Service in Mahipalpur',
    slug: 'mahipalpur',
    desc: 'Our escort service agency is one of the most renowned escort services in Mahipalpur, New Delhi offering quality companionship for years. We know what men want, and that is why we have hand-picked the best girls.',
    image: '/images/assets/Escort_Service_In_Mahipalpur_Img.jpg',
  },
  {
    name: 'Escorts Service in Aerocity',
    slug: 'aerocity',
    desc: 'Aerocity escorts are your true companions for all kinds of experiences. Whether you hire them for sex fun or taking them to parties, they will never disappoint you.',
    image: '/images/assets/Escort_Service_In_Aerocity_Img.jpg',
  },
  {
    name: 'Escorts Service in Dwarka',
    slug: 'dwarka',
    desc: 'We provide the best escort services in Dwarka, where only hot and genuine girls are available for you. All the girls you find here are well trained, seductive, and truly remarkable.',
    image: '/images/assets/Escorts_Service_In_Dwarka_IMG.jpg',
  },
  {
    name: 'Escorts Service in Cyber City',
    slug: 'cyber-city',
    desc: 'Corporate VIP models and dinner date companions for multinational business leaders and executives across DLF Cyber City.',
    image: '/images/assets/Escort_Service_DLF_Gurgaon.jpg',
  },
  {
    name: 'Escorts Service in Golf Course Road',
    slug: 'golf-course-road',
    desc: 'Ultra-luxury high-profile escort service serving DLF The Camellias, Magnolias, Aralias, and One Horizon Center with complete discretion.',
    image: '/images/assets/High_Profile_Escorts_Girl_In_Delhi.jpg',
  },
  {
    name: 'Escorts Service in Sohna Road',
    slug: 'sohna-road',
    desc: 'Trusted female escorts for business suites, IT tech parks, and luxury resorts across the Sohna Road corridor.',
    image: '/images/assets/Book_Escorts_Girl_In_Delhi.jpg',
  },
  {
    name: 'Escorts Service in DLF Phase 1-5',
    slug: 'dlf-phase-1',
    desc: 'Discreet outcall coverage across all premier DLF sectors, Galleria market, and exclusive residential clubs.',
    image: '/images/assets/Escort_Service_DLF_Gurgaon.jpg',
  },
];

export default function LocationGridSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="locations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading with 100% Exact Copy from editorial catalog */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
            Top Escorts Service Locations
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base">
            Prompt 20 to 30 minute dispatch to premier luxury hotels, serviced residences, and private suites across Gurgaon &amp; Delhi NCR
          </p>
        </div>

        {/* 8 Cards Grid matching agency design location-section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topLocations.map((loc, idx) => (
            <Link
              key={idx}
              href={`/locations/${loc.slug}`}
              className="location-section-card group block overflow-hidden bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Location Image */}
              <div className="relative h-40 w-full -mt-2 -mx-2 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={getAssetUrl(loc.image)}
                  alt={loc.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="text-left">
                <h3 className="font-bold text-[#671725] text-base mb-1.5 group-hover:underline flex items-center gap-1.5">
                  <MapPin size={15} className="flex-shrink-0" />
                  <span>{loc.name}</span>
                </h3>
                <p className="text-xs text-gray-700 leading-relaxed mb-3 line-clamp-3">
                  {loc.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#671725] group-hover:gap-2 transition-all">
                  View Escorts <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Explore All Locations Button */}
        <div className="text-center mt-12">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm font-bold"
          >
            <span>Explore All 108 Gurgaon &amp; NCR Locations</span>
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
