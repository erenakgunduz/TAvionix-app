import { Paper, Text } from '@mantine/core';
import RegisterForm from '@/components/RegisterForm/RegisterForm';

export default function SignUp() {
  return (
    <>
      <Paper withBorder radius="md" p="xl">
        <Text size="lg" fw={500}>
          Welcome to TAvionix, sign up with
        </Text>
        <RegisterForm />
      </Paper>
    </>
  );
}
