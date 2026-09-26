import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  Tag,
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
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Extracts question/answer pairs from content for Schema.org FAQPage rich results
 */
function extractFaqItems(rawContent: string | string[]): Array<{ question: string; answer: string }> {
  if (!rawContent) return [];
  const text = Array.isArray(rawContent) ? rawContent.join('\n\n') : String(rawContent);
  const faqs: Array<{ question: string; answer: string }> = [];

  // Match <h3>Question?</h3> followed immediately by <p>Answer...</p> without crossing tags
  const h3Regex = /<h3[^>]*>((?:(?!<\/h3>)[\s\S])+?)<\/h3>\s*<p[^>]*>((?:(?!<\/p>)[\s\S])+?)<\/p>/gi;
  let match;
  while ((match = h3Regex.exec(text)) !== null) {
    const q = match[1].replace(/<[^>]+>/g, '').trim();
    const a = match[2].replace(/<[^>]+>/g, '').trim();
    if (q && a && (q.endsWith('?') || /^(what|how|why|where|can|is|are|do|does|who)\b/i.test(q))) {
      faqs.push({ question: q, answer: a });
    }
  }

  // Also check markdown ### Question?\n\nAnswer
  if (faqs.length === 0) {
    const mdRegex = /###\s+([^\n?]+\?)\s*\n+([^\n#]+)/gi;
    while ((match = mdRegex.exec(text)) !== null) {
      const q = match[1].trim();
      const a = match[2].trim();
      if (q && a) {
        faqs.push({ question: q, answer: a });
      }
    }
  }

  return faqs.slice(0, 6);
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

  const authorName = post.author && post.author !== 'ALINA VIP India' ? post.author : `${siteConfig.name} Editorial Desk`;

  const articleSchema: Record<string, unknown> = {
    '@type': 'BlogPosting',
    headline: post.title,
    image: ogImageUrl,
    dateModified: post.date,
    datePublished: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    inLanguage: 'en-IN',
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: 'Chief Concierge Director',
      worksFor: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/og-image.jpg`,
      },
    },
  };

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.url}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  };

  const graphList: Array<Record<string, unknown>> = [articleSchema, breadcrumbSchema];

  // Automated 2026 SEO E-E-A-T FAQ Rich Snippet injection
  const faqItems = extractFaqItems(post.content);
  if (faqItems.length >= 2) {
    graphList.push({
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': graphList,
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

  // Safe date parsing to avoid hydration mismatch and timezone day-shift
  let formattedDate = 'Recent Guide';
  try {
    const d = new Date((post.date || '') + 'T00:00:00');
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
      {/* Server-Rendered Article, Breadcrumb & FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <Breadcrumb
        items={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title },
        ]}
      />

      <article className="min-h-screen bg-stone-50/60 text-gray-900">
        {/* Article Hero Header (Growth Service locked luxury gradient & ambient glow) */}
        <header className="bg-gradient-to-br from-[#120508] via-[#2D0A14] to-[#0A0407] py-16 sm:py-24 px-6 relative overflow-hidden text-white border-b border-[#671725]/40">
          {/* Ambient glow */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#671725]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#FFD700] hover:text-[#FFE55C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>

            {/* Tags / Category */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#671725] text-white border border-[#FFD700]/40 uppercase tracking-wider">
                {post.category || 'VIP Escorts'}
              </span>
              {post.tags &&
                post.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1F080F] text-stone-300 border border-[#671725]/60"
                  >
                    #{tag}
                  </span>
                ))}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-sans">
              {post.title}
            </h1>

            {/* Byline & Metadata (Strictly human byline) */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-stone-300 border-t border-[#671725]/50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#671725] border border-[#FFD700]/50 flex items-center justify-center text-[#FFD700] shadow-sm">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 block font-medium">Editorial Author</span>
                  <span className="font-semibold text-white tracking-wide">{authorName}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#1F080F] border border-[#671725]/60 flex items-center justify-center text-[#FFD700]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 block font-medium">Published</span>
                  <span className="font-medium text-white">{formattedDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#1F080F] border border-[#671725]/60 flex items-center justify-center text-[#FFD700]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 block font-medium">Reading Time</span>
                  <span className="font-medium text-white">{post.readTime || '6 min read'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Post Container */}
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
          {/* Featured Cover Image */}
          {post.image && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#671725]/25 mb-12 shadow-2xl shadow-black/20 bg-stone-900">
              <Image
                src={getAssetUrl(post.image)}
                alt={post.title}
                title={post.title}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          {/* Executive Summary / Key Takeaways Callout Box (Google 2026 E-E-A-T & Helpful Content) */}
          {post.excerpt && (
            <div className="mb-10 p-6 sm:p-7 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#671725] shadow-xs relative">
              <div className="flex items-center gap-2 text-xs font-bold text-[#671725] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-[#FFD700]" />
                <span>Executive Summary &amp; Key Takeaways</span>
              </div>
              <p className="text-base sm:text-lg text-stone-800 leading-relaxed font-medium">
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Post Content (Normalized, Sanitized & Styled via .article-content) */}
          <ArticleContentRenderer content={post.content} />

          {/* Share & Tags Bottom Row */}
          <div className="mt-16 pt-8 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#671725]" /> Topics:
              </span>
              {(post.tags && post.tags.length > 0
                ? post.tags
                : ['Escort Service', `${siteConfig.city} Call Girls`, post.category, 'VIP Lifestyle']
              ).map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-stone-300/80 text-stone-700 hover:border-[#671725]/40 transition-colors shadow-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <ShareButton />
          </div>

          {/* Bottom Conversion CTA Banner (Growth Service Layout) */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#120508] via-[#2D0A14] to-[#0A0407] border border-[#671725]/60 text-center space-y-6 shadow-2xl shadow-black/30 text-white relative overflow-hidden">
            {/* Ambient glow inside CTA */}
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Experience Gold-Standard Hospitality in{' '}
                <span className="text-[#FFD700]">{siteConfig.city || 'Gurgaon'}</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto leading-relaxed">
                Verified independent call girls delivered to your 5-star hotel suite within 20–30 minutes. Strict zero advance payment, in-person verification, and 100% Cash on Delivery.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-[#FFD700] hover:bg-[#FFE55C] text-[#120508] shadow-lg shadow-black/30 transition-all text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Direct Concierge Call
                </a>
                <a
                  href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${siteConfig.name}, I am interested in booking VIP escort services in ${siteConfig.city || 'Gurgaon'} after reading your article: ${post.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-black/30 transition-all text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Instant WhatsApp Booking
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles Strip */}
      {displayRelated.length > 0 && (
        <section className="py-16 bg-white border-t border-stone-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-[#671725] uppercase tracking-wider block mb-2">
                Continue Reading
              </span>
              <h2 className="text-3xl font-sans font-bold text-stone-900">
                Related Articles &amp; Guides
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {displayRelated.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-stone-200 flex flex-col"
                >
                  {relatedPost.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
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
                      <span className="text-xs font-bold text-[#671725] uppercase tracking-wider block mb-2">
                        {relatedPost.category}
                      </span>
                      <h3 className="font-sans font-bold text-lg text-stone-900 group-hover:text-[#671725] transition-colors line-clamp-2 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-stone-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                    <span className="text-xs text-[#671725] font-bold flex items-center gap-1 mt-4">
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

