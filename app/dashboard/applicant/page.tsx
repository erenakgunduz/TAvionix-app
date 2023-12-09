import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@mantine/core';
import { createClient } from '@/utils/supabase/server';
import getErrorMessage from '@/utils/error-message';
import ApplicationsTable from '@/components/ApplicationsTable/ApplicationsTable';

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

  if (account.data?.profile_type !== 'applicant') {
    redirect(`/dashboard/${account.data?.profile_type}`);
  }

  if (account.error) accountError = getErrorMessage(account.error);
  if (accountError) throw new Error(accountError);

  // const { data, error } = await supabase
  const { data } = await supabase
    .from('user_applications')
    .select('*')
    .eq('applicant_id', user!.id);

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <Group justify="space-between">
        <Button component={Link} href="/apply">
          New application
        </Button>
        <Button component={Link} href="/account">
          My account
        </Button>
      </Group>
      <Divider /> */}
      <h2>Your applications</h2>
      <Suspense fallback={<Skeleton />}>
        {/* <ApplicationsTable data={data} error={error} /> */}
        <ApplicationsTable data={data} />
      </Suspense>
    </>
  );
}
