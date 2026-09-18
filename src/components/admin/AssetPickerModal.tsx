'use client';

import React, { useState, useMemo } from 'react';
import imagekitAssets from '@/data/imagekit_assets.json';
import { Search, X, Check, Image as ImageIcon, Copy } from 'lucide-react';

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
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#181116] border border-amber-900/40 rounded-2xl w-full max-w-5xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-amber-900/30 flex items-center justify-between bg-[#1f141a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">ImageKit Asset Library</h2>
              <p className="text-xs text-stone-400">70 verified CDN master images hosted on ik.imagekit.io</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Toolbar */}
        <div className="p-4 bg-[#140e13] border-b border-amber-900/20 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search assets by name (e.g. Russian, VIP, Hotel, High Profile)..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#241720] border border-amber-900/30 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/60 transition-colors"
            />
          </div>
          <span className="text-xs text-amber-400/80 font-mono px-3 py-2 bg-amber-950/40 border border-amber-900/30 rounded-lg whitespace-nowrap">
            {filteredAssets.length} of 70 Images
          </span>
        </div>

        {/* Assets Grid */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredAssets.map(asset => {
            const isSelected = currentSelectedUrl === asset.url;
            return (
              <div
                key={asset.fileName}
                onClick={() => {
                  onSelectImage(asset.url);
                  onClose();
                }}
                className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all duration-200 bg-[#22161e] flex flex-col ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/50 scale-[1.02]'
                    : 'border-amber-900/30 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-950/40'
                }`}
              >
                <div className="aspect-[4/3] w-full relative bg-stone-900 overflow-hidden">
                  <img
                    src={`${asset.url}?tr=w-320,h-240,fo-auto`}
                    alt={asset.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-amber-500 text-stone-950 rounded-full p-1 shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 justify-between">
                    <button
                      onClick={e => handleCopy(asset.url, e)}
                      title="Copy CDN URL"
                      className="p-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-200 text-xs flex items-center gap-1 backdrop-blur-sm"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedUrl === asset.url ? 'Copied' : 'Copy'}
                    </button>
                    <span className="text-[10px] bg-amber-500/90 text-stone-950 font-bold px-2 py-0.5 rounded">
                      Select
                    </span>
                  </div>
                </div>

                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-medium text-stone-200 line-clamp-2 leading-tight">
                    {asset.title}
                  </p>
                  <p className="text-[10px] text-stone-500 font-mono truncate mt-1">
                    {asset.fileName}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-900/30 bg-[#1f141a] flex items-center justify-between text-xs text-stone-400">
          <span>Click any image to select it as the blog post cover.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
