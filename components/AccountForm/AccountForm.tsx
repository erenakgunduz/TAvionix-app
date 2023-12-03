/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-throw-literal */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
// import { Database } from '../database.types';

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClient(); // docs had <Database> type
  const [loading, setLoading] = useState(true);
  const [first_name, setFirstName] = useState<string | null>(null);
  const [last_name, setLastName] = useState<string | null>(null);
  const [profile_type, setProfileType] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select('first_name, last_name, profile_type, avatar_url')
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setProfileType(data.profile_type);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  interface ProfileProps {
    first_name: string | null;
    last_name: string | null;
    profile_type: string | null;
    avatar_url: string | null;
  }

  async function updateProfile({ first_name, last_name, profile_type, avatar_url }: ProfileProps) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        first_name,
        last_name,
        profile_type,
        avatar_url,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session?.user.email} disabled />
      </div>
      <div>
        <label htmlFor="first-name">First Name</label>
        <input
          id="first-name"
          type="text"
          value={first_name || ''}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last Name</label>
        <input
          id="last-name"
          type="text"
          value={last_name || ''}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="user-type">User Type</label>
        <input
          id="user-type"
          type="url"
          value={profile_type || ''}
          onChange={(e) => setProfileType(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          type="button"
          onClick={() => updateProfile({ first_name, last_name, profile_type, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action="/auth/logout" method="post">
          <button className="button block" type="submit">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
