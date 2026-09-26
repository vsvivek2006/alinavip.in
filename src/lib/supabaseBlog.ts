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

export interface BlogPostRecord {
  id: string;
  site_id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: unknown;
  cover_image: string | null;
  author: string | null;
  tags: string[] | null;
  published_at?: string | null;
  status?: string;
}

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pmhzuqaczgctmzjpslpg.supabase.co').replace(/\/+$/, '');
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtaHp1cWFjemdjdG16anBzbHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NDIwMjMsImV4cCI6MjEwNTIxODAyM30.OAKCM-PVu5McvV2jyus6RdwgErZpWkbTSwx2bSncP1M';
const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || '4635a82b-3613-42dc-9bd0-f0ba0745d934';

// High-speed In-Memory TTL Cache
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

let postsListCache: CacheEntry<BlogPost[]> | null = null;
const postBySlugCache = new Map<string, CacheEntry<BlogPost | null>>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5-minute memory TTL

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
  const tagList = (row.tags || []).map((t: string) => purgeCompanionWords(t));
  const primaryCategory = tagList.length > 0 ? tagList[0] : 'VIP Escorts';

  // Use today's date as fallback so newly published posts show correct date
  const todayDate = new Date().toISOString().split('T')[0];

  return {
    slug: row.slug,
    title: purgeCompanionWords(row.title || 'Elite Escort Service Guide'),
    category: primaryCategory,
    excerpt: purgeCompanionWords(row.excerpt || ''),
    date: row.published_at ? row.published_at.split('T')[0] : todayDate,
    readTime: String(Math.max(3, Math.ceil(cleanContent.join(' ').length / 800))) + ' min read',
    image: getAssetUrl(row.cover_image || '/images/assets/Benefits_of_Booking_Through_a_Professional_Escort_.jpg'),
    author: row.author || 'VIP Editorial Desk',
    tags: tagList,
    content: cleanContent,
    views: '3.5k',
  };
}

export const getPublishedBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const now = Date.now();
  if (postsListCache && now - postsListCache.timestamp < CACHE_TTL_MS) {
    return postsListCache.data;
  }

  const localList = getLocalPosts()
    .filter(p => p.site_id === SITE_ID && p.status === 'published')
    .map(mapRowToBlogPost);

  // During build phase, use instant local data to prevent socket hang up / ECONNRESET
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || process.env.CI === '1';
  if ((isBuildPhase && localList.length > 0) || !SUPABASE_URL || !ANON_KEY) {
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
      SUPABASE_URL + '/rest/v1/posts?site_id=eq.' + encodeURIComponent(SITE_ID) + '&status=eq.published&order=published_at.desc&select=id,slug,title,excerpt,cover_image,author,tags,published_at',
      {
        headers: {
          apikey: ANON_KEY,
          Authorization: 'Bearer ' + ANON_KEY,
        },
        signal: AbortSignal.timeout(8000),
        next: { revalidate: 3600 },
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

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!slug) return null;
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim().replace(/^\/+|\/+$/g, '');
  const now = Date.now();

  // 1. Check in-memory TTL cache
  const cached = postBySlugCache.get(cleanSlug);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  // 2. Check local persistent store first (instant, works offline, zero network delay)
  // SECURITY: Only serve published posts strictly belonging to this site
  const localPost = getLocalPostBySlug(cleanSlug);
  if (localPost && localPost.site_id === SITE_ID && localPost.status === 'published') {
    const post = mapRowToBlogPost(localPost);
    postBySlugCache.set(cleanSlug, { data: post, timestamp: now });
    return post;
  }

  // 3. Query Supabase with retry and resilient 8s timeout
  // SECURITY: Only return published posts to prevent draft URL leakage
  if (SUPABASE_URL && ANON_KEY) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const postRes = await fetch(
          SUPABASE_URL + '/rest/v1/posts?slug=eq.' + encodeURIComponent(cleanSlug) + '&site_id=eq.' + encodeURIComponent(SITE_ID) + '&status=eq.published&select=*',
          {
            headers: {
              apikey: ANON_KEY,
              Authorization: 'Bearer ' + ANON_KEY,
            },
            signal: AbortSignal.timeout(8000),
          }
        );

        if (postRes.ok) {
          const rows: SupabasePostRow[] = await postRes.json();
          if (rows && rows.length > 0) {
            const post = mapRowToBlogPost(rows[0]);
            postBySlugCache.set(cleanSlug, { data: post, timestamp: now });
            return post;
          } else {
            break;
          }
        }
      } catch (err) {
        console.warn('[supabaseBlog] Attempt ' + attempt + ' fetch error for slug "' + cleanSlug + '":', err);
        if (attempt < 2) await new Promise(r => setTimeout(r, 250));
      }
    }
  }

  // 4. Check hardcoded fallback catalog
  const fallback = fallbackPosts.find(p => p.slug.toLowerCase() === cleanSlug) || null;
  if (fallback) {
    postBySlugCache.set(cleanSlug, { data: fallback, timestamp: now });
  }
  return fallback;
});
