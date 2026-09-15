import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import BlogFilter from '@/components/BlogFilter';
import NewsletterForm from '@/components/NewsletterForm';
import { blogPosts, blogCategories } from '@/data/blogs';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Gurgaon Escorts & Call Girls Blog | ALINA VIP India',
  description:
    'Read the official ALINA VIP India blog for insights on VIP call girls, Russian escorts in Gurgaon, five-star hotel guides, escort girls etiquette, and luxury nightlife.',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: 'Gurgaon Escorts & Call Girls Blog | ALINA VIP India',
    description:
      'Read the official ALINA VIP India blog for insights on VIP call girls, Russian escorts in Gurgaon, five-star hotel guides, escort girls etiquette, and luxury nightlife.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
  },
};

const categoryEmojis: Record<string, string> = {
  Lifestyle: '🌟',
  Nightlife: '🌙',
  Travel: '✈️',
  Dating: '❤️',
  'Escort Tips': '💎',
  'Luxury Hotels': '🏨',
  'Premium Living': '💼',
  'VIP Escorts': '👑',
};

export default function BlogPage() {
  return (
    <>
      <Breadcrumb items={[{ name: 'Home', path: '/' }, { name: 'Blog' }]} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#050508] via-[#0C0B14] to-[#141022] overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="container-luxury relative z-10 text-center">
          <span className="inline-block px-6 py-2 border border-gold-500/30 rounded-full text-gold-400 text-sm font-semibold tracking-wider uppercase mb-6 bg-gold-500/10 backdrop-blur-sm">
            ★ Insights &amp; Resources
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-wide">
            Gurgaon Call Girls &amp; <span className="text-gradient-gold">Escort Girls Journal</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Authoritative insights on luxury escort services in Gurgaon, five-star hotel outcall etiquette, nightlife recommendations, and verified call girls booking advice from ALINA VIP India.
          </p>
          <div className="gold-divider mx-auto mt-8" />
        </div>
      </section>

      {/* Main Blog Articles Section */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <p className="section-subtitle text-gold-600">Our Blog</p>
            <h2 className="section-title mb-4 text-[#0F172A]">
              Insights on <span className="text-gradient-gold">VIP Escorts &amp; Luxury Lifestyle</span>
            </h2>
            <div className="gold-divider mx-auto" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed text-base">
              Discover curated guides on five-star hotel outcall, fine dining spots, profile selection, and executive etiquette in Gurgaon.
            </p>
          </div>

          {/* Interactive Search, Category Filter & Post Grid */}
          <Suspense
            fallback={
              <div className="text-center py-16 text-gray-400">
                <p>Loading articles...</p>
              </div>
            }
          >
            <BlogFilter posts={blogPosts} categories={blogCategories} />
          </Suspense>
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="py-16 bg-gradient-to-br from-[#faf6f2] to-white">
        <div className="container-luxury">
          <div className="bg-gradient-to-r from-gold-50 to-amber-50 rounded-3xl p-8 md:p-12 border-2 border-gold-200 shadow-md">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-gold-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                  ★ Featured Article
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3 font-serif">
                  Best Escort Service in Gurgaon: A Complete Guide
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Understand how to safely select verified profiles, book premier hotel outcall appointments, and maintain complete privacy during your stay in Gurgaon.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/blog/best-escort-service-gurgaon-guide"
                    className="inline-flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white px-6 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Read Full Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 border-2 border-gold-600 text-gold-700 hover:bg-gold-600 hover:text-white px-6 py-3.5 rounded-full font-semibold transition-all"
                  >
                    Browse Services
                  </Link>
                </div>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl border border-gold-200/60 bg-neutral-900 group">
                <Image
                  src="/images/featured-blog.webp"
                  alt="Best Escort Service in Gurgaon - Featured Guide"
                  fill
                  sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 48px), 584px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Escort Service Categories */}
      <section className="py-16 bg-[#1a1a2e] text-white">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4 font-serif">
              Explore <span className="text-gold-400">Editorial</span> Topics
            </h3>
            <p className="text-gray-300">
              Browse articles organized by lifestyle, dining, travel, and escort service themes.
            </p>
            <div className="gold-divider mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {blogCategories.map((cat) => (
              <div
                key={cat}
                className="bg-white/5 hover:bg-gold-600/20 border border-white/10 hover:border-gold-500 rounded-xl p-5 text-center transition-all group"
              >
                <span className="block text-2xl mb-2">
                  {categoryEmojis[cat] || '✨'}
                </span>
                <span className="text-sm text-gray-200 group-hover:text-gold-400 transition-colors font-medium">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-white text-gray-800">
        <div className="container-luxury">
          <NewsletterForm />
        </div>
      </section>

      {/* Editorial Summary */}
      <section className="py-16 bg-[#FDFBF7] text-gray-800">
        <div className="container-luxury max-w-4xl">
          <div className="prose-luxury bg-white p-8 md:p-12 rounded-2xl border border-gold-200/60 shadow-sm">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-6 font-serif">
              About the ALINA VIP Editorial Desk
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                The <strong>ALINA VIP</strong> editorial team publishes practical guides on navigating luxury escort services, premium hospitality, and executive nightlife across Gurgaon and the greater NCR region.
              </p>
              <p>
                From tips on choosing the right escort for high-profile business dinners to comprehensive overviews of five-star suites along Golf Course Road and Cyber City, our articles help clients make informed, discreet decisions.
              </p>
              <p>
                For reservations and direct profile coordination, view our complete{' '}
                <Link href="/services" className="text-gold-600 hover:underline font-semibold">
                  service directory
                </Link>{' '}
                or explore our{' '}
                <Link href="/locations" className="text-gold-600 hover:underline font-semibold">
                  location coverage
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
