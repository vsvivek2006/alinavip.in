'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Unhandled route error caught by error.tsx boundary:', error);
    }
  }, [error]);

  return (
    <div
      className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-[#FFFDF6] text-[#2d2d2d]"
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary-wine/10 text-primary-wine flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-primary-wine text-xs font-bold uppercase tracking-wider mb-2 block">
          Notice
        </span>

        <h1 className="text-2xl md:text-3xl font-bold text-[#0B2154] mb-3">
          Something Went Wrong
        </h1>

        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
          An unexpected error occurred while loading this page. Please try reloading or return to the main portal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-[#671725] hover:bg-[#50121d] text-white text-xs font-bold rounded-xl py-3 px-6 flex items-center justify-center gap-2 cursor-pointer transition-colors shadow"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto border border-[#0B2154] text-[#0B2154] hover:bg-[#0B2154] hover:text-white text-xs font-bold rounded-xl py-3 px-6 flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
