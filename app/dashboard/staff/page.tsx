import { Skeleton } from '@mantine/core';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import getErrorMessage from '@/utils/error-message';
import { createClient } from '@/utils/supabase/server';
import StaffApplicationsList from '@/components/StaffApplicationsList/StaffApplicationsList';

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

  if (account.data?.profile_type !== 'staff') {
    redirect(`/dashboard/${account.data?.profile_type}`);
  }

  if (account.error) accountError = getErrorMessage(account.error);
  if (accountError) throw new Error(accountError);

  const { data } = await supabase.from('user_applications').select('*');

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Suspense fallback={<Skeleton />}>
        <StaffApplicationsList data={data} />
      </Suspense>
    </>
  );
}
