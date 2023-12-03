import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
// import type { Database } from '@/lib/database.types';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const first_name = String(formData.get('first-name'));
  const last_name = String(formData.get('last-name'));
  const profile_type = String(formData.get('user-type')).toLowerCase();
  const department = String(formData.get('department'));
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));

  const cookieStore = cookies();
  const supabase = createClient(cookieStore); // docs had <Database> type here

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name, last_name, profile_type, department },
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  });

  if (!error) return NextResponse.redirect(requestUrl.origin, { status: 301 });
  return NextResponse.json({ error: error.message }, { status: error.status });
}
