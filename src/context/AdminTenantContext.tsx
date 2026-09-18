'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteTenant } from '@/lib/admin/supabaseAdmin';

interface AdminTenantContextType {
  sites: SiteTenant[];
  activeSite: SiteTenant | null;
  setActiveSite: (site: SiteTenant) => void;
  loading: boolean;
  refreshSites: () => Promise<void>;
}

const AdminTenantContext = createContext<AdminTenantContextType | undefined>(undefined);

export function AdminTenantProvider({ children }: { children: React.ReactNode }) {
  const [sites, setSites] = useState<SiteTenant[]>([]);
  const [activeSite, setActiveSiteState] = useState<SiteTenant | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSites = async () => {
    try {
      const res = await fetch('/api/admin/sites');
      const data = await res.json();
      if (data.sites && Array.isArray(data.sites)) {
        setSites(data.sites);
        
        // Restore active site from localStorage or default to alinavip-in
        const savedSlug = typeof window !== 'undefined' ? localStorage.getItem('alina_admin_active_site') : null;
        const matching = savedSlug ? data.sites.find((s: SiteTenant) => s.slug === savedSlug) : null;
        const defaultSite = matching || data.sites.find((s: SiteTenant) => s.slug === 'alinavip-in') || data.sites[0];
        setActiveSiteState(defaultSite);
      }
    } catch (err) {
      console.error('Failed to load sites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const setActiveSite = (site: SiteTenant) => {
    setActiveSiteState(site);
    if (typeof window !== 'undefined') {
      localStorage.setItem('alina_admin_active_site', site.slug);
    }
  };

  return (
    <AdminTenantContext.Provider
      value={{
        sites,
        activeSite,
        setActiveSite,
        loading,
        refreshSites: fetchSites,
      }}
    >
      {children}
    </AdminTenantContext.Provider>
  );
}

export function useAdminTenant() {
  const ctx = useContext(AdminTenantContext);
  if (!ctx) {
    throw new Error('useAdminTenant must be used within an AdminTenantProvider');
  }
  return ctx;
}
