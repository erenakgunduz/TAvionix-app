import getSession from '@/utils/supabase/get-session';
import AccountForm from '../../components/AccountForm/AccountForm';

export default async function Account() {
  const session = await getSession();

  return (
    <>
      <h2>Edit profile</h2>
      <AccountForm session={session} />
    </>
  );
}
