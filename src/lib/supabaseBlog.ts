import { blogPosts as fallbackPosts, BlogPost } from '@/data/blogs';
import { getAssetUrl } from '@/lib/assets';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SITE_SLUG = process.env.NEXT_PUBLIC_SITE_SLUG || 'alinavip-in';

interface SupabasePostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: unknown;
  cover_image: string | null;
  author: string | null;
  tags: string[] | null;
  published_at: string | null;
}

function mapRowToBlogPost(row: SupabasePostRow): BlogPost {
  let contentParagraphs: string[] = [];
  if (Array.isArray(row.content)) {
    contentParagraphs = row.content as string[];
  } else if (
    typeof row.content === 'object' &&
    row.content !== null &&
    'paragraphs' in row.content &&
    Array.isArray((row.content as Record<string, unknown>).paragraphs)
  ) {
    contentParagraphs = (row.content as { paragraphs: string[] }).paragraphs;
  } else if (typeof row.content === 'string') {
    contentParagraphs = row.content.split('\n\n').filter(Boolean);
  }

  const tagList = row.tags || [];
  const primaryCategory = tagList.length > 0 ? tagList[0] : 'VIP Escorts';

  return {
    slug: row.slug,
    title: row.title,
    category: primaryCategory,
    excerpt: row.excerpt || '',
    date: row.published_at ? row.published_at.split('T')[0] : '2026-01-01',
    readTime: `${Math.max(3, Math.ceil(contentParagraphs.join(' ').length / 800))} min read`,
    image: getAssetUrl(row.cover_image || '/images/assets/Benefits_of_Booking_Through_a_Professional_Escort_.jpg'),
    author: row.author || 'ALINA VIP India',
    tags: tagList,
    content: contentParagraphs,
    views: '3.5k',
  };
}

/**
 * Fetch all published posts for the current site
 * Automatically cached with ISR (revalidates on webhook or every 24h)
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  if (!SUPABASE_URL || !ANON_KEY) {
    return fallbackPosts;
  }

  try {
    const postsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?sites.slug=eq.${encodeURIComponent(SITE_SLUG)}&status=eq.published&order=published_at.desc&select=*,sites!inner(slug)`,
      {
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
        },
        next: { revalidate: 86400, tags: ['blog-posts'] },
      }
    );

    if (!postsRes.ok) {
      return fallbackPosts;
    }

    const rows: SupabasePostRow[] = await postsRes.json();
    if (!rows || rows.length === 0) {
      return fallbackPosts;
    }

    return rows.map(mapRowToBlogPost);
  } catch {
    // Graceful fallback to static files on any network error
    return fallbackPosts;
  }
}

/**
 * Fetch a single published post by slug with site isolation
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!SUPABASE_URL || !ANON_KEY) {
    return fallbackPosts.find(p => p.slug === slug) || null;
  }

  try {
    const postRes = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(slug)}&sites.slug=eq.${encodeURIComponent(SITE_SLUG)}&status=eq.published&select=*,sites!inner(slug)`,
      {
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
        },
        next: { revalidate: 86400, tags: [`blog-${slug}`] },
      }
    );

    if (postRes.ok) {
      const rows: SupabasePostRow[] = await postRes.json();
      if (rows && rows.length > 0) {
        return mapRowToBlogPost(rows[0]);
      }
    }
  } catch {
    // Fall back to local
  }

  return fallbackPosts.find(p => p.slug === slug) || null;
}
