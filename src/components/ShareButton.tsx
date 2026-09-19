'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Article link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-[#F9E1E5] text-gray-700 hover:text-primary-wine rounded-full transition-colors text-xs font-semibold"
      title="Copy article link"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-600" /> Copied!
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-primary-wine" /> Share Link
        </>
      )}
    </button>
  );
}
