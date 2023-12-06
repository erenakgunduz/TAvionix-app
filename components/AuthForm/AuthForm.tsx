'use client';

import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import handleGithub from '@/utils/handle-github';
import handleGoogle from '@/utils/handle-google';
import GithubButton from '../GithubButton/GithubButton';
import GoogleButton from '../GoogleButton/GoogleButton';

export default function AuthForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData(document.getElementById('log-in') as HTMLFormElement);
      // console.log(...formData);
      const login = await fetch('/auth/login', { method: 'POST', body: formData });
      if (login.status) setLoading(false);
      if (login.ok) return router.push('/dashboard');
      const errorMessage = await login.json();
      form.setErrors({ email: ' ', password: `${errorMessage.error}` });
      throw new Error(
        `Unable to log in user, ${login.status} (${login.statusText}) response with message ${errorMessage.error}`
      );
    } catch (err) {
      return console.error(err);
    }
  };

  // const valInRealTime = (name: string) =>
  //   useEffect(() => {
  //     form.validateField(name);
  //   }, [form.values[name]]);

  // valInRealTime('email');
  // valInRealTime('password'); // Works perfectly but looks too janky due to rapid fire re-renders

  // const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
  //   form.setFieldValue(name, e.currentTarget.value);
  //   form.validateField(name); // Looks fine but lags due to async sets, moving on to more important matters
  // };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <Text size="lg" fw={500}>
        Log in with
      </Text>

      <Group grow mb="md" mt="md">
        <GithubButton onClick={handleGithub}>GitHub</GithubButton>
        <GoogleButton onClick={handleGoogle}>Google</GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form id="log-in" onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Email"
          name="email"
          placeholder="you@example.com"
          {...form.getInputProps('email')}
          // onChange={handleChange('email')}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Your password"
          {...form.getInputProps('password')}
          // onChange={handleChange('password')}
          required
          mt="md"
        />

        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component={Link} href="/reset-password" size="sm">
            Forgot password?
          </Anchor>
        </Group>

        <Button fullWidth mt="xl" type="submit" loading={loading}>
          Log in
        </Button>
      </form>
    </Paper>
  );
}
