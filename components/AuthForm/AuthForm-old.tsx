'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@/utils/supabase/client';
import getURL from '@/url';
// import { Database } from './database.types';

export default function AuthForm() {
  const supabase = createClient(); // docs had <Database> type

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo={`${getURL()}auth/callback`}
    />
  );
}
