import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'alina-vip-admin-2026';
const COOKIE_NAME = 'alina_admin_session';

export async function POST(req: NextRequest) {
  try {
    const { passkey } = await req.json();
    if (!passkey || passkey !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Invalid passkey' }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Auth failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  const isAuthenticated = !!session && session.value === 'authenticated';
  return NextResponse.json({ authenticated: isAuthenticated });
}
