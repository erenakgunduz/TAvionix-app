/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-throw-literal */

'use client';

import { useCallback, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [first_name, setFirstName] = useState<string | null>(null);
  const [last_name, setLastName] = useState<string | null>(null);
  const [profile_type, setProfileType] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      if (!user) throw new Error('Could not get user');

      const { data, error, status } = await supabase
        .from('profiles')
        .select('first_name, last_name, profile_type, department')
        .eq('id', user.id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setProfileType(data.profile_type);
        setDepartment(data.department);
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
    department: string | null;
  }

  async function updateProfile({ first_name, last_name, profile_type, department }: ProfileProps) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        first_name,
        last_name,
        profile_type,
        department,
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
        <label htmlFor="first-name">First name</label>
        <input
          id="first-name"
          type="text"
          value={first_name || ''}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last name</label>
        <input
          id="last-name"
          type="text"
          value={last_name || ''}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="user-type">User type</label>
        <input
          id="user-type"
          type="text"
          value={profile_type || ''}
          onChange={(e) => setProfileType(e.target.value)}
          disabled
        />
      </div>
      <div>
        <label htmlFor="department">Department (or major)</label>
        <input
          id="department"
          type="text"
          value={department || ''}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          type="button"
          onClick={() => updateProfile({ first_name, last_name, profile_type, department })}
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
