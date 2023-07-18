import React, { Suspense } from 'react';
import { SuspenseLoader, Transition, ErrorFallback } from '.';
import { ErrorBoundary } from 'react-error-boundary';

const PageLoader = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <Suspense fallback={<SuspenseLoader />}>{children}</Suspense>
      <Transition />
    </ErrorBoundary>
  );
};

export default PageLoader;
