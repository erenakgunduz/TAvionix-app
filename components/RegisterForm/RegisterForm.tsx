import {
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import GithubButton from '../GithubButton/GithubButton';

export default function RegisterForm() {
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Paper withBorder radius="md" p="xl">
      <Text size="lg" fw={500}>
        Welcome to TAvionix, sign up with
      </Text>

      <GithubButton fullWidth mb="md" mt="md">
        GitHub
      </GithubButton>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Your full name"
            {...form.getInputProps('name')}
            required
            radius="md"
          />

          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...form.getInputProps('email')}
            required
            radius="md"
          />

          <PasswordInput
            label="Password"
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
          <Button type="submit" radius="xl">
            Register
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
