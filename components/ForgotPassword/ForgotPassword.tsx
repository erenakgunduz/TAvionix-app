import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './ForgotPassword.module.css';

export default function ForgotPassword() {
  const form = useForm({
    initialValues: { email: '' },
    validate: { email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email') },
  });
  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form
          onSubmit={form.onSubmit(
            () => {},
            () => {}
          )}
        >
          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...form.getInputProps('email')}
            required
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor component={Link} href="/login" c="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button type="submit" className={classes.control}>
              Reset password
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
