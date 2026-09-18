'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { getAssetUrl } from '@/lib/assets';

export default function HeroSection() {
  return (
    <section className="bg-[#FFFDF6] py-12 md:py-20 border-b border-[#EFE8DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column (Content) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="new-banner">
              <h1>
                <span>ALINA VIP</span>
                <br />
                Gurgaon Escorts
              </h1>
            </div>

            <div className="space-y-1">
              <p className="text-[#111827] text-lg sm:text-xl md:text-2xl font-semibold">
                24/7 | In-Call and Outcall Escort Service in Gurgaon
              </p>
              <p className="text-[#111827] text-sm md:text-base font-medium tracking-wide">
                Russian | Indian | Independent | VIP Model Escorts
              </p>
            </div>

            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Welcome to Gurgaon’s premier escort agency. We offer exclusive in-person verified female escorts, Russian call girls, and high-profile models for confidential 5-star hotel and private residential rendezvous across Cyber City, Golf Course Road, and Delhi NCR.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href={"tel:" + siteConfig.phone}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 font-semibold text-sm rounded-xl"
              >
                <Phone size={16} />
                <span>Call Now</span>
                <ArrowRight size={16} />
              </a>

              <a
                href={"https://wa.me/" + siteConfig.whatsapp + "?text=Hello%20ALINA%20VIP,%20I%20would%20like%20to%20inquire%20about%20your%20escort%20services%20in%20Gurgaon."}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 font-bold text-sm rounded-xl"
              >
                <MessageCircle size={17} />
                <span>WhatsApp</span>
              </a>

              <Link
                href="/gallery"
                className="inline-flex items-center gap-1.5 px-7 py-3.5 bg-white/90 hover:bg-white text-[#671725] border border-rose-200/90 hover:border-[#671725] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 font-semibold text-sm rounded-xl"
              >
                <span>View Profiles</span>
              </Link>
            </div>
          </div>

          {/* Right Column (Circular Showcase matching Roshni Khanna banner-circle-img) */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto">
              <div className="banner-circle-img relative aspect-square">
                <Image
                  src={getAssetUrl('/images/assets/Gurgaon_Escort.png')}
                  alt="Russian Escort in Gurgaon"
                  fill
                  priority
                  className="rounded-full object-cover shadow-lg border-4 border-white"
                  sizes="(max-width: 768px) 45vw, 220px"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#671725] to-[#420c16] text-[#FFD700] border border-[#FFD700]/30 text-[11px] font-semibold px-3.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  Russian VIP
                </span>
              </div>

              <div className="banner-circle-img relative aspect-square mt-6">
                <Image
                  src={getAssetUrl('/images/assets/Gurgaon_Escorts.png')}
                  alt="VIP Escorts Gurgaon"
                  fill
                  priority
                  className="rounded-full object-cover shadow-lg border-4 border-white"
                  sizes="(max-width: 768px) 45vw, 220px"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#671725] to-[#420c16] text-[#FFD700] border border-[#FFD700]/30 text-[11px] font-semibold px-3.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  VIP Models
                </span>
              </div>

              <div className="banner-circle-img relative aspect-square -mt-6">
                <Image
                  src={getAssetUrl('/images/assets/Karina.jpg')}
                  alt="Independent Escorts Gurgaon"
                  fill
                  className="rounded-full object-cover shadow-lg border-4 border-white"
                  sizes="(max-width: 768px) 45vw, 220px"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#671725] to-[#420c16] text-[#FFD700] border border-[#FFD700]/30 text-[11px] font-semibold px-3.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  Independent
                </span>
              </div>

              <div className="banner-circle-img relative aspect-square">
                <Image
                  src={getAssetUrl('/images/assets/Tanya.jpg')}
                  alt="Air Hostess Escorts Gurgaon"
                  fill
                  className="rounded-full object-cover shadow-lg border-4 border-white"
                  sizes="(max-width: 768px) 45vw, 220px"
                />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#671725] to-[#420c16] text-[#FFD700] border border-[#FFD700]/30 text-[11px] font-semibold px-3.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  Air Hostess
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
