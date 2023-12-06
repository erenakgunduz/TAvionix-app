import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import { theme } from '@/theme';
import '@mantine/core/styles.css';

export const metadata = {
  title: 'TAvionix',
  description: 'Graduate teaching assistant system of the highest (flight) level',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
          <Container>{children}</Container>
        </MantineProvider>
      </body>
    </html>
  );
}
