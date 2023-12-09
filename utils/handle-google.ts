import { createClient } from './supabase/client';

export default async function handleGoogle() {
  const supabase = createClient();

  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  });
}
