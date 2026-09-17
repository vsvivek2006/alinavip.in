'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowRight } from 'lucide-react';

const faqs = [
  {
    q: 'Are your escort services in Gurgaon safe and discreet?',
    a: 'Yes, absolutely. We prioritize the safety, privacy, and confidentiality of our clients above everything. All personal details and rendezvous records are kept 100% confidential and deleted immediately following completion of service.',
  },
  {
    q: 'How do I book an escort in Gurgaon?',
    a: 'Booking is simple: browse our verified profiles on the website, choose your preferred companion, and reach out to our desk via WhatsApp or direct phone call with your hotel room/location and timing details. We confirm within 5 minutes.',
  },
  {
    q: 'Do you charge any advance payment?',
    a: 'No. We maintain a strict zero-advance policy. You never pay before meeting your escort. Payment is made directly in cash upon her arrival at your hotel room or private residence.',
  },
  {
    q: 'Can escorts visit my hotel in Gurgaon?',
    a: 'Yes, our primary service is 5-star and 4-star hotel outcalls across Gurgaon, Aerocity, and South Delhi. We deliver prompt 20 to 30 minute suite outcalls to all major hotel chains including Oberoi, Leela, Crowne Plaza, Taj, and JW Marriott.',
  },
  {
    q: 'Are your services available 24/7 in Gurgaon?',
    a: 'Yes, our escort services in Gurgaon are available 24/7, including weekends and public holidays, for both immediate on-demand dispatch and advance reservations.',
  },
  {
    q: 'How can I contact you for escort services in Gurgaon?',
    a: 'You can contact us directly via phone call or WhatsApp through the buttons on our website. Our dedicated concierge team responds within minutes to help you pick your perfect match.',
  },
];

export default function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-white" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] tracking-tight">
            Frequently Asked Questions About Gurgaon Escorts
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base">
            Find answers to commonly asked questions about our verified escort services in Gurgaon
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 bg-gray-50/70 hover:bg-gray-100/70 transition-colors"
                >
                  <span className="font-semibold text-sm md:text-base text-[#111827]">
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#671725]">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 py-4 bg-white border-t border-gray-100 text-xs md:text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-7 py-3 border border-[#671725] text-[#671725] hover:bg-[#671725] hover:text-white text-xs font-semibold rounded-full transition-all duration-300"
          >
            <span>See More FAQs</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
