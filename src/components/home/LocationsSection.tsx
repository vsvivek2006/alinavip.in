import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const primeLocations = [
  { slug: 'cyber-city', name: 'Cyber City' },
  { slug: 'mg-road', name: 'MG Road' },
  { slug: 'golf-course-road', name: 'Golf Course Road' },
  { slug: 'dlf-phase-1', name: 'DLF Phase 1' },
  { slug: 'dlf-phase-2', name: 'DLF Phase 2' },
  { slug: 'dlf-phase-3', name: 'DLF Phase 3' },
  { slug: 'dlf-phase-4', name: 'DLF Phase 4' },
  { slug: 'dlf-phase-5', name: 'DLF Phase 5' },
  { slug: 'sohna-road', name: 'Sohna Road' },
  { slug: 'sushant-lok', name: 'Sushant Lok' },
  { slug: 'sector-29', name: 'Sector 29' },
  { slug: 'huda-city-centre', name: 'HUDA City Centre' },
  { slug: 'golf-course-extension-road', name: 'Golf Course Ext' },
  { slug: 'manesar', name: 'Manesar' },
  { slug: 'aerocity', name: 'Aerocity' },
  { slug: 'mahipalpur', name: 'Mahipalpur' },
  { slug: 'dwarka', name: 'Dwarka' },
  { slug: 'south-delhi', name: 'South Delhi' },
  { slug: 'sector-14', name: 'Sector 14' },
  { slug: 'sector-56', name: 'Sector 56' },
];

export default function LocationsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7]">
      <div className="container-luxury">
        <div className="text-center mb-14">
          <p className="section-subtitle text-gold-600">Service Locations</p>
          <h2 className="section-title mb-4 text-[#0F172A]">
            Rapid Outcall Coverage Across <span className="text-gradient-gold">Gurgaon &amp; NCR</span>
          </h2>
          <div className="gold-divider" />
          <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed">
            Prompt 20 to 30 minute dispatch to premier luxury hotels, serviced residences, and private suites across all key sectors and commercial hubs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 mb-10">
          {primeLocations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="flex items-center gap-2.5 p-4 bg-white border border-gray-200 hover:border-gold-500 hover:shadow-lg transition-all rounded-xl group"
            >
              <MapPin
                size={16}
                className="text-gold-500 flex-shrink-0 group-hover:scale-110 transition-transform"
              />
              <span className="text-xs text-gray-700 group-hover:text-gold-600 transition-colors font-semibold">
                {loc.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/locations"
            className="btn-outline-gold inline-flex items-center gap-2"
          >
            Explore All 108 Locations &amp; Sectors <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
