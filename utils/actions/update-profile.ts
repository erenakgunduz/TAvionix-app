'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import getErrorMessage from '../error-message';
import { createClient } from '../supabase/server';

export default async function updateProfile(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  const first_name = String(formData.get('first-name'));
  const last_name = String(formData.get('last-name'));
  const profile_type = String(formData.get('user-type')).toLowerCase();
  const department = String(formData.get('department'));

  try {
    const { error } = await supabase.from('profiles').upsert({
      id: user?.id as string,
      first_name,
      last_name,
      profile_type,
      department,
      updated_at: new Date().toISOString(),
    });

    if (error) throw new Error(error.message);

    revalidatePath('/account');
    return 'Profile updated!';
  } catch (err) {
    return getErrorMessage(err);
  }
}
