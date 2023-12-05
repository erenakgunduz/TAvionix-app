import getURL from '@/url';
import { createClient } from './supabase/client';

export default async function handleGithub() {
  const supabase = createClient();
  return supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: `${getURL()}auth/callback` },
  });
}
