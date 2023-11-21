import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function middleware(req, ev) {
  const token = req.cookies.get('token')?.value;

  if (token) {
    const { role: userRoles } =
      jwtDecode(token, process.env.NEXT_PUBLIC_JWT_SECRET) || {};

    const requiredRoles = [
      'PAUSER_ROLE',
      'UPGRADER_ROLE',
      'DEFAULT_ADMIN_ROLE',
      'WEB_ADMIN',
      'SUPER_WEBADMIN',
    ];

    const hasRequiredRole = userRoles.some((role) =>
      requiredRoles.includes(role),
    );

    if (!hasRequiredRole) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: '/admin/:path*',
};
