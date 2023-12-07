import { Container, Skeleton } from '@mantine/core';

export default function Loading() {
  return (
    <Container>
      <Skeleton height={20} width={80} radius="xl" my="xl" />
      <Skeleton height={10} radius="xl" />
      <Skeleton height={10} mt={8} radius="xl" />
      <Skeleton height={10} mt={8} width="72%" radius="xl" />
    </Container>
  );
}
