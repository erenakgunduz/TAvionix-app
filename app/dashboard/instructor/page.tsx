import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '@mantine/core';
import { createClient } from '@/utils/supabase/server';
import getErrorMessage from '@/utils/error-message';
import InstructorTable from '@/components/InstructorTable/InstructorTable';

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

  if (account.data?.profile_type !== 'instructor') {
    redirect(`/dashboard/${account.data?.profile_type}`);
  }

  if (account.error) accountError = getErrorMessage(account.error);

  const { data, error } = await supabase
    .from('ta_evaluations')
    .select('*')
    .eq('instructor_id', user!.id);

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Suspense fallback={<Skeleton />}>
        <InstructorTable data={data} error={error} />
      </Suspense>
    </>
  );
}
