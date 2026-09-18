'use client';

import Image from 'next/image';
import { getAssetUrl } from '@/lib/assets';

const reviews = [
  {
    name: 'Ravi Sharma',
    location: 'AIG Hotel, Gurgaon',
    rating: 5,
    title: 'Genuine, Professional, and Reliable Service',
    comment:
      '"I am from Bihar and recently visited Gurgaon for a business trip. During my stay, I used the services from ALINA VIP. My experience was very good. The process was smooth, the communication was clear, and everything was exactly as described. I found the service to be genuine, professional, and reliable. Overall, I had an awesome experience and would recommend it to anyone looking for a trustworthy service in Gurgaon."',
  },
  {
    name: 'Jai Saklani',
    location: 'Radisson Hotel, Gurgaon',
    rating: 5,
    title: 'Utmost Discretion and Respect for Privacy',
    comment:
      '"As a frequent business traveler from Mumbai, I often have layovers in Gurgaon. On my last trip, I booked an escort through a reputed agency for a relaxing evening at my Radisson Hotel. The entire experience was fantastic. The customer support was very clear about the rates and services, and the companion they sent was beautiful, polite, and very professional. Everything was handled with utmost discretion and respect for privacy. The service was exactly as promised—genuine and reliable."',
  },
  {
    name: 'Amit Jha',
    location: 'Hyatt Place, Gurgaon',
    rating: 5,
    title: 'Incredibly Charming Girlfriend Experience',
    comment:
      '"Honestly, I was a bit hesitant about booking a companion for a corporate after-party in Gurgaon, but I am so glad I did. I wanted someone who could hold their own in a room full of executives, and the girl they sent was an absolute breath of fresh air. She was witty, elegantly dressed, and knew exactly how to keep the conversation engaging without overstepping. What started as a professional arrangement quickly felt like I was out with an incredibly charming girlfriend."',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAF8]" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading with 100% Exact Copy from editorial catalog */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
            Trusted by men from around the world
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base">
            Hear from our clients who have booked with us before
          </p>
        </div>

        {/* Testimonials Grid matching agency design testimonial-main-box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-6 md:p-8 rounded-[15px] border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Gold Stars */}
                <div className="text-[#FFD700] text-base tracking-widest mb-3">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <h3 className="font-bold text-[#111827] text-base mb-2">
                  &ldquo;{rev.title}&rdquo;
                </h3>
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6 italic">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-200 shadow-xs flex-shrink-0">
                  <Image
                    src={getAssetUrl('/images/assets/Dummy.jpg')}
                    alt={rev.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#111827]">{rev.name}</h4>
                  <p className="text-xs text-gray-500">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
