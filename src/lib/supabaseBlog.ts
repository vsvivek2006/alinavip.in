import dns from 'dns';
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (err) {
  void err;
}

import { blogPosts as fallbackPosts, BlogPost } from '@/data/blogs';
import { getAssetUrl } from '@/lib/assets';
import { getLocalPostBySlug, getLocalPosts } from '@/lib/admin/localPostsStore';
import { BlogPostRecord } from '@/lib/admin/supabaseAdmin';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
  status?: string;
}

function purgeCompanionWords(text: string): string {
  if (!text) return '';
  return text
    .replace(/\bcompanionship\b/gi, 'escort service')
    .replace(/\bcompanions\b/gi, 'call girls')
    .replace(/\bcompanion\b/gi, 'call girl');
}

function mapRowToBlogPost(row: SupabasePostRow | BlogPostRecord): BlogPost {
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

  const cleanContent = contentParagraphs.map(p => purgeCompanionWords(p));
  const tagList = (row.tags || []).map(t => purgeCompanionWords(t));
  const primaryCategory = tagList.length > 0 ? tagList[0] : 'VIP Escorts';

  return {
    slug: row.slug,
    title: purgeCompanionWords(row.title),
    category: primaryCategory,
    excerpt: purgeCompanionWords(row.excerpt || ''),
    date: row.published_at ? row.published_at.split('T')[0] : '2026-01-01',
    readTime: `${Math.max(3, Math.ceil(cleanContent.join(' ').length / 800))} min read`,
    image: getAssetUrl(row.cover_image || '/images/assets/Benefits_of_Booking_Through_a_Professional_Escort_.jpg'),
    author: row.author || 'ALINA VIP India',
    tags: tagList,
    content: cleanContent,
    views: '3.5k',
  };
}

/**
 * Fetch all published posts for the current site
 * Checks local cache + Supabase with IPv4 priority
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const localList = getLocalPosts().map(mapRowToBlogPost);
  
  if (!SUPABASE_URL || !ANON_KEY) {
    const combined = [...localList, ...fallbackPosts];
    const seen = new Set<string>();
    return combined.filter(p => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
  }

  try {
    const postsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?status=eq.published&order=published_at.desc&select=*`,
      {
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(3000),
      }
    );

    if (postsRes.ok) {
      const rows: SupabasePostRow[] = await postsRes.json();
      if (rows && rows.length > 0) {
        const remoteList = rows.map(mapRowToBlogPost);
        const map = new Map<string, BlogPost>();
        fallbackPosts.forEach(p => map.set(p.slug, p));
        remoteList.forEach(p => map.set(p.slug, p));
        localList.forEach(p => map.set(p.slug, p));
        return Array.from(map.values());
      }
    }
  } catch (err) {
    console.warn('[supabaseBlog] Remote fetch fallback to local:', err);
  }

  const combined = [...localList, ...fallbackPosts];
  const seen = new Set<string>();
  return combined.filter(p => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });
}

/**
 * Fetch a single post by slug
 * Checks local persistent store first (0ms), then Supabase, then fallback. Never 404s on saved posts.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const cleanSlug = slug.toLowerCase().trim();

  // 1. Check local persistent store first (instant, works offline, zero IPv6 timeouts)
  const localPost = getLocalPostBySlug(cleanSlug);
  if (localPost) {
    return mapRowToBlogPost(localPost);
  }

  // 2. Query Supabase
  if (SUPABASE_URL && ANON_KEY) {
    try {
      const postRes = await fetch(
        `${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(cleanSlug)}&select=*`,
        {
          headers: {
            apikey: ANON_KEY,
            Authorization: `Bearer ${ANON_KEY}`,
          },
          cache: 'no-store',
          signal: AbortSignal.timeout(3000),
        }
      );

      if (postRes.ok) {
        const rows: SupabasePostRow[] = await postRes.json();
        if (rows && rows.length > 0) {
          return mapRowToBlogPost(rows[0]);
        }
      }
    } catch {
      // Ignore network timeout and fall back to local data
    }
  }

  // 3. Check hardcoded fallback catalog
  return fallbackPosts.find(p => p.slug.toLowerCase() === cleanSlug) || null;
}
