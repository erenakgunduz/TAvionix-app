import { Container } from '@mantine/core';
import { Toaster } from 'react-hot-toast';
import NavBar from '@/components/NavBar/NavBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <NavBar />
      <main>{children}</main>
      <Toaster position="top-right" />
    </Container>
  );
}
