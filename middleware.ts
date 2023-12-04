import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);
    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const authRoutes = ['/account', '/apply', '/dashboard'];

    // if session exists and the current path is / redirect the user to /dashboard
    if (session && request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL(authRoutes[2], request.url));
    }

    // if falsy/no session and the current path is an authenticated one redirect the user to /login
    if (!session && authRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

// export const config = {
//   matcher: ['/', '/account'],
// };
