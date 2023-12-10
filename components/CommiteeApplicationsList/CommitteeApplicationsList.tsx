'use client';

import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Anchor,
  Button,
  Group,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';
import getErrorMessage from '@/utils/error-message';
// import classes from './TableReviews.module.css';

export default function CommitteeApplicationsList({ data }: ApplicationsTableProps) {
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
    <AccordionItem key={row.id} value="application">
      <AccordionControl>Application for {row.description}</AccordionControl>
      <AccordionPanel>
        <p>Date applied: {new Date(row.created_at!).toDateString()}</p>
        <p>Applicant first name: {row.applicant_first_name}</p>
        <p>Applicant last name: {row.applicant_last_name}</p>
        <p>Applicant major: {row.applicant_major}</p>
        <p>Applicant GPA: {row.applicant_gpa}</p>
        <Anchor href={row.resume_url!}>Resume URL</Anchor>
        <p>Previous experience: {row.past_experience as React.ReactNode}</p>
        <p>Status: {row.status}</p>
        {row.status === 'Recommended' && (
          <Group justify="flex-start">
            <Button onClick={() => handleClick('Selected', row.id!)} size="xs">
              Select
            </Button>
            <Button onClick={() => handleClick('Rejected', row.id!)} size="xs" color="red">
              Reject
            </Button>
          </Group>
        )}
      </AccordionPanel>
    </AccordionItem>
  ));

  return <Accordion variant="separated">{rows}</Accordion>;
}
