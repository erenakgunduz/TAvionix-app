import { Anchor, Text, Title } from '@mantine/core';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm/AuthForm';

export default function Login() {
  return (
    <>
      <Title ta="center">Welcome back!</Title>

      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {"Don't have an account yet? "}
        <Anchor size="sm" component={Link} href="/sign-up">
          Create account
        </Anchor>
      </Text>

      <AuthForm />
    </>
  );
}
