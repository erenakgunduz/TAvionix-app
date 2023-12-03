import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import AccountForm from '../../components/AccountForm/AccountForm';

export default async function Account() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <h2>Edit profile</h2>
      <AccountForm session={session} />
    </>
  );
}
