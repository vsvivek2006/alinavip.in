import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * On-Demand ISR Revalidation Endpoint
 * 
 * Called by Central AI-Blog Admin Panel on post publish/update.
 * Purges Next.js cache instantly without requiring a full site rebuild.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  const path = req.nextUrl.searchParams.get('path');
  const slug = req.nextUrl.searchParams.get('slug');

  // Verify authorization secret
  const configuredSecret = process.env.REVALIDATE_SECRET;
  if (!configuredSecret || secret !== configuredSecret) {
    return NextResponse.json(
      { success: false, message: 'Invalid or missing revalidation secret.' },
      { status: 401 }
    );
  }

  try {
    // Revalidate main blog directory
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath('/blog');
    }

    // Revalidate individual blog post if specified
    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      timestamp: new Date().toISOString(),
      revalidatedPath: path || '/blog',
      revalidatedSlug: slug || null,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown revalidation error';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
