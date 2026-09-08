'use client';

'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <PageLayout>
      <div className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center bg-[#F8FAFC] py-20 md:min-h-[calc(100vh-10.375rem)]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-3xl font-bold text-[#0A2540]">Something went wrong</h1>
          <p className="mx-auto mb-8 max-w-md text-muted-foreground">
            We apologize for the inconvenience. Please try again, or contact us if the problem persists.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button
              onClick={reset}
              className="rounded-lg bg-[#00A6FB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0097e8]"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
