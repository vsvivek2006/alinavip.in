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
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE5DD] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          {/* Brand & Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <Link href="/admin" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#671725] via-[#56131f] to-[#420c16] flex items-center justify-center font-black text-amber-300 text-sm shadow-sm shadow-rose-950/20 group-hover:scale-105 transition-transform">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-stone-900 tracking-tight text-sm sm:text-base leading-none">
                  ALINA <span className="text-[#671725]">VIP</span>
                </span>
                <span className="text-[10px] text-stone-600 font-semibold tracking-wider uppercase mt-0.5">
                  Blog CMS
                </span>
              </div>
            </Link>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold bg-rose-50 text-[#671725] border border-rose-200/80 px-2.5 py-0.5 rounded-full">
              <Layers className="w-3 h-3 text-[#671725]" /> 5 Sites
            </span>
          </div>

          {/* Multi-Tenant Site Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#E2DDD5] rounded-xl px-2.5 sm:px-3 py-1.5 shadow-xs max-w-[200px] sm:max-w-xs md:max-w-sm">
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#671725] shrink-0" />
            <span className="text-xs text-stone-600 hidden lg:inline font-medium">Site:</span>
            {loading ? (
              <span className="text-xs text-stone-600">Loading...</span>
            ) : (
              <select
                value={activeSite?.id || ''}
                onChange={e => {
                  const selected = sites.find(s => s.id === e.target.value);
                  if (selected) setActiveSite(selected);
                }}
                className="bg-transparent text-xs font-bold text-stone-800 focus:outline-none cursor-pointer truncate pr-1"
              >
                {sites.map(site => (
                  <option key={site.id} value={site.id} className="text-stone-900 bg-white">
                    {site.name} ({site.domain})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                pathname === '/admin'
                  ? 'bg-[#671725]/10 text-[#671725] border border-[#671725]/20 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-[#F2EDE5]'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Posts</span>
            </Link>

            <Link
              href="/admin/blog/new"
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white shadow-sm shadow-rose-950/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden xs:inline">Create Post</span>
              <span className="xs:hidden">New</span>
            </Link>

            {activeSite && (
              <a
                href={`https://${activeSite.domain}/blog`}
                target="_blank"
                rel="noreferrer"
                title={`Visit https://${activeSite.domain}/blog`}
                className="p-2 rounded-xl text-stone-500 hover:text-[#671725] hover:bg-[#F2EDE5] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-xl text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
