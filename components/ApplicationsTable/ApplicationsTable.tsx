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
// import classes from './TableReviews.module.css';

interface ApplicationsTableProps {
  data:
    | {
        applicant_id: string | null;
        c_id: number | null;
        created_at: string | null;
        description: string | null;
        status: string | null;
        tp_id: number | null;
      }[]
    | null;
  error: any;
}

export default function ApplicationsTable({ data, error }: ApplicationsTableProps) {
  const rows = data?.map((row) => (
    <TableTr key={row.tp_id}>
      <TableTd>{new Date(row.created_at).toDateString()}</TableTd>
      <TableTd>{row.description}</TableTd>
      <TableTd>{row.status}</TableTd>
      <TableTd>
        {row.status === 'Selected' && (
          <>
            <Button size="xs">Accept</Button>
            <Button size="xs" color="red">
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
