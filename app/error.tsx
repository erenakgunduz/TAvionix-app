'use client';

// Error components must be Client Components
import { Button, Container } from '@mantine/core';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => console.error(error), [error]); // Log the error to an error reporting service

  return (
    <Container className="error-boundary">
      <h2>Something went wrong!</h2>
      {/* Attempt to recover by trying to re-render the segment */}
      <Button type="button" onClick={() => reset()}>
        Try again
      </Button>
    </Container>
  );
}
