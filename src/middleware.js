import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';

export async function middleware(req, ev) {
  const token = req.cookies.get('token')?.value;

  if (token) {
    try {
      const { exp, role: userRoles } = jwtDecode(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET,
      );
      // Check if token is expired
      if (exp && exp < Math.floor(Date.now() / 1000)) {
        const response = NextResponse.redirect(new URL('/', req.url));
        response.cookies.delete('token');
        response.cookies.delete('hasSigned');
        response.cookies.delete('addressHasSigned');
        return response;
      }

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
        return NextResponse.redirect(new URL('/', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL('/', req.url));
      response.cookies.delete('token');
      response.cookies.delete('hasSigned');
      response.cookies.delete('addressHasSigned');
      return response;
    }
  }

  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: '/admin/:path*',
};
