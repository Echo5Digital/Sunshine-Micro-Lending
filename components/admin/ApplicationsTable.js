'use client';

import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDateShort } from '@/lib/utils';
import { getStatusLabel, getStatusBadgeVariant } from '@/lib/applicationStatus';

export function ApplicationsTable({ applications }) {
  if (applications.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-white p-10 text-center text-sm text-muted-foreground">
        No applications match the current filters.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-white">
      <p className="border-b border-border px-4 py-1.5 text-center text-xs text-muted-foreground sm:hidden">
        Swipe left to see more columns →
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-border bg-[#F8FAFC] text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 sr-only">View</th>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Loan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Veritec</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {applications.map((app) => (
              <tr key={app._id} className="transition-colors hover:bg-[#F8FAFC]">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/applications/${app._id}`}
                    aria-label={`View application from ${app.firstName} ${app.lastName}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-[#00A6FB]/10 hover:text-[#00A6FB]"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </td>
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
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {formatDateShort(app.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
