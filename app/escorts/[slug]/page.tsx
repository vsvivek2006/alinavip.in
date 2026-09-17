import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Shield, Star, CheckCircle, MapPin, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { escortModels } from '@/data/models';
import { siteConfig } from '@/data/siteConfig';

export function generateStaticParams() {
  return escortModels.map((model) => ({
    slug: model.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = escortModels.find((m) => m.slug === slug);
  if (!model) {
    return {
      title: 'Verified Escort Profile in Gurgaon | ALINA VIP',
    };
  }
  return {
    title: `${model.name} - ${model.category} in Gurgaon | ALINA VIP`,
    description: `Book ${model.name}, verified ${model.category} in Gurgaon. Age ${model.age}, 5-star hotel doorstep arrival in 20-30 minutes with ALINA VIP.`,
    alternates: {
      canonical: `${siteConfig.url}/escorts/${slug}`,
    },
  };
}

export default async function EscortProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = escortModels.find((m) => m.slug === slug);

  if (!model) {
    notFound();
  }

  const relatedModels = escortModels
    .filter((m) => m.slug !== model.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* Page Title Bar */}
      <div className="bg-[#671725] text-white py-10 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Escorts', href: '/gallery' },
                { label: model.category, href: `/category/${model.categorySlug}` },
                { label: model.name },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {model.name} | Gurgaon Escorts
          </h1>
          <p className="mt-2 text-sm sm:text-base text-rose-100 font-light max-w-2xl">
            Verified {model.category} available for high-class hotel outcalls and VIP companionship in Gurgaon &amp; Delhi NCR.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Profile Grid: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Portrait Model Photo */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white p-3 rounded-xl border border-gray-100 shadow-md">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={model.image}
                  alt={`${model.name} - ${model.category} in Gurgaon`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-4 left-4 bg-[#671725] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-[#FFD700]" />
                  <span>100% Real &amp; Verified</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#671725]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1.5">
                  <MapPin size={13} className="text-rose-300" />
                  <span>{model.location}</span>
                </div>
              </div>

              {/* Quick Model Badges */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100 text-center">
                <div className="bg-[#FFFDF6] p-2 rounded border border-gray-100">
                  <span className="block text-[11px] text-gray-500">Age</span>
                  <span className="font-bold text-[#671725] text-sm">{model.age} Yrs</span>
                </div>
                <div className="bg-[#FFFDF6] p-2 rounded border border-gray-100">
                  <span className="block text-[11px] text-gray-500">Height</span>
                  <span className="font-bold text-[#671725] text-sm">{model.height.split(' ')[0]}</span>
                </div>
                <div className="bg-[#FFFDF6] p-2 rounded border border-gray-100">
                  <span className="block text-[11px] text-gray-500">Figure</span>
                  <span className="font-bold text-[#671725] text-sm">{model.bust}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Information & Booking */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
                <div>
                  <span className="inline-block text-xs font-semibold text-[#671725] uppercase tracking-wider bg-rose-50 px-2.5 py-1 rounded">
                    {model.category}
                  </span>
                  <h2 className="text-3xl font-extrabold text-[#111827] mt-1">
                    {model.name}
                  </h2>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                    <span className="text-xs font-bold text-gray-600 ml-1">({model.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 justify-end mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Available Right Now in Gurgaon
                  </span>
                </div>
              </div>

              {/* Rates Summary Box */}
              <div className="mt-6 bg-[#F9E1E5]/40 border border-rose-200/60 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-600 uppercase tracking-wider block">Standard Outcall Rate</span>
                  <span className="text-2xl font-black text-[#671725]">{model.rates.oneShot}</span>
                  <span className="text-xs text-gray-500 ml-1">/ 1 Shot</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20book%20${encodeURIComponent(model.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#13bc18] hover:bg-[#0fa714] text-white text-xs font-bold rounded shadow transition-all flex items-center gap-1.5"
                  >
                    <span>WhatsApp Concierge</span>
                  </a>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="px-4 py-2.5 bg-[#671725] hover:bg-[#52121d] text-white text-xs font-bold rounded shadow transition-all flex items-center gap-1.5"
                  >
                    <Phone size={13} />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-2">
                  About {model.name}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {model.bio}
                </p>
              </div>

              {/* Physical Attributes Table */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-3">
                  Physical Statistics &amp; Details
                </h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 text-xs">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2.5 font-bold text-gray-800 w-1/3">Base City</td>
                        <td className="px-4 py-2.5 text-gray-600">{model.location}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-bold text-gray-800">Nationality</td>
                        <td className="px-4 py-2.5 text-gray-600">{model.nationality}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2.5 font-bold text-gray-800">Age</td>
                        <td className="px-4 py-2.5 text-gray-600">{model.age} Years</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-bold text-gray-800">Body Measurements</td>
                        <td className="px-4 py-2.5 text-gray-600">{model.bust} - {model.waist} - {model.hips}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2.5 font-bold text-gray-800">Height</td>
                        <td className="px-4 py-2.5 text-gray-600">{model.height}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2.5 font-bold text-gray-800">Languages</td>
                        <td className="px-4 py-2.5 text-gray-600">{model.languages.join(', ')}</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-4 py-2.5 font-bold text-gray-800">Availability</td>
                        <td className="px-4 py-2.5 text-emerald-700 font-semibold">24/7 In-Call &amp; Outcall (Gurgaon &amp; Aerocity)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Working Hours Table */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-3">
                  Working Hours
                </h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 text-xs">
                    <tbody className="divide-y divide-gray-200">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, idx) => (
                        <tr key={day} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-2 font-bold text-gray-800 w-1/3">{day}</td>
                          <td className="px-4 py-2 text-gray-600">00:00 – 24:00 (Round The Clock)</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rate Matrix Table */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-3">
                  Booking Rates &amp; Duration Packages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border border-rose-200 p-4 rounded-lg bg-[#FFFDF6] text-center">
                    <span className="block text-xs text-gray-500 font-medium uppercase">1 Shot (1-2 Hrs)</span>
                    <span className="block text-xl font-extrabold text-[#671725] mt-1">{model.rates.oneShot}</span>
                    <span className="block text-[11px] text-gray-500 mt-1">Standard Intimacy</span>
                  </div>
                  <div className="border border-rose-300 p-4 rounded-lg bg-rose-50/50 text-center shadow-xs">
                    <span className="block text-xs text-[#671725] font-bold uppercase">2 Shots (2-4 Hrs)</span>
                    <span className="block text-xl font-extrabold text-[#671725] mt-1">{model.rates.twoShots}</span>
                    <span className="block text-[11px] text-gray-500 mt-1">Extended Companionship</span>
                  </div>
                  <div className="border border-[#671725]/20 p-4 rounded-lg bg-[#671725]/5 text-center">
                    <span className="block text-xs text-[#111827] font-bold uppercase">Full Night (Overnight)</span>
                    <span className="block text-xl font-extrabold text-[#111827] mt-1">{model.rates.fullNight}</span>
                    <span className="block text-[11px] text-gray-500 mt-1">10 PM to 8 AM Companion</span>
                  </div>
                </div>
              </div>

              {/* Included Services Tags */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-3">
                  Services Offered by {model.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {model.services.map((srv) => (
                    <span
                      key={srv}
                      className="bg-white border border-rose-200 text-[#671725] text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle size={12} className="text-[#671725]" />
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Booking Guidelines */}
              <div className="mt-8 bg-gray-50 p-5 rounded-lg border border-gray-200 text-xs text-gray-600 space-y-2">
                <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                  <Shield size={15} className="text-[#671725]" />
                  ALINA VIP Discretion &amp; Booking Guarantee
                </h4>
                <p>• Zero advance payment required for verified 5-star hotel bookings.</p>
                <p>• 100% genuine model guaranteed. If she does not match this profile, you can cancel at the doorstep with no fees.</p>
                <p>• Fast 20 to 30-minute outcall arrival across all Gurgaon sectors, DLF Phase 1-5, Golf Course Road, Cyber City, and Aerocity.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Escort Models */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#671725] uppercase tracking-widest">More Escort Companions</span>
              <h2 className="text-2xl font-black text-[#111827] mt-1">
                Explore Other Verified Profiles in Gurgaon
              </h2>
            </div>
            <Link
              href="/gallery"
              className="text-xs font-bold text-[#671725] hover:text-[#111827] flex items-center gap-1 transition-colors"
            >
              <span>View All Profiles</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedModels.map((rel) => (
              <div key={rel.slug} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={rel.image}
                    alt={`${rel.name} - ${rel.category}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#671725] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {rel.category}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#111827] text-base">{rel.name}</h3>
                    <span className="text-xs font-extrabold text-[#671725]">{rel.rates.oneShot}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">{rel.location}</p>
                  <Link
                    href={`/escorts/${rel.slug}`}
                    className="mt-3 block w-full text-center py-2 bg-[#671725] hover:bg-[#52121d] text-white text-xs font-bold rounded transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
