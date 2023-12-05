import getSession from '@/utils/supabase/get-session';

export default async function UpdatePassword() {
  const session = await getSession();
  return <div>Update Password</div>;
}
