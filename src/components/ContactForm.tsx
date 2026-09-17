'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
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
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
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
    try {
      const result = await submitContactInquiry(formData, siteConfig.whatsapp);
      setSubmissionStatus(result.status);
      setStatusMessage(result.message);
      if (result.whatsappUrl) {
        setWhatsappUrl(result.whatsappUrl);
        window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } catch {
      setSubmissionStatus('error');
      setStatusMessage('Unable to prepare WhatsApp booking. Please call directly.');
    }
  };

  return (
    <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-md">
      <div className="mb-8">
        <span className="text-xs font-bold text-primary-wine uppercase tracking-wider block mb-1">
          Online Reservation
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[#111827] font-sans font-bold">
          Book Your Reservation
        </h2>
        <p className="text-gray-600 text-sm mt-2">
          Provide your preferences below to launch instant WhatsApp coordination, or connect directly via telephone.
        </p>
      </div>

      {submissionStatus === 'success' && (
        <div className="mb-6 p-5 bg-emerald-50 border border-emerald-500/60 rounded-2xl text-emerald-950 text-sm animate-fade-in">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-950">
                {statusMessage}
              </p>
              <p className="text-xs text-emerald-800 mt-1">
                If WhatsApp did not launch automatically, tap below to chat with our private concierge:
              </p>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors shadow-sm"
                >
                  <MessageCircle size={15} /> Open WhatsApp Concierge
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {submissionStatus === 'error' && (
        <div className="mb-6 p-5 bg-red-500/10 border border-red-500/40 rounded-2xl text-red-900 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{statusMessage || 'An unexpected error occurred. Please try again.'}</p>
            <p className="text-xs text-red-800 mt-1">
              Please call our direct VIP desk at{' '}
              <a href={`tel:${siteConfig.phone}`} className="font-bold underline">
                {siteConfig.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Your Name / Alias <span className="text-primary-wine">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-wine focus:outline-none transition-colors"
              placeholder="e.g. Mr. Sharma"
            />
          </div>

          <div>
            <label htmlFor="contact-phone" className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Phone / WhatsApp <span className="text-primary-wine">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-wine focus:outline-none transition-colors"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-category" className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Preferred Category
            </label>
            <select
              id="contact-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 focus:border-primary-wine focus:outline-none transition-colors"
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
            <label htmlFor="contact-location" className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Your Gurgaon / NCR Location <span className="text-primary-wine">*</span>
            </label>
            <select
              id="contact-location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 focus:border-primary-wine focus:outline-none transition-colors"
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
                  <option key={loc.slug} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-service-type" className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Engagement Style
            </label>
            <select
              id="contact-service-type"
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 focus:border-primary-wine focus:outline-none transition-colors"
            >
              <option value="5-Star Hotel Outcall">5-Star Hotel Outcall</option>
              <option value="Private Residence">Private Residence Outcall</option>
              <option value="Dinner Date">Fine Dining Date</option>
              <option value="Corporate Event">Corporate / Social Event</option>
              <option value="Travel Escort">Travel / Weekend Gateway</option>
              <option value="Overnight Stay">Overnight Booking</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
              Email Address (Optional)
            </label>
            <input
              id="contact-email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-wine focus:outline-none transition-colors"
              placeholder="private@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-bold tracking-wider uppercase text-gray-700 mb-2">
            Special Requests / Notes
          </label>
          <textarea
            id="contact-message"
            rows={4}
            value={formData.message || ''}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-white border border-gray-300 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-wine focus:outline-none transition-colors resize-none"
            placeholder="Please mention your preferred timing, specific qualities desired, or any private requests..."
          />
        </div>

        <button
          type="submit"
          disabled={submissionStatus === 'submitting'}
          className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-neutral-900 font-bold rounded-xl text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submissionStatus === 'submitting' ? 'Preparing WhatsApp Booking...' : 'Book via WhatsApp Concierge →'}
        </button>

        <p className="text-center text-xs text-gray-500 mt-2">
          Discretion assured. Direct encrypted connection with our private booking desk.
        </p>
      </form>
    </div>
  );
}
