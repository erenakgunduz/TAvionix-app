import { Container } from '@mantine/core';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container size={600} my={40}>
      {children}
    </Container>
  );
}
