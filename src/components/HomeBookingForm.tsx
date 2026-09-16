'use client';

import { useState } from 'react';
import { Phone, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { primeLocations } from '@/data/locationSummary';
import { siteConfig } from '@/data/siteConfig';
import {
  submitBookingRequest,
  type BookingFormData,
  type SubmissionStatus,
} from '@/lib/formSubmission';

export default function HomeBookingForm() {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    location: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    try {
      const result = await submitBookingRequest(formData, siteConfig.whatsapp);
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
    <form className="space-y-4" onSubmit={handleSubmit}>
      {submissionStatus === 'success' && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-xs space-y-2 text-left animate-fade-in">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-300">
                {statusMessage}
              </p>
              <p className="text-gray-300 mt-1">
                If WhatsApp did not open automatically, tap below to chat with our private concierge:
              </p>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm"
                >
                  <MessageCircle size={14} /> Open WhatsApp Chat
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {submissionStatus === 'error' && (
        <div className="p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-xs flex items-start gap-2 text-red-300 text-left">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">{statusMessage || 'An unexpected error occurred.'}</p>
            <p className="text-gray-300 mt-1">
              Please call us directly at{' '}
              <a href={`tel:${siteConfig.phone}`} className="text-gold-400 underline font-bold">
                {siteConfig.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="home-booking-name" className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Name <span className="text-gold-500">*</span>
        </label>
        <input
          id="home-booking-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-colors"
          placeholder="Your Name"
        />
      </div>

      <div>
        <label htmlFor="home-booking-phone" className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Phone <span className="text-gold-500">*</span>
        </label>
        <input
          id="home-booking-phone"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-colors"
          placeholder="Your Phone Number"
        />
      </div>

      <div>
        <label htmlFor="home-booking-location" className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Location <span className="text-gold-500">*</span>
        </label>
        <select
          id="home-booking-location"
          required
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:border-gold-500 focus:outline-none transition-colors"
        >
          <option value="" disabled className="text-gray-500 bg-charcoal-900">
            Select Location
          </option>
          {primeLocations.map((loc) => (
            <option key={loc.slug} value={loc.name} className="text-white bg-charcoal-900">
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="home-booking-message" className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Special Preferences
        </label>
        <textarea
          id="home-booking-message"
          rows={3}
          value={formData.message || ''}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-colors resize-none"
          placeholder="Hotel suite, model style, preferred timing..."
        />
      </div>

      <button
        type="submit"
        disabled={submissionStatus === 'submitting'}
        className="w-full bg-gold-600 hover:bg-gold-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-gold-600/30 hover:shadow-gold-600/50 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        <Phone className="w-5 h-5" />
        {submissionStatus === 'submitting' ? 'Preparing WhatsApp Booking...' : 'Book via WhatsApp Concierge'}
      </button>
    </form>
  );
}
