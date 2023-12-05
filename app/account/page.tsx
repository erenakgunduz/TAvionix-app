import Link from 'next/link';
import AccountForm from '@/components/AccountForm/AccountForm';
import getSession from '@/utils/supabase/get-session';

export default async function Account() {
  const session = await getSession();

  return (
    <>
      <h2>Account</h2>
      <h3>
        Hi {session?.user.user_metadata.first_name ?? session?.user.email}! You can update your
        profile here.
      </h3>
      <AccountForm session={session} />
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
