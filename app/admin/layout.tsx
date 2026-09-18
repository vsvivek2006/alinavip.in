import React from 'react';
import { cookies } from 'next/headers';
import { AdminTenantProvider } from '@/context/AdminTenantContext';
import AdminHeader from '@/components/admin/AdminHeader';

export const metadata = {
  title: 'ALINA VIP | Multi-Tenant Blog CMS',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get('alina_admin_session');
  const isAuthenticated = !!session && session.value === 'authenticated';

  return (
    <div className="min-h-screen bg-[#0e070c] text-stone-100 flex flex-col font-sans">
      {isAuthenticated ? (
        <AdminTenantProvider>
          <AdminHeader />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </AdminTenantProvider>
      ) : (
        // Allow unauthenticated page (login) to render freely
        <>{children}</>
      )}
    </div>
  );
}
