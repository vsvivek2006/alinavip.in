'use client';

import Link from 'next/link';
import { CheckCircle, Shield, Clock, Star, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';

const rateCards = [
  {
    hours: '1-2 Hours',
    shots: '1 Shot',
    price: '₹15,000',
    tag: 'Standard Service',
    popular: false,
    features: [
      'Genuine companion at your hotel/home',
      'Sensual body massage & intimacy',
      'Oral sex & passionate kissing',
      'Discreet doorstep arrival in 20-30 mins',
      'Zero advance payment required',
    ],
  },
  {
    hours: '2-4 Hours',
    shots: '2 Shots',
    price: '₹20,000',
    tag: 'Most Popular',
    popular: true,
    features: [
      'Two passionate rounds of intimacy',
      'Relaxed, unhurried companionship',
      'Deep French kissing & full GFE',
      'Shower intimacy & body rub',
      'Cash on arrival guarantee',
    ],
  },
  {
    hours: '5-6 Hours',
    shots: '3 Shots',
    price: '₹25,000',
    tag: 'Dinner & Date',
    popular: false,
    features: [
      'Evening dinner companion & dates',
      'Three passionate intimate sessions',
      'Hotel lounge or club partner',
      'Full erotic experience',
      'Complete privacy guaranteed',
    ],
  },
  {
    hours: 'Full Night (Overnight)',
    shots: 'Unlimited Shots',
    price: '₹30,000+',
    tag: 'VIP Luxury',
    popular: false,
    features: [
      '10:00 PM to 08:00 AM companionship',
      'Unlimited intimate sessions',
      'Cuddle, sleep together & breakfast',
      'Five-star hotel suite companion',
      'Dedicated concierge support',
    ],
  },
];

const categoryRates = [
  { category: 'College Call Girls', short: '₹15,000', extended: '₹20,000', overnight: '₹30,000', slug: 'college-girls' },
  { category: 'Russian Escorts', short: '₹25,000', extended: '₹35,000', overnight: '₹45,000', slug: 'russian-call-girls' },
  { category: 'Model Escorts', short: '₹25,000', extended: '₹35,000', overnight: '₹50,000', slug: 'models' },
  { category: 'High Profile Escorts', short: '₹30,000', extended: '₹40,000', overnight: '₹60,000', slug: 'high-profile-girls' },
  { category: 'Air Hostess Escorts', short: '₹20,000', extended: '₹30,000', overnight: '₹40,000', slug: 'air-hostess' },
  { category: 'Housewife Escorts', short: '₹15,000', extended: '₹20,000', overnight: '₹30,000', slug: 'housewife' },
  { category: 'Celebrity Call Girls', short: '₹50,000', extended: '₹75,000', overnight: '₹1,00,000', slug: 'celebrity-escorts' },
  { category: 'Independent Escorts', short: '₹15,000', extended: '₹22,000', overnight: '₹35,000', slug: 'independent-escorts' },
];

export default function RatesPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* Page Title Bar */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Rates & Pricing' },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Gurgaon Escorts Rates &amp; Pricing Packages
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100 font-light max-w-2xl">
            Transparent, all-inclusive pricing with zero advance payment. Real companions delivered to your hotel or residence across Gurgaon.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Main 4 Rate Cards */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#671725] uppercase tracking-widest">Transparent Duration Pricing</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2154] mt-2">
            Affordable Rates for Every VIP Occasion
          </h2>
          <p className="text-gray-600 text-sm mt-3">
            No hidden costs, no booking commissions, and no prepayment scams. All rates include transportation and verified service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rateCards.map((card) => (
            <div
              key={card.hours}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                card.popular
                  ? 'bg-white border-2 border-[#671725] shadow-xl relative scale-105 lg:scale-105 z-10'
                  : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {card.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#671725] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Most Popular
                  </div>
                )}
                <div className="text-center pb-5 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide block">{card.hours}</span>
                  <div className="text-3xl sm:text-4xl font-black text-[#671725] mt-2">{card.price}</div>
                  <span className="inline-block mt-2 text-xs font-bold text-[#0B2154] bg-[#F9E1E5] px-2.5 py-0.5 rounded-full">
                    {card.shots}
                  </span>
                </div>

                <ul className="space-y-3 my-6 text-xs text-gray-600">
                  {card.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-[#671725] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20book%20the%20${encodeURIComponent(card.hours)}%20package`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-2.5 rounded-lg text-xs font-bold transition-colors shadow ${
                    card.popular
                      ? 'bg-[#671725] hover:bg-[#52121d] text-white'
                      : 'bg-gray-900 hover:bg-black text-white'
                  }`}
                >
                  Book This Package
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Category Pricing Matrix Table */}
        <div className="mt-20 bg-white rounded-2xl border border-gray-100 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-[#671725] uppercase tracking-widest">Comprehensive Breakdown</span>
            <h3 className="text-2xl font-extrabold text-[#0B2154] mt-1">
              Category-Wise Escort Price Matrix
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-2">
              Compare rates across escort profiles in Gurgaon. Rates vary based on nationality, background, and booking duration.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-xs sm:text-sm">
              <thead className="bg-[#671725] text-white">
                <tr>
                  <th className="px-5 py-3.5 font-bold">Escort Category</th>
                  <th className="px-5 py-3.5 font-bold">1-2 Hours (1 Shot)</th>
                  <th className="px-5 py-3.5 font-bold">2-4 Hours (2 Shots)</th>
                  <th className="px-5 py-3.5 font-bold">Full Night (Overnight)</th>
                  <th className="px-5 py-3.5 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categoryRates.map((cr, idx) => (
                  <tr key={cr.category} className={idx % 2 === 0 ? 'bg-[#FFFDF6]' : 'bg-white'}>
                    <td className="px-5 py-4 font-bold text-[#0B2154]">
                      <Link href={`/category/${cr.slug}`} className="hover:text-[#671725] underline decoration-rose-200">
                        {cr.category}
                      </Link>
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#671725]">{cr.short}</td>
                    <td className="px-5 py-4 text-gray-700 font-medium">{cr.extended}</td>
                    <td className="px-5 py-4 text-gray-900 font-extrabold">{cr.overnight}</td>
                    <td className="px-5 py-4 text-center">
                      <Link
                        href={`/category/${cr.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#671725] hover:text-[#0B2154]"
                      >
                        <span>View Profiles</span>
                        <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* What You Get at ALINA VIP */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#671725] uppercase tracking-widest">Unrivaled Service Quality</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2154] mt-1">
              What You Get at ALINA VIP
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-rose-50 text-[#671725] rounded-lg flex items-center justify-center mb-4">
                <Star size={24} />
              </div>
              <h4 className="font-bold text-[#0B2154] text-lg mb-2">Gurgaon&apos;s Top Independent Escorts</h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                We work directly with genuine college girls, models, and international companions. No fake stock images, no surprises.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-rose-50 text-[#671725] rounded-lg flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h4 className="font-bold text-[#0B2154] text-lg mb-2">24X7 Availability</h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                Day or late night, our VIP dispatch team coordinates fast outcall arrivals in 20-30 minutes across Cyber City, Golf Course, and Aerocity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-rose-50 text-[#671725] rounded-lg flex items-center justify-center mb-4">
                <Shield size={24} />
              </div>
              <h4 className="font-bold text-[#0B2154] text-lg mb-2">Zero Advance Payment</h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                Pay only when your verified companion arrives in person at your hotel room or residence. Safe, honest, and completely secure.
              </p>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
