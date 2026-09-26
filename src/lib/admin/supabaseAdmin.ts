import dns from 'dns';
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (err) {
  void err;
}
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';
import { saveLocalPost, getLocalPosts, deleteLocalPost } from './localPostsStore';
import { invalidateBlogCache } from '@/lib/supabaseBlog';

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pmhzuqaczgctmzjpslpg.supabase.co').replace(/\/+$/, '');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SERVICE_KEY) {
  // Admin operations will fail gracefully — local store is the fallback
  console.warn('[supabaseAdmin] SUPABASE_SERVICE_ROLE_KEY not set — admin writes will use local store only');
}

export interface SiteTenant {
  id: string;
  slug: string;
  name: string;
  domain: string;
  revalidate_url: string;
  revalidate_secret: string;
  created_at?: string;
}

export interface BlogPostRecord {
  id: string;
  site_id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string[] | Record<string, unknown> | string;
  cover_image: string | null;
  author: string;
  status: 'draft' | 'review' | 'published';
  ai_generated: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  tags: string[];
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

function getHeaders(prefer?: string) {
  if (!SERVICE_KEY) throw new Error('[supabaseAdmin] SUPABASE_SERVICE_ROLE_KEY missing — cannot make admin requests');
  const headers: Record<string, string> = {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  };
  if (prefer) headers['Prefer'] = prefer;
  return headers;
}

const DEFAULT_REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || '';

export const DEFAULT_SITES: SiteTenant[] = [
  {
    id: '4635a82b-3613-42dc-9bd0-f0ba0745d934',
    slug: 'alinavip-in',
    name: 'ALINA VIP India',
    domain: 'alinavip.in',
    revalidate_url: 'https://alinavip.in/api/revalidate',
    revalidate_secret: DEFAULT_REVALIDATE_SECRET,
  },
  {
    id: '6ad5c273-bc27-46be-bdcf-71363aabfc1a',
    slug: 'alinavip-com',
    name: 'ALINA VIP International',
    domain: 'alinavip.com',
    revalidate_url: 'https://alinavip.com/api/revalidate',
    revalidate_secret: DEFAULT_REVALIDATE_SECRET,
  },
  {
    id: '460db762-c7e2-4cfd-bc3d-5e08aa2d25c0',
    slug: 'escort-alinavip-com',
    name: 'ALINA VIP Escorts',
    domain: 'escort.alinavip.com',
    revalidate_url: 'https://escort.alinavip.com/api/revalidate',
    revalidate_secret: DEFAULT_REVALIDATE_SECRET,
  },
  {
    id: '53d69ffc-8079-473a-93f4-2aecaf061844',
    slug: 'aerocity-site',
    name: 'Aerocity Escort Service',
    domain: 'aerocityescortservice.site',
    revalidate_url: 'https://aerocityescortservice.site/api/revalidate',
    revalidate_secret: DEFAULT_REVALIDATE_SECRET,
  },
  {
    id: '78659428-7273-41e8-9758-fd0ac895a2db',
    slug: 'gurgaon-site',
    name: 'Gurgaon Escort Service',
    domain: 'gurgaonescortservice.site',
    revalidate_url: 'https://gurgaonescortservice.site/api/revalidate',
    revalidate_secret: DEFAULT_REVALIDATE_SECRET,
  },
];

/**
 * Fetch all registered tenant sites
 */
export async function getAllSites(): Promise<SiteTenant[]> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/sites?order=name.asc`, {
      headers: getHeaders(),
      cache: 'no-store',
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) throw new Error(`Failed to fetch sites: ${res.statusText}`);
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : DEFAULT_SITES;
  } catch (err) {
    console.warn('[supabaseAdmin] getAllSites using DEFAULT_SITES fallback:', err);
    return DEFAULT_SITES;
  }
}

/**
 * Fetch all posts for a specific tenant site
 */
export async function getPostsForSite(siteId: string): Promise<BlogPostRecord[]> {
  const tenant = DEFAULT_SITES.find(s => s.id === siteId || s.slug === siteId);
  const resolvedId = tenant ? tenant.id : siteId;
  const localPosts = getLocalPosts().filter(p => !resolvedId || p.site_id === resolvedId);

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?site_id=eq.${encodeURIComponent(resolvedId)}&order=created_at.desc`,
      {
        headers: getHeaders(),
        cache: 'no-store',
        signal: AbortSignal.timeout(3500),
      }
    );
    if (res.ok) {
      const remotePosts: BlogPostRecord[] = await res.json();
      const map = new Map<string, BlogPostRecord>();
      remotePosts.forEach(p => map.set(p.id, p));
      localPosts.forEach(p => map.set(p.id, p));
      return Array.from(map.values()).sort((a, b) => 
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      );
    }
  } catch (err) {
    console.warn('[supabaseAdmin] getPostsForSite remote error, using local fallback:', err);
  }

  return localPosts;
}

/**
 * Fetch a single post by ID
 */
export async function getPostById(postId: string): Promise<BlogPostRecord | null> {
  const local = getLocalPosts().find(p => p.id === postId);
  if (local) return local;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?id=eq.${encodeURIComponent(postId)}&select=*`,
      {
        headers: getHeaders(),
        cache: 'no-store',
        signal: AbortSignal.timeout(3500),
      }
    );
    if (res.ok) {
      const rows = await res.json();
      if (rows.length > 0) {
        saveLocalPost(rows[0]);
        return rows[0];
      }
    }
  } catch (err) {
    console.warn('[supabaseAdmin] getPostById remote error:', err);
  }

  return local || null;
}

/**
 * Create a new post
 */
export async function createPost(postData: Omit<BlogPostRecord, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPostRecord> {
  const newId = crypto.randomUUID();
  const now = new Date().toISOString();
  const tenant = DEFAULT_SITES.find(s => s.id === postData.site_id || s.slug === postData.site_id);
  const resolvedSiteId = tenant ? tenant.id : postData.site_id;
  const localRecord: BlogPostRecord = {
    id: newId,
    created_at: now,
    updated_at: now,
    ...postData,
    site_id: resolvedSiteId,
  };

  // Always save locally first so post is immediately live with 0ms latency
  saveLocalPost(localRecord);
  invalidateBlogCache(localRecord.slug);

  // Sync to remote Supabase
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
      method: 'POST',
      headers: getHeaders('return=representation'),
      body: JSON.stringify(localRecord),
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      const rows = await res.json();
      if (rows && rows[0]) {
        saveLocalPost(rows[0]);
        return rows[0];
      }
    } else {
      console.warn('[supabaseAdmin] Supabase remote sync warning:', await res.text());
    }
  } catch (err) {
    console.warn('[supabaseAdmin] Supabase remote sync error, post persisted locally:', err);
  }

  return localRecord;
}

/**
 * Update an existing post
 */
export async function updatePost(postId: string, updates: Partial<BlogPostRecord>): Promise<BlogPostRecord> {
  const existing = await getPostById(postId);
  const now = new Date().toISOString();

  // Normalize site_id if passed as slug
  let resolvedSiteId = updates.site_id ?? existing?.site_id ?? '';
  if (resolvedSiteId) {
    const tenant = DEFAULT_SITES.find(s => s.id === resolvedSiteId || s.slug === resolvedSiteId);
    if (tenant) resolvedSiteId = tenant.id;
  }

  const updated: BlogPostRecord = {
    ...(existing || { id: postId, site_id: '', slug: '', title: '', excerpt: null, content: [], cover_image: null, author: '', status: 'draft', ai_generated: false, tags: [] }),
    ...updates,
    site_id: resolvedSiteId,
    updated_at: now,
  };

  saveLocalPost(updated);
  invalidateBlogCache(updated.slug);

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${encodeURIComponent(postId)}`, {
      method: 'PATCH',
      headers: getHeaders('return=representation'),
      body: JSON.stringify({ ...updates, site_id: resolvedSiteId }),
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      const rows = await res.json();
      if (rows && rows[0]) {
        saveLocalPost(rows[0]);
        invalidateBlogCache(rows[0].slug);
        return rows[0];
      }
    }
  } catch (err) {
    console.warn('[supabaseAdmin] Supabase updatePost sync error:', err);
  }

  return updated;
}

/**
 * Delete a post by ID
 */
export async function deletePost(postId: string): Promise<boolean> {
  deleteLocalPost(postId);
  invalidateBlogCache();

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${encodeURIComponent(postId)}`, {
      method: 'DELETE',
      headers: getHeaders(),
      signal: AbortSignal.timeout(4000),
    });
    return res.ok;
  } catch (err) {
    console.warn('[supabaseAdmin] Supabase deletePost error:', err);
    return true;
  }
}

/**
 * Publish post and fire on-demand ISR revalidation on the target sister site
 */
export async function publishAndRevalidatePost(postId: string): Promise<{ success: boolean; revalidated: boolean; error?: string }> {
  try {
    // 1. Fetch post and its parent site
    const post = await getPostById(postId);
    if (!post) throw new Error('Post not found');

    const sites = await getAllSites();
    const site = sites.find(s => s.id === post.site_id);
    if (!site) throw new Error('Associated tenant site not found');

    // 2. Update post status to published
    // Preserve original published_at if already set, otherwise record real-time current UTC timestamp
    const publishTimestamp = post.published_at || new Date().toISOString();
    await updatePost(postId, {
      status: 'published',
      published_at: publishTimestamp,
    });

    // 3. If post belongs to this local site instance, revalidate local Next.js cache
    const currentSiteId = process.env.NEXT_PUBLIC_SITE_ID || '4635a82b-3613-42dc-9bd0-f0ba0745d934';
    if (post.site_id === currentSiteId) {
      invalidateBlogCache(post.slug);
      try {
        revalidatePath('/blog');
        revalidatePath(`/blog/${post.slug}`);
      } catch {
        // Ignore if outside request context
      }
    }

    // 4. Fire on-demand ISR revalidation webhook on target site
    let revalidated = false;
    if (site.revalidate_url && site.revalidate_secret) {
      try {
        const revalTarget = `${site.revalidate_url}?secret=${encodeURIComponent(site.revalidate_secret)}&path=/blog&slug=${encodeURIComponent(post.slug)}`;
        const revalRes = await fetch(revalTarget, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });
        revalidated = revalRes.ok;
      } catch (webhookErr) {
        console.warn(`[supabaseAdmin] Webhook ping failed for ${site.domain}:`, webhookErr);
      }
    }

    return { success: true, revalidated };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, revalidated: false, error: msg };
  }
}
