import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import GithubButton from '../GithubButton/GithubButton';
import classes from './AuthForm.module.css';

export default function AuthForm({ logIn }: { logIn: (formData: FormData) => Promise<never> }) {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {"Don't have an account yet? "}
        <Anchor size="sm" component={Link} href="/signup">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Text size="lg" fw={500}>
          Log in with
        </Text>
        <GithubButton fullWidth mb="md" mt="md">
          GitHub
        </GithubButton>
        <Divider label="Or continue with email" labelPosition="center" my="lg" />
        <form onSubmit={form.onSubmit(() => logIn)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...form.getInputProps('email')}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps('password')}
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component={Link} href="/reset-password" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
