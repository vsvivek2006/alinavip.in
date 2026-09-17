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

        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3">
          Something Went Wrong
        </h1>

        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
          An unexpected error occurred while loading this page. Please try reloading or return to the main portal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto py-3 px-6 bg-white/90 hover:bg-white text-[#671725] border border-rose-200/90 hover:border-[#671725] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 text-xs font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
