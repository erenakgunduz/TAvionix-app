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

interface InstructorTableProps {
  data:
    | {
        first_name: string | null;
        id: string | null;
        instructor_id: string | null;
        last_name: string | null;
        semester: string | null;
        title: string | null;
        tp_id: number | null;
      }[]
    | null;
  // error: unknown;
}

export default function InstructorTable({ data }: InstructorTableProps) {
  const rows = data?.map((row) => (
    <TableTr key={row.tp_id}>
      <TableTd>
        {row.first_name} {row.last_name}
      </TableTd>
      <TableTd>{row.title}</TableTd>
      <TableTd>{row.semester}</TableTd>
      <TableTd>
        <form action={`/dashboard/instructor/evaluate/${row.tp_id}`}>
          <Button type="submit" size="xs">
            Evaluate
          </Button>
        </form>
      </TableTd>
    </TableTr>
  ));

  return (
    <TableScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <TableThead>
          <TableTr>
            <TableTh>TA Name</TableTh>
            <TableTh>Course</TableTh>
            <TableTh>Semester</TableTh>
            <TableTh>Action</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>{rows}</TableTbody>
      </Table>
    </TableScrollContainer>
  );
}
