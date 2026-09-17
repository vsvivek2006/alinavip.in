'use client';

import { MessageSquare, BadgePercent, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Send Inquiry',
    desc: 'Browse our website and pick your preferred model or category. Contact our concierge via WhatsApp or telephone.',
  },
  {
    num: '02',
    icon: BadgePercent,
    title: 'Receive Price and Availability',
    desc: 'Our team confirms real-time hotel dispatch availability, transparent package rates, and estimated 20-30 min arrival.',
  },
  {
    num: '03',
    icon: CheckCircle2,
    title: 'Confirm Booking',
    desc: 'Meet your verified escort in the privacy of your 5-star hotel room or suite. Pay directly in cash upon arrival.',
  },
];

export default function BookingProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-white" id="booking-process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
            Simple Booking Process
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base">
            Easy, confidential, and instant 3-step escort booking in Gurgaon
          </p>
        </div>

        {/* 3-Step Process with Connecting Bar */}
        <div className="booking-process-main grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-11 left-[15%] right-[15%] h-[3px] bg-gray-200 z-0" />

          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="booking-process-col relative text-center z-10">
                {/* Step Number Badge */}
                <div className="process-number">
                  {st.num}
                </div>

                {/* Icon Circle */}
                <div className="icon-wrap shadow-sm">
                  <Icon size={34} className="text-[#0B2154]" />
                </div>

                <h3 className="text-xl font-bold text-[#111827] mb-2">
                  {st.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm max-w-xs mx-auto leading-relaxed">
                  {st.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
