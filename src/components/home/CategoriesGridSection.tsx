'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categoriesData = [
  {
    name: 'Russian Escorts',
    slug: 'russian-call-girls',
    subtitle: 'Elegant Russian girls for premium private bookings',
    desc: 'Our agency provides elite European and Russian escorts in Gurgaon who bring natural beauty, sophisticated etiquette, and extraordinary passion to your luxury hotel room.',
    image: '/images/assets/image_270x450_19.jpg',
  },
  {
    name: 'Independent Escorts',
    slug: 'independent-girls',
    subtitle: 'Genuine independent call girls in Gurgaon',
    desc: 'Meet self-managed, verified independent female escorts who value personal connection, discreet rendezvous, and authentic girlfriend experiences without agency interference.',
    image: '/images/assets/image_270x450_20.jpg',
  },
  {
    name: 'High-Profile Escorts',
    slug: 'high-profile-girls',
    subtitle: 'VIP & celebrity escorts for corporate and social events',
    desc: 'Prestigious models and top-tier socialites trained to accompany discerning gentlemen to high-stakes business dinners, luxury resorts, and confidential private suites.',
    image: '/images/assets/image_270x450_21.jpg',
  },
  {
    name: 'Indian Escorts',
    slug: 'premium-escorts',
    subtitle: 'Charming Indian female escorts from across India',
    desc: 'Experience rich Indian beauty with cultured girls from Delhi, Punjab, Mumbai, and Bangalore ready to pamper you with deep romance and warm affection.',
    image: '/images/assets/image_270x450_22.jpg',
  },
  {
    name: 'Asian Escorts',
    slug: 'vip-call-girls',
    subtitle: 'Exotic Asian & Oriental models',
    desc: 'Sensual East Asian and North-Eastern beauties offering gentle, exotic companionship, erotic body massages, and unforgettable intimate moments.',
    image: '/images/assets/image_270x450_23.jpg',
  },
  {
    name: 'Air Hostess Escorts',
    slug: 'air-hostess',
    subtitle: 'Cultured aviation professionals and cabin crew',
    desc: 'Worldly international flight attendants and airline staff who possess flawless conversational poise, elegance, and availability for 5-star transit hotel outcalls.',
    image: '/images/assets/High_Profile_Escorts_Girl_In_Delhi.jpg',
  },
];

export default function CategoriesGridSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAF8]" id="categories-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading & Copy matching Roshni Khanna */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
            Browse Gurgaon Escorts by Category
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-5 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">
            Explore Russian, Indian, and independent female escorts for the ultimate experience. ALINA VIP offers a wide portfolio of diverse female escorts in Gurgaon. Our roster includes Russian, Indian, and independent models, giving men a strong selection of profiles for different booking needs.
          </p>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
            Our service helps you save time, avoid fake listings, and book with more confidence. We focus on genuine availability, privacy, and smooth communication so every client can make the right choice without confusion or unnecessary hassle.
          </p>
        </div>

        {/* 6 Category Cards Grid (2 rows of 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((cat, idx) => (
            <Link
              key={idx}
              href={"/category/" + cat.slug}
              className="category-inner-col group shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name + " - Escorts in Gurgaon"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Card Content Overlay */}
              <div className="cat-content space-y-2">
                <h3>{cat.name}</h3>
                <p className="text-white/90 text-xs md:text-sm font-medium">
                  {cat.subtitle}
                </p>
                <div className="category-text pt-2 border-t border-white/20">
                  <p className="text-gray-200 text-xs leading-relaxed">
                    {cat.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#FFD700] font-semibold mt-3">
                    Explore Profiles <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
