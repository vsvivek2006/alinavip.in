import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Lock,
  Crown,
  Sparkles,
  Clock,
  MapPin,
  Star,
  CheckCircle2,
  Award,
  Phone,
  ArrowRight,
  HeartHandshake,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'About ALINA VIP India | Escort Service in Gurgaon (Gurugram)',
  description:
    'Discover the legacy of ALINA VIP India. Over a decade of excellence providing premier escort service in Gurgaon (Gurugram) with verified call girls, VIP escort girls, and 5-star hotel outcalls.',
  keywords: siteConfig.keywords,
  alternates: {
    canonical: `${siteConfig.url}/about`,
    languages: getAlternateLanguages('/about'),
  },
  openGraph: {
    title: 'About ALINA VIP India | Escort Service in Gurgaon (Gurugram)',
    description:
      'Discover the legacy of ALINA VIP India. Over a decade of excellence providing premier escort service in Gurgaon (Gurugram) with verified call girls, VIP escort girls, and 5-star hotel outcalls.',
    url: `${siteConfig.url}/about`,
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ name: 'Home', path: '/' }, { name: 'About Us' }]} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#050508] via-[#0C0B14] to-[#141022] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="container-luxury relative z-10">
          <div className="text-center">
            <span className="inline-block px-6 py-2 border border-gold-500/30 rounded-full text-gold-400 text-sm font-semibold tracking-wider uppercase mb-6 bg-gold-500/10 backdrop-blur-sm">
              ★ About ALINA VIP India
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-wide">
              The Story of <span className="text-gradient-gold">ALINA VIP India</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Gurgaon (Gurugram)&apos;s leading high-end <Link href="/services" className="text-gold-400 hover:underline font-medium">escorts service</Link>, connecting discerning executives and travellers with authenticated call girls,{' '}
              <Link href="/category/russian-call-girls" className="text-gold-400 hover:underline font-medium">
                Russian call girls
              </Link>
              , and{' '}
              <Link href="/category/model-escorts" className="text-gold-400 hover:underline font-medium">
                elite models
              </Link>{' '}
              under unconditional privacy standards.
            </p>
            <div className="gold-divider mx-auto mt-8" />
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Full Editorial Story */}
            <div className="lg:col-span-7 space-y-10">
              {/* Welcome Section */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-5 font-serif">
                  Welcome to ALINA VIP –{' '}
                  <span className="text-gold-600">Gurgaon&apos;s Premier Escort Agency</span>
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  <strong>ALINA VIP</strong> is Gurgaon&apos;s leading escort agency, offering a curated{' '}
                  <Link href="/services" className="text-gold-600 hover:underline font-medium">
                    service portfolio
                  </Link>{' '}
                  of VIP call girls,{' '}
                  <Link href="/category/russian-call-girls" className="text-gold-600 hover:underline font-medium">
                    Russian escorts
                  </Link>
                  , and{' '}
                  <Link href="/category/model-escorts" className="text-gold-600 hover:underline font-medium">
                    elite models
                  </Link>
                  . Our agency is designed for discerning gentlemen who value discretion, quality, and professionalism.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Founded with a vision to redefine escort services in Gurgaon, we have established ourselves as the city&apos;s most trusted name in luxury hospitality and escort service. Our verified profiles, rigorous screening process, and unwavering commitment to privacy set us apart.
                </p>
              </div>

              {/* Our Story */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4 font-serif">
                  Our Story – Redefining High-End Escort Services
                </h3>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    <strong>ALINA VIP</strong> was founded with a singular vision: to elevate the escort service experience in Gurgaon by providing a service that is sophisticated, professional, and uncompromising in its commitment to quality and discretion. In an industry often characterised by inconsistency and a lack of professionalism, we saw an opportunity to create something different — an agency that operates with the standards of a luxury hospitality brand.
                  </p>
                  <p>
                    Our journey began with a simple observation: discerning gentlemen in Gurgaon deserved an escort service that matched their lifestyle and expectations. The city had become one of India&apos;s most cosmopolitan centres, home to business leaders, entrepreneurs, and global executives. Yet the options for verified, quality escorts were limited. <strong>ALINA VIP</strong> was created to fill this gap.
                  </p>
                  <p>
                    From the outset, we made several key decisions that would shape our service philosophy. We decided that every profile in our portfolio would undergo a thorough verification process, ensuring that profiles were genuine and accurate. We committed to complete discretion in all client interactions, recognising that privacy is a fundamental need for our clientele. And we chose to focus on quality over quantity, maintaining a curated selection rather than an exhaustive but inconsistent roster.
                  </p>
                </div>
              </div>

              {/* Why Choose ALINA VIP */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6 font-serif">
                  Why Choose ALINA VIP for Escort Service in Gurgaon?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-[#FDFBF7] rounded-2xl border border-gold-200/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ShieldCheck className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-lg mb-1">Verified Call Girls &amp; Escorts</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Every profile is verified through ID checks, photo authentication, and personal screening for your safety and peace of mind.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#FDFBF7] rounded-2xl border border-gold-200/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Lock className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-lg mb-1">100% Discreet Escort Service</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Your privacy is our priority. All client inquiries and bookings remain strictly confidential with zero digital footprint.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#FDFBF7] rounded-2xl border border-gold-200/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Crown className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-lg mb-1">VIP &amp; Premium Call Girls</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Our curated selection includes{' '}
                        <Link href="/category/russian-call-girls" className="text-gold-600 hover:underline font-medium">Russian escorts</Link>,{' '}
                        <Link href="/category/model-escorts" className="text-gold-600 hover:underline font-medium">model escorts</Link>,{' '}
                        <Link href="/category/housewife-escorts" className="text-gold-600 hover:underline font-medium">housewife escorts</Link>, and{' '}
                        <Link href="/category/college-girls" className="text-gold-600 hover:underline font-medium">college call girls</Link> – all verified and elite.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#FDFBF7] rounded-2xl border border-gold-200/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-lg mb-1">Premium Escort Experience</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        From luxury hotel room visits to outcall appointments at private residences, we ensure a seamless, high-end experience every time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#FDFBF7] rounded-2xl border border-gold-200/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-lg mb-1">24/7 Concierge Service</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Our booking desk operates around the clock. Coordinate verified escorts anytime – day or night.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#FDFBF7] rounded-2xl border border-gold-200/50 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-lg mb-1">All Gurgaon Locations</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        We provide discreet outcall across{' '}
                        <Link href="/locations/cyber-city" className="text-gold-600 hover:underline font-medium">Cyber City</Link>,{' '}
                        <Link href="/locations/mg-road" className="text-gold-600 hover:underline font-medium">MG Road</Link>,{' '}
                        <Link href="/locations/golf-course-road" className="text-gold-600 hover:underline font-medium">Golf Course Road</Link>,{' '}
                        <Link href="/locations/dlf-phase-1" className="text-gold-600 hover:underline font-medium">DLF</Link>, and all major NCR corridors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Our Mission */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4 font-serif">
                  Our Mission – Excellence in Escort Service
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Our mission is to provide the finest escort services in Gurgaon, characterised by verified profiles, exceptional conversational skills, and unwavering discretion. We strive to create experiences that are memorable, sophisticated, and tailored to the unique preferences of each client.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  We believe that great escort service is about more than just physical beauty. It is about the complete experience of spending time with someone who is cultured, articulate, and genuinely engaging. It is about the comfort of knowing that your privacy is protected and your expectations are consistently met.
                </p>
              </div>

              {/* Core Values */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6 font-serif">
                  Our Core Values in Escort Service
                </h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="p-6 bg-gold-50/70 rounded-2xl border border-gold-200/80 hover:shadow-md transition-shadow">
                    <Lock className="w-8 h-8 text-gold-600 mb-3" />
                    <h4 className="font-bold text-[#0F172A] text-lg mb-2">Discretion</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Complete confidentiality and protected data for all client reservations and interactions.
                    </p>
                  </div>

                  <div className="p-6 bg-gold-50/70 rounded-2xl border border-gold-200/80 hover:shadow-md transition-shadow">
                    <Star className="w-8 h-8 text-gold-600 mb-3" />
                    <h4 className="font-bold text-[#0F172A] text-lg mb-2">Quality</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Exacting standards in profile curation, background verification, and personalized service delivery.
                    </p>
                  </div>

                  <div className="p-6 bg-gold-50/70 rounded-2xl border border-gold-200/80 hover:shadow-md transition-shadow">
                    <CheckCircle2 className="w-8 h-8 text-gold-600 mb-3" />
                    <h4 className="font-bold text-[#0F172A] text-lg mb-2">Authenticity</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Verified profiles with authentic photos. No bait-and-switch tactics or unverified imagery.
                    </p>
                  </div>

                  <div className="p-6 bg-gold-50/70 rounded-2xl border border-gold-200/80 hover:shadow-md transition-shadow">
                    <Award className="w-8 h-8 text-gold-600 mb-3" />
                    <h4 className="font-bold text-[#0F172A] text-lg mb-2">Professionalism</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Luxury hospitality standards, punctual dispatch, and respectful communication in every engagement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Areas We Serve */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4 font-serif">
                  Areas We Serve – Escort Service in Gurgaon
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Our agency provides discreet outcall service across major sectors and commercial hubs. Explore our complete{' '}
                  <Link href="/locations" className="text-gold-600 hover:underline font-semibold">
                    Gurgaon location directory
                  </Link>{' '}
                  or view key areas:
                </p>
                <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gold-200/50">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/cyber-city" className="text-gold-600 hover:underline font-semibold">Cyber City Escorts</Link>
                        {' '}– Escorts for executive events, business dining, and corporate hotel visits
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/mg-road" className="text-gold-600 hover:underline font-semibold">MG Road Call Girls</Link>
                        {' '}– Call girls near central Gurgaon shopping and leisure destinations
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/golf-course-road" className="text-gold-600 hover:underline font-semibold">Golf Course Road Escorts</Link>
                        {' '}– Elite models for luxury residential complexes and high-end hotels
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/dlf-phase-1" className="text-gold-600 hover:underline font-semibold">DLF City Escorts</Link>
                        {' '}– Discreet escort coordination across DLF Phase 1 through Phase 5
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/sohna-road" className="text-gold-600 hover:underline font-semibold">Sohna Road Call Girls</Link>
                        {' '}– Rapid outcall escorts along the southern Gurgaon business corridor
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/sushant-lok" className="text-gold-600 hover:underline font-semibold">Sushant Lok Escorts</Link>
                        {' '}– Refined call girls in established central residential colonies
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/sector-29" className="text-gold-600 hover:underline font-semibold">Sector 29 Call Girls</Link>
                        {' '}– Vibrant escorts near Gurgaon&apos;s culinary and nightlife district
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/huda-city-centre" className="text-gold-600 hover:underline font-semibold">HUDA City Centre Escorts</Link>
                        {' '}– Rapid hotel dispatch near central transit and commercial centers
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/manesar" className="text-gold-600 hover:underline font-semibold">Manesar Call Girls</Link>
                        {' '}– Premium escorts for corporate stays in IMT Manesar
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/dwarka" className="text-gold-600 hover:underline font-semibold">Dwarka Escorts</Link>
                        {' '}– Verified call girls serving southwest Delhi and airport hotels
                      </div>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gold-600 font-bold mt-0.5">•</span>
                      <div>
                        <Link href="/locations/aerocity" className="text-gold-600 hover:underline font-semibold">Aerocity Escorts</Link>
                        {' '}– Luxury airport transit escorts at five-star hospitality suites
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Our Call Girls & Escort Categories */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6 font-serif">
                  Our Call Girls &amp; Escort Categories
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Link href="/category/russian-call-girls"
                    className="p-4 bg-gradient-to-br from-gold-50/60 to-white rounded-2xl border border-gold-200/80 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="block font-bold text-[#0F172A] text-base group-hover:text-gold-600 transition-colors">
                      Russian Escorts
                    </span>
                    <span className="text-xs text-gray-600 mt-1 block">
                      Exclusive European call girls
                    </span>
                  </Link>

                  <Link href="/category/model-escorts"
                    className="p-4 bg-gradient-to-br from-gold-50/60 to-white rounded-2xl border border-gold-200/80 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="block font-bold text-[#0F172A] text-base group-hover:text-gold-600 transition-colors">
                      Model Escorts
                    </span>
                    <span className="text-xs text-gray-600 mt-1 block">
                      Professional fashion models
                    </span>
                  </Link>

                  <Link href="/category/housewife-escorts"
                    className="p-4 bg-gradient-to-br from-gold-50/60 to-white rounded-2xl border border-gold-200/80 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="block font-bold text-[#0F172A] text-base group-hover:text-gold-600 transition-colors">
                      Housewife Escorts
                    </span>
                    <span className="text-xs text-gray-600 mt-1 block">
                      Mature, experienced profiles
                    </span>
                  </Link>

                  <Link href="/category/college-girls"
                    className="p-4 bg-gradient-to-br from-gold-50/60 to-white rounded-2xl border border-gold-200/80 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="block font-bold text-[#0F172A] text-base group-hover:text-gold-600 transition-colors">
                      College Girls
                    </span>
                    <span className="text-xs text-gray-600 mt-1 block">
                      Young, vibrant profiles
                    </span>
                  </Link>

                  <Link href="/category/independent-girls"
                    className="p-4 bg-gradient-to-br from-gold-50/60 to-white rounded-2xl border border-gold-200/80 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="block font-bold text-[#0F172A] text-base group-hover:text-gold-600 transition-colors">
                      Independent Escorts
                    </span>
                    <span className="text-xs text-gray-600 mt-1 block">
                      Self-employed professional call girls
                    </span>
                  </Link>

                  <Link href="/category/vip-call-girls"
                    className="p-4 bg-gradient-to-br from-gold-50/60 to-white rounded-2xl border border-gold-200/80 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="block font-bold text-[#0F172A] text-base group-hover:text-gold-600 transition-colors">
                      VIP Escorts
                    </span>
                    <span className="text-xs text-gray-600 mt-1 block">
                      High-profile elite models
                    </span>
                  </Link>

                  <Link href="/category/air-hostess"
                    className="p-4 bg-gradient-to-br from-gold-50/60 to-white rounded-2xl border border-gold-200/80 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="block font-bold text-[#0F172A] text-base group-hover:text-gold-600 transition-colors">
                      Air Hostess Escorts
                    </span>
                    <span className="text-xs text-gray-600 mt-1 block">
                      Groomed, elegant models
                    </span>
                  </Link>

                  <Link href="/category/celebrity-escorts"
                    className="p-4 bg-gradient-to-br from-gold-50/60 to-white rounded-2xl border border-gold-200/80 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="block font-bold text-[#0F172A] text-base group-hover:text-gold-600 transition-colors">
                      Celebrity Escorts
                    </span>
                    <span className="text-xs text-gray-600 mt-1 block">
                      Exclusive entertainment profiles
                    </span>
                  </Link>

                  <Link href="/category/travel-escorts"
                    className="p-4 bg-gradient-to-br from-gold-50/60 to-white rounded-2xl border border-gold-200/80 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                  >
                    <span className="block font-bold text-[#0F172A] text-base group-hover:text-gold-600 transition-colors">
                      Travel Escorts
                    </span>
                    <span className="text-xs text-gray-600 mt-1 block">
                      Cultured luxury travel escorts
                    </span>
                  </Link>
                </div>
              </div>

              {/* What Makes ALINA VIP Different */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4 font-serif">
                  What Makes ALINA VIP Different
                </h3>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    In a competitive market, <strong>ALINA VIP</strong> stands apart through a combination of factors that together create a service experience unlike any other in Gurgaon. Our rigorous verification process ensures that every profile is genuine, giving our clients confidence in their choices.
                  </p>
                  <p>
                    Our commitment to discretion is comprehensive and multi-layered. We protect client information at every stage of the booking process, train our models in privacy protocols, and design our digital presence without persistent logs. Our 24/7 availability ensures prompt coordination whether for a planned evening or an urgent request.
                  </p>
                </div>
              </div>

              {/* Safety & Discretion */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4 font-serif">
                  Our Commitment to Safety &amp; Discretion
                </h3>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Safety is a priority at <strong>ALINA VIP</strong>, both for our clients and escorts. Our verification process is designed not only to ensure authenticity but also to establish a secure and respectful environment for all parties.
                  </p>
                  <p>
                    For our clients, we provide a trustworthy channel to reserve high-profile escorts. Verified photos give you confidence in your selection, and our concierge ensures clear, professional arrangements.
                  </p>
                </div>
              </div>

              {/* Why Gurgaon is the Perfect City */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4 font-serif">
                  Why Gurgaon Demands High Standards
                </h3>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Gurgaon has transformed into one of India&apos;s most dynamic financial and corporate capitals. It hosts dozens of Fortune 500 regional headquarters, five-star luxury hotels, high-end dining, and world-class commercial developments.
                  </p>
                  <p>
                    This cosmopolitan character attracts sophisticated professionals, entrepreneurs, and global travelers who expect exceptional quality. <strong>ALINA VIP</strong> was created to meet this standard, delivering escort services that match the luxury benchmarks of the city itself.
                  </p>
                </div>
              </div>

              {/* Book Your Escort Service Today */}
              <div className="pt-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4 font-serif">
                  Reserve VIP Escort Service Today
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Experience verified escort services with <strong>ALINA VIP</strong>. Explore our{' '}
                  <Link href="/services" className="text-gold-600 hover:underline font-semibold">
                    escort services
                  </Link>{' '}
                  or speak directly with our concierge desk to arrange an outcall to your hotel suite or residence.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-neutral-900 font-bold px-8 py-4 rounded-full text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Reserve Now <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/services"
                    className="inline-flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-[#2d2d44] text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    View All Services
                  </Link>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="inline-flex items-center justify-center gap-2 border-2 border-gold-600 text-gold-700 hover:bg-gold-600 hover:text-white px-8 py-4 rounded-full font-bold text-base transition-all"
                  >
                    <Phone className="w-5 h-5" /> Call Now
                  </a>
                </div>

                {/* 24/7 Banner Card */}
                <div className="mt-8 p-6 bg-gradient-to-r from-gold-50 via-amber-50 to-gold-50 rounded-2xl border-2 border-gold-200/80 shadow-sm text-center">
                  <p className="text-xl font-bold text-[#0F172A]">
                    📞 Call us 24/7:{' '}
                    <a href={`tel:${siteConfig.phone}`} className="text-gold-600 hover:underline font-extrabold ml-1">
                      {siteConfig.phoneDisplay}
                    </a>
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">
                    Prompt outcall dispatch across all Gurgaon luxury hotels &amp; private residences.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Official Portal:{' '}
                    <a
                      href={siteConfig.url}
                      className="text-gold-600 hover:underline font-semibold"
                    >
                      {siteConfig.domain}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Visual Showcase & Rating Badge */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              {/* Main Hero Card */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/80 bg-neutral-900 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/about-hero.webp"
                    alt="ALINA VIP - Luxury Escort Agency Gurgaon"
                    title="ALINA VIP - Luxury Escort Agency Gurgaon"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="inline-block px-3 py-1 bg-gold-500/90 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-full mb-2 w-max">
                      Gurgaon&apos;s Flagship
                    </span>
                    <h3 className="text-white text-xl font-bold font-serif">
                      Excellence &amp; Supreme Discretion
                    </h3>
                    <p className="text-gray-300 text-xs mt-1">
                      Setting the benchmark for luxury hospitality and escort services.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2-Grid Secondary Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg border border-neutral-200/80 bg-neutral-900 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/images/about-1.webp"
                      alt="Verified VIP Escorts in Gurgaon"
                      title="Verified VIP Escorts in Gurgaon"
                      fill
                      sizes="(max-width: 1024px) 50vw, 220px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                      <span className="text-xs font-semibold text-white">VIP Escorts</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden shadow-lg border border-neutral-200/80 bg-neutral-900 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src="/images/about-2.webp"
                      alt="Luxury Outcall Service Gurgaon"
                      title="Luxury Outcall Service Gurgaon"
                      fill
                      sizes="(max-width: 1024px) 50vw, 220px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                      <span className="text-xs font-semibold text-white">Five-Star Outcall</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4.9/5 Star Rating Card */}
              <div className="bg-gradient-to-br from-gold-50 via-white to-amber-50/60 p-6 rounded-2xl border border-gold-200/80 text-center shadow-md">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-7 h-7 text-gold-600 fill-gold-500" />
                </div>
                <p className="font-bold text-[#0F172A] text-2xl font-serif">4.9 / 5 Star Rating</p>
                <p className="text-gray-600 text-sm mt-1">
                  Based on 500+ verified client reviews across Gurgaon
                </p>
                <div className="flex justify-center gap-1.5 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4 pt-3 border-t border-gold-200/50">
                  Verified platform:{' '}
                  <a
                    href={siteConfig.url}
                    className="text-gold-600 hover:underline font-semibold"
                  >
                    {siteConfig.domain}
                  </a>
                </p>
              </div>

              {/* High-Trust Guarantee Pillars */}
              <div className="bg-[#FDFBF7] p-6 rounded-2xl border border-gold-200/50 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-gold-600" /> ALINA VIP Commitment
                </h4>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span>Real photos &amp; in-person verified profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span>Strict confidentiality &amp; zero digital trace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                    <span>Prompt arrival at top-tier hotels across Gurgaon</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
