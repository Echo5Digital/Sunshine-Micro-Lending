'use client';

import Link from 'next/link';
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
    <div className="overflow-x-auto rounded-xl border border-border bg-white">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="border-b border-border bg-[#F8FAFC] text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
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
                <Link href={`/admin/applications/${app._id}`} className="font-medium text-[#0A2540] hover:text-[#00A6FB]">
                  {app.firstName} {app.lastName}
                </Link>
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
  );
}
