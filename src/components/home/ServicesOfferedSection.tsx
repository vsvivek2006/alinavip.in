'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Sparkles, Building2, Hotel, Clock, Moon, ArrowRight } from 'lucide-react';

const servicesData = [
  {
    icon: Heart,
    title: 'Girlfriend Experience (GFE)',
    desc: 'Dive into an intimate companionship with our high profile model escorts offering exclusive Girlfriend Experience in Gurgaon.',
    image: '/images/assets/Girlfriend_Experience.png',
  },
  {
    icon: Sparkles,
    title: 'Erotic Massage',
    desc: 'Relieve stress and unwind with therapeutic body-to-body sensual massage sessions performed by skilled, beautiful escorts in Gurgaon.',
    image: '/images/assets/Erotic_Massage.jpg',
  },
  {
    icon: Building2,
    title: 'In-Call & Out Call Services',
    desc: 'Rapid 20 to 30 minute outcall service to all major hotels, serviced apartments, and private residences across Gurgaon and NCR.',
    image: '/images/assets/In_Call_And_Out_Call_Services.png',
  },
  {
    icon: Hotel,
    title: 'Hotel Escort Service',
    desc: 'Seamless, discreet outcall service directly to luxury 4-star and 5-star hotels including Oberoi, Leela, Crowne Plaza, and JW Marriott.',
    image: '/images/assets/Escorts_24x7_Availability.jpg',
  },
  {
    icon: Clock,
    title: '24/ 7 Escort Service',
    desc: 'Our VIP booking desk operates 24 hours a day, 7 days a week, for instant on-demand dispatch or planned future reservations.',
    image: '/images/assets/24x7_Available_Escorts.jpg',
  },
  {
    icon: Moon,
    title: 'Hourly & Full Night Escort Service',
    desc: 'Select customized booking packages ranging from single-hour romantic encounters to complete overnight full-night engagements.',
    image: '/images/assets/Independent_Escorts_To_Meet_On_Hourly_Basis.jpg',
  },
];

export default function ServicesOfferedSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="services-offered">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading & Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
            Services Offered
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            24/7, In-call and out call escort services tailored to meet your every desire
          </p>
        </div>

        {/* 6 Service Cards Grid matching Roshni Khanna service-inner-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((serv, idx) => {
            const Icon = serv.icon;
            return (
              <div
                key={idx}
                className="service-inner-col group shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Background Image */}
                <Image
                  src={serv.image}
                  alt={serv.title + " in Gurgaon"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Content Overlay */}
                <div className="serv-content">
                  <div className="icon mb-2">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {serv.title}
                  </h3>
                  <p className="text-gray-200 text-xs md:text-sm leading-relaxed mb-1">
                    {serv.desc}
                  </p>
                  <Link
                    href="/services"
                    className="tm-button text-xs font-semibold text-[#FFD700] hover:underline"
                  >
                    <span>Read More</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
