import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import BlogFilter from '@/components/BlogFilter';
import NewsletterForm from '@/components/NewsletterForm';
import { blogCategories } from '@/data/blogs';
import { getPublishedBlogPosts } from '@/lib/supabaseBlog';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';

export const revalidate = 86400; // 24h ISR, purged on-demand by /api/revalidate webhook

export const metadata: Metadata = {
  title: 'Gurgaon Escorts & Call Girls Blog | ALINA VIP India',
  description:
    'Read the official ALINA VIP India blog for insights on VIP call girls, Russian escorts in Gurgaon, five-star hotel guides, escort girls etiquette, and luxury nightlife.',
  keywords: [
    ...siteConfig.keywords.slice(0, 10),
    'blog guides, nightlife tips, 5 star hotel dining',
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
    languages: getAlternateLanguages('/blog'),
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

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <Breadcrumb items={[{ name: 'Home', path: '/' }, { name: 'Blog' }]} />

      {/* Hero Section */}
      <section className="relative bg-[#671725] text-white py-14 px-4 sm:px-6 lg:px-8 border-b-4 border-luxury-gold shadow-md">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-6 py-2 border border-luxury-gold/50 rounded-full text-luxury-gold text-sm font-semibold tracking-wider uppercase mb-6 bg-white/10 backdrop-blur-sm">
            ★ Insights &amp; Resources
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-sans font-bold tracking-wide">
            Gurgaon Call Girls &amp; <span className="text-gradient-gold">Escort Girls Journal</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Authoritative insights on luxury escort services in Gurgaon, five-star hotel outcall etiquette, nightlife recommendations, and verified call girls booking advice from ALINA VIP India.
          </p>
          <div className="w-16 h-1 bg-[#671725] rounded-full my-4 mx-auto mt-8" />
        </div>
      </section>

      {/* Main Blog Articles Section */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle text-primary-wine">Our Blog</p>
            <h2 className="section-title mb-4 text-[#111827]">
              Insights on <span className="text-gradient-gold">VIP Escorts &amp; Luxury Lifestyle</span>
            </h2>
            <div className="w-16 h-1 bg-[#671725] rounded-full my-4 mx-auto" />
            <p className="text-gray-600 max-w-2xl mx-auto mt-6 leading-relaxed text-base">
              Discover curated guides on five-star hotel outcall, fine dining spots, profile selection, and executive etiquette in Gurgaon.
            </p>
          </div>

          {/* Interactive Search, Category Filter & Post Grid */}
          <BlogFilter posts={posts} categories={blogCategories} />
        </div>
      </section>

      {/* Featured Article Section */}
      <section className="py-16 bg-gradient-to-br from-[#faf6f2] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-gold-50 to-amber-50 rounded-3xl p-8 md:p-12 border-2 border-gray-200 shadow-md">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block bg-primary-wine text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                  ★ Featured Article
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3 font-sans font-bold">
                  Best Escort Service in Gurgaon: A Complete Guide
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Understand how to safely select verified profiles, book premier hotel outcall appointments, and maintain complete privacy during your stay in Gurgaon.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/blog/best-escort-service-gurgaon-guide"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#671725] via-[#56131f] to-[#420c16] hover:from-[#7d1c2e] hover:to-[#55101d] text-white font-bold rounded-xl shadow-md shadow-rose-950/20 hover:shadow-lg hover:shadow-rose-950/30 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 font-semibold"
                  >
                    Read Full Guide <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/90 hover:bg-white text-[#671725] border border-rose-200/90 hover:border-[#671725] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 font-bold rounded-xl font-semibold"
                  >
                    Browse Services
                  </Link>
                </div>
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden shadow-2xl border border-gray-200/60 bg-neutral-900 group">
                <Image
                  src="https://ik.imagekit.io/uum5sguzw/shared/Benefits_of_Booking_Through_a_Professional_Escort_.jpg?tr=f-auto,q-85"
                  alt="Best Escort Service in Gurgaon - Featured Guide"
                  title="Best Escort Service in Gurgaon - Featured Guide"
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
      <section className="py-16 bg-[#671725] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4 font-sans font-bold">
              Explore <span className="text-luxury-gold">Editorial</span> Topics
            </h3>
            <p className="text-gray-300">
              Browse articles organized by lifestyle, dining, travel, and escort service themes.
            </p>
            <div className="w-16 h-1 bg-[#671725] rounded-full my-4 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {blogCategories.map((cat) => (
              <div
                key={cat}
                className="bg-white/5 hover:bg-primary-wine/20 border border-white/10 hover:border-primary-wine rounded-xl p-5 text-center transition-all group"
              >
                <span className="block text-2xl mb-2">
                  {categoryEmojis[cat] || '✨'}
                </span>
                <span className="text-sm text-gray-200 group-hover:text-luxury-gold transition-colors font-medium">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>

      {/* Editorial Summary */}
      <section className="py-16 bg-[#FFFDF6] text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-6 bg-white p-8 md:p-12 rounded-2xl border border-gray-200/60 shadow-sm">
            <h2 className="text-3xl font-bold text-[#111827] mb-6 font-sans font-bold">
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
                <Link href="/services" className="text-primary-wine hover:underline font-semibold">
                  service directory
                </Link>{' '}
                or explore our{' '}
                <Link href="/locations" className="text-primary-wine hover:underline font-semibold">
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
