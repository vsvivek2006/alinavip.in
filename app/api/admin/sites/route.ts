import { NextResponse } from 'next/server';
import { getAllSites } from '@/lib/admin/supabaseAdmin';

export async function GET() {
  try {
    const sites = await getAllSites();
    // SECURITY: Sanitize sensitive server-side revalidation secrets before sending to client
    const clientSafeSites = sites.map(({ id, slug, name, domain, created_at }) => ({
      id,
      slug,
      name,
      domain,
      created_at,
    }));
    return NextResponse.json({ sites: clientSafeSites });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch sites';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
