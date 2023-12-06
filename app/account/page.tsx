import { cookies } from 'next/headers';
import Link from 'next/link';
import AccountForm from '@/components/AccountForm/AccountForm';
import getErrorMessage from '@/utils/error-message';
import { createClient } from '@/utils/supabase/server';

export default async function Account() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  let accountError: string | null = null;
  if (!user) accountError = 'Could not get user';

  const { data, error } = await supabase
    .from('profiles')
    .select('first_name, last_name, profile_type, department')
    .eq('id', user!.id)
    .single();

  if (error) accountError = getErrorMessage(error);

  return (
    <>
      <h2>Account</h2>
      <h3>
        Hi {session?.user.user_metadata.first_name ?? session?.user.email}! You can update your
        profile here.
      </h3>
      <AccountForm accountData={data} error={accountError} />
      <ul>
        <li>
          <Link href="/account/update-email">Update email</Link>
        </li>
        <li>
          <Link href="/account/update-password">Update password</Link>
        </li>
      </ul>
    </>
  );
}
