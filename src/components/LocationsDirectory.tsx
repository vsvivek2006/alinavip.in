'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Compass, ArrowRight } from 'lucide-react';
import { LocationRegion } from '@/data/locations';

export interface CompactLocation {
  slug: string;
  name: string;
  area: string;
  city: string;
  region: LocationRegion;
  corridor?: string;
  isHub?: boolean;
  shortDescription: string;
}

const filterTabs = [
  { id: 'all', label: 'All Locations' },
  { id: 'gurgaon-prime', label: 'Gurgaon Prime & DLF' },
  { id: 'golf-spr', label: 'Golf Course & SPR' },
  { id: 'delhi-airport', label: 'Delhi & Airport' },
  { id: 'regional-ncr', label: 'Noida & Regional NCR' },
];

interface LocationsDirectoryProps {
  locations: CompactLocation[];
}

export default function LocationsDirectory({ locations }: LocationsDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredLocations = useMemo(() => {
    let result = locations;

    if (activeTab === 'gurgaon-prime') {
      result = result.filter(
        (loc) =>
          loc.region === 'Gurgaon' &&
          (loc.isHub ||
            ['cyber-city', 'mg-road', 'dlf-phase-1', 'dlf-phase-2', 'dlf-phase-3', 'dlf-phase-4', 'dlf-phase-5', 'sushant-lok', 'sector-29', 'huda-city-centre'].includes(loc.slug) ||
            loc.slug.includes('dlf') ||
            loc.slug.includes('phase'))
      );
    } else if (activeTab === 'golf-spr') {
      result = result.filter(
        (loc) =>
          loc.region === 'Gurgaon' &&
          (loc.slug.includes('golf') ||
            loc.slug.includes('spr') ||
            loc.slug.includes('sohna') ||
            ['sector-42', 'sector-43', 'sector-53', 'sector-54', 'sector-55', 'sector-56', 'sector-57', 'sector-65', 'sector-66', 'sector-67'].includes(loc.slug))
      );
    } else if (activeTab === 'delhi-airport') {
      result = result.filter(
        (loc) =>
          loc.region === 'Delhi' ||
          loc.region === 'Delhi NCR' ||
          ['aerocity', 'mahipalpur', 'dwarka', 'south-delhi', 'vasant-vihar', 'chanakyapuri', 'connaught-place'].includes(loc.slug)
      );
    } else if (activeTab === 'regional-ncr') {
      result = result.filter((loc) => loc.region !== 'Gurgaon' && loc.region !== 'Delhi' && loc.region !== 'Delhi NCR');
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (loc) =>
          loc.name.toLowerCase().includes(q) ||
          loc.area.toLowerCase().includes(q) ||
          loc.city.toLowerCase().includes(q) ||
          (loc.corridor && loc.corridor.toLowerCase().includes(q))
      );
    }

    return result;
  }, [locations, searchTerm, activeTab]);

  return (
    <div className="w-full text-[#2d2d2d]">
      {/* Search Input */}
      <div className="max-w-xl mx-auto mt-6 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by sector, DLF, or landmark (e.g., Sector 29, Cyber City, Aerocity)..."
          className="w-full bg-white border-2 border-gray-200 focus:border-[#671725] px-12 py-3.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none transition-colors shadow-sm rounded-xl"
        />
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#671725]" />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-[#671725] bg-gray-100 px-2 py-1 rounded"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSearchTerm('');
            }}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all rounded-lg ${
              activeTab === tab.id
                ? 'bg-[#671725] text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-[#671725]/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quick Counter */}
      <p className="text-xs text-gray-500 mt-4 tracking-wider text-center">
        Showing <strong className="text-[#671725]">{filteredLocations.length}</strong> of{' '}
        <strong>{locations.length}</strong> verified locations
      </p>

      {/* Locations Grid */}
      <div className="mt-10">
        {filteredLocations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-10 max-w-lg mx-auto shadow-sm">
            <Compass size={40} className="text-[#671725] mx-auto mb-3 opacity-60" />
            <h3 className="text-xl font-bold text-[#111827] mb-1">No Locations Found</h3>
            <p className="text-xs text-gray-500 mb-5">
              We couldn&apos;t find any locations matching &ldquo;{searchTerm}&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveTab('all');
              }}
              className="px-5 py-2.5 bg-[#671725] hover:bg-[#50121d] text-white text-xs font-bold rounded-lg transition-colors"
            >
              Reset Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                prefetch={false}
                className="group relative bg-white p-6 rounded-xl border border-gray-200/90 hover:border-[#671725] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#671725]">
                      <MapPin size={15} />
                      <span>{loc.city || loc.region}</span>
                    </div>
                    {loc.isHub && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-white bg-[#671725] px-2 py-0.5 rounded shadow-xs">
                        PRIMARY HUB
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#111827] group-hover:text-[#671725] transition-colors mb-2">
                    {loc.name}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    {loc.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  {loc.corridor ? (
                    <span className="text-[11px] font-semibold text-gray-500 bg-[#F9E1E5] text-[#671725] px-2 py-0.5 rounded">
                      {loc.corridor}
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-400">Gurgaon Outcall</span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#671725] group-hover:translate-x-1 transition-transform">
                    View Area <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
