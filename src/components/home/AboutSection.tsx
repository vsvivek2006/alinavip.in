import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

const stats = [
  { value: '500+', label: 'Verified Profiles' },
  { value: '108', label: 'Locations in Gurgaon & NCR' },
  { value: '11', label: 'Curated Categories' },
  { value: '24/7', label: 'Service Available' },
];

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="section-subtitle text-gold-600">Discover ALINA VIP India</p>
            <h2 className="section-title mb-6 text-[#0F172A]">
              The Gold Standard of{' '}
              <span className="text-gradient-gold font-normal">
                Escort Service in Gurgaon
              </span>
            </h2>
            <div className="gold-divider mb-8" />
            <div className="space-y-4 text-gray-700 leading-relaxed text-base">
              <p><strong className="text-[#0F172A]">ALINA VIP India</strong> stands as the definitive luxury <Link href="/services" className="text-gold-600 hover:underline font-medium">escort service in Gurgaon</Link> (Gurugram), dedicated to coordinating exceptional <Link href="/category/vip-call-girls" className="text-gold-600 hover:underline font-medium">call girls</Link> and verified <Link href="/services" className="text-gold-600 hover:underline font-medium">escorts service</Link> for high-profile business dinners, executive celebrations, jet-setting travel, and confidential hotel suite appointments.</p>
              <p>Rooted in deep familiarity with Gurgaon&apos;s luxury enclaves—from <Link href="/locations/cyber-city" className="text-gold-600 hover:underline font-medium">DLF Cyber City</Link> to the <Link href="/locations/golf-course-road" className="text-gold-600 hover:underline font-medium">Golf Course Road</Link> corridor—our concierge team enforces strict operational secrecy, prompt dispatch times, and transparent zero-advance payment policies across all sectors of Gurugram.</p>
              <p>Each model in our roster is personally verified to ensure unmatched poise, engaging intellectual conversation, and impeccable presentation—delivering a 100% photo-accurate experience with top <Link href="/category/russian-call-girls" className="text-gold-600 hover:underline font-medium">Russian call girls</Link> and elite models every single time.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="/about" className="btn-outline-gold">
                Learn More <ArrowRight size={16} />
              </Link>
              <a
                href={siteConfig.url}
                className="text-gold-600 hover:text-gold-700 font-semibold flex items-center gap-2 text-sm"
              >
                Visit {siteConfig.domain} <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 text-center rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all"
              >
                <p className="font-serif text-4xl md:text-5xl text-gold-600 font-light mb-2">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 tracking-wider uppercase font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
