import { Skeleton } from '@mantine/core';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import CommitteeApplicationsList from '@/components/CommiteeApplicationsList/CommitteeApplicationsList';
import getErrorMessage from '@/utils/error-message';
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

  const account = await supabase
    .from('profiles')
    .select('first_name, last_name, profile_type, department')
    .eq('id', user!.id)
    .single();

  if (account.data?.profile_type !== 'committee') {
    redirect(`/dashboard/${account.data?.profile_type}`);
  }

  if (account.error) accountError = getErrorMessage(account.error);
  if (accountError) throw new Error(accountError);

  // const { data, error } = await supabase
  const { data } = await supabase.from('user_applications').select('*').eq('status', 'Recommended');

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Suspense fallback={<Skeleton />}>
        <CommitteeApplicationsList data={data} />
      </Suspense>
    </>
  );
}
