'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { escortModels } from '@/data/models';


export default function EscortsDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* Page Title Bar */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Escorts' },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Verified Escort Profiles in Gurgaon
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100 font-light max-w-2xl">
            Browse our hand-picked portfolio of 100% genuine Russian, VIP, model, and celebrity escorts available for 24/7 outcalls.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {escortModels.map((model) => (
            <div
              key={model.slug}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={model.image}
                    alt={`${model.name} - ${model.category} in Gurgaon`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#671725] text-white text-xs font-bold px-2.5 py-1 rounded shadow">
                    {model.category}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#671725]/90 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded shadow flex items-center gap-1">
                    <MapPin size={12} className="text-rose-300" />
                    <span>{model.location}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-[#111827]">{model.name}</h2>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold text-gray-700">5.0</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                    <span>Age: <strong className="text-gray-800">{model.age} Yrs</strong></span>
                    <span>Height: <strong className="text-gray-800">{model.height.split(' ')[0]}</strong></span>
                    <span>Nationality: <strong className="text-gray-800">{model.nationality}</strong></span>
                  </div>

                  <p className="text-gray-600 text-xs mt-3 line-clamp-2">
                    {model.bio}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase">1 Shot Rate</span>
                      <span className="text-lg font-black text-[#671725]">{model.rates.oneShot}</span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      Available Now
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/escorts/${model.slug}`}
                  className="block w-full text-center py-2.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs"
                >
                  View Profile &amp; Rates &rarr;
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
