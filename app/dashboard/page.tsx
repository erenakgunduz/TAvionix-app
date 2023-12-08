import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  let accountError: string | null = null;

  if (!user) accountError = 'Could not get user';
  if (accountError) throw new Error(accountError);

  const account = await supabase
    .from('profiles')
    .select('first_name, last_name, profile_type, department')
    .eq('id', user!.id)
    .single();

  return redirect(`/dashboard/${account.data?.profile_type}`);
}
