import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  Eye,
  Tag,
  ArrowRight,
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import CTASection from '@/components/CTASection';
import ShareButton from '@/components/ShareButton';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';
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
    keywords: [
      post.title.toLowerCase(),
      post.category.toLowerCase(),
      `${post.category.toLowerCase()} guide`,
      ...(siteConfig.keywords || []).slice(0, 10),
    ],
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(`/blog/${post.slug}`),
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

  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;
  const ogImageUrl = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${siteConfig.url}${post.image}`
    : `${siteConfig.url}/og-image.jpg`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: ogImageUrl,
    dateModified: post.date,
    mainEntityOfPage: canonicalUrl,
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
                {post.author}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="relative aspect-[16/9] mb-12 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <Image
                src={post.image}
                alt={post.title}
                title={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content / Paragraphs */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl font-serif text-gray-900 leading-relaxed italic border-l-4 border-gold-500 pl-6 my-8">
              {post.excerpt}
            </p>

            <div
              className="space-y-6 font-sans text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Article Footer & Tags */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gold-600" />
              <span className="text-sm font-semibold text-gray-700">Tags:</span>
              {['Escort Service', 'Gurgaon Call Girls', post.category, 'VIP Lifestyle'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <ShareButton />
          </div>
        </div>
      </article>

      {/* Related Articles Strip */}
      {displayRelated.length > 0 && (
        <section className="py-16 bg-[#faf6f2] border-t border-gold-200/60">
          <div className="container-luxury max-w-6xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-wider block mb-2">
                Continue Reading
              </span>
              <h2 className="text-3xl font-serif text-[#0F172A] font-bold">
                Related Articles &amp; Guides
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {displayRelated.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gold-200/40 flex flex-col"
                >
                  {relatedPost.image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        title={relatedPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 384px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-gold-600 uppercase tracking-wider block mb-2">
                        {relatedPost.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#0F172A] group-hover:text-gold-600 transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                    <span className="text-xs text-gold-600 font-bold flex items-center gap-1 mt-4">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
