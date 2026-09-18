import { NextRequest, NextResponse } from 'next/server';
import { publishAndRevalidatePost } from '@/lib/admin/supabaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 });
    }

    const result = await publishAndRevalidatePost(postId);
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Failed to publish post' }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Publish error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
