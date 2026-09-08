'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDateShort } from '@/lib/utils';
import { getContactStatusLabel, getContactStatusBadgeVariant } from '@/lib/contactStatus';
import { ContactStatusDropdown } from '@/components/admin/ContactStatusDropdown';
import { ContactNotesField } from '@/components/admin/ContactNotesField';

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-[#0A2540]">{value || '—'}</div>
    </div>
  );
}

export function MessageDetail({ message }) {
  const [current, setCurrent] = useState(message);

  return (
    <div>
      <Link
        href="/admin/messages"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#0A2540]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to messages
      </Link>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2540]">{current.subject}</h1>
          <p className="text-sm text-muted-foreground">
            From {current.name} &middot; {formatDateShort(current.createdAt)}
          </p>
        </div>
        <Badge variant={getContactStatusBadgeVariant(current.status)} className="w-fit text-sm">
          {getContactStatusLabel(current.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Name" value={current.name} />
              <Field
                label="Email"
                value={
                  <a href={`mailto:${current.email}`} className="inline-flex items-center gap-1.5 text-[#00A6FB] hover:underline">
                    <Mail className="h-3.5 w-3.5" />
                    {current.email}
                  </a>
                }
              />
              {current.phone && (
                <Field
                  label="Phone"
                  value={
                    <a href={`tel:${current.phone}`} className="inline-flex items-center gap-1.5 text-[#00A6FB] hover:underline">
                      <Phone className="h-3.5 w-3.5" />
                      {current.phone}
                    </a>
                  }
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{current.message}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Internal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactNotesField contactId={current._id} initialNote={current.internalNotes} onUpdated={setCurrent} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactStatusDropdown contactId={current._id} currentStatus={current.status} onUpdated={setCurrent} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Field label="Received" value={formatDateShort(current.createdAt)} />
              {current.resolvedAt && <Field label="Resolved" value={formatDateShort(current.resolvedAt)} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
