import { createClient } from './supabase/client';

export default async function handleGithub() {
  const supabase = createClient();
  return supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
}
