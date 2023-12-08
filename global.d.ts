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
}
