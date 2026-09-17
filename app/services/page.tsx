import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import CTASection from '@/components/CTASection';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Luxury Escort Services in Gurgaon (Gurugram) | 24/7 Outcalls | ALINA VIP',
  description:
    'Explore premier luxury escort services in Gurgaon. Erotic massage, girlfriend experience, 5-star hotel outcalls, travel companions, dinner dates, and 24/7 VIP call girls.',
  keywords: [
    ...siteConfig.keywords.slice(0, 10),
    'gurgaon escort services, hotel outcall escorts, erotic massage gurgaon, gfe escorts gurgaon',
  ],
  alternates: {
    canonical: `${siteConfig.url}/services`,
    languages: getAlternateLanguages('/services'),
  },
  openGraph: {
    title: 'Luxury Escort Services in Gurgaon (Gurugram) | 24/7 Outcalls | ALINA VIP',
    description:
      'Explore premier luxury escort services in Gurgaon. Erotic massage, girlfriend experience, 5-star hotel outcalls, travel companions, dinner dates, and 24/7 VIP call girls.',
    url: `${siteConfig.url}/services`,
    type: 'website',
  },
};

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  features: string[];
}

const servicesList: ServiceItem[] = [
  {
    id: 'dinner-dates',
    title: 'Dinner Dates & Social Engagements',
    desc: 'Sophisticated, articulate models who effortlessly accompany you to high-end restaurants, corporate banquets, and networking galas.',
    image: '/images/assets/image_290x280_1.jpg',
    features: ['High-society etiquette', 'Michelin-grade dining companion', 'Discreet social presence'],
  },
  {
    id: 'girlfriend-experience',
    title: 'Girlfriend Experience (GFE)',
    desc: 'Deep emotional and physical connection, passionate kissing, tender cuddling, and warm conversational companionship.',
    image: '/images/assets/image_290x280_2.jpg',
    features: ['Intimate romantic bonding', 'Passionate affection', 'Unrushed rendezvous'],
  },
  {
    id: 'erotic-massage',
    title: 'Erotic & Sensual Body Massage',
    desc: 'Indulge in head-to-toe stress relief with therapeutic, warm oil body-to-body sensual massage delivered in complete privacy.',
    image: '/images/assets/image_290x280_3.jpg',
    features: ['Body-to-body sliding', 'Aromatherapy warm oils', 'Total mental relaxation'],
  },
  {
    id: 'hotel-outcalls',
    title: '5-Star Luxury Hotel Outcalls',
    desc: 'Prompt 20 to 30 minute arrival at top five-star hotels including The Oberoi, The Leela, Crowne Plaza, and ITC Grand Bharat.',
    image: '/images/assets/image_290x280_4.jpg',
    features: ['20-30 min hotel arrival', 'DLF & Golf Course Road coverage', 'Direct suite dispatch'],
  },
  {
    id: '24-7-escorts',
    title: '24/7 Round-the-Clock Service',
    desc: 'Our VIP concierge coordinates instant on-demand dispatches or planned appointments day and night without delay.',
    image: '/images/assets/image_290x280_5.jpg',
    features: ['Always available 24/7', 'Instant WhatsApp coordination', 'Zero advance cash on delivery'],
  },
  {
    id: 'travel-companions',
    title: 'Luxury Travel & Vacation Escorts',
    desc: 'Well-travelled, cultured companions ready to join you on business trips, weekend retreats, or international vacations.',
    image: '/images/assets/image_290x280_6.jpg',
    features: ['Valid travel documents', 'Multilingual & cultured', 'Domestic & overseas travel'],
  },
  {
    id: 'corporate-hosting',
    title: 'Corporate Galas & Red Carpet Events',
    desc: 'Impeccably dressed, photogenic models who enhance your executive stature at industry conferences and VIP gatherings.',
    image: '/images/assets/image_290x280_7.jpg',
    features: ['Flawless cocktail styling', 'Polished conversational skill', 'Confidential guest presence'],
  },
  {
    id: 'overnight-stays',
    title: 'Overnight Stays & Weekend Getaways',
    desc: 'Uninterrupted nighttime romance, sweet intimacy, and luxury breakfast companionship in your hotel suite.',
    image: '/images/assets/image_290x280_8.jpg',
    features: ['Full night 8-12 hours', 'Morning breakfast company', 'Maximum relaxation'],
  },
  {
    id: 'couple-duo',
    title: 'Couple & Duo Escort Rendezvous',
    desc: 'Explore your ultimate fantasy with two breathtaking models simultaneously or add a third companion for couples.',
    image: '/images/assets/image_290x280_9.jpg',
    features: ['Two gorgeous escorts', 'Couples friendly', 'Harmonious shared chemistry'],
  },
  {
    id: 'bdsm-roleplay',
    title: 'BDSM & Sensual Roleplay',
    desc: 'Safe, consensual, and judgment-free exploration of dominant-submissive dynamics, fantasies, and cosplay roleplays.',
    image: '/images/assets/image_290x280_10.jpg',
    features: ['Consensual boundary respect', 'Costume & fantasy play', 'Discreet exploration'],
  },
  {
    id: 'vip-party',
    title: 'VIP Nightclub & Party Hosting',
    desc: 'High-energy, glamorous companions for private villa parties, farmhouses, and VIP table bottle service.',
    image: '/images/assets/image_290x280_11.jpg',
    features: ['Vibrant party personality', 'Nightclub table partner', 'Farmhouse rendezvous'],
  },
  {
    id: 'tailored-experiences',
    title: 'Customized Bespoke Experiences',
    desc: 'Tell us your unique preferences, aesthetic criteria, and schedule; our concierge coordinates a flawless bespoke date.',
    image: '/images/assets/image_290x280_12.jpg',
    features: ['100% personalized', 'Private concierge coordination', 'Exclusive model roster'],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-[#FFFDF6] min-h-screen text-[#2d2d2d]">
      {/* 1. Page Title Bar */}
      <section className="relative bg-[#671725] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-luxury-gold shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Luxury Escort Services in Gurgaon
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto">
            Bespoke Companionship, Erotic Massage, and 5-Star Hotel Outcalls Available 24/7 Across Gurugram
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs md:text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-luxury-gold font-semibold">Our Services</span>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="bg-[#671725] text-white py-4 px-4 shadow-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-luxury-gold" />
            <strong>100% Verified Profiles</strong>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={18} className="text-luxury-gold" />
            <strong>Zero Advance Payment Required</strong>
          </span>
          <span className="flex items-center gap-2">
            <Clock size={18} className="text-luxury-gold" />
            <strong>24/7 Instant Hotel Outcalls</strong>
          </span>
        </div>
      </section>

      {/* 3. 12 Services Grid (Using real image_290x280_1 to 12) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-wine">
            Comprehensive Offerings
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mt-1">
            Exclusive Companionship Packages
          </h2>
          <div className="w-16 h-1 bg-primary-wine mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Select from our bespoke escort offerings tailored for executive gentlemen, luxury travelers, and hotel guests in Gurgaon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, idx) => (
            <article
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/80 flex flex-col justify-between group"
            >
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                  src={service.image}
                  alt={`${service.title} in Gurgaon`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#671725] text-white text-[11px] font-bold px-2.5 py-1 rounded shadow">
                  SERVICE #{idx + 1}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-2 group-hover:text-primary-wine transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  
                  <div className="space-y-1.5 mb-6">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-700">
                        <Sparkles size={13} className="text-luxury-gold shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                      `Hello ALINA VIP, I would like to inquire about ${service.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#13bc18] hover:bg-[#0fa814] text-white font-bold text-xs rounded transition-colors"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-[#671725] hover:bg-[#52121d] text-white font-bold text-xs rounded transition-colors"
                  >
                    <Phone size={14} className="text-luxury-gold" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 4. Standards Section */}
        <section className="mt-20 bg-white p-8 md:p-12 rounded-2xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="w-14 h-14 bg-primary-wine/10 text-primary-wine rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={28} />
              </div>
              <h4 className="font-bold text-[#111827] text-lg mb-2">100% Verified Profiles</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                All companion escorts undergo strict physical identity and background verification for your safety.
              </p>
            </div>

            <div className="p-4">
              <div className="w-14 h-14 bg-primary-wine/10 text-primary-wine rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} />
              </div>
              <h4 className="font-bold text-[#111827] text-lg mb-2">24/7 Concierge Booking</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Round-the-clock telephone and WhatsApp response with rapid dispatch to all Gurgaon hotels.
              </p>
            </div>

            <div className="p-4">
              <div className="w-14 h-14 bg-primary-wine/10 text-primary-wine rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} />
              </div>
              <h4 className="font-bold text-[#111827] text-lg mb-2">NCR-Wide Outcalls</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Rapid arrival to Cyber City, Golf Course Road, Sohna Road, MG Road, Aerocity, and Delhi luxury suites.
              </p>
            </div>
          </div>
        </section>
      </main>

      <CTASection />
    </div>
  );
}
