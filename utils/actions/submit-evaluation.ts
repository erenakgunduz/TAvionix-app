'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { createClient } from '../supabase/server';
import getErrorMessage from '../error-message';

export default async function submitEvaluation(formData: FormData, id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();
  // const user = session?.user;
  const evaluation = String(formData.get('evaluation'));
  try {
    const { error } = await supabase
      .from('ta_positions')
      .update({ ta_evaluation: evaluation })
      .eq('id', id);
    if (error) throw new Error(error.message);

    revalidatePath(`/dashboard/instructor/evaluate/${id}`);
    return 'Evaluation submitted!';
  } catch (err) {
    return getErrorMessage(err);
  }
}
