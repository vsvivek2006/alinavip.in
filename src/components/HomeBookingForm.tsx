'use client';

import { useState } from 'react';
import { Phone, AlertCircle } from 'lucide-react';
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
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    location: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    const result = await submitBookingRequest(formData);
    setSubmissionStatus(result.status);
    setStatusMessage(result.message);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {submissionStatus === 'not_configured' && (
        <div className="p-4 bg-charcoal-800/95 border border-amber-500/60 rounded-xl text-xs space-y-1">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300">
                {statusMessage ||
                  'Online booking is currently unavailable.'}
              </p>
              <p className="text-gray-300 mt-1">
                For prompt reservation, please call{' '}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-gold-400 underline font-bold"
                >
                  {siteConfig.phoneDisplay}
                </a>{' '}
                or contact our concierge directly via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}

      {submissionStatus === 'error' && (
        <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-xs flex items-start gap-2 text-red-300">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="font-semibold">{statusMessage || 'An unexpected error occurred. Please try again.'}</p>
        </div>
      )}

      <div>
        <label className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Name <span className="text-gold-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-colors"
          placeholder="Your Name"
        />
      </div>

      <div>
        <label className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Phone <span className="text-gold-500">*</span>
        </label>
        <input
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-colors"
          placeholder="Your Phone Number"
        />
      </div>

      <div>
        <label className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Location <span className="text-gold-500">*</span>
        </label>
        <select
          required
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white focus:border-gold-500 focus:outline-none transition-colors"
        >
          <option value="" disabled className="text-gray-500 bg-charcoal-900">
            Select Location
          </option>
          {primeLocations.map((loc) => (
            <option key={loc.slug} value={loc.slug} className="text-white bg-charcoal-900">
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Message
        </label>
        <textarea
          rows={4}
          value={formData.message || ''}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:border-gold-500 focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your requirements..."
        />
      </div>

      <button
        type="submit"
        disabled={submissionStatus === 'submitting'}
        className="w-full bg-gold-600 hover:bg-gold-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-gold-600/30 hover:shadow-gold-600/50 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        <Phone className="w-5 h-5" />
        {submissionStatus === 'submitting' ? 'Processing...' : 'Book Escort Service'}
      </button>
    </form>
  );
}
