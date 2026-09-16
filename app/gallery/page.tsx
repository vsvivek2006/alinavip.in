import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Crown,
  Camera,
  Heart,
  GraduationCap,
  User,
  Star,
  Plane,
  Sparkles,
  ArrowRight,
  Phone,
  ShieldCheck,
  Award,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';
import { categories } from '@/data/categories';

export const metadata: Metadata = {
  title: 'Verified Photo Gallery | VIP Call Girls & Gurgaon Escorts | ALINA VIP India',
  description:
    'Browse authenticated, untouched photographs of VIP call girls and luxury escorts in Gurgaon. Genuine Russian escorts, model escort girls, and high-profile girls.',
  keywords: [
    ...siteConfig.keywords.slice(0, 10),
    'verified escort gallery, real call girl photos, genuine escort profiles',
  ],
  alternates: {
    canonical: `${siteConfig.url}/gallery`,
    languages: getAlternateLanguages('/gallery'),
  },
  openGraph: {
    title: 'Verified Photo Gallery | VIP Call Girls & Gurgaon Escorts | ALINA VIP India',
    description:
      'Browse authenticated, untouched photographs of VIP call girls and luxury escorts in Gurgaon. Genuine Russian escorts, model escort girls, and high-profile girls.',
    url: `${siteConfig.url}/gallery`,
    type: 'website',
  },
};

const categoryImages: Record<string, string> = {
  'russian-call-girls': '/images/categories/russian-escorts.webp',
  'russian-escorts': '/images/categories/russian-escorts.webp',
  'vip-call-girls': '/images/categories/vip-escorts.webp',
  'vip-escorts': '/images/categories/vip-escorts.webp',
  'high-profile-girls': '/images/categories/high-profile-girls.webp',
  'model-escorts': '/images/categories/model-escorts.webp',
  'housewife-escorts': '/images/categories/housewife-escorts.webp',
  'college-girls': '/images/categories/college-girls.webp',
  'independent-girls': '/images/categories/independent-escorts.webp',
  'independent-escorts': '/images/categories/independent-escorts.webp',
  'air-hostess': '/images/categories/air-hostess.webp',
  'air-hostess-escorts': '/images/categories/air-hostess.webp',
  'celebrity-escorts': '/images/categories/celebrity-escorts.webp',
  'travel-escorts': '/images/categories/travel-escorts.webp',
};

const categoryIcons: Record<string, React.ElementType> = {
  'russian-call-girls': Crown,
  'russian-escorts': Crown,
  'vip-call-girls': Crown,
  'vip-escorts': Crown,
  'high-profile-girls': Star,
  'model-escorts': Camera,
  'housewife-escorts': Heart,
  'college-girls': GraduationCap,
  'independent-girls': User,
  'independent-escorts': User,
  'air-hostess': Plane,
  'air-hostess-escorts': Plane,
  'celebrity-escorts': Award,
  'travel-escorts': Sparkles,
};

export default function GalleryPage() {
  return (
    <>
      <Breadcrumb items={[{ name: 'Home', path: '/' }, { name: 'Gallery' }]} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#050508] via-[#0C0B14] to-[#141022] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="container-luxury relative z-10 text-center">
          <span className="inline-block px-6 py-2 border border-gold-500/30 rounded-full text-gold-400 text-sm font-semibold tracking-wider uppercase mb-6 bg-gold-500/10 backdrop-blur-sm">
            ★ Verified Portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-wide">
            VIP Call Girl <span className="text-gradient-gold">Photo Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Browse our certified portfolio of{' '}
            <strong className="text-gold-400 font-semibold">verified call girls</strong>,{' '}
            <Link href="/category/russian-call-girls" className="text-gold-400 hover:underline font-medium">
              Russian call girls
            </Link>
            ,{' '}
            <Link href="/category/model-escorts" className="text-gold-400 hover:underline font-medium">
              fashion models
            </Link>
            , and{' '}
            <Link href="/services" className="text-gold-400 hover:underline font-medium">
              elite escorts in Gurgaon
            </Link>
            . Every photograph is authenticated in person to guarantee 100% profile accuracy.
          </p>
          <div className="gold-divider mx-auto mt-8" />
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <p className="section-subtitle text-gold-600">Our Gallery</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Premium <span className="text-gradient-gold">Call Girls</span> Collection
            </h2>
            <div className="gold-divider mx-auto" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed text-base">
              Explore our curated collection of verified{' '}
              <Link href="/services" className="text-gold-600 hover:underline font-medium">
                call girls in Gurgaon
              </Link>
              . Each category represents premium{' '}
              <Link href="/services" className="text-gold-600 hover:underline font-medium">
                escort service
              </Link>{' '}
              options.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => {
              const IconComponent = categoryIcons[cat.slug] || Star;
              const imageSrc = categoryImages[cat.slug] || '/images/categories/default.webp';

              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gold-300 flex flex-col"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <Image
                      src={imageSrc}
                      alt={`${cat.name} - Escort Service in Gurgaon | VIP Call Girls`}
                      title={`${cat.name} - Escort Service in Gurgaon | VIP Call Girls`}
                      fill
                      sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, 390px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Category Floating Tag */}
                    <div className="absolute top-4 left-4 bg-gold-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5 backdrop-blur-sm">
                      <IconComponent className="w-3.5 h-3.5 text-gold-200" />
                      <span>{cat.name}</span>
                    </div>

                    {/* Verified Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-gold-400 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 border border-gold-500/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                      <span>Verified</span>
                    </div>

                    {/* Drawer Overlay on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-xl">
                        <p className="text-white text-xs leading-relaxed line-clamp-3">
                          {cat.shortDescription}
                        </p>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                          <span className="text-gold-400 text-xs font-semibold tracking-wider uppercase flex items-center gap-1">
                            View Call Girls <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                            <span className="text-white text-xs font-bold">4.9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-xl text-[#0F172A] font-bold group-hover:text-gold-600 transition-colors">
                          {cat.name}
                        </h3>
                        <span className="text-xs bg-gold-100 text-gold-700 px-2.5 py-0.5 rounded-full font-semibold">
                          Premium
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {cat.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                        <span className="text-sm font-bold text-[#0F172A]">4.9</span>
                        <span className="text-xs text-gray-400 ml-1">(128+ reviews)</span>
                      </div>
                      <span className="text-gold-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Profiles <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metric Counters Banner */}
      <section className="py-16 bg-[#1a1a2e] text-white">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-serif">500+</div>
              <p className="text-gray-300 text-sm uppercase tracking-wider">Verified Call Girls</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-serif">4.9/5</div>
              <p className="text-gray-300 text-sm uppercase tracking-wider">Client Rating</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-serif">24/7</div>
              <p className="text-gray-300 text-sm uppercase tracking-wider">Escort Service Available</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2 font-serif">100%</div>
              <p className="text-gray-300 text-sm uppercase tracking-wider">Discreet Service</p>
            </div>
          </div>
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <a
              href={siteConfig.url}
              className="text-gold-400 hover:text-gold-300 text-sm font-semibold hover:underline"
            >
              Official Portal: {siteConfig.domain}
            </a>
          </div>
        </div>
      </section>

      {/* Popular Escort Services */}
      <section className="py-16 bg-[#FDFBF7] text-gray-800">
        <div className="container-luxury">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-[#0F172A] mb-3 font-serif">
              Popular <span className="text-gold-600">Escort Services</span>
            </h3>
            <p className="text-gray-600">
              Browse our most popular{' '}
              <Link href="/services" className="text-gold-600 hover:underline font-medium">
                escort service categories in Gurgaon
              </Link>
            </p>
            <div className="gold-divider mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link href="/category/russian-call-girls"
              className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-gold-300 group"
            >
              <Crown className="w-10 h-10 text-gold-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-[#0F172A] group-hover:text-gold-600 block">
                Russian Escorts
              </span>
            </Link>

            <Link href="/category/model-escorts"
              className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-gold-300 group"
            >
              <Camera className="w-10 h-10 text-gold-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-[#0F172A] group-hover:text-gold-600 block">
                Model Escorts
              </span>
            </Link>

            <Link href="/category/housewife-escorts"
              className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-gold-300 group"
            >
              <Heart className="w-10 h-10 text-gold-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-[#0F172A] group-hover:text-gold-600 block">
                Housewife Escorts
              </span>
            </Link>

            <Link href="/category/college-girls"
              className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-gold-300 group"
            >
              <GraduationCap className="w-10 h-10 text-gold-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-[#0F172A] group-hover:text-gold-600 block">
                College Girls
              </span>
            </Link>

            <Link href="/category/independent-girls"
              className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-gold-300 group"
            >
              <User className="w-10 h-10 text-gold-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-[#0F172A] group-hover:text-gold-600 block">
                Independent Escorts
              </span>
            </Link>

            <Link href="/category/vip-call-girls"
              className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-gold-300 group"
            >
              <Crown className="w-10 h-10 text-gold-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-[#0F172A] group-hover:text-gold-600 block">
                VIP Escorts
              </span>
            </Link>
          </div>

          <div className="text-center mt-8">
            <a
              href={siteConfig.url}
              className="text-gold-600 hover:text-gold-700 font-semibold text-sm hover:underline"
            >
              Visit {siteConfig.domain}
            </a>
          </div>
        </div>
      </section>

      {/* Ready to Book CTA */}
      <section className="py-16 bg-white">
        <div className="container-luxury">
          <div className="bg-gradient-to-r from-gold-50 via-amber-50 to-gold-50 rounded-3xl p-8 md:p-12 border-2 border-gold-200 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="text-3xl font-bold text-[#0F172A] mb-4 font-serif">
              Ready to Book Your <span className="text-gold-600">Escort Service?</span>
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
              Explore authentic photo-authenticated profiles. Call our concierge desk 24/7 or view full details in our{' '}
              <Link href="/services" className="text-gold-600 hover:underline font-semibold">
                services directory
              </Link>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="bg-gold-600 hover:bg-gold-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> Call Now
              </a>
              <Link href="/contact"
                className="border-2 border-gold-600 text-gold-700 hover:bg-gold-600 hover:text-white px-10 py-4 rounded-full font-bold text-lg transition-all"
              >
                Contact Us
              </Link>
              <a
                href={siteConfig.url}
                className="border-2 border-gold-600 text-gold-700 hover:bg-gold-600 hover:text-white px-10 py-4 rounded-full font-bold text-lg transition-all"
              >
                Visit {siteConfig.domain}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
