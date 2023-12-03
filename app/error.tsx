'use client';

// Error components must be Client Components
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
    <div className="error-boundary">
      <h2>Something went wrong!</h2>
      {/* Attempt to recover by trying to re-render the segment */}
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
