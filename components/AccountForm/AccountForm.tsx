'use client';

import { Button, Group, Select, Stack, TextInput } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { departments, userTypes } from '@/lib/selector-data';
import updateProfile from '@/utils/actions/update-profile';
import getErrorMessage from '@/utils/error-message';

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
  const [loading, setLoading] = useState(true);
  const [first_name, setFirstName] = useState<string | null>(null);
  const [last_name, setLastName] = useState<string | null>(null);
  const [profile_type, setProfileType] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);

  const getProfile = useCallback(() => {
    try {
      setLoading(true);
      if (!accountData || error) {
        throw new Error(error ?? 'Error loading user data');
      } else {
        setFirstName(accountData.first_name);
        setLastName(accountData.last_name);
        setProfileType(accountData.profile_type);
        setDepartment(accountData.department);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [accountData]);

  useEffect(() => getProfile(), [accountData, getProfile]);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const clientAction = async (formData: FormData) => {
    // setLoading(true); // Doesn't update and I don't know the workaround yet
    if (!formData.get('user-type')) formData.set('user-type', accountData?.profile_type ?? '');

    const result = await updateProfile(formData);
    if (result === 'Profile updated!') {
      toast.success(result);
    } else {
      toast.error(result);
    }
    // setLoading(false);
  };

  return (
    <>
      {/* <pre>{JSON.stringify(accountData, null, 2)}</pre> */}
      <form action={clientAction}>
        <Stack>
          <Group justify="space-between" grow>
            <TextInput
              label="First name"
              name="first-name"
              value={first_name ?? ''}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              radius="md"
            />
            <TextInput
              label="Last name"
              name="last-name"
              value={last_name ?? ''}
              onChange={(e) => setLastName(e.currentTarget.value)}
              radius="md"
            />
          </Group>
          <Group justify="space-between" grow>
            <Select
              label="Account type"
              name="user-type"
              data={userTypes}
              value={profile_type ? capitalize(profile_type) : ''}
              onChange={(e) => setProfileType(e)}
              disabled={!!accountData?.profile_type}
              radius="md"
            />
            <Select
              label="Department (or major)"
              name="department"
              data={departments}
              value={department ?? ''}
              onChange={(e) => setDepartment(e)}
              radius="md"
            />
          </Group>
        </Stack>
        <Button type="submit" loading={loading}>
          Update
        </Button>
      </form>
      <form action="/auth/logout" method="post">
        <Button type="submit">Log out</Button>
      </form>
    </>
  );
}
