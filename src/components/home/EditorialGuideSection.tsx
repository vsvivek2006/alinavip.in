'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, Mail, Sparkles, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function EditorialGuideSection() {
  return (
    <div className="space-y-0">

      {/* 1. Top Class Gurgaon Escorts Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-tight">
                Top Class Gurgaon Escorts Service Available 24/7 to Accompany You
              </h2>
              <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
                <p>
                  Welcome to the world of fantasies and romance! At ALINA VIP{' '}
                  <Link href="/" className="text-[#671725] font-semibold hover:underline">
                    Gurgaon Escorts service
                  </Link>{' '}
                  agency, we are dedicated to providing our clients with the ultimate intimate experiences. We have a selection of high profile – independent female escorts. These charismatic girls are here for 24/7 in-call and outcall service.
                </p>
                <p>
                  Our carefully selected Gurgaon escorts include women from various backgrounds, each possessing their unique charm, personality, and special talents. From Russian girls to high profile and model girls, our diverse portfolio of independent female escorts in Gurugram allows you to select a partner who perfectly complements your taste and preferences.
                </p>
                <p>
                  <strong>Choose from over 100 top Gurgaon escorts on our website</strong>, or contact us by phone or WhatsApp for immediate reservation.
                </p>
              </div>

              {/* Quick CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-sm font-semibold text-[#671725]">
                <a href={"tel:" + siteConfig.phone} className="inline-flex items-center gap-1.5 hover:underline">
                  <Phone size={15} /> Call: {siteConfig.phoneDisplay}
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href={"https://wa.me/" + siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
                <span className="text-gray-300">|</span>
                <a href={"mailto:" + siteConfig.email} className="inline-flex items-center gap-1.5 hover:underline text-gray-700">
                  <Mail size={15} /> {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Featured Image */}
            <div className="lg:col-span-5 relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <Image
                src="/images/assets/Diverse_Portfolio.jpg"
                alt="Diverse Portfolio of Escorts in Gurgaon"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sensual Getaway Wine Banner with Real Image Cards */}
      <section className="py-16 md:py-20 bg-[#671725] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#FFD700] text-xs font-semibold uppercase tracking-wider">
              Exclusive Companionship
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              A Sensual Getaway with Sexy Gurgaon Escorts
            </h2>
            <div className="w-16 h-1 bg-[#FFD700] mx-auto rounded-full" />
            <p className="text-gray-100 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              Life can be hectic, and everyone deserves an escape. Our Gurgaon escorts provide a warm sanctuary where you can unwind, release daily stress, and immerse yourself in luxurious affection.
            </p>
          </div>

          {/* 3 Experience Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-xl overflow-hidden border border-white/10 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/images/assets/Full_Body_Sensual_Massage.jpg"
                  alt="Full Body Sensual Massage Gurgaon"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-white text-base mb-1.5 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#FFD700]" /> Sensual Massage
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Full-body therapeutic touch designed to dissolve executive tension in complete privacy.
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl overflow-hidden border border-white/10 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/images/assets/Independent_Escorts_To_Meet_On_Hourly_Basis.jpg"
                  alt="Hourly Escorts Gurgaon"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-white text-base mb-1.5 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#FFD700]" /> Hourly Rendezvous
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Ideal for quick breaks, afternoon relaxation, or brief business transit dates in 5-star suites.
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl overflow-hidden border border-white/10 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/images/assets/Overnight_Stays_And_Weekend_Getaways.jpg"
                  alt="Full Night Overnight Stays"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-white text-base mb-1.5 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#FFD700]" /> Full-Night Stays
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Indulge in an uninterrupted overnight journey with passionate romance and breakfast companion.
                </p>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl overflow-hidden border border-white/10 flex flex-col justify-between group">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/images/assets/Travel_Companions.jpg"
                  alt="Travel Companions Escorts"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-white text-base mb-1.5 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#FFD700]" /> Travel Companions
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed">
                  Cultured, educated models ready to accompany you to luxury resorts and corporate business trips.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-10">
            <a
              href={"https://wa.me/" + siteConfig.whatsapp + "?text=Hi%20ALINA%20VIP,%20I%20would%20like%20to%20inquire%20about%20booking%20an%20escort."}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#671725] font-bold text-sm rounded shadow hover:bg-gray-100 transition-colors"
            >
              <MessageCircle size={16} />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Specialized Experiences (Couple & Duo, BDSM, Dinner Dates) */}
      <section className="py-16 md:py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] tracking-tight">
              Bespoke Escort Experiences in Gurgaon
            </h2>
            <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-gray-600 text-sm md:text-base">
              Explore customized services designed to satisfy your specific fantasies and social requirements
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Special Requests */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/images/assets/Special_Requests_And_Customized_Experiences.png"
                  alt="Special Requests and Tailored Experiences"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#111827] text-lg mb-2">Tailored Experiences</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
                  Custom-tailored rendezvous tailored precisely to your private desires, personal fantasies, and schedule.
                </p>
                <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#671725]">
                  Learn More <ArrowRight size={13} />
                </Link>
              </div>
            </div>
{/* Couple and Duo */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/images/assets/Couple_And_Duo_Services.png"
                  alt="Couple and Duo Services"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#111827] text-lg mb-2">Double The Fun: Duo Services</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
                  Experience the ultimate pleasure with two gorgeous female escorts catering to your deepest fantasies simultaneously.
                </p>
                <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#671725]">
                  Learn More <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Dinner Dates */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/images/assets/Dinner_Dates_And_Social_Engagements.jpg"
                  alt="Dinner Dates And Social Engagements"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#111827] text-lg mb-2">Dinner Dates &amp; Social Galas</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
                  Sophisticated, charming models for high-end dining at DLF CyberHub, One Horizon, or corporate networking parties.
                </p>
                <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#671725]">
                  Learn More <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* BDSM & Fetish */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src="/images/assets/BDSM_And_Fetish_Experiences.png"
                  alt="BDSM and Fetish Experiences"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#111827] text-lg mb-2">Explore BDSM &amp; Roleplay</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
                  Safe, consensual, and discreet exploration of roleplays, gentle domination, and fetish desires with open-minded models.
                </p>
                <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#671725]">
                  Learn More <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
