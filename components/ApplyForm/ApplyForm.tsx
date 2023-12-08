'use client';

import {
  Button,
  Group,
  MultiSelect,
  NumberInput,
  Paper,
  Select,
  Stack,
  TagsInput,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { departments } from '@/lib/selector-data';
import submitApplication from '@/utils/actions/submit-application';
import getErrorMessage from '@/utils/error-message';

export default function ApplyForm({ data, error }: ApplyFormProps) {
  const { accountData, positionsData } = data;
  const [loading, setLoading] = useState(true);
  const [major, setMajor] = useState('');
  const [experience, setExperience] = useState<string[]>([]);
  const [positions, setPositions] = useState<string[]>([]);

  const getData = useCallback(() => {
    try {
      setLoading(true);
      if (!accountData || !positionsData || error.findIndex((err) => err) >= 0) {
        throw new Error(error.find((err) => err) ?? 'Error loading data');
      } else {
        // console.log(accountData, positionsData);
        setMajor(accountData.department ?? '');
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => getData(), [data, getData]);

  const form = useForm({
    initialValues: {
      firstName: accountData.first_name ?? '',
      lastName: accountData.last_name ?? '',
      major,
      gpa: '',
      pastExperience: [],
      resumeUrl: '',
      appliedPositions: [],
    },

    validate: {
      firstName: (val) => (val?.length === 1 ? 'First name is too short' : null),
      lastName: (val) => (val?.length === 1 ? 'Last name is too short' : null),
      gpa: (val) => (Number(val) < 0 || Number(val) > 4 ? 'GPA must be between 0 and 4' : null),
      resumeUrl: (val) => (/^.*\.(pdf|PDF)$/.test(val) ? null : 'Resume URL must be in PDF format'),
    },
  });

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData(document.getElementById('ta-application') as HTMLFormElement);
      // console.log(...formData);
      const result = await submitApplication(formData);
      if (result === 'Application submitted!') {
        toast.success(result);
      } else {
        throw new Error(result);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
      setTimeout(() => router.push('/dashboard/applicant'), 2000);
    }
  };

  const positionsList = positionsData?.map((pos) => ({
    value: String(pos.tp_id),
    label: pos.description ?? '',
  }));

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form id="ta-application" onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Group justify="space-between" grow>
            <TextInput
              label="First name"
              name="first-name"
              {...form.getInputProps('firstName')}
              onChange={(e) => form.setFieldValue('firstName', e.currentTarget.value)}
              required
              radius="md"
            />
            <TextInput
              label="Last name"
              name="last-name"
              {...form.getInputProps('lastName')}
              onChange={(e) => form.setFieldValue('lastName', e.currentTarget.value)}
              required
              radius="md"
            />
            <Select
              label="Major"
              name="major"
              {...form.getInputProps('major')}
              value={major}
              onChange={(e) => {
                setMajor(e ?? '');
                form.setFieldValue('major', major);
              }}
              data={departments}
              required
              radius="md"
            />
          </Group>
        </Stack>
        <Stack>
          <Group justify="space-between" grow>
            <NumberInput
              label="GPA"
              name="gpa"
              {...form.getInputProps('gpa')}
              onChange={(e) => form.setFieldValue('gpa', (e as string) ?? '')}
              required
              radius="md"
            />
            <TextInput
              label="Resume URL"
              name="resume-url"
              {...form.getInputProps('resumeUrl')}
              onChange={(e) => form.setFieldValue('resumeUrl', e.currentTarget.value)}
              required
              radius="md"
            />
          </Group>
        </Stack>
        <TagsInput
          label="Past experience"
          description="Press Enter to add at least the course titles followed by semesters you were TA for each, NO commas, example: Genetics (PCB 3063)--Spring 2020"
          name="past-experience"
          {...form.getInputProps('pastExperience')}
          value={experience}
          onChange={setExperience}
          clearable
          radius="md"
        />
        <MultiSelect
          label="For what positions are you applying?"
          description="Select all of them below"
          name="applied-positions"
          {...form.getInputProps('appliedPositions')}
          data={positionsList}
          value={positions}
          onChange={setPositions}
          clearable
          radius="md"
        />

        <Button mt="xl" type="submit" loading={loading}>
          Submit
        </Button>
      </form>
    </Paper>
  );
}
