import AccountForm from '@/components/AccountForm/AccountForm';
import getSession from '@/utils/supabase/get-session';

export default async function Account() {
  const session = await getSession();

  return (
    <>
      <h2>Edit profile</h2>
      <AccountForm session={session} />
    </>
  );
}
