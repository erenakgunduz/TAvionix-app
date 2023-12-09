'use client';

import { Button, Divider } from '@mantine/core';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';
import getErrorMessage from '@/utils/error-message';
// import classes from './TableReviews.module.css';

// { data, error }
export default function StaffApplicationsList({ data }: ApplicationsTableProps) {
  const router = useRouter();

  const handleClick = async (newStatus: string, id: number) => {
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) throw new Error(error.message);
      toast.success('Status updated!');
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (data?.length! < 1) return <div>No applications to review</div>;

  const rows = data?.map((row) => (
    <div key={row.id}>
      <p>Date applied: {new Date(row.created_at!).toDateString()}</p>
      <p>Description: {row.description}</p>
      <p>Applicant first name: {row.applicant_first_name}</p>
      <p>Applicant last name: {row.applicant_last_name}</p>
      <p>Applicant major: {row.applicant_major}</p>
      <p>Applicant GPA: {row.applicant_gpa}</p>
      <p>Resume URL: {row.resume_url}</p>
      <p>Previous experience: {row.past_experience}</p>
      <p>Status: {row.status}</p>
      <Divider />
      <p>
        {row.status === 'In review' && (
          <>
            <Button onClick={() => handleClick('Recommended', row.id!)} size="xs">
              Recommend
            </Button>
            <Button onClick={() => handleClick('Rejected', row.id!)} size="xs" color="red">
              Reject
            </Button>
          </>
        )}
      </p>
      <Divider />
    </div>
  ));

  return rows;
}
