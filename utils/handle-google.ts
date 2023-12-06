import getURL from '@/url';
import { createClient } from './supabase/client';

export default async function handleGoogle() {
  const supabase = createClient();

  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${getURL()}auth/callback`,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  });
}
