'use client';

import {
  Button,
  Checkbox,
  Divider,
  Group,
  NativeSelect,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import handleGithub from '@/utils/handle-github';
import GithubButton from '../GithubButton/GithubButton';

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const userTypes = ['', 'Applicant', 'Committee', 'Instructor', 'Staff'];
  const departments = ['', 'Biology', 'Chemistry', 'Computer Science', 'Engineering', 'Physics'];

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: true,
    },

    validate: {
      firstName: (val) => (val.length === 1 ? 'First name is too short' : null),
      lastName: (val) => (val.length === 1 ? 'Last name is too short' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData(document.getElementById('sign-up') as HTMLFormElement);
      // console.log(...formData);
      const signUp = await fetch('/auth/sign-up', { method: 'POST', body: formData });
      if (signUp.status) setLoading(false);
      if (signUp.ok) return router.push('/thank-you');
      const errorMessage = await signUp.json();
      form.setErrors({ email: ' ', password: `${errorMessage.error}` });
      throw new Error(
        `Unable to register user, ${signUp.status} (${signUp.statusText}) response with message ${errorMessage.error}`
      );
    } catch (err) {
      return console.error(err);
    }
  };

  return (
    <Paper withBorder radius="md" p="xl">
      <Text size="lg" fw={500}>
        Welcome to TAvionix, sign up with
      </Text>

      <GithubButton fullWidth mb="md" mt="md" onClick={handleGithub}>
        GitHub
      </GithubButton>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form id="sign-up" onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Group justify="space-between" grow>
            <TextInput
              label="First name"
              name="first-name"
              placeholder="Your first name"
              {...form.getInputProps('firstName')}
              radius="md"
            />
            <TextInput
              label="Last name"
              name="last-name"
              placeholder="Your last name"
              {...form.getInputProps('lastName')}
              radius="md"
            />
          </Group>

          <Group justify="space-between" grow>
            <NativeSelect
              label="What type of user are you?"
              name="user-type"
              data={userTypes}
              required
              radius="md"
            />
            <NativeSelect
              label="Department (or major)"
              name="department"
              data={departments}
              radius="md"
            />
          </Group>

          <TextInput
            label="Email"
            name="email"
            placeholder="you@example.com"
            {...form.getInputProps('email')}
            required
            radius="md"
          />

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Your password"
            {...form.getInputProps('password')}
            required
            radius="md"
          />

          <Checkbox
            label="I accept the terms and conditions"
            checked={form.values.terms}
            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            required
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Button type="submit" radius="xl" loading={loading}>
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
