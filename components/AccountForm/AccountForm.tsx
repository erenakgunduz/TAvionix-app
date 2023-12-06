'use client';

import { Button } from '@mantine/core';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface AccountFormProps {
  accountData: {
    first_name: string | null;
    last_name: string | null;
    profile_type: string | null;
    department: string | null;
  } | null;
  error: string | null;
}

export default function AccountForm({ accountData, error }: AccountFormProps) {
  const [typeEmpty, setTypeEmpty] = useState(true);

  return (
    <div>
      <form action="/auth/logout" method="post">
        <Button type="submit">Log out</Button>
      </form>
    </div>
  );
}
