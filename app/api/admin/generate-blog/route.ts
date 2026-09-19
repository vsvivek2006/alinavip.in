import { NextRequest, NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/admin/aiBlogGenerator';

export async function GET() {
  return NextResponse.json({
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    hasGroqKey: Boolean(process.env.GROQ_API_KEY),
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.topic || !body.focusKeyword) {
      return NextResponse.json({ error: 'Topic and Focus Keyword are required to generate an article.' }, { status: 400 });
    }

    const generated = await generateBlogPost({
      siteName: body.siteName || 'ALINA VIP',
      domain: body.domain || 'alinavip.in',
      topic: body.topic,
      focusKeyword: body.focusKeyword,
      secondaryKeywords: body.secondaryKeywords,
      wordCount: body.wordCount || 1200,
      apiKey: body.apiKey,
      provider: body.provider,
      model: body.model,
    });

    return NextResponse.json({ blog: generated });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'AI generation failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
