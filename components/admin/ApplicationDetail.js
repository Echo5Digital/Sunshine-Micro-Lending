'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate, formatDateShort } from '@/lib/utils';
import { getStatusLabel, getStatusBadgeVariant } from '@/lib/applicationStatus';
import { StatusDropdown } from '@/components/admin/StatusDropdown';
import { VeritecCheckAction } from '@/components/admin/VeritecCheckAction';
import { AssignedToPicker } from '@/components/admin/AssignedToPicker';
import { InternalNotesField } from '@/components/admin/InternalNotesField';
import { DocumentViewer } from '@/components/admin/DocumentViewer';
import { AuditLogTimeline } from '@/components/admin/AuditLogTimeline';

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-[#0A2540]">{value || '—'}</div>
    </div>
  );
}

export function ApplicationDetail({ application, auditLog }) {
  const [current, setCurrent] = useState(application);
  const [log, setLog] = useState(auditLog);

  function handleUpdated(updatedApplication, newLogEntry) {
    setCurrent(updatedApplication);
    if (newLogEntry) {
      setLog((prev) => [newLogEntry, ...prev]);
    }
  }

  return (
    <div>
      <Link
        href="/admin/applications"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#0A2540]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to applications
      </Link>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]">
            {current.firstName} {current.lastName}
          </h1>
          <p className="text-sm text-muted-foreground">Ref: {current.referenceNumber || '—'}</p>
        </div>
        <Badge variant={getStatusBadgeVariant(current.status)} className="w-fit text-sm">
          {getStatusLabel(current.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Applicant Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Email" value={current.email} />
              <Field label="Phone" value={current.phone} />
              <Field label="Date of Birth" value={current.dateOfBirth ? formatDate(current.dateOfBirth) : null} />
              <Field
                label="Address"
                value={`${current.streetAddress}, ${current.city}, ${current.state} ${current.zipCode}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Loan & Employment</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Loan Amount" value={formatCurrency(current.loanAmount)} />
              <Field label="Loan Type" value={current.loanType?.replace('_', ' ')} />
              <Field label="Pay Frequency" value={current.payFrequency} />
              <Field label="Next Pay Date" value={current.nextPayDate ? formatDate(current.nextPayDate) : null} />
              <Field label="Employer" value={current.employer} />
              <Field label="Monthly Income" value={formatCurrency(current.monthlyIncome)} />
              <Field label="Employment Status" value={current.employmentStatus?.replace(/_/g, ' ')} />
              <Field label="Has Bank Account" value={current.hasBankAccount ? 'Yes' : 'No'} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uploaded Document</CardTitle>
            </CardHeader>
            <CardContent>
              <DocumentViewer applicationId={current._id} documentName={current.documentName} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <InternalNotesField
                applicationId={current._id}
                initialNote={current.internalNotes}
                onUpdated={handleUpdated}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
            </CardHeader>
            <CardContent>
              <AuditLogTimeline entries={log} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-1.5 text-xs uppercase tracking-wide text-muted-foreground">Status</div>
                <StatusDropdown
                  applicationId={current._id}
                  currentStatus={current.status}
                  onUpdated={handleUpdated}
                />
              </div>
              <div>
                <div className="mb-1.5 text-xs uppercase tracking-wide text-muted-foreground">Assigned To</div>
                <AssignedToPicker
                  applicationId={current._id}
                  currentAssignee={current.assignedTo}
                  onUpdated={handleUpdated}
                />
              </div>
              <div>
                <div className="mb-1.5 text-xs uppercase tracking-wide text-muted-foreground">
                  Veritec Database Check
                </div>
                <VeritecCheckAction
                  applicationId={current._id}
                  veritecChecked={current.veritecChecked}
                  veritecCheckedAt={current.veritecCheckedAt}
                  veritecCheckedBy={current.veritecCheckedBy}
                  onUpdated={handleUpdated}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Field label="Submitted" value={formatDateShort(current.createdAt)} />
              <Field label="Last Updated" value={formatDateShort(current.updatedAt)} />
              <Field label="Consent Given" value={current.consentGiven ? 'Yes' : 'No'} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
