import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = ['/dashboard', '/bookings', '/profile'];

// Define public routes
const publicRoutes = ['/login', '/register', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  
  // Check if user has auth token in cookies (we'll use localStorage but can add cookie support)
  // For now, we'll rely on client-side protection in components
  // This middleware can be enhanced later with actual token validation

  // Allow all requests for now, protection is handled client-side
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

