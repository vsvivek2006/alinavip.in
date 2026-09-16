'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { locationSummary } from '@/data/locationSummary';
import {
  submitContactInquiry,
  type ContactFormData,
  type SubmissionStatus,
} from '@/lib/formSubmission';

export default function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    category: '',
    location: '',
    serviceType: 'Hotel Outcall',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    const result = await submitContactInquiry(formData);
    setSubmissionStatus(result.status);
    setStatusMessage(result.message);
  };

  return (
    <div className="lg:col-span-7 bg-[#faf6f2] p-8 md:p-10 rounded-3xl border border-gold-200/80 shadow-md">
      <div className="mb-8">
        <span className="text-xs font-bold text-gold-600 uppercase tracking-wider block mb-1">
          Online Reservation
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] font-serif">
          Book Your Reservation
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Please provide your preferences below, or connect directly via telephone or WhatsApp for immediate reservation.
        </p>
      </div>

      {submissionStatus === 'not_configured' && (
        <div className="mb-6 p-5 bg-amber-500/10 border border-amber-600/40 rounded-2xl text-amber-950 text-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-950">
                {statusMessage ||
                  'Online submission is currently unavailable. Please use the available contact method shown on this page.'}
              </p>
              <p className="text-xs text-amber-900 mt-1">
                For prompt confirmation and booking coordination, please call{' '}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="font-bold underline text-amber-950"
                >
                  {siteConfig.phoneDisplay}
                </a>{' '}
                or message via{' '}
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline text-amber-950"
                >
                  WhatsApp
                </a>.
              </p>
            </div>
          </div>
        </div>
      )}

      {submissionStatus === 'error' && (
        <div className="mb-6 p-5 bg-red-500/10 border border-red-500/40 rounded-2xl text-red-900 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="font-semibold">{statusMessage || 'An unexpected error occurred. Please try again.'}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Your Name / Alias <span className="text-gold-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors"
              placeholder="e.g. Mr. Sharma"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Phone / WhatsApp <span className="text-gold-600">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Preferred Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 focus:border-gold-500 focus:outline-none transition-colors"
            >
              <option value="">Any Category</option>
              <option value="Russian Escorts">Russian Escorts</option>
              <option value="Model Escorts">Model Escorts</option>
              <option value="VIP Escorts">VIP Escorts</option>
              <option value="College Girls">College Girls</option>
              <option value="Housewife Escorts">Housewife Escorts</option>
              <option value="Independent Escorts">Independent Escorts</option>
              <option value="Air Hostess Escorts">Air Hostess Escorts</option>
              <option value="Celebrity Escorts">Celebrity Escorts</option>
              <option value="Travel Escorts">Travel Escorts</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Your Gurgaon / NCR Location <span className="text-gold-600">*</span>
            </label>
            <select
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 focus:border-gold-500 focus:outline-none transition-colors"
            >
              <option value="">Select Destination Area</option>
              <optgroup label="Central Business Hubs">
                <option value="cyber-city">Cyber City</option>
                <option value="mg-road">MG Road</option>
                <option value="golf-course-road">Golf Course Road</option>
                <option value="golf-course-extension-road">Golf Course Extension Road</option>
              </optgroup>
              <optgroup label="DLF City Phases">
                <option value="dlf-phase-1">DLF Phase 1</option>
                <option value="dlf-phase-2">DLF Phase 2</option>
                <option value="dlf-phase-3">DLF Phase 3</option>
                <option value="dlf-phase-4">DLF Phase 4</option>
                <option value="dlf-phase-5">DLF Phase 5</option>
              </optgroup>
              <optgroup label="Corridors & Sectors">
                <option value="sohna-road">Sohna Road</option>
                <option value="sector-29">Sector 29</option>
                <option value="sushant-lok">Sushant Lok</option>
                <option value="huda-city-centre">HUDA City Centre</option>
                <option value="manesar">Manesar</option>
              </optgroup>
              <optgroup label="Delhi & Airport">
                <option value="aerocity">Aerocity (IGI Airport)</option>
                <option value="mahipalpur">Mahipalpur</option>
                <option value="dwarka">Dwarka</option>
              </optgroup>
              <optgroup label="All Other 108 Locations">
                {locationSummary.slice(0, 30).map((loc) => (
                  <option key={loc.slug} value={loc.slug}>
                    {loc.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Engagement Style
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 focus:border-gold-500 focus:outline-none transition-colors"
            >
              <option value="Hotel Outcall">5-Star Hotel Outcall</option>
              <option value="Private Residence">Private Residence Outcall</option>
              <option value="Dinner Date">Fine Dining Date</option>
              <option value="Corporate Event">Corporate / Social Event</option>
              <option value="Travel Escort">Travel / Weekend Gateway</option>
              <option value="Overnight Stay">Overnight Booking</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors"
              placeholder="private@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
            Special Requests / Notes
          </label>
          <textarea
            rows={4}
            value={formData.message || ''}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:border-gold-500 focus:outline-none transition-colors resize-none"
            placeholder="Please mention your preferred timing, specific qualities desired, or any private requests..."
          />
        </div>

        <button
          type="submit"
          disabled={submissionStatus === 'submitting'}
          className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-neutral-900 font-bold rounded-xl text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submissionStatus === 'submitting' ? 'Processing Request...' : 'Confirm Private Booking Request →'}
        </button>

        <p className="text-center text-xs text-gray-500 mt-2">
          Discretion assured. Contact our concierge directly for immediate booking coordination.
        </p>
      </form>
    </div>
  );
}
