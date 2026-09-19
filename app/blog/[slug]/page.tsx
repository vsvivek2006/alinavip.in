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
import ArticleContentRenderer from '@/components/blog/ArticleContentRenderer';
import { siteConfig, getAlternateLanguages } from '@/data/siteConfig';
import { getPostBySlug, getPublishedBlogPosts } from '@/lib/supabaseBlog';
import { getAssetUrl } from '@/lib/assets';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 3600; // 1-hour ISR cache, revalidated instantly on-demand via webhook

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: `Article Not Found | ${siteConfig.name}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} | ${siteConfig.name}`;
  const description = post.excerpt || `${post.title} - ${siteConfig.name}`;
  const canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;
  const ogImageUrl = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${siteConfig.url}${post.image}`
    : `${siteConfig.url}/og-image.jpg`;

  const category = post.category || 'VIP Escorts';

  return {
    title,
    keywords: [
      post.title.toLowerCase(),
      category.toLowerCase(),
      `${category.toLowerCase()} guide`,
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
  const post = await getPostBySlug(slug);

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

  const allPosts = await getPublishedBlogPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== post.slug);

  // Safe deduplication of related posts
  const seenSlugs = new Set<string>();
  const displayRelated: typeof allPosts = [];
  for (const p of otherPosts) {
    if (!seenSlugs.has(p.slug)) {
      seenSlugs.add(p.slug);
      displayRelated.push(p);
      if (displayRelated.length >= 3) break;
    }
  }

  // Safe date parsing to avoid hydration mismatch
  let formattedDate = 'Recent Guide';
  try {
    const d = new Date(post.date);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  } catch {
    formattedDate = 'Recent Guide';
  }

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs bg-[#F9E1E5] text-primary-wine px-4 py-1.5 rounded-full font-bold tracking-wider uppercase">
                {post.category}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-primary-wine" /> {post.views || '1.2k'} views
              </span>
            </div>

            <h1 className="font-sans font-bold text-3xl md:text-5xl text-[#111827] font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-wine" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-wine" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary-wine" />
                {post.author || `${siteConfig.name} Editorial Team`}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="relative aspect-[16/9] mb-12 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <Image
                src={getAssetUrl(post.image)}
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
            {post.excerpt && (
              <p className="text-xl font-sans font-bold text-gray-900 leading-relaxed italic border-l-4 border-primary-wine pl-6 my-8">
                {post.excerpt}
              </p>
            )}

            <ArticleContentRenderer content={post.content} />
          </div>

          {/* Article Footer & Tags */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-primary-wine" />
              <span className="text-sm font-semibold text-gray-700">Tags:</span>
              {(post.tags && post.tags.length > 0 ? post.tags : ['Escort Service', `${siteConfig.city} Call Girls`, post.category, 'VIP Lifestyle']).map((tag) => (
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
        <section className="py-16 bg-white border-t border-gray-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-primary-wine uppercase tracking-wider block mb-2">
                Continue Reading
              </span>
              <h2 className="text-3xl font-sans font-bold text-[#111827] font-bold">
                Related Articles &amp; Guides
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {displayRelated.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200/40 flex flex-col"
                >
                  {relatedPost.image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={getAssetUrl(relatedPost.image)}
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
                      <span className="text-xs font-bold text-primary-wine uppercase tracking-wider block mb-2">
                        {relatedPost.category}
                      </span>
                      <h3 className="font-sans font-bold text-lg font-bold text-[#111827] group-hover:text-primary-wine transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                    <span className="text-xs text-primary-wine font-bold flex items-center gap-1 mt-4">
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
