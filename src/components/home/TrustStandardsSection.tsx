'use client';

import { ShieldCheck, Lock, Globe, Zap, UserCheck, Heart, FileText, Hotel } from 'lucide-react';

const trustPillars = [
  {
    icon: ShieldCheck,
    title: 'High-Profile, Verified Profiles',
    desc: 'Every escort on our roster is personally verified with recent, 100% genuine and unaltered photographs.',
  },
  {
    icon: Lock,
    title: 'Private and Discreet Services',
    desc: 'Complete client confidentiality guaranteed. All communication and rendezvous details remain strictly private.',
  },
  {
    icon: Globe,
    title: 'National and International Women',
    desc: 'A diverse portfolio featuring top European, Russian, and cultured Indian models from major metropolitan hubs.',
  },
  {
    icon: Zap,
    title: 'Fast Response, 24/7',
    desc: 'Instant booking coordination via WhatsApp and phone call with rapid 20 to 30 minute hotel suite dispatch.',
  },
];

const professionalStandards = [
  {
    icon: UserCheck,
    title: 'Verified Profiles',
    desc: 'All escorts are verified professionals with extensive hospitality and social etiquette experience.',
  },
  {
    icon: Heart,
    title: 'Safe & Discreet Services',
    desc: 'We prioritize the safety, privacy, and well-being of both our esteemed models and discerning clients.',
  },
  {
    icon: FileText,
    title: 'Transparent Pricing & Booking',
    desc: 'Transparent booking process with no advance payments. You pay directly in cash at the time of meeting.',
  },
  {
    icon: Hotel,
    title: '4-star and 5-star Hotel Service',
    desc: 'We only offer services in reputable 4-star and 5-star luxury hotels and private luxury residences.',
  },
];

export default function TrustStandardsSection() {
  return (
    <>
      {/* 1. Offering Services You Can Trust (Roshni Khanna why-main-box) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="why-main-box">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                ALINA VIP- Offering Services You Can Trust
              </h2>
              <div className="w-16 h-1 bg-[#FFD700] mx-auto mb-4 rounded-full" />
              <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                Partner with an agency that combines professionalism, diversity, and unmatched industry expertise
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trustPillars.map((tp, idx) => {
                const Icon = tp.icon;
                return (
                  <div key={idx} className="style-8">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-[#FFD700]">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1.5">{tp.title}</h3>
                      <p className="text-xs md:text-sm text-gray-200 leading-relaxed">{tp.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Professional Standards (Roshni Khanna profissional-main-box) */}
      <section className="py-16 md:py-20 bg-[#FAFAF8] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] tracking-tight">
              Our Professional Standards
            </h2>
            <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-gray-600 text-sm md:text-base">
              Committed to maintaining privacy, trust, and service quality at every step of the booking process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 profissional-main-box">
            {professionalStandards.map((std, idx) => {
              const Icon = std.icon;
              return (
                <div key={idx} className="style-8">
                  <div className="w-12 h-12 rounded-full bg-[#FCE7EB] flex items-center justify-center flex-shrink-0 text-[#671725]">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] mb-1.5">{std.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{std.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
