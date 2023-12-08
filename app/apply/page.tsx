import { Skeleton } from '@mantine/core';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import ApplyForm from '@/components/ApplyForm/ApplyForm';
import getErrorMessage from '@/utils/error-message';
import { createClient } from '@/utils/supabase/server';

export default async function Apply() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  let accountError: string | null = null;

  if (!user) accountError = 'Could not get user';

  const account = await supabase
    .from('profiles')
    .select('first_name, last_name, profile_type, department')
    .eq('id', user!.id)
    .single();

  if (account.data?.profile_type !== 'applicant') redirect('/dashboard');
  if (account.error) accountError = getErrorMessage(account.error);

  const positions = await supabase.from('open_ta_positions').select('*');
  const positionsError = positions.error && getErrorMessage(positions.error);

  const data = {
    accountData: account.data,
    positionsData: positions.data,
  };
  const errors = [accountError, positionsError];

  return (
    <>
      <h2>Apply</h2>
      <h3>
        Hi {account.data?.first_name ?? session?.user.email}! You can fill in your details below.
      </h3>
      <Suspense fallback={<Skeleton />}>
        <ApplyForm data={data} error={errors} />
      </Suspense>
    </>
  );
}
