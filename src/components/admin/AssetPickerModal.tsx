'use client';

import React, { useState, useMemo } from 'react';
import imagekitAssets from '@/data/imagekit_assets.json';
import { Search, X, Check, Image as ImageIcon, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface AssetPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (url: string) => void;
  currentSelectedUrl?: string | null;
}

export default function AssetPickerModal({
  isOpen,
  onClose,
  onSelectImage,
  currentSelectedUrl,
}: AssetPickerModalProps) {
  const [search, setSearch] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const filteredAssets = useMemo(() => {
    if (!search.trim()) return imagekitAssets;
    const q = search.toLowerCase();
    return imagekitAssets.filter(
      a => a.title.toLowerCase().includes(q) || a.fileName.toLowerCase().includes(q)
    );
  }, [search]);

  if (!isOpen) return null;

  const handleCopy = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success('Image CDN URL copied to clipboard!');
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-[#EAE5DD] rounded-3xl w-full max-w-5xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EAE5DD] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-[#671725]">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900">ImageKit Asset Library</h2>
              <p className="text-xs text-stone-500">70 verified CDN master images hosted on ik.imagekit.io</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-[#F2ECE4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Toolbar */}
        <div className="p-3.5 sm:p-4 bg-white border-b border-[#EAE5DD] flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search assets by name (e.g. Russian, VIP, Hotel, High Profile)..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#671725] transition-colors"
            />
          </div>
          <span className="text-xs text-[#671725] font-bold px-3 py-2 bg-rose-50 border border-rose-200 rounded-xl whitespace-nowrap">
            {filteredAssets.length} of 70 Images
          </span>
        </div>

        {/* Assets Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 bg-[#FAF8F5]/50">
          {filteredAssets.map(asset => {
            const isSelected = currentSelectedUrl === asset.url;
            return (
              <div
                key={asset.fileName}
                onClick={() => {
                  onSelectImage(asset.url);
                  toast.success(`Attached image: ${asset.title}`);
                  onClose();
                }}
                className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-200 bg-white flex flex-col ${
                  isSelected
                    ? 'border-[#671725] ring-2 ring-[#671725]/40 scale-[1.02] shadow-md'
                    : 'border-[#EAE5DD] hover:border-[#671725]/60 hover:shadow-md'
                }`}
              >
                <div className="aspect-[4/3] w-full relative bg-stone-100 overflow-hidden">
                  <img
                    src={`${asset.url}?tr=w-320,h-240,fo-auto`}
                    alt={asset.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#671725] text-white rounded-full p-1 shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 justify-between">
                    <button
                      onClick={e => handleCopy(asset.url, e)}
                      title="Copy CDN URL"
                      className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold flex items-center gap-1 shadow-xs backdrop-blur-xs"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedUrl === asset.url ? 'Copied' : 'Copy'}
                    </button>
                    <span className="text-[10px] bg-[#671725] text-white font-bold px-2 py-0.5 rounded shadow-xs">
                      Select
                    </span>
                  </div>
                </div>

                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-bold text-stone-800 line-clamp-2 leading-tight">
                    {asset.title}
                  </p>
                  <p className="text-[10px] text-stone-600 font-mono truncate mt-1">
                    {asset.fileName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-[#EAE5DD] bg-white flex items-center justify-between text-xs text-stone-500">
          <span>Click any image to attach it to the post.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#F4EFE7] hover:bg-[#EAE5DD] text-stone-800 rounded-xl transition-colors font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
