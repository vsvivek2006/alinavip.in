'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Col 1: About ALINA VIP */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-sans font-black text-2xl tracking-wide text-white">
              ALINA <span className="text-[#FFD700] font-light">VIP</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              ALINA VIP is Gurgaon’s premier luxury escort agency. We offer in-person verified Indian, Russian, and independent models for 5-star hotel and suite rendezvous across Cyber City, Golf Course Road, and Delhi NCR.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href={"tel:" + siteConfig.phone}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FFD700] hover:underline"
              >
                <Phone size={15} />
                <span>{siteConfig.phoneDisplay}</span>
              </a>
              <Link href="/rates" className="text-xs font-bold text-rose-300 hover:text-white underline">
                Check Rates &amp; Pricing &rarr;
              </Link>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 border-b border-gray-800 pb-2">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/category/russian-call-girls" className="text-gray-400 hover:text-white transition-colors">
                  Russian Escorts
                </Link>
              </li>
              <li>
                <Link href="/category/vip-call-girls" className="text-gray-400 hover:text-white transition-colors">
                  VIP Call Girls
                </Link>
              </li>
              <li>
                <Link href="/category/high-profile-girls" className="text-gray-400 hover:text-white transition-colors">
                  High Profile Escorts
                </Link>
              </li>
              <li>
                <Link href="/category/college-girls" className="text-gray-400 hover:text-white transition-colors">
                  College Girls
                </Link>
              </li>
              <li>
                <Link href="/category/air-hostess" className="text-gray-400 hover:text-white transition-colors">
                  Air Hostess Escorts
                </Link>
              </li>
              <li>
                <Link href="/category/celebrity-escorts" className="text-gray-400 hover:text-white transition-colors">
                  Celebrity Call Girls
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-[#FFD700] font-semibold hover:underline">
                  View All Categories &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Hotels */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 border-b border-gray-800 pb-2">
              Services &amp; Hotels
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/1-2-3-hours" className="text-gray-400 hover:text-white transition-colors">
                  1/2/3 Hours Escorts
                </Link>
              </li>
              <li>
                <Link href="/services/full-night" className="text-gray-400 hover:text-white transition-colors">
                  Full Night Escorts
                </Link>
              </li>
              <li>
                <Link href="/services/sensual-massage" className="text-gray-400 hover:text-white transition-colors">
                  Sensual Massage
                </Link>
              </li>
              <li>
                <Link href="/services/girlfriend-experience" className="text-gray-400 hover:text-white transition-colors">
                  GFE Experience
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-gray-400 hover:text-white transition-colors">
                  5-Star Hotel Escorts
                </Link>
              </li>
              <li>
                <Link href="/rates" className="text-gray-400 hover:text-white transition-colors">
                  Rates &amp; Packages
                </Link>
              </li>
              <li>
                <Link href="/phone-number" className="text-[#FFD700] font-semibold hover:underline">
                  VIP Booking Hotline &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Locations */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 border-b border-gray-800 pb-2">
              Top Locations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/locations/cyber-city" className="text-gray-400 hover:text-white transition-colors">
                  Cyber City
                </Link>
              </li>
              <li>
                <Link href="/locations/golf-course-road" className="text-gray-400 hover:text-white transition-colors">
                  Golf Course Road
                </Link>
              </li>
              <li>
                <Link href="/locations/mg-road" className="text-gray-400 hover:text-white transition-colors">
                  MG Road
                </Link>
              </li>
              <li>
                <Link href="/locations/aerocity" className="text-gray-400 hover:text-white transition-colors">
                  Aerocity
                </Link>
              </li>
              <li>
                <Link href="/locations/dwarka" className="text-gray-400 hover:text-white transition-colors">
                  Dwarka
                </Link>
              </li>
              <li>
                <Link href="/locations/sohna-road" className="text-gray-400 hover:text-white transition-colors">
                  Sohna Road
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-[#FFD700] font-semibold hover:underline">
                  View All Sectors &rarr;
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Age Verification Required Banner matching Roshni Khanna */}
        <div className="border-t border-gray-800 pt-6 pb-6 text-center text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
          <p className="font-bold text-gray-300 mb-1">Age Verification Required (18+ Only)</p>
          <p>
            This website is intended strictly for consenting adults aged 18 and older. By accessing this platform, you certify that you are of legal age in your jurisdiction and agree to our terms and privacy policy. All models featured on this site are independent consenting adults aged 21 or older.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-gray-300 transition-colors">Disclaimer</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
