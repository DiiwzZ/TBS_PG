import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/booking',
  '/bookings/active',
  '/bookings/history',
  '/bookings/[id]',
  '/bookings/[id]/qr',
  '/booking/[id]/payment',
  '/booking/[id]/payment/success',
  '/profile',
];

// Define public routes (for clarity, though logic below focuses on blocking protected ones)
const publicRoutes = [
  '/login',
  '/register',
  '/',
  '/zones',
  '/zones/[id]',
  '/policies/no-show',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  // Note: Simple startsWith check might be too broad for dynamic routes, 
  // but for this structure it works as most protected features are under specific paths.
  const isProtectedRoute = protectedRoutes.some((route) => {
    // Handle dynamic routes pattern matching simply
    if (route.includes('[id]')) {
      const baseRoute = route.split('/[id]')[0];
      return pathname.startsWith(baseRoute);
    }
    return pathname.startsWith(route);
  });
  
  // If it's a protected route, we could check for a token in cookies here.
  // Since we use localStorage for this demo, we can't strictly enforce auth in middleware
  // without moving token storage to cookies.
  // For now, we rely on client-side checks (useAuthStore) which we implemented in the pages.
  // This middleware serves as a placeholder for future server-side protection.

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
