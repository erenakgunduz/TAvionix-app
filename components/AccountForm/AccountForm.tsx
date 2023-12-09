'use client';

import { Button, Group, Paper, Select, Stack, TextInput } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { departments, userTypes } from '@/lib/selector-data';
import updateProfile from '@/utils/actions/update-profile';
import getErrorMessage from '@/utils/error-message';

export default function AccountForm({ accountData, error }: AccountFormProps) {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [profileType, setProfileType] = useState<string | null>(null);
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
    // setLoading(true); // Doesn't update, think I know why (no re-render), just don't know the workaround yet
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
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      {/* <pre>{JSON.stringify(accountData, null, 2)}</pre> */}
      <form action={clientAction}>
        <Stack>
          <Group justify="space-between" grow>
            <TextInput
              label="First name"
              name="first-name"
              value={firstName ?? ''}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              radius="md"
            />
            <TextInput
              label="Last name"
              name="last-name"
              value={lastName ?? ''}
              onChange={(e) => setLastName(e.currentTarget.value)}
              radius="md"
            />
          </Group>
          <Group justify="space-between" grow>
            <Select
              label="Account type"
              name="user-type"
              data={userTypes}
              value={profileType ? capitalize(profileType) : ''}
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
        <Button mt={20} type="submit" loading={loading}>
          Update
        </Button>
      </form>
      <Group justify="flex-end">
        <form action="/auth/logout" method="post">
          <Button type="submit">Log out</Button>
        </form>
      </Group>
    </Paper>
  );
}
