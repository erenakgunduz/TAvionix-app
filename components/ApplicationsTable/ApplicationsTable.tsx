'use client';

import {
  Table,
  TableScrollContainer,
  TableTr,
  TableTd,
  TableThead,
  TableTh,
  TableTbody,
  Button,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';
import getErrorMessage from '@/utils/error-message';
// import classes from './TableReviews.module.css';

// { data, error }
export default function ApplicationsTable({ data }: ApplicationsTableProps) {
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

  if (data?.length! < 1) return <div>No applications found</div>;

  const rows = data?.map((row) => (
    <TableTr key={row.id}>
      <TableTd>{new Date(row.created_at!).toDateString()}</TableTd>
      <TableTd>{row.description}</TableTd>
      <TableTd>{row.status}</TableTd>
      <TableTd>
        {row.status === 'Selected' && (
          <>
            <Button onClick={() => handleClick('Accepted', row.id!)} size="xs">
              Accept
            </Button>
            <Button onClick={() => handleClick('Withdrew', row.id!)} size="xs" color="red">
              Withdraw
            </Button>
          </>
        )}
      </TableTd>
    </TableTr>
  ));

  return (
    <TableScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <TableThead>
          <TableTr>
            <TableTh>Date applied</TableTh>
            <TableTh>Position</TableTh>
            <TableTh>Status</TableTh>
            <TableTh>Action</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </TableScrollContainer>
  );
}
