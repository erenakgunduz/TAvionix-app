'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import getErrorMessage from '../error-message';
import { createClient } from '../supabase/server';

export default async function submitApplication(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  const applicant_first_name = String(formData.get('first-name'));
  const applicant_last_name = String(formData.get('last-name'));
  const applicant_major = String(formData.get('major'));
  const applicant_gpa = Number(formData.get('gpa'));
  const resume_url = String(formData.get('resume-url'));
  const past_experience = JSON.stringify(String(formData.get('past-experience')).split(','));
  const appliedPositions = String(formData.get('applied-positions')).split(',');
  const status = 'In review';

  try {
    appliedPositions.forEach(async (position) => {
      const { error } = await supabase.from('applications').insert({
        created_at: new Date().toISOString(),
        applicant_id: user?.id as string,
        position_id: Number(position),
        applicant_first_name,
        applicant_last_name,
        applicant_major,
        applicant_gpa,
        resume_url,
        past_experience,
        status,
      });
      if (error) throw new Error(error.message);
    });

    revalidatePath('/apply');
    return 'Application submitted!';
  } catch (err) {
    return getErrorMessage(err);
  }
}
