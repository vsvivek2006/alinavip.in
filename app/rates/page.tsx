import type { Metadata } from 'next';
import {
  CheckCircle,
  Shield,
  Clock,
  ArrowRight,
  Phone,
  MessageCircle,
  Sparkles,
  Heart,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';
import exactManifest from '@/data/exact_manifest.json';

const ratesManifest = exactManifest.rates;

export const metadata: Metadata = {
  title: `${siteConfig.city} Escorts Rates & Pricing Packages | ${siteConfig.name}`,
  description: `Book and meet the hottest female escorts in ${siteConfig.city} at transparent hourly rates. Zero advance payment, 100% cash on delivery, 5-star hotel outcalls 24/7.`,
  alternates: {
    canonical: `${siteConfig.url}/rates`,
    languages: getAlternateLanguages('/rates'),
  },
  openGraph: {
    title: `${siteConfig.city} Escorts Rates & Pricing Packages | ${siteConfig.name}`,
    description: `Transparent escort rates in ${siteConfig.city}. Zero advance payment, 100% cash on delivery, 5-star hotel outcalls 24/7 with ${siteConfig.name}.`,
    url: `${siteConfig.url}/rates`,
    type: 'website',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.city} Escorts Rates & Pricing Packages | ${siteConfig.name}`,
    description: `Hourly and full-night escort service rates in ${siteConfig.city}. Zero advance payment.`,
    images: ['/og-image.jpg'],
  },
};

const pricingPackages = [
  {
    hours: 'Upto 2 Hours of Fun',
    shots: '1-2 Intimate Rounds',
    price: '₹15,000',
    tag: 'Standard Hourly',
    popular: false,
    features: [
      'In-Call & Outcall Service',
      'Choose from up to 3 Categories of escorts',
      'Confirm profile before booking',
      'Private and discreet service',
      'Erotic Girlfriend Experience',
      'Zero advance payment – cash on arrival',
    ],
  },
  {
    hours: 'Upto 4 Hours of Fun',
    shots: '2-3 Intimate Rounds',
    price: '₹20,000',
    tag: 'Most Popular',
    popular: true,
    features: [
      'In-Call & Outcall Service',
      'Choose from up to 6 Categories of escorts',
      'Confirm profile before booking',
      'Private and discreet service',
      'Erotic Girlfriend Experience',
      'Sensual body rub & shower escort service',
    ],
  },
  {
    hours: 'Upto 6 Hours of Fun',
    shots: 'Extended Evening / Dinner',
    price: '₹25,000',
    tag: 'Dinner & Social',
    popular: false,
    features: [
      'In-Call & Outcall Service',
      'Choose from upto 8 Categories of escorts',
      'Confirm profile before booking',
      'Private and discreet service',
      'Erotic Girlfriend Experience',
      'Accompany to luxury restaurants or suites',
    ],
  },
  {
    hours: '8+ Hours of Fun (Full Night)',
    shots: 'Unlimited Overnight Sessions',
    price: '₹30,000+',
    tag: 'VIP Luxury Overnight',
    popular: false,
    features: [
      'Full overnight 10 PM to 8 AM escort service',
      'In-Call & Outcall Service',
      'Choose from full portfolio - including Celebrity Escorts and High-Profile Models',
      'Confirm profile before booking',
      'Private and discreet service',
      'Erotic Girlfriend Experience',
      'Option to book for outstation trips',
    ],
  },
];

const categoryPricing = [
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
  const editorialSections = ratesManifest.sections.slice(1);

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* 1. Page Title Bar */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#FFD700] shadow-md">
        <div className="max-w-6xl mx-auto">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Rates & Pricing' },
              ]}
            />
          </div>
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#FFD700] text-xs font-semibold uppercase tracking-wider mb-2">
            ★ All-Inclusive Packages &bull; Zero Advance
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {siteConfig.city} Escorts Rates &amp; Pricing Packages
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100 font-light max-w-3xl leading-relaxed">
            Book and meet some of the hottest and sexiest female escorts in {siteConfig.city} at the best hourly rates. Choose your favorite hourly or full-time package and confirm your booking on the phone or WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20inquire%20about%20rates%20and%20packages`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2"
            >
              <MessageCircle size={16} /> WhatsApp Inquiry
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="px-6 py-2.5 bg-white/90 hover:bg-white text-[#671725] border border-rose-200/90 hover:border-[#671725] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <Phone size={16} /> Direct Call: {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* 2. Trust Bar */}
      <div className="bg-[#52121d] text-white py-3.5 px-4 shadow-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-2">
            <Shield size={16} className="text-[#FFD700]" />
            <strong>100% Cash on Delivery</strong>
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={16} className="text-[#FFD700]" />
            <strong>No Hidden Charges or Hotel Surcharges</strong>
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-[#FFD700]" />
            <strong>24/7 Rapid Arrival in 20-30 Mins</strong>
          </span>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 4 Pricing Package Cards */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#671725]">
              Hourly &amp; Full Night Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
              Choose Your Intimate Rendezvous Package
            </h2>
            <div className="w-16 h-1 bg-[#671725] mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingPackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl border ${
                  pkg.popular
                    ? 'border-[#671725] shadow-xl ring-2 ring-[#671725]/10'
                    : 'border-gray-200 shadow-sm'
                } p-6 flex flex-col justify-between hover:shadow-lg transition-all relative group`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#671725] text-[#FFD700] text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-md tracking-wider">
                    {pkg.tag}
                  </div>
                )}

                <div>
                  <div className="text-center pb-4 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {pkg.hours}
                    </span>
                    <div className="text-3xl font-extrabold text-[#671725] my-2">
                      {pkg.price}
                    </div>
                    <p className="text-xs font-medium text-emerald-700 bg-emerald-50 py-1 px-2 rounded-md inline-block">
                      {pkg.shots}
                    </p>
                  </div>

                  <ul className="space-y-2.5 py-6">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20book%20the%20${encodeURIComponent(pkg.hours)}%20package`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 text-center text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white shadow-md shadow-rose-950/20 rounded-xl' : 'bg-white hover:bg-rose-50/80 text-[#671725] border border-rose-200/80 hover:border-[#671725] rounded-xl'
                    }`}
                  >
                    <MessageCircle size={14} /> Book via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category Pricing Matrix */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
              Pricing by Escort Category
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Estimated rates for in-call and out-call sessions in {siteConfig.city}. Custom requests or multi-day tours can be arranged via concierge.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#671725] text-white">
                  <th className="py-3 px-4 rounded-tl-lg font-bold">Call Girl Category</th>
                  <th className="py-3 px-4 font-bold">1-2 Hours</th>
                  <th className="py-3 px-4 font-bold">3-4 Hours</th>
                  <th className="py-3 px-4 font-bold">Full Night (Overnight)</th>
                  <th className="py-3 px-4 rounded-tr-lg font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {categoryPricing.map((row, idx) => (
                  <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[#111827]">{row.category}</td>
                    <td className="py-3 px-4 font-medium text-emerald-700">{row.short}</td>
                    <td className="py-3 px-4 font-medium text-emerald-700">{row.extended}</td>
                    <td className="py-3 px-4 font-medium text-emerald-700">{row.overnight}</td>
                    <td className="py-3 px-4 text-center">
                      <a
                        href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20am%20interested%20in%20${encodeURIComponent(row.category)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#671725] hover:underline"
                      >
                        Book <ArrowRight size={12} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* All Authentic Scraped Sections from editorial catalog */}
        <div className="space-y-8">
          {editorialSections.map((sec, idx) => (
            <article
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-sm space-y-4"
            >
              {sec.title && (
                <h2 className="text-xl sm:text-2xl font-bold text-[#111827] border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Heart size={18} className="text-[#671725] shrink-0" />
                  <span>{sec.title}</span>
                </h2>
              )}

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {p}
                </p>
              ))}

              {sec.listItems && sec.listItems.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {sec.listItems.map((li, lIdx) => (
                    <li key={lIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                      <Sparkles size={13} className="text-[#FFD700] shrink-0" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
