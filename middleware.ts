import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const realm = process.env.ADMIN_REALM || 'Admin Area';
  const user = process.env.ADMIN_USER || '';
  const pass = process.env.ADMIN_PASS || '';

  if (!user || !pass) {
    return new NextResponse('Admin credentials not configured', { status: 500 });
  }

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': `Basic realm="${realm}", charset="UTF-8"` },
    });
  }

  try {
    const base64 = authHeader.split(' ')[1] || '';
    const [providedUser, providedPass] = atob(base64).split(':');
    if (providedUser !== user || providedPass !== pass) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: { 'WWW-Authenticate': `Basic realm="${realm}", charset="UTF-8"` },
      });
    }
    return NextResponse.next();
  } catch {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': `Basic realm="${realm}", charset="UTF-8"` },
    });
  }
}
