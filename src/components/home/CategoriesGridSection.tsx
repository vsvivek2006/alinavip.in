'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAssetUrl } from '@/lib/assets';

const categoriesData = [
  {
    name: 'Russian Escorts',
    slug: 'russian-call-girls',
    subtitle: 'Elegant Russian girls for premium private bookings',
    desc: 'Elegant looks, confident personality, and unforgettable intimate experiences.',
    image: '/images/categories/russian-escorts.webp',
  },
  {
    name: 'Independent Escorts',
    slug: 'independent-girls',
    subtitle: 'Independent models offering direct, discreet companionship.',
    desc: 'Personal, flexible, and private companionship experience for men who prefer direct-style meetings.',
    image: '/images/categories/independent-escorts.webp',
  },
  {
    name: 'High-Profile Escorts',
    slug: 'high-profile-girls',
    subtitle: 'Exclusive models for high-class, private encounters.',
    desc: 'Premium profiles, refined company, and high-class VIP experience',
    image: '/images/categories/high-profile-girls.webp',
  },
  {
    name: 'Indian Escorts',
    slug: 'premium-escorts',
    subtitle: 'Indian models for private bookings in Gurgaon.',
    desc: 'Beautiful Indian women for a familiar, comfortable, and natural connection. A preferred choice for relaxed intimate meetings.',
    image: '/images/categories/housewife-escorts.webp',
  },
  {
    name: 'Asian Escorts',
    slug: 'vip-call-girls',
    subtitle: 'Cute and Sophisticated Asian girls',
    desc: 'Soft skin, graceful style, and a calm personality. Suitable for men looking for elegant companionship.',
    image: '/images/categories/vip-escorts.webp',
  },
  {
    name: 'Air Hostess Escorts',
    slug: 'air-hostess',
    subtitle: 'Confident and Educated Air Hostesses for an intimate experience',
    desc: 'Smart presentation, good communication, and a well-groomed personality for a true intimate experience.',
    image: '/images/categories/air-hostess.webp',
  },
];

export default function CategoriesGridSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAF8]" id="categories-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading & Intro Paragraphs (100% Exact from editorial catalog) */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
            Browse Gurgaon Escorts by Category
          </h2>
          <div className="w-20 h-1 bg-[#671725] mx-auto rounded-full" />
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Explore Russian, Indian, and independent female escorts for the ultimate experience ALINA VIP offers a wide portfolio of diverse female escorts in Gurgaon. Our roster includes Russian, Indian, and independent models, giving men a strong selection of profiles for different booking needs. Whether you are choosing full night or hourly escort service for private companionship, our diverse selection helps you choose the right profile as per your requirement and taste. From Russian and Indian females to independent profiles and professional models, you can explore different options and find someone who matches your preference, occasion, and comfort.
          </p>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Our service helps you save time, avoid fake listings, and book with more confidence. We focus on genuine availability, privacy, and smooth communication so every client can make the right choice without confusion or unnecessary hassle.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoriesData.map((cat, idx) => (
            <Link
              key={idx}
              href={`/category/${cat.slug}`}
              className="category-inner-col group shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background Image */}
              <Image
                src={getAssetUrl(cat.image)}
                alt={`${cat.name} - Escorts in Gurgaon`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Card Content Overlay */}
              <div className="cat-content space-y-2">
                <h3>{cat.name}</h3>
                <p className="text-[#FFD700] text-xs md:text-sm font-semibold">
                  {cat.subtitle}
                </p>
                <div className="category-text pt-2 border-t border-white/20">
                  <p className="text-gray-100 text-xs md:text-sm leading-relaxed">
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

        {/* 3 Authentic Concluding Editorial Paragraphs from editorial catalog */}
        <article className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            With the advancement of Gurgaon City or &ldquo;Gurugram&rdquo; in the last few years, meeting female escorts has changed significantly, with men now looking for more genuine choices, better service, and profiles that match their personal preferences. Diversity matters because every client is different. Some prefer Russian women, some look for Indian models, while others feel more comfortable choosing independent profiles with a more personal approach.
          </p>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            ALINA VIP escort services offer a wide selection of Russian, Indian, and independent female escorts in Gurgaon, giving clients the flexibility to choose from different looks, personalities, and backgrounds. Whether the requirement is private companionship, discreet meetings, or an intimate evening, a diverse selection helps clients find a profile that feels right for them.
          </p>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Our focus is to make the booking experience more reliable, private, and comfortable. By offering different categories of female escorts, we help clients avoid limited choices and make a more confident decision based on their individual requirement.
          </p>
        </article>

      </div>
    </section>
  );
}
