import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function middleware(req, ev) {
  const token = req.cookies.get('token')?.value;

  if (token) {
    const { role: userRoles } =
      jwtDecode(token, process.env.NEXT_PUBLIC_JWT_SECRET) || {};

    if (userRoles === 'USER') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: '/admin/:path*',
};
