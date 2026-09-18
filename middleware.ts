import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/login and auth API
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = req.cookies.get('alina_admin_session');
    if (!session || session.value !== 'authenticated') {
      const loginUrl = new URL('/admin/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from /admin/login to /admin dashboard
  if (pathname === '/admin/login') {
    const session = req.cookies.get('alina_admin_session');
    if (session && session.value === 'authenticated') {
      const adminUrl = new URL('/admin', req.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
