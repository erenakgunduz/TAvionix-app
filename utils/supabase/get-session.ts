import { cookies } from 'next/headers';
import { createClient } from './server';

export default async function getSession() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
