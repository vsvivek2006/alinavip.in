import { NextRequest, NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/admin/aiBlogGenerator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.topic || !body.focusKeyword) {
      return NextResponse.json({ error: 'topic and focusKeyword are required' }, { status: 400 });
    }

    const generated = await generateBlogPost({
      siteName: body.siteName || 'ALINA VIP',
      domain: body.domain || 'alinavip.in',
      topic: body.topic,
      focusKeyword: body.focusKeyword,
      secondaryKeywords: body.secondaryKeywords,
      wordCount: body.wordCount || 1000,
      apiKey: body.apiKey,
      provider: body.provider,
    });

    return NextResponse.json({ blog: generated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'AI generation failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
