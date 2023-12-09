import { Database as DB } from '@/lib/database.types';

declare global {
  type Database = DB;
  interface AccountFormProps {
    accountData: {
      first_name: string | null;
      last_name: string | null;
      profile_type: string | null;
      department: string | null;
    } | null;
    error: string | null;
  }

  interface ApplyFormProps {
    data: {
      accountData: {
        first_name: string | null;
        last_name: string | null;
        profile_type: string | null;
        department: string | null;
      };
      positionsData:
        | {
            description: string | null;
            id: number | null;
            tp_id: number | null;
          }[]
        | null;
    };
    error: (string | null)[];
  }

  interface ApplicationsTableProps {
    data:
      | {
          applicant_first_name: string | null;
          applicant_gpa: number | null;
          applicant_id: string | null;
          applicant_last_name: string | null;
          applicant_major: string | null;
          c_id: number | null;
          created_at: string | null;
          description: string | null;
          id: number | null;
          past_experience: Json | null;
          resume_url: string | null;
          status: string | null;
          tp_id: number | null;
        }[]
      | null;
    // error: unknown;
  }
}
