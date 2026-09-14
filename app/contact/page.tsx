import { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building2,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Book Gurgaon Escorts | 24/7 Private Concierge | ALINA VIP India',
  description:
    'Connect with ALINA VIP India for verified companion reservations in Gurgaon. Call +91-9996265679 or WhatsApp for confidential 20-30 min hotel & residence outcalls.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: 'Book Gurgaon Escorts | 24/7 Private Concierge | ALINA VIP India',
    description:
      'Connect with ALINA VIP India for verified companion reservations in Gurgaon. Call +91-9996265679 or WhatsApp for confidential 20-30 min hotel & residence outcalls.',
    url: `${siteConfig.url}/contact`,
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ name: 'Home', path: '/' }, { name: 'Contact' }]} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a2e] to-[#2d1b0e] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="container-luxury relative z-10 text-center">
          <span className="inline-block px-6 py-2 border border-gold-500/30 rounded-full text-gold-400 text-sm font-semibold tracking-wider uppercase mb-6 bg-gold-500/10 backdrop-blur-sm">
            ★ 24/7 Concierge Support
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-wide">
            Contact <span className="text-gradient-gold">ALINA VIP India</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Reserve verified escorts,{' '}
            <Link href="/category/russian-call-girls" className="text-gold-400 hover:underline font-medium">
              Russian models
            </Link>
            , and{' '}
            <Link href="/category/celebrity-escorts" className="text-gold-400 hover:underline font-medium">
              elite social escorts
            </Link>{' '}
            with 100% confidentiality and prompt outcall delivery across all Gurgaon luxury hotel suites.
          </p>
          <div className="gold-divider mx-auto mt-8" />
        </div>
      </section>

      {/* Main Contact Channels & Form */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Concierge & Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-2 font-serif">
                  Direct VIP Hotline
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Our private booking coordinators are standing by 24 hours a day to assist with your booking requirements.
                </p>
              </div>

              {/* Phone Channel Card */}
              <div className="p-6 bg-[#faf6f2] rounded-2xl border border-gold-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-gold-700 block mb-1">
                      Direct Phone
                    </span>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-2xl font-bold text-[#1a1a2e] hover:text-gold-600 transition-colors font-serif"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                    <p className="text-gray-500 text-xs mt-1">
                      Instant response • Available 24/7 across all Gurgaon areas
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Channel Card */}
              <div className="p-6 bg-[#faf6f2] rounded-2xl border border-gold-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-green-700 block mb-1">
                      WhatsApp
                    </span>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold text-[#1a1a2e] hover:text-gold-600 transition-colors inline-flex items-center gap-1.5"
                    >
                      Chat on WhatsApp <ArrowRight className="w-4 h-4 text-gold-600" />
                    </a>
                    <p className="text-gray-500 text-xs mt-1">
                      Discreet profile sharing, rates &amp; rapid verification
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-6 bg-[#faf6f2] rounded-2xl border border-gold-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-gold-700 block mb-1">
                      Service Areas
                    </span>
                    <p className="text-base font-semibold text-[#1a1a2e]">
                      {siteConfig.address}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Prompt outcall to Cyber City, Golf Course Road, DLF 1–5, Aerocity &amp; NCR
                    </p>
                  </div>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="p-6 bg-[#faf6f2] rounded-2xl border border-gold-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-gold-700 block mb-1">
                      Operating Schedule
                    </span>
                    <p className="text-base font-semibold text-[#1a1a2e]">
                      24 Hours a Day • 7 Days a Week
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Late-night hospitality &amp; early morning dispatches
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy & Discretion Card */}
              <div className="p-6 bg-gradient-to-br from-gold-50 to-amber-50 rounded-2xl border-2 border-gold-200">
                <h4 className="font-bold text-[#1a1a2e] text-base mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold-600" /> ALINA VIP Discretion Guarantee
                </h4>
                <ul className="space-y-2 text-xs text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                    <span>Complete privacy: Client details are never stored or shared</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                    <span>100% genuine, photo-authenticated profiles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 flex-shrink-0" />
                    <span>Chauffeur-driven private arrivals at luxury hotel suites</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: High-End Confidential Booking Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Hotel Partners & Coverage Quick Reference */}
      <section className="py-12 bg-[#faf6f2] border-t border-b border-gold-200/40">
        <div className="container-luxury">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-[#1a1a2e] font-serif">
              Rapid Five-Star Hotel Outcall Coverage
            </h3>
            <p className="text-gray-600 text-xs mt-1">
              Guaranteed discrete doorstep arrival at premier hospitality destinations within 20–30 minutes
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white p-5 rounded-2xl text-center shadow-sm border border-gold-200/50">
              <Building2 className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <h4 className="font-bold text-[#1a1a2e] text-sm">The Oberoi</h4>
              <p className="text-xs text-gray-500 mt-1">Udyog Vihar</p>
              <span className="text-[11px] text-green-700 font-semibold mt-2 inline-block bg-green-50 px-2 py-0.5 rounded-full">
                20-25 min arrival
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl text-center shadow-sm border border-gold-200/50">
              <Building2 className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <h4 className="font-bold text-[#1a1a2e] text-sm">Trident Hotel</h4>
              <p className="text-xs text-gray-500 mt-1">DLF Cyber City</p>
              <span className="text-[11px] text-green-700 font-semibold mt-2 inline-block bg-green-50 px-2 py-0.5 rounded-full">
                20-25 min arrival
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl text-center shadow-sm border border-gold-200/50">
              <Building2 className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <h4 className="font-bold text-[#1a1a2e] text-sm">The Leela</h4>
              <p className="text-xs text-gray-500 mt-1">Ambience Island</p>
              <span className="text-[11px] text-green-700 font-semibold mt-2 inline-block bg-green-50 px-2 py-0.5 rounded-full">
                15-20 min arrival
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl text-center shadow-sm border border-gold-200/50">
              <Building2 className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <h4 className="font-bold text-[#1a1a2e] text-sm">Grand Hyatt</h4>
              <p className="text-xs text-gray-500 mt-1">Golf Course Road</p>
              <span className="text-[11px] text-green-700 font-semibold mt-2 inline-block bg-green-50 px-2 py-0.5 rounded-full">
                25-30 min arrival
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl text-center shadow-sm border border-gold-200/50">
              <Building2 className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <h4 className="font-bold text-[#1a1a2e] text-sm">ITC Grand</h4>
              <p className="text-xs text-gray-500 mt-1">Hassanpur</p>
              <span className="text-[11px] text-green-700 font-semibold mt-2 inline-block bg-green-50 px-2 py-0.5 rounded-full">
                35-45 min arrival
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl text-center shadow-sm border border-gold-200/50">
              <Building2 className="w-8 h-8 text-gold-600 mx-auto mb-2" />
              <h4 className="font-bold text-[#1a1a2e] text-sm">JW Marriott</h4>
              <p className="text-xs text-gray-500 mt-1">Aerocity (IGI)</p>
              <span className="text-[11px] text-green-700 font-semibold mt-2 inline-block bg-green-50 px-2 py-0.5 rounded-full">
                20-25 min arrival
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Editorial Guide: How to Book */}
      <section className="py-16 md:py-20 bg-white text-gray-800">
        <div className="container-luxury max-w-4xl">
          <div className="prose-luxury bg-[#faf6f2] p-8 md:p-12 rounded-2xl border border-gold-200/60 shadow-sm">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6 font-serif">
              How to Book Escort Service in Gurgaon with ALINA VIP
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Booking escort service with <strong>ALINA VIP</strong> is designed to be effortless, sophisticated, and completely discreet. We respect your schedule and privacy at every stage of the engagement.
              </p>
              <div className="space-y-4 my-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a2e] text-base mb-1">
                      Choose Your Preferred Profile
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Browse our verified collection of{' '}
                      <Link href="/services" className="text-gold-600 hover:underline font-semibold">
                        call girls in Gurgaon
                      </Link>
                      ,{' '}
                      <Link href="/category/russian-call-girls" className="text-gold-600 hover:underline font-semibold">
                        Russian escorts
                      </Link>
                      , or{' '}
                      <Link href="/category/celebrity-escorts" className="text-gold-600 hover:underline font-semibold">
                        model escorts
                      </Link>
                      . Each profile features authentic photos and detailed attributes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a2e] text-base mb-1">
                      Share Your Time &amp; Location
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Specify whether you require an outcall to your 5-star hotel suite or luxury apartment in{' '}
                      <Link href="/locations/cyber-city" className="text-gold-600 hover:underline font-semibold">
                        Cyber City
                      </Link>
                      ,{' '}
                      <Link href="/locations/golf-course-road" className="text-gold-600 hover:underline font-semibold">
                        Golf Course Road
                      </Link>
                      , or{' '}
                      <Link href="/locations/dlf-phase-1" className="text-gold-600 hover:underline font-semibold">
                        DLF Phase 1–5
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1a2e] text-base mb-1">
                      Private &amp; Confidential Confirmation
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Contact our VIP booking manager via telephone at{' '}
                      <a href={`tel:${siteConfig.phone}`} className="text-gold-600 hover:underline font-bold">
                        {siteConfig.phoneDisplay}
                      </a>{' '}
                      or through our secure form. Your escort will arrive punctually with total discretion.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy & Zero-Trace Policy */}
              <div className="mt-8 pt-6 border-t border-gold-200/60 space-y-4">
                <h3 className="text-xl font-bold text-[#1a1a2e] font-serif">
                  Zero-Trace Privacy &amp; Data Safeguards
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Discretion is the core tenet of ALINA VIP. We understand that our clientele includes high-ranking corporate leaders, diplomats, entrepreneurs, and discerning individuals who require total confidentiality. We implement an ephemeral data workflow: your contact information, messages, and meeting specifics are never stored in permanent databases, marketing mailing lists, or shared with third parties. Once your engagement concludes, all communication history is promptly purged.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Furthermore, our escorts arrive in unmarked, private executive vehicles. They dress in sophisticated contemporary attire appropriate for luxury hotel lobbies or fine residential buildings, ensuring your privacy is safeguarded from doorstep to suite.
                </p>
              </div>

              {/* Five-Star Hotel Arrival Procedures */}
              <div className="mt-8 pt-6 border-t border-gold-200/60 space-y-4">
                <h3 className="text-xl font-bold text-[#1a1a2e] font-serif">
                  Five-Star Hotel Outcall Protocols
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  For clients residing in premier hospitality properties such as The Oberoi Gurgaon, The Trident, The Leela Ambience, Grand Hyatt, or ITC Grand Bharat, our concierge coordinates seamless outcall dispatch. When submitting your reservation, simply mention your hotel property and room or suite number. Our escorts are well-versed in luxury hospitality environments and know how to navigate hotel elevator key systems, concierge checkpoints, and private floors with effortless grace.
                </p>
              </div>

              {/* Cash on Delivery & Fraud Protection */}
              <div className="mt-8 pt-6 border-t border-gold-200/60 space-y-4">
                <h3 className="text-xl font-bold text-[#1a1a2e] font-serif">
                  Transparent Pricing &amp; Cash on Delivery Protection
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  The escort industry in Gurgaon unfortunately has unregulated actors who demand advance booking deposits or gift cards and then fail to deliver. At ALINA VIP, we maintain an ethical, transparent booking process. We support direct Cash on Delivery (COD), allowing you to verify your companion upon arrival before settling the booking fee. No hidden surcharges, no misleading photos, and no advance payment traps.
                </p>
              </div>

              {/* Concierge Reservation FAQ */}
              <div className="mt-8 pt-6 border-t border-gold-200/60 space-y-4">
                <h3 className="text-xl font-bold text-[#1a1a2e] font-serif">
                  Concierge Booking Assistance &amp; FAQs
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
                    <h4 className="font-bold text-[#1a1a2e] text-sm mb-1">
                      How far in advance should I confirm my booking?
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      While we accommodate immediate on-demand dispatches within 20 to 30 minutes across central Gurgaon, we recommend placing your reservation 1 to 2 hours in advance. For specific high-demand profiles such as Russian escorts, celebrity escorts, or overnight travel escorts, booking 4 to 6 hours ahead guarantees availability.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
                    <h4 className="font-bold text-[#1a1a2e] text-sm mb-1">
                      Are late-night and 24/7 outcalls supported across all Gurgaon sectors?
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Yes. Our concierge operates continuously 24 hours a day, 7 days a week. We arrange safe, punctual chauffeur transport to luxury hotels, corporate guest suites, and gated condominiums in DLF Phases 1–5, Golf Course Road, Sohna Road, and Cyber City at any hour of the night.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
                    <h4 className="font-bold text-[#1a1a2e] text-sm mb-1">
                      Can I book companion accompaniment for multi-day travel or conferences?
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Yes, many of our escorts are experienced travel partners available for weekend getaways, outstation business conferences, and resort stays. Please contact our desk directly with your travel itinerary to arrange travel logistics and bespoke packages with absolute confidentiality.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
                    <h4 className="font-bold text-[#1a1a2e] text-sm mb-1">
                      What is the policy for rescheduling or modifying a reservation?
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      We understand that corporate meetings and flight itineraries change. If you need to adjust your meeting time, venue, or profile preference, simply notify our concierge desk via phone or WhatsApp at least 45 minutes prior to dispatch. We accommodate schedule shifts seamlessly without penalties.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 pt-6 border-t border-gold-200/60">
                Official Reservation Portal:{' '}
                <a
                  href={siteConfig.url}
                  className="text-gold-600 hover:underline font-bold"
                >
                  {siteConfig.domain}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
