'use client';


import { Phone, MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig } from '@/data/siteConfig';

export default function PhoneNumberPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF6] text-[#333333]">
      {/* Page Title Bar */}
      <div className="bg-[#671725] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <div className="mb-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Escorts Phone Number' },
              ]}
            />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Gurgaon Escorts Official Phone Number
          </h1>
          <p className="mt-3 text-sm sm:text-base text-rose-100 font-light max-w-2xl">
            Direct 24/7 VIP booking hotline and encrypted WhatsApp concierge for authentic hotel and residential outcalls across Gurgaon.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Main Hotline Highlight Box */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-[#671725] uppercase tracking-widest block">Direct Concierge Access</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] mt-2">
            Speak Directly With Our Booking Coordinator
          </h2>
          <p className="text-gray-600 text-sm mt-3 max-w-2xl mx-auto">
            Available 24 hours a day, 7 days a week. We guarantee strict client privacy, zero advance payment, and rapid doorstep delivery in 20-30 minutes.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-base flex items-center justify-center gap-3 shadow-lg"
            >
              <Phone size={20} />
              <span>Call {siteConfig.phoneDisplay}</span>
            </a>

            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20ALINA%20VIP,%20I%20want%20to%20inquire%20about%20escort%20booking%20in%20Gurgaon`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22bf5b] hover:to-[#0f7569] text-white shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-base font-bold rounded-xl flex items-center justify-center gap-3"
            >
              <MessageSquare size={20} />
              <span>WhatsApp {siteConfig.phoneDisplay}</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-emerald-500" /> 100% Genuine Girls
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-emerald-500" /> Cash on Arrival Only
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} className="text-emerald-500" /> No Advance Scams
            </span>
          </div>
        </div>

        {/* Warning Alert: Beware of Prepayment Fraud */}
        <div className="mt-12 max-w-4xl mx-auto bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl shadow-xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                Security Advisory: Never Pay Advance Fees to Any Agency
              </h3>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                Many fraudulent classified websites ask for registration fees, medical clearance charges, or hotel deposits via UPI/Paytm before sending a companion. <strong>ALINA VIP NEVER asks for advance payments.</strong> You inspect and meet your companion in person first, and hand over cash directly to her.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Steps to Book Via Phone */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#671725] uppercase tracking-widest">Effortless Etiquette</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-1">
              How to Book Your Companion in 4 Easy Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-700">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#671725] text-white font-bold flex items-center justify-center text-sm">1</span>
              <h4 className="font-bold text-[#111827] text-base">Step 1: Contact via Call or WhatsApp</h4>
              <p className="text-gray-600 leading-relaxed">Reach out directly to our 24/7 hotline at {siteConfig.phoneDisplay} or send a message on WhatsApp stating your preferred time and location.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#671725] text-white font-bold flex items-center justify-center text-sm">2</span>
              <h4 className="font-bold text-[#111827] text-base">Step 2: Choose Your Companion</h4>
              <p className="text-gray-600 leading-relaxed">We provide fresh, real-time unedited photos and verified portfolio details of companions available immediately in your area.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#671725] text-white font-bold flex items-center justify-center text-sm">3</span>
              <h4 className="font-bold text-[#111827] text-base">Step 3: Rapid 20-30 Min Outcall Arrival</h4>
              <p className="text-gray-600 leading-relaxed">Your companion arrives in an executive private cab directly at your hotel lobby or condominium gate in complete anonymity.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-2">
              <span className="w-8 h-8 rounded-full bg-[#671725] text-white font-bold flex items-center justify-center text-sm">4</span>
              <h4 className="font-bold text-[#111827] text-base">Step 4: Verify &amp; Pay Cash</h4>
              <p className="text-gray-600 leading-relaxed">Greet your companion in private, verify her identity with the photo provided, and hand over cash. Enjoy an unforgettable experience!</p>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
