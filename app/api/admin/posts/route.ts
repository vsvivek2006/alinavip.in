import { NextRequest, NextResponse } from 'next/server';
import { getPostsForSite, createPost } from '@/lib/admin/supabaseAdmin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get('siteId') || process.env.NEXT_PUBLIC_SITE_SLUG || 'alinavip-in';

    const posts = await getPostsForSite(siteId);
    return NextResponse.json({ posts });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch posts';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.site_id || !body.title || !body.slug) {
      return NextResponse.json({ error: 'site_id, title, and slug are required' }, { status: 400 });
    }

    const post = await createPost({
      site_id: body.site_id,
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt || '',
      content: body.content || [],
      cover_image: body.cover_image || null,
      author: body.author || 'Editorial Team',
      status: body.status || 'draft',
      ai_generated: !!body.ai_generated,
      seo_title: body.seo_title || body.title,
      seo_description: body.seo_description || body.excerpt || '',
      tags: body.tags || [],
      published_at: body.status === 'published' ? new Date().toISOString() : null,
    });

    return NextResponse.json({ post });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create post';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
