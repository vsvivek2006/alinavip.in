import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get('alina_admin_session');
  const isAuthenticated = session?.value === 'authenticated';

  // 1. Protect all /api/admin/* endpoints except /api/admin/auth
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth')) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required' },
        { status: 401 }
      );
    }
  }

  // 2. Protect all /admin UI routes except /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Redirect authenticated users away from /admin/login to /admin dashboard
  if (pathname === '/admin/login') {
    if (isAuthenticated) {
      const adminUrl = new URL('/admin', req.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
