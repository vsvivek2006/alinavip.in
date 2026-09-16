import Link from 'next/link';
import Image from 'next/image';
import {
  Crown,
  Star,
  Gem,
  GraduationCap,
  User,
  Plane,
  Camera,
  Award,
  Luggage,
  Sparkles,
  UtensilsCrossed,
  Calendar,
  PartyPopper,
  Briefcase,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { categories } from '@/data/categories';
import { services } from '@/data/content';

const iconMap: Record<string, LucideIcon> = {
  Crown,
  Star,
  Gem,
  GraduationCap,
  User,
  Plane,
  Camera,
  Award,
  Luggage,
  Sparkles,
  UtensilsCrossed,
  Calendar,
  PartyPopper,
  Briefcase,
};

const homeCategoryImageMap: Record<string, string> = {
  'russian-call-girls': '/images/categories/russian-escorts.webp',
  'vip-call-girls': '/images/categories/vip-escorts.webp',
  'high-profile-girls': '/images/categories/high-profile-girls.webp',
  'college-girls': '/images/categories/college-girls.webp',
  'independent-girls': '/images/categories/independent-escorts.webp',
  'air-hostess': '/images/categories/air-hostess.webp',
  'model-escorts': '/images/categories/model-escorts.webp',
  'celebrity-escorts': '/images/categories/celebrity-escorts.webp',
  'travel-escorts': '/images/categories/travel-escorts.webp',
  'housewife-escorts': '/images/categories/housewife-escorts.webp',
  'premium-escorts': '/images/categories/default.webp',
};

export default function ServicesCategoriesSection() {
  return (
    <>
      <section className="py-20 md:py-28 bg-[#FDFBF7]">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Bespoke Engagements</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Tailored <span className="text-gradient-gold">VIP Escort</span> Services
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm">
              Discover customized engagements designed for corporate gatherings, dinner dates, travel accompaniment, and private rendezvous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Sparkles;
              return (
                <Link
                  key={service.slug}
                  href="/services"
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 border border-gold-500/30 flex items-center justify-center mb-6 group-hover:border-gold-500 group-hover:bg-gold-50 transition-colors rounded-lg">
                      <Icon size={24} className="text-gold-500" />
                    </div>
                    <h3 className="font-serif text-xl text-[#0F172A] mb-3 font-bold group-hover:text-gold-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>
                  </div>
                  <span className="text-xs text-gold-600 tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-all font-semibold">
                    Learn More <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Curated Roster</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Explore Service <span className="text-gradient-gold">Categories</span>
            </h2>
            <div className="gold-divider" />
            <p className="text-gray-600 max-w-xl mx-auto mt-4 text-sm">
              Select from curated categories meeting every preference in beauty, personality, and background.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((cat) => {
              const imageSrc =
                homeCategoryImageMap[cat.slug] ||
                '/images/categories/default.webp';
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 hover:border-gold-300 transition-all duration-500 group flex flex-col"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-900">
                    <Image
                      src={imageSrc}
                      alt={`${cat.name} - VIP Call Girls in Gurgaon`}
                      title={`${cat.name} - VIP Call Girls in Gurgaon`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 286px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-gold-400 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-gold-500/30">
                      <ShieldCheck className="w-3 h-3 text-gold-400" />
                      <span>Verified</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-serif text-base md:text-lg text-white font-bold leading-tight drop-shadow-sm group-hover:text-gold-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-gray-300 line-clamp-1 mt-0.5">
                        {cat.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between bg-white text-xs">
                    <span className="text-gray-500 font-medium">5-Star Outcall</span>
                    <span className="text-gold-600 font-bold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      View Profiles <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="btn-outline-gold inline-flex items-center gap-2"
            >
              View All 11 Categories <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
