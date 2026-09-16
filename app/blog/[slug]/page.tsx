import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  Eye,
  Star,
  Phone,
  Tag,
  ArrowLeft,
  ArrowRight,
  Crown,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ShareButton from '@/components/ShareButton';
import { siteConfig } from '@/data/siteConfig';
import { getBlogPost, blogPosts } from '@/data/blogs';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    notFound();
  }

  const title = `${post.title} | ALINA VIP India`;
  const description = post.excerpt;
  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;
  const ogImageUrl = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${siteConfig.url}${post.image}`
    : `${siteConfig.url}/og-image.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          alt: post.title,
        },
      ],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);
  const displayRelated = [
    otherPosts[currentIndex % otherPosts.length],
    otherPosts[(currentIndex + 1) % otherPosts.length],
    otherPosts[(currentIndex + 2) % otherPosts.length],
  ].filter(Boolean);

  return (
    <>
      {/* Server-Rendered Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title },
        ]}
      />

      {/* Main Article Body */}
      <article className="py-16 md:py-24 bg-white text-gray-800">
        <div className="container-luxury max-w-4xl">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs bg-gold-100 text-gold-800 px-4 py-1.5 rounded-full font-bold tracking-wider uppercase">
                {post.category}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-gold-600" /> {post.views || '1.2k'} views
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl text-[#0F172A] font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-600" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-600" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-gold-600" />
                {post.author || 'ALINA VIP'}
              </span>
            </div>
          </div>

          {/* Featured Hero Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl mb-10 bg-gradient-to-br from-gray-800 to-gray-900 border border-gold-200/50">
            <Image
              src={post.image || `/images/blog/${post.slug}.webp`}
              alt={`${post.title} - Escort Service in Gurgaon | Call Girls Guide`}
              title={`${post.title} - Escort Service in Gurgaon | Call Girls Guide`}
              fill
              priority
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 848px, 832px"
              className="object-cover"
            />
          </div>

          {/* Article Prose */}
          <div className="prose-luxury max-w-none text-gray-700 text-lg leading-relaxed space-y-6">
            {post.content.map((para, i) => (
              <p key={i} className="text-gray-700 text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Mid-Article VIP Callout Card */}
          <div className="my-12 p-8 bg-gradient-to-r from-gold-50 via-amber-50 to-gold-50 rounded-2xl border-2 border-gold-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold text-[#0F172A] flex items-center gap-2 font-serif mb-2">
                  <Star className="w-5 h-5 text-gold-600 fill-gold-600" />
                  Book Your Escort Service Today
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Browse our verified{' '}
                  <Link href="/services" className="text-gold-600 hover:underline font-semibold">
                    service profiles
                  </Link>{' '}
                  or coordinate directly with our 24/7 concierge.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="flex items-center gap-2 bg-gold-600 hover:bg-gold-700 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" /> Book Now
                </Link>
                <a
                  href={siteConfig.url}
                  className="flex items-center gap-2 border-2 border-gold-600 text-gold-700 hover:bg-gold-600 hover:text-white px-8 py-3.5 rounded-full font-bold transition-all whitespace-nowrap"
                >
                  Visit {siteConfig.domain}
                </a>
              </div>
            </div>
          </div>

          {/* Article Tags */}
          <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-gray-100">
            <Tag className="w-4 h-4 text-gold-600 mr-1" />
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium cursor-default"
              >
                #{tag.replace(/\s+/g, '')}
              </span>
            ))}
          </div>

          {/* Article Footer: Navigation & Share */}
          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gold-600 hover:gap-3 transition-all text-sm font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Articles
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">Share:</span>
              <ShareButton />
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      {displayRelated.length > 0 && (
        <section className="py-16 bg-[#FDFBF7] text-gray-800">
          <div className="container-luxury">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-[#0F172A] font-bold mb-3">
                Related <span className="text-gold-600">Articles</span>
              </h2>
              <p className="text-gray-600">
                Explore executive etiquette, luxury lifestyle insights, and hotel dining recommendations.
              </p>
              <div className="gold-divider mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayRelated.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 hover:border-gold-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-800">
                      <Image
                        src={rp.image || `/images/blog/${rp.slug}.webp`}
                        alt={rp.title}
                        title={rp.title}
                        fill
                        sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 768px) calc(100vw - 48px), 280px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-gold-600 font-bold tracking-wider uppercase">
                        {rp.category}
                      </span>
                      <h3 className="font-serif text-lg text-[#0F172A] mt-2 mb-2 font-bold leading-tight group-hover:text-gold-600 transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {rp.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <span className="text-gold-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom VIP Escort Banner */}
      <section className="py-16 bg-[#1a1a2e] text-white">
        <div className="container-luxury text-center">
          <div className="max-w-3xl mx-auto">
            <Crown className="w-12 h-12 text-gold-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-4 font-serif">
              Reserve Elite <span className="text-gold-400">VIP Escort Service</span> in Gurgaon
            </h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Explore our curated selection of verified models, Russian escorts, and VIP call girls. Contact our 24/7 private concierge for prompt hotel suite coordination.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-gold-600 hover:bg-gold-700 text-white px-10 py-4 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-xl"
              >
                Book Now
              </Link>
              <a
                href={siteConfig.url}
                className="border-2 border-gold-500 hover:bg-gold-500/10 text-gold-400 px-10 py-4 rounded-full font-bold text-base transition-all"
              >
                Visit {siteConfig.domain}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="border-2 border-gold-500 hover:bg-gold-500/10 text-gold-400 px-10 py-4 rounded-full font-bold text-base transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
