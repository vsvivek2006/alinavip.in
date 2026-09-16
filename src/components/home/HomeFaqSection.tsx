import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { generalFaqs } from '@/data/siteConfig';

export default function HomeFaqSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="section-subtitle text-gold-600">Frequently Asked Questions</p>
          <h2 className="section-title mb-4 text-[#0F172A]">
            Help &amp; <span className="text-gradient-gold">Common Inquiries</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {generalFaqs.slice(0, 8).map((faq, i) => (
            <details
              key={i}
              className="bg-gray-50 rounded-2xl border border-gray-100 hover:border-gold-300 transition-all group"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-semibold text-[#0F172A] text-lg pr-4">
                  {faq.question}
                </span>
                <span className="text-gold-600 text-2xl font-light group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="btn-outline-gold inline-flex items-center gap-2"
          >
            View All FAQs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
