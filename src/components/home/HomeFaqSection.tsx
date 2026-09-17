'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowRight, HelpCircle } from 'lucide-react';

const exactFaqs = [
  {
    q: 'What is the process to book an escort in Gurgaon?',
    a: 'You can book an escort in Gurgaon by browsing available profiles on our website and contacting us directly through call or WhatsApp. Our team will guide you through the process and help you choose the right companion based on your preferences.',
  },
  {
    q: 'Are your Gurgaon escorts verified and genuine?',
    a: 'Yes, all profiles listed on our platform are manually verified to ensure authenticity and quality. We prioritize providing genuine and reliable escort services in Gurgaon.',
  },
  {
    q: 'Is my privacy safe while booking an escort service in Gurgaon?',
    a: 'We maintain 100% discretion and confidentiality. Your personal details are never shared with anyone, ensuring a completely private and secure experience.',
  },
  {
    q: 'What types of escorts are available in Gurgaon?',
    a: 'We offer a wide range of escorts in Gurgaon, including independent escorts, VIP escorts, high-profile companions, and college escorts. You can choose according to your preferences and requirements.',
  },
  {
    q: 'Do you provide outcall and incall services in Gurgaon?',
    a: 'Yes, we provide both outcall and incall services. Our escorts can visit your hotel or residence, or you can arrange a meeting at a preferred location.',
  },
  {
    q: 'What areas do you cover in Gurgaon?',
    a: 'Our escort services are available across major areas of Gurgaon, including DLF Phase 1, DLF Phase 2, MG Road, Sector 14, and nearby locations.',
  },
  {
    q: 'How much does an escort service in Gurgaon cost?',
    a: 'Pricing depends on the type of escort, duration, and specific requirements. For detailed information, you can contact us directly to get the best available packages.',
  },
  {
    q: 'Is advance booking required for Gurgaon escort services?',
    a: 'While same-day bookings are available, we recommend advance booking to ensure availability of your preferred escort and time slot.',
  },
  {
    q: 'Are your services available 24/7 in Gurgaon?',
    a: 'Yes, our escort services in Gurgaon are available 24/7, including weekends and holidays, for your convenience.',
  },
  {
    q: 'How can I contact you for escort services in Gurgaon?',
    a: 'You can contact us via phone call or WhatsApp mentioned on our website. Our support team is always ready to assist you with quick responses.',
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
          <span className="text-xs font-bold uppercase tracking-wider text-[#671725]">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight mt-1">
            Frequently Asked Questions About Gurgaon Escorts
          </h2>
          <div className="w-16 h-1 bg-[#671725] mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-600 text-sm md:text-base">
            Find answers to commonly asked questions about our verified escort services in Gurgaon.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {exactFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden transition-colors bg-[#FFFDF6]"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left font-bold text-sm sm:text-base text-[#111827] flex items-center justify-between gap-4 hover:text-[#671725] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle size={16} className="text-[#671725] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <span className="p-1 rounded-full bg-rose-50 text-[#671725] shrink-0">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-white">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Link to Full FAQs */}
        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#671725] hover:underline"
          >
            <span>Have more questions? Read our full FAQ guide</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
