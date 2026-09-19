import dns from 'dns';
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (err) {
  void err;
}

import { cache } from 'react';
import { blogPosts as fallbackPosts, BlogPost } from '@/data/blogs';
import { getAssetUrl } from '@/lib/assets';
import { getLocalPostBySlug, getLocalPosts } from '@/lib/admin/localPostsStore';
import type { BlogPostRecord } from '@/lib/admin/supabaseAdmin';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// alinavip.in's own site_id — filters posts to this tenant only
const SITE_ID = '4635a82b-3613-42dc-9bd0-f0ba0745d934';

// High-speed In-Memory TTL Cache
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

let postsListCache: CacheEntry<BlogPost[]> | null = null;
const postBySlugCache = new Map<string, CacheEntry<BlogPost | null>>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds memory TTL

/**
 * On-demand cache invalidator
 * Called on post create, update, delete, or revalidate webhook
 */
export function invalidateBlogCache(slug?: string): void {
  postsListCache = null;
  if (slug) {
    postBySlugCache.delete(slug.toLowerCase().trim());
  } else {
    postBySlugCache.clear();
  }
}

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
 * Fetch all published posts with:
 * 1. React cache() memoization per render pass
 * 2. 60-second in-memory TTL caching
 * 3. Local persistent store fallback
 * 4. Supabase REST query
 */
export const getPublishedBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const now = Date.now();
  if (postsListCache && now - postsListCache.timestamp < CACHE_TTL_MS) {
    return postsListCache.data;
  }

  // Filter local posts to this site only
  const localList = getLocalPosts()
    .filter(p => !p.site_id || p.site_id === SITE_ID)
    .map(mapRowToBlogPost);

  if (!SUPABASE_URL || !ANON_KEY) {
    const combined = [...localList, ...fallbackPosts];
    const seen = new Set<string>();
    const result = combined.filter(p => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    });
    postsListCache = { data: result, timestamp: now };
    return result;
  }

  try {
    const postsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?site_id=eq.${encodeURIComponent(SITE_ID)}&status=eq.published&order=published_at.desc&select=*`,
      {
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${ANON_KEY}`,
        },
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
        const result = Array.from(map.values());

        // Warm up both list and individual slug caches
        postsListCache = { data: result, timestamp: now };
        result.forEach(post => {
          postBySlugCache.set(post.slug.toLowerCase(), { data: post, timestamp: now });
        });

        return result;
      }
    }
  } catch (err) {
    console.warn('[supabaseBlog] Remote fetch fallback to local:', err);
  }

  const combined = [...localList, ...fallbackPosts];
  const seen = new Set<string>();
  const fallbackResult = combined.filter(p => {
    if (seen.has(p.slug)) return false;
    seen.add(p.slug);
    return true;
  });

  postsListCache = { data: fallbackResult, timestamp: now };
  return fallbackResult;
});

/**
 * Fetch a single post by slug with:
 * 1. React cache() memoization
 * 2. 60-second in-memory TTL caching
 * 3. Local persistent store (instant 0ms)
 * 4. Supabase REST query
 * 5. Fallback catalog
 */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const cleanSlug = slug.toLowerCase().trim();
  const now = Date.now();

  // 1. Check in-memory TTL cache
  const cached = postBySlugCache.get(cleanSlug);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // 2. Check local persistent store first — must belong to this site
  const localPost = getLocalPostBySlug(cleanSlug);
  if (localPost && (!localPost.site_id || localPost.site_id === SITE_ID)) {
    const post = mapRowToBlogPost(localPost);
    postBySlugCache.set(cleanSlug, { data: post, timestamp: now });
    return post;
  }

  // 3. Query Supabase
  if (SUPABASE_URL && ANON_KEY) {
    try {
      const postRes = await fetch(
        `${SUPABASE_URL}/rest/v1/posts?slug=eq.${encodeURIComponent(cleanSlug)}&site_id=eq.${encodeURIComponent(SITE_ID)}&select=*`,
        {
          headers: {
            apikey: ANON_KEY,
            Authorization: `Bearer ${ANON_KEY}`,
          },
          signal: AbortSignal.timeout(3000),
        }
      );

      if (postRes.ok) {
        const rows: SupabasePostRow[] = await postRes.json();
        if (rows && rows.length > 0) {
          const post = mapRowToBlogPost(rows[0]);
          postBySlugCache.set(cleanSlug, { data: post, timestamp: now });
          return post;
        }
      }
    } catch {
      // Ignore network timeout and fall back to local data
    }
  }

  // 4. Check hardcoded fallback catalog
  const fallback = fallbackPosts.find(p => p.slug.toLowerCase() === cleanSlug) || null;
  postBySlugCache.set(cleanSlug, { data: fallback, timestamp: now });
  return fallback;
});
