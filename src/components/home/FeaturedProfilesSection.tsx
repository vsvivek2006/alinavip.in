'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export interface ModelProfile {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  location: string;
  image: string;
  description: string;
  stats: {
    height: string;
    bust: string;
    waist: string;
    hips: string;
  };
}

export const featuredProfiles: ModelProfile[] = [
  {
    id: 'karina',
    name: 'Karina',
    category: 'Russian Escort',
    categorySlug: 'russian-call-girls',
    location: 'Huda City Centre, Gurgaon',
    image: '/images/assets/Karina.jpg',
    description: 'Hello guys this is Karina Russian escort living in Huda City Centre, Gurgaon! I am at your disposal with the best escort services in Huda City Centre.',
    stats: { height: "5'5\"", bust: '34"', waist: '25"', hips: '36"' },
  },
  {
    id: 'tanya',
    name: 'Tanya',
    category: 'Independent Escort',
    categorySlug: 'independent-girls',
    location: 'Cyber City, Gurgaon',
    image: '/images/assets/Tanya.jpg',
    description: 'Independent escort in Gurgaon is available for a secret meeting in a hotel room. My name is Tanya, and I am a professional companion who likes to make every moment memorable.',
    stats: { height: "5'3\"", bust: '33"', waist: '23"', hips: '33"' },
  },
  {
    id: 'neha',
    name: 'Neha',
    category: 'Indian Escort',
    categorySlug: 'premium-escorts',
    location: 'Mahipalpur, New Delhi & Gurgaon',
    image: '/images/assets/Neha.jpg',
    description: 'I am Neha, an Indian escort living in Mahipalpur, a young and sexy girl who is available to please you and give all I have to you. I like to go on dates and provide ultimate pleasure.',
    stats: { height: "5'5\"", bust: '34"', waist: '25"', hips: '36"' },
  },
  {
    id: 'siya',
    name: 'Siya',
    category: 'Model Escort',
    categorySlug: 'high-profile-girls',
    location: 'Sector 29, Gurgaon',
    image: '/images/assets/Escort_Service_DLF_Gurgaon.jpg',
    description: 'If you are looking to meet a hot and beautiful model for sexual pleasure, then you are at the right place. I work as a professional model for exclusive elite companionship.',
    stats: { height: "5'3\"", bust: '32"', waist: '23"', hips: '34"' },
  },
  {
    id: 'mia',
    name: 'Mia',
    category: 'Russian Escort',
    categorySlug: 'russian-call-girls',
    location: 'Aerocity, Gurgaon',
    image: '/images/assets/Mia.jpg',
    description: 'Mia Russian Escort Living in Aerocity, Gurgaon. She is Beautiful, full of passion, with a shapely body, elegant and sexy at the same time.',
    stats: { height: "5'3\"", bust: '34"', waist: '23"', hips: '34"' },
  },
  {
    id: 'nithya-rai',
    name: 'Nithya Rai',
    category: 'High Profile Escort',
    categorySlug: 'high-profile-girls',
    location: 'Mahipalpur & Gurgaon',
    image: '/images/assets/Nithya_High_Profile_Escort_In_Mahipalpur.jpg',
    description: 'She is Nithya High Profile Escort Living in Mahipalpur. Nithya is a woman of high standards, with perfect proportions, rich natural breasts, waist ring and exceptional charm.',
    stats: { height: "5'4\"", bust: '33"', waist: '24"', hips: '33"' },
  },
  {
    id: 'sheena',
    name: 'Sheena',
    category: 'Indian Escort',
    categorySlug: 'premium-escorts',
    location: 'DLF Phase 2, Gurgaon',
    image: '/images/assets/Sheena_Indian_Escort_In_Gurgaon.jpg',
    description: 'Are you looking for an escort who is exceedingly adaptable and approachable? Meet Sheena for a private session and explore the wild side with her.',
    stats: { height: "5'3\"", bust: '32"', waist: '24"', hips: '34"' },
  },
  {
    id: 'geet',
    name: 'Geet',
    category: 'Air Hostess Escort',
    categorySlug: 'air-hostess',
    location: 'Aerocity, Gurgaon',
    image: '/images/assets/Geet_Air_Hostess_Escort_In_Aerocity.jpg',
    description: 'Hi, this is Geet air hostess escort living in Aerocity, Gurgaon! If you are here it means that you are looking for a unique girl. Geet is truly unique and is here for you.',
    stats: { height: "5'2\"", bust: '36"', waist: '25"', hips: '36"' },
  },
  {
    id: 'pallavi',
    name: 'Pallavi',
    category: 'Model Escort',
    categorySlug: 'high-profile-girls',
    location: 'Mahipalpur & DLF, Gurgaon',
    image: '/images/assets/Pallavi_Model_Escort_In_Mahipalpur.jpg',
    description: 'Pallavi is a model escort living in Mahipalpur. She is ideal for a new adventure because she is classy, charming, and will satisfy all your fantasies.',
    stats: { height: "5'3\"", bust: '33"', waist: '24"', hips: '33"' },
  },
];

export default function FeaturedProfilesSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="featured-profiles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with 100% Exact Copy from Roshni Khanna */}
        <div className="text-center max-w-4xl mx-auto mb-14 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
            Featured Profiles
          </h2>
          <div className="w-20 h-1 bg-[#671725] mx-auto rounded-full" />
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Whether you are looking for private companionship, discreet meetings, social company, or a trusted female for intimate time, our featured profiles selection helps you find the right women as per your requirement.
          </p>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Each featured profile is presented to make the selection process easier, giving clients a clearer idea of available options, model categories, and booking preferences. From Russian and Indian models to independent and professional model profiles, ALINA VIP helps clients choose with more confidence while keeping the process private, simple, and professional.
          </p>
        </div>

        {/* 9 Model Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image with Category Tag */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                <Image
                  src={profile.image}
                  alt={`${profile.name} - ${profile.category} in Gurgaon`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#671725] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {profile.category}
                </div>
                <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  100% VERIFIED
                </div>
              </div>

              {/* Profile Body & Measurements */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#111827] group-hover:text-[#671725] transition-colors">
                      {profile.name}
                    </h3>
                    <span className="text-xs text-gray-500">{profile.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-3">
                    {profile.description}
                  </p>

                  {/* Body Measurements Stats Table matching Roshni Khanna */}
                  <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-gray-100 text-center">
                    <div className="bg-[#FFFDF6] p-2 rounded-lg border border-rose-100/60">
                      <div className="text-[10px] uppercase font-bold text-gray-500">Height</div>
                      <div className="text-xs font-bold text-[#671725] mt-0.5">{profile.stats.height}</div>
                    </div>
                    <div className="bg-[#FFFDF6] p-2 rounded-lg border border-rose-100/60">
                      <div className="text-[10px] uppercase font-bold text-gray-500">Bust</div>
                      <div className="text-xs font-bold text-[#671725] mt-0.5">{profile.stats.bust}</div>
                    </div>
                    <div className="bg-[#FFFDF6] p-2 rounded-lg border border-rose-100/60">
                      <div className="text-[10px] uppercase font-bold text-gray-500">Waist</div>
                      <div className="text-xs font-bold text-[#671725] mt-0.5">{profile.stats.waist}</div>
                    </div>
                    <div className="bg-[#FFFDF6] p-2 rounded-lg border border-rose-100/60">
                      <div className="text-[10px] uppercase font-bold text-gray-500">Hips</div>
                      <div className="text-xs font-bold text-[#671725] mt-0.5">{profile.stats.hips}</div>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20book%20${encodeURIComponent(profile.name)}%20(${encodeURIComponent(profile.category)})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <Phone size={14} /> Direct Call
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Escorts CTA */}
        <div className="text-center mt-12">
          <Link
            href="/escorts"
            className="inline-flex items-center gap-2 px-9 py-4 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-sm font-bold"
          >
            <span>View All 200+ Escort Profiles</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
