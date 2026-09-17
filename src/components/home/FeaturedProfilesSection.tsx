'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export interface ModelProfile {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  location: string;
  image: string;
  description: string;
  rates: string;
  tags: string[];
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
    rates: '₹15,000 / Shot',
    tags: ['Sex in Different Positions', 'Oral Sex (Blowjob)', 'GFE Experience'],
  },
  {
    id: 'tanya',
    name: 'Tanya',
    category: 'VIP Model Escort',
    categorySlug: 'vip-call-girls',
    location: 'Cyber City, Gurgaon',
    image: '/images/assets/Tanya.jpg',
    description: 'Hi gentlemen, I am Tanya, an elite fashion model escort offering premier VIP rendezvous, social accompaniment, and overnight luxury in DLF Cyber City.',
    rates: '₹20,000 / Shot',
    tags: ['GFE Experience', 'Dinner Dates', 'Full Night Stay'],
  },
  {
    id: 'neha',
    name: 'Neha',
    category: 'Independent Escort',
    categorySlug: 'independent-girls',
    location: 'Golf Course Road, Gurgaon',
    image: '/images/assets/Neha.jpg',
    description: 'Hello I am Neha, an independent charming companion providing discreet private 5-star hotel outcalls and genuine affectionate meetings on Golf Course Road.',
    rates: '₹12,000 / Shot',
    tags: ['Sensual Massage', 'Deep Kissing', 'Discreet Outcall'],
  },
  {
    id: 'siya',
    name: 'Siya',
    category: 'College Girl Escort',
    categorySlug: 'college-girls',
    location: 'Sector 29, Gurgaon',
    image: '/images/assets/Escort_Service_DLF_Gurgaon.jpg',
    description: 'Hey, I am Siya, young bubbly college companion available for fun dinner dates, private party accompaniment, and intimate hotel encounters in Sector 29.',
    rates: '₹10,000 / Shot',
    tags: ['Youthful Charm', 'Oral Sex', 'Nightout Escort'],
  },
  {
    id: 'mia',
    name: 'Mia',
    category: 'High Profile Escort',
    categorySlug: 'high-profile-girls',
    location: 'DLF Phase 1-5, Gurgaon',
    image: '/images/assets/Mia.jpg',
    description: 'Hi, I am Mia, a sophisticated high-profile model escort specializing in luxury 5-star suite rendezvous and discreet companionship across DLF Phase 1 to 5.',
    rates: '₹25,000 / Shot',
    tags: ['High Society Escort', 'Corporate Dating', 'VIP Luxury'],
  },
  {
    id: 'nithya-rai',
    name: 'Nithya Rai',
    category: 'Celebrity Escort',
    categorySlug: 'celebrity-escorts',
    location: 'Sohna Road, Gurgaon',
    image: '/images/assets/Nithya_High_Profile_Escort_In_Mahipalpur.jpg',
    description: 'Hello, Nithya Rai here, offering celebrity-tier escort companionship, glamorous appearance, and unmatched passionate romance on Sohna Road.',
    rates: '₹30,000 / Shot',
    tags: ['Celebrity Status', '69 Position', 'Overnight Escort'],
  },
  {
    id: 'sheena',
    name: 'Sheena',
    category: 'Air Hostess Escort',
    categorySlug: 'air-hostess',
    location: 'Aerocity & Transit Suites',
    image: '/images/assets/Sheena_Indian_Escort_In_Gurgaon.jpg',
    description: 'Greetings, I am Sheena, international cabin crew escort providing worldly conversational charm, poise, and 5-star transit hotel outcalls in Aerocity.',
    rates: '₹15,000 / Shot',
    tags: ['Cabin Crew', 'Transit Outcall', 'French Kissing'],
  },
  {
    id: 'geet',
    name: 'Geet',
    category: 'Housewife Escort',
    categorySlug: 'housewife-escorts',
    location: 'Sushant Lok, Gurgaon',
    image: '/images/assets/Geet.jpg',
    description: 'Hello dear, I am Geet, a warm and sensual mature housewife escort offering affectionate, comforting company and complete privacy in Sushant Lok.',
    rates: '₹10,000 / Shot',
    tags: ['Busty & Curvy', 'Mutual Orgasm', 'Stress Relief'],
  },
  {
    id: 'pallavi',
    name: 'Pallavi',
    category: 'Indian Escort',
    categorySlug: 'premium-escorts',
    location: 'MG Road, Gurgaon',
    image: '/images/assets/Pallavi.jpg',
    description: 'Namaste, I am Pallavi, a graceful Indian female escort with traditional beauty and modern mindset, ready for hotel outcalls on MG Road.',
    rates: '₹12,000 / Shot',
    tags: ['Traditional Beauty', 'GFE Romance', 'Discreet Rendezvous'],
  },
];

export default function FeaturedProfilesSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="featured-profiles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
            Featured Profiles
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Explore genuine, in-person verified female escorts available for immediate 20–30 minute dispatch across Gurgaon luxury hotels and residences.
          </p>
        </div>

        {/* 3x3 Grid matching Roshni Khanna profile-main-row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProfiles.map((profile) => {
            const waText = encodeURIComponent(
              "Hello ALINA VIP, I would like to book " + profile.name + " (" + profile.category + ") for an outcall in Gurgaon."
            );

            return (
              <div key={profile.id} className="profile-inner-col flex flex-col justify-between">
                <div>
                  {/* Photo Container */}
                  <div className="profile-img bg-gray-100">
                    <Link href={"/escorts/" + profile.id}>
                      <Image
                        src={profile.image}
                        alt={profile.name + " - " + profile.category + " in Gurgaon"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                        className="object-cover object-top"
                        loading="lazy"
                      />
                    </Link>
                  </div>

                  {/* Name, Category, Rating & View Profile Button */}
                  <div className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="name">
                          <h3>
                            <Link href={"/escorts/" + profile.id} className="hover:text-[#671725]">{profile.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="height-h font-medium">{profile.category}</p>
                        <div className="text-[#FFD700] text-sm tracking-wider mt-0.5">
                          &#9733;&#9733;&#9733;&#9733;&#9733;
                        </div>
                      </div>

                      <div className="view-profile-btn">
                        <Link href={"/escorts/" + profile.id} className="tm-button"><span>View Profile</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>

                    {/* Bio Snippet */}
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                      {profile.description}
                    </p>

                    {/* Tag Pills */}
                    <div className="profile-cat flex flex-wrap gap-1.5 mb-4">
                      {profile.tags.map((tag, i) => (
                        <span key={i} className="tm-button">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Rate & WhatsApp CTA */}
                <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">Service Fee</span>
                    <span className="text-sm font-bold text-[#671725]">{profile.rates}</span>
                  </div>

                  <a
                    href={"https://wa.me/" + siteConfig.whatsapp + "?text=" + waText}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-full shadow transition-colors"
                  >
                    <MessageCircle size={14} />
                    <span>Book WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#671725] hover:bg-[#52121d] text-white text-sm font-semibold rounded shadow-md transition-all duration-300"
          >
            <span>Browse Full Gallery</span>
            <ArrowRight size={16} />
          </Link>
          <p className="text-xs text-gray-500 mt-2.5">
            100% In-Person Verified • No Advance Payment Required • Cash on Delivery
          </p>
        </div>

      </div>
    </section>
  );
}
