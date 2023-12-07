import { Anchor, Skeleton } from '@mantine/core';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';
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
      <h3>Hi {data?.first_name ?? session?.user.email}! You can update your profile here.</h3>
      <Suspense fallback={<Skeleton />}>
        <AccountForm accountData={data} error={accountError} />
      </Suspense>
      <ul>
        <li>
          <Anchor component={Link} href="/account/update-email">
            Update email
          </Anchor>
        </li>
        <li>
          <Anchor component={Link} href="/account/update-password">
            Update password
          </Anchor>
        </li>
      </ul>
    </>
  );
}
