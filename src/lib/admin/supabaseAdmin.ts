/**
 * Server-side Supabase Admin Client for Multi-Tenant Blog Operations
 * Uses Service Role Key to bypass RLS for administrative CRUD across all 5 sister sites.
 */

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pmhzuqaczgctmzjpslpg.supabase.co').replace(/\/+$/, '');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtaHp1cWFjemdjdG16anBzbHBnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4OTY0MjAyMywiZXhwIjoyMTA1MjE4MDIzfQ.g4KCNHLY0jZUEhGEdsheF5OXzWvR4txkdc493tWa-8g';

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
  const headers: Record<string, string> = {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  };
  if (prefer) headers['Prefer'] = prefer;
  return headers;
}

export const DEFAULT_SITES: SiteTenant[] = [
  {
    id: '78659428-7273-41e8-9758-fd0ac895a2db',
    slug: 'alinavip-in',
    name: 'ALINA VIP India',
    domain: 'alinavip.in',
    revalidate_url: 'https://alinavip.in/api/revalidate',
    revalidate_secret: 'alina_isr_secret_2026',
  },
  {
    id: '4635a82b-3613-42dc-9bd0-f0ba0745d934',
    slug: 'alinavip-com',
    name: 'ALINA VIP International',
    domain: 'alinavip.com',
    revalidate_url: 'https://alinavip.com/api/revalidate',
    revalidate_secret: 'alina_isr_secret_2026',
  },
  {
    id: '53d69ffc-8079-473a-93f4-2aecaf061844',
    slug: 'escort-alinavip-com',
    name: 'ALINA VIP Escorts',
    domain: 'escort.alinavip.com',
    revalidate_url: 'https://escort.alinavip.com/api/revalidate',
    revalidate_secret: 'alina_isr_secret_2026',
  },
  {
    id: 'c838e55e-cb70-4f51-b855-84959db62c97',
    slug: 'aerocityescortservice-site',
    name: 'Aerocity Escort Service',
    domain: 'aerocityescortservice.site',
    revalidate_url: 'https://aerocityescortservice.site/api/revalidate',
    revalidate_secret: 'alina_isr_secret_2026',
  },
  {
    id: 'f9460592-3bc3-4886-90c0-671e355cfa79',
    slug: 'gurgaonescortservice-site',
    name: 'Gurgaon Escort Service',
    domain: 'gurgaonescortservice.site',
    revalidate_url: 'https://gurgaonescortservice.site/api/revalidate',
    revalidate_secret: 'alina_isr_secret_2026',
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
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?site_id=eq.${encodeURIComponent(siteId)}&order=created_at.desc`,
      {
        headers: getHeaders(),
        cache: 'no-store',
      }
    );
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error('[supabaseAdmin] getPostsForSite error:', err);
    return [];
  }
}

/**
 * Fetch a single post by ID
 */
export async function getPostById(postId: string): Promise<BlogPostRecord | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?id=eq.${encodeURIComponent(postId)}&select=*`,
      {
        headers: getHeaders(),
        cache: 'no-store',
      }
    );
    if (!res.ok) return null;
    const rows = await res.json();
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error('[supabaseAdmin] getPostById error:', err);
    return null;
  }
}

/**
 * Create a new post
 */
export async function createPost(postData: Omit<BlogPostRecord, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPostRecord> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
    method: 'POST',
    headers: getHeaders('return=representation'),
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create post (${res.status}): ${errorText}`);
  }

  const rows = await res.json();
  return rows[0];
}

/**
 * Update an existing post
 */
export async function updatePost(postId: string, updates: Partial<BlogPostRecord>): Promise<BlogPostRecord> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${encodeURIComponent(postId)}`, {
    method: 'PATCH',
    headers: getHeaders('return=representation'),
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update post (${res.status}): ${errorText}`);
  }

  const rows = await res.json();
  return rows[0];
}

/**
 * Delete a post by ID
 */
export async function deletePost(postId: string): Promise<boolean> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${encodeURIComponent(postId)}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });

  return res.ok;
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
    await updatePost(postId, {
      status: 'published',
      published_at: new Date().toISOString(),
    });

    // 3. Fire on-demand ISR revalidation webhook on target site
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
