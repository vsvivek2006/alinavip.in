'use client';

import Image from 'next/image';

const reviews = [
  {
    name: 'Vikram S.',
    location: 'Cyber City, Executive',
    rating: 5,
    title: 'Flawless Russian Escort Experience',
    comment:
      'Booked Karina for a late-night dinner date at the Oberoi. She arrived within 25 minutes, was stunningly dressed, articulate, and completely genuine. ALINA VIP is the most professional agency in Gurgaon.',
  },
  {
    name: 'David M.',
    location: 'Aerocity, Business Traveler',
    rating: 5,
    title: 'Top-Class Discretion & Punctuality',
    comment:
      'During my transit stay in Aerocity, I needed discreet evening companionship. The booking process was fast and transparent with zero advance fee demands. Tanya was gorgeous, witty, and exceptional.',
  },
  {
    name: 'Rohit K.',
    location: 'Golf Course Road, Entrepreneur',
    rating: 5,
    title: 'Genuine Verified Profiles Only',
    comment:
      'I was tired of fake pictures and scam agents in Gurgaon until I found ALINA VIP. What you see on the website is 100% who arrives at your suite. High-class service from start to finish.',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAF8]" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
            Trusted by men from around the world
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base">
            Genuine verified feedback from corporate executives, business travelers, and VIP clients
          </p>
        </div>

        {/* Testimonials Grid matching Roshni Khanna testimonial-main-box */}
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
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-200 shadow-xs flex-shrink-0">
                  <Image
                    src="/images/assets/Dummy.jpg"
                    alt={rev.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#111827]">{rev.name}</h4>
                  <p className="text-xs text-gray-400">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
