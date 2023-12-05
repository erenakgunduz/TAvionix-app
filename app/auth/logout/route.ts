import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let logoutError = null;
  if (session) {
    const { error } = await supabase.auth.signOut();
    logoutError = error;
  }
  if (!logoutError) return NextResponse.redirect(requestUrl.origin, { status: 302 });
  return NextResponse.json({ error: logoutError.message }, { status: logoutError.status });
}
