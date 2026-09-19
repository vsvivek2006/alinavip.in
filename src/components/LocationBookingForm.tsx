'use client';

import { useState } from 'react';
import { Phone, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { siteConfig } from '@/data/siteConfig';
import {
  submitBookingRequest,
  type SubmissionStatus,
} from '@/lib/formSubmission';

interface LocationBookingFormProps {
  locationName: string;
  locationCity: string;
}

export default function LocationBookingForm({ locationName, locationCity }: LocationBookingFormProps) {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirements: '',
  });

  const locationId = locationName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    try {
      const result = await submitBookingRequest({
        name: formData.name,
        phone: formData.phone,
        location: `${locationName}, ${locationCity}`,
        message: formData.requirements,
      }, siteConfig.whatsapp);
      setSubmissionStatus(result.status);
      setStatusMessage(result.message);
      if (result.status === 'success') {
        toast.success(`Booking request sent for ${locationName}!`, {
          description: 'Opening WhatsApp concierge...',
        });
      } else {
        toast.error(result.message || 'Booking submission error');
      }
      if (result.whatsappUrl) {
        setWhatsappUrl(result.whatsappUrl);
        window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } catch {
      setSubmissionStatus('error');
      const err = 'Unable to prepare WhatsApp booking. Please call directly.';
      setStatusMessage(err);
      toast.error(err);
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
              <a href={`tel:${siteConfig.phone}`} className="text-luxury-gold underline font-bold">
                {siteConfig.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor={`loc-booking-name-${locationId}`} className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Your Name <span className="text-primary-wine">*</span>
        </label>
        <input
          id={`loc-booking-name-${locationId}`}
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:border-primary-wine focus:outline-none transition-colors"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor={`loc-booking-phone-${locationId}`} className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Phone Number <span className="text-primary-wine">*</span>
        </label>
        <input
          id={`loc-booking-phone-${locationId}`}
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:border-primary-wine focus:outline-none transition-colors"
          placeholder="+91 Your Phone Number"
        />
      </div>

      <div>
        <label htmlFor={`loc-booking-area-${locationId}`} className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Service Location
        </label>
        <input
          id={`loc-booking-area-${locationId}`}
          type="text"
          readOnly
          value={`${locationName}, ${locationCity}`}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-luxury-gold font-semibold focus:outline-none cursor-default"
        />
      </div>

      <div>
        <label htmlFor={`loc-booking-req-${locationId}`} className="block text-xs tracking-wider uppercase text-gray-400 mb-2 font-semibold">
          Special Requirements
        </label>
        <textarea
          id={`loc-booking-req-${locationId}`}
          rows={3}
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-white placeholder-gray-500 focus:border-primary-wine focus:outline-none transition-colors resize-none"
          placeholder={`Preferences for ${locationName} (hotel, category, timing)...`}
        />
      </div>

      <button
        type="submit"
        disabled={submissionStatus === 'submitting'}
        className="w-full py-4 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        <Phone className="w-5 h-5" />
        {submissionStatus === 'submitting' ? 'Preparing WhatsApp Booking...' : `Book via WhatsApp in ${locationName}`}
      </button>
    </form>
  );
}
