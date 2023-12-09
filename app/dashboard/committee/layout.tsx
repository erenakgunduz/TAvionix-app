import { Container } from '@mantine/core';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      {children}
      <Toaster position="top-right" />
    </Container>
  );
}
