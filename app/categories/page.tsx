'use client';

import Link from 'next/link';
import Image from 'next/image';

import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';


const allCategories = [
  {
    name: 'Russian Escorts in Gurgaon',
    slug: 'russian-call-girls',
    image: '/images/assets/Russian_Escorts_Girl_In_Delhi.jpg',
    desc: 'Breathtaking blonde and brunette European companions with high glamour, elegance, and seductive charm.',
    price: 'From ₹25,000',
  },
  {
    name: 'Independent Escorts in Gurgaon',
    slug: 'independent-escorts',
    image: '/images/assets/Independent_Escorts_Delhi.jpg',
    desc: 'Self-managed companions offering private, non-commercial rendezvous with genuine girlfriend intimacy.',
    price: 'From ₹15,000',
  },
  {
    name: 'Model Escorts in Gurgaon',
    slug: 'models',
    image: '/images/assets/High_Profile_Escorts_Girl_In_Delhi.jpg',
    desc: 'Runway, fashion, and commercial models possessing statuesque height, flawless poise, and VIP etiquette.',
    price: 'From ₹25,000',
  },
  {
    name: 'VIP Call Girls in Gurgaon',
    slug: 'vip-call-girls',
    image: '/images/assets/VIP_Call_Girls_Delhi.jpg',
    desc: 'Top-tier luxury companions chosen specifically for corporate executives, high-net-worth elites, and politicians.',
    price: 'From ₹20,000',
  },
  {
    name: 'College Call Girls in Gurgaon',
    slug: 'college-girls',
    image: '/images/assets/College_Girl_Escorts_Delhi.jpg',
    desc: 'Young, lively, and enthusiastic university students providing friendly, playful, and cheerful companionship.',
    price: 'From ₹15,000',
  },
  {
    name: 'Air Hostess Escorts in Gurgaon',
    slug: 'air-hostess',
    image: '/images/assets/Air_Hostess_Escorts_Delhi.jpg',
    desc: 'Graceful airline cabin crew members with polished English manners, worldly charm, and impeccable grooming.',
    price: 'From ₹20,000',
  },
  {
    name: 'High Profile Escorts in Gurgaon',
    slug: 'high-profile-girls',
    image: '/images/assets/Diverse_Portfolio.jpg',
    desc: 'Exclusive socialite companions who excel as formal dinner dates, luxury party escorts, and confidential partners.',
    price: 'From ₹30,000',
  },
  {
    name: 'Celebrity Escorts in Gurgaon',
    slug: 'celebrity-escorts',
    image: '/images/assets/image_270x450_13.jpg',
    desc: 'Screen actresses, social media influencers, and pageant stars for those demanding the absolute zenith of luxury.',
    price: 'From ₹50,000',
  },
  {
    name: 'Housewife Escorts in Gurgaon',
    slug: 'housewife',
    image: '/images/assets/Housewife_Escorts_Delhi.jpg',
    desc: 'Passionate, mature, and deeply nurturing married women seeking private sensual exploration and uninhibited pleasure.',
    price: 'From ₹15,000',
  },
  {
    name: 'Foreigner Call Girls Gurgaon',
    slug: 'foreigner-escorts',
    image: '/images/assets/image_270x450_14.jpg',
    desc: 'International models from Europe, Central Asia, and Latin America visiting Gurgaon on luxury tour circuits.',
    price: 'From ₹25,000',
  },
  {
    name: 'Punjabi Call Girls in Gurgaon',
    slug: 'punjabi-call-girls',
    image: '/images/assets/image_270x450_15.jpg',
    desc: 'Fair, bubbly, and voluptuous Punjabi kudi companions known for their spirited warmth and energetic intimacy.',
    price: 'From ₹15,000',
  },
  {
    name: 'Busty Escorts in Gurgaon',
    slug: 'busty-escorts',
    image: '/images/assets/Busty_Escorts_Delhi.jpg',
    desc: 'Curvaceous bombshells with generous figures and full cleavage, delivering supreme tactile satisfaction.',
    price: 'From ₹15,000',
  },
  {
    name: 'Slim Escorts in Gurgaon',
    slug: 'slim-escorts',
    image: '/images/assets/Slim_Escorts_Delhi.jpg',
    desc: 'Petite, slender companions with dancer bodies and tight waists, offering agile and delicate erotic moments.',
    price: 'From ₹15,000',
  },
  {
    name: 'Affordable Escorts in Gurgaon',
    slug: 'affordable-escorts',
    image: '/images/assets/image_270x450_16.jpg',
    desc: 'High value without compromising hygiene or genuineness. Real girls at budget-friendly standard rates.',
    price: 'From ₹15,000',
  },
  {
    name: 'Russian Escorts in Aerocity',
    slug: 'aerocity-russian',
    image: '/images/assets/image_270x450_17.jpg',
    desc: 'Express 15-minute room delivery to all 5-star hotels in Aerocity Hospitality District, Worldmark, and IGI T3.',
    price: 'From ₹25,000',
  },
  {
    name: 'Female Escorts Gurgaon',
    slug: 'female-escorts',
    image: '/images/assets/Female_Escorts_Delhi.jpg',
    desc: 'Versatile female companionship spanning all age groups, backgrounds, and intimate service preferences.',
    price: 'From ₹15,000',
  },
];

export default function CategoriesHubPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* Page Title Bar */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Categories' },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Escort Categories in Gurgaon &amp; Delhi NCR
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100 font-light max-w-2xl">
            Now you can meet different categories of escorts from all over the world. Explore verified profiles matched to your exact desire.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#671725] uppercase tracking-widest">Tailored Companionship</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2154] mt-2">
            Different Escorts in Gurgaon for Your Pleasure
          </h2>
          <p className="text-gray-600 text-sm mt-3">
            From statuesque Russian supermodels and playful college students to sophisticated air hostesses, ALINA VIP curates Gurgaon&apos;s most comprehensive directory.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allCategories.map((cat) => (
            <div
              key={cat.slug}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#671725] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                    Verified
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#0B2154]/90 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                    {cat.price}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-extrabold text-[#0B2154] group-hover:text-[#671725] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-600 text-xs mt-2 leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/category/${cat.slug}`}
                  className="block w-full text-center py-2 bg-[#671725] hover:bg-[#52121d] text-white text-xs font-bold rounded-lg shadow transition-colors"
                >
                  View Profiles &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
