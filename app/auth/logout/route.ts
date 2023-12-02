import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
// import type { Database } from '@/lib/database.types';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore); // docs had <Database> type here

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) await supabase.auth.signOut();

  return NextResponse.redirect(requestUrl.origin, { status: 302 });
}
