'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // In admin portal: render clean admin layout with zero public clutter
  if (isAdmin) {
    return <main className="min-h-screen">{children}</main>;
  }

  // In public portal: render brand header, content, footer, and chat widget
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1E1E1E] overflow-x-hidden selection:bg-[#671725] selection:text-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
