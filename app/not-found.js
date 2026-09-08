import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { Home, ArrowRight } from 'lucide-react';

export const metadata = {
  title: '404: Page Not Found | Sunshine Micro Lending',
  description: 'The page you are looking for could not be found.',
};

export default function NotFoundPage() {
  return (
    <PageLayout>
      <div className="flex min-h-[calc(100vh-4.5rem)] items-center justify-center bg-[#F8FAFC] py-20 md:min-h-[calc(100vh-10.375rem)]">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#0A2540]">
            <span className="text-4xl font-bold text-white">404</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-[#0A2540]">Page Not Found</h1>
          <p className="mx-auto mb-8 max-w-md text-muted-foreground">
            We could not find the page you were looking for. It may have been moved or no longer exists.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0A2540] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d3060]"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Apply for a Loan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
