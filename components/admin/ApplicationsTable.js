'use client';

import { useRouter } from 'next/navigation';
import { FileCheck, FileWarning } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDateShort, formatRelativeTime } from '@/lib/utils';
import { getStatusLabel, getStatusBadgeVariant } from '@/lib/applicationStatus';

const WARNING_HOURS = 24;
const CRITICAL_HOURS = 48;

function agingColorClass(createdAt) {
  const hours = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
  if (hours >= CRITICAL_HOURS) {
    return 'text-red-600 font-medium';
  }
  if (hours >= WARNING_HOURS) {
    return 'text-amber-600 font-medium';
  }
  return 'text-muted-foreground';
}

export function ApplicationsTable({ applications }) {
  const router = useRouter();

  if (applications.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-white p-10 text-center text-sm text-muted-foreground">
        No applications match the current filters.
      </div>
    );
  }

  function goToApplication(id) {
    router.push(`/admin/applications/${id}`);
  }

  return (
    <div className="rounded-xl border border-border bg-white">
      <p className="border-b border-border px-4 py-1.5 text-center text-xs text-muted-foreground sm:hidden">
        Swipe left to see more columns →
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-border bg-[#F8FAFC] text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Loan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Veritec</th>
              <th className="px-4 py-3 sr-only">Document</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Aging</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {applications.map((app) => (
              <tr
                key={app._id}
                role="link"
                tabIndex={0}
                aria-label={`View application from ${app.firstName} ${app.lastName}`}
                onClick={() => goToApplication(app._id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToApplication(app._id);
                  }
                }}
                className="cursor-pointer transition-colors hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A6FB]"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-[#0A2540]">
                    {app.firstName} {app.lastName}
                  </div>
                  <div className="text-xs text-muted-foreground">{app.email}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {formatCurrency(app.loanAmount)}
                  <div className="text-xs capitalize text-muted-foreground">{app.loanType?.replace('_', ' ')}</div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={getStatusBadgeVariant(app.status)}>{getStatusLabel(app.status)}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{app.assignedTo || '—'}</td>
                <td className="px-4 py-3">
                  {app.veritecChecked ? (
                    <Badge variant="success">Checked</Badge>
                  ) : (
                    <Badge variant="muted">Pending</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  {app.documentName ? (
                    <FileCheck className="h-4 w-4 text-[#16A34A]" aria-label="Document uploaded">
                      <title>Document uploaded</title>
                    </FileCheck>
                  ) : (
                    <FileWarning className="h-4 w-4 text-amber-600" aria-label="Document missing">
                      <title>Document missing</title>
                    </FileWarning>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {formatDateShort(app.createdAt)}
                </td>
                <td className={`px-4 py-3 whitespace-nowrap ${agingColorClass(app.createdAt)}`}>
                  {formatRelativeTime(app.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
