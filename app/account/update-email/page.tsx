import getSession from '@/utils/supabase/get-session';

export default async function UpdateEmail() {
  const session = await getSession();
  return <div>Update Email</div>;
}
