import { NextResponse } from 'next/server';
import { getAllSites } from '@/lib/admin/supabaseAdmin';

export async function GET() {
  try {
    const sites = await getAllSites();
    return NextResponse.json({ sites });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch sites';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
