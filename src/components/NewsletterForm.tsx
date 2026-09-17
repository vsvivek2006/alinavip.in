'use client';

import { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import {
  submitNewsletterSubscription,
  type SubmissionStatus,
} from '@/lib/formSubmission';

export default function NewsletterForm() {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmissionStatus('submitting');
    try {
      const result = await submitNewsletterSubscription({ email }, siteConfig.whatsapp);
      setSubmissionStatus(result.status);
      setStatusMessage(result.message);
      if (result.whatsappUrl) {
        window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
      }
    } catch {
      setSubmissionStatus('error');
      setStatusMessage('Unable to complete subscription.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm">
      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-6 h-6 text-primary-wine" />
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a2e] mb-4 font-sans font-bold">
        Subscribe to Our <span className="text-primary-wine">Escort Service</span> Blog
      </h3>
      <p className="text-gray-600 mb-6 leading-relaxed">
        Get the latest updates on{' '}
        <Link href="/services" className="text-primary-wine hover:underline font-medium">
          call girls service in Gurgaon
        </Link>
        , new{' '}
        <Link href="/category/russian-call-girls" className="text-primary-wine hover:underline font-medium">
          Russian escorts
        </Link>
        , and exclusive VIP offers.
      </p>

      {submissionStatus === 'success' && (
        <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-500/60 text-emerald-950 rounded-2xl text-xs max-w-lg mx-auto flex items-center justify-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{statusMessage || 'Subscription initiated via WhatsApp concierge!'}</span>
        </div>
      )}

      {submissionStatus === 'error' && (
        <div className="mb-4 p-3.5 bg-red-50 border border-red-500/60 text-red-950 rounded-2xl text-xs max-w-lg mx-auto flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <label htmlFor="newsletter-email-input" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your private email"
          required
          className="flex-1 px-6 py-3.5 rounded-full border-2 border-gray-300 focus:border-primary-wine focus:outline-none transition-colors text-sm text-gray-800"
        />
        <button
          type="submit"
          disabled={submissionStatus === 'submitting'}
          className="px-8 py-3.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 rounded-full whitespace-nowrap disabled:opacity-75 font-semibold"
        >
          {submissionStatus === 'submitting' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4">
        100% privacy. No spam. Unsubscribe anytime.
      </p>
      <p className="text-xs text-gray-500 mt-2">
        Official Portal:{' '}
        <a
          href={siteConfig.url}
          className="text-primary-wine hover:underline font-semibold"
        >
          {siteConfig.domain}
        </a>
      </p>
    </div>
  );
}
