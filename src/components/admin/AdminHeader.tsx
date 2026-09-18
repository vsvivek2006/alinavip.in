'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminTenant } from '@/context/AdminTenantContext';
import { Globe, LogOut, ExternalLink, Sparkles, LayoutList, Layers } from 'lucide-react';

export default function AdminHeader() {
  const { sites, activeSite, setActiveSite, loading } = useAdminTenant();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#170e14]/95 backdrop-blur-md border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center font-black text-stone-950 text-sm shadow-md shadow-amber-900/40">
                A
              </div>
              <span className="font-bold text-white tracking-wide text-base hidden sm:inline">
                ALINA <span className="text-amber-400">VIP</span>
              </span>
            </Link>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">
              <Layers className="w-3 h-3" /> Multi-Tenant CMS
            </span>
          </div>

          {/* Multi-Tenant Site Switcher */}
          <div className="flex items-center gap-2 bg-[#22151e] border border-amber-900/40 rounded-xl px-3 py-1.5 shadow-inner">
            <Globe className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs text-stone-400 hidden lg:inline">Target Site:</span>
            {loading ? (
              <span className="text-xs text-stone-500">Loading sites...</span>
            ) : (
              <select
                value={activeSite?.id || ''}
                onChange={e => {
                  const selected = sites.find(s => s.id === e.target.value);
                  if (selected) setActiveSite(selected);
                }}
                className="bg-transparent text-xs font-semibold text-amber-200 focus:outline-none cursor-pointer pr-2"
              >
                {sites.map(site => (
                  <option key={site.id} value={site.id} className="bg-[#1c1218] text-white">
                    {site.name} ({site.domain})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                pathname === '/admin'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800/50'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Posts</span>
            </Link>

            <Link
              href="/admin/blog/new"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-md shadow-amber-950/40 hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Post</span>
            </Link>

            {activeSite && (
              <a
                href={`https://${activeSite.domain}/blog`}
                target="_blank"
                rel="noreferrer"
                title={`Visit https://${activeSite.domain}/blog`}
                className="p-2 rounded-xl text-stone-400 hover:text-amber-400 hover:bg-stone-800/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-xl text-stone-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
