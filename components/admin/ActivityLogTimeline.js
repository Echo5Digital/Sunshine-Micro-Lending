'use client';

import Link from 'next/link';
import { FileText, MessageSquare } from 'lucide-react';
import { formatDateShort, capitalize } from '@/lib/utils';
import { getStatusLabel } from '@/lib/applicationStatus';
import { getContactStatusLabel } from '@/lib/contactStatus';

const ACTION_LABELS = {
  status_change: 'changed status',
  note_added: 'added a note',
  veritec_marked: 'marked Veritec checked',
  assigned: 'updated assignment',
};

function describeChange(entry) {
  const getLabel = entry.entityType === 'contact' ? getContactStatusLabel : getStatusLabel;

  if (entry.action === 'status_change') {
    const newValue = entry.newValue;
    if (newValue && typeof newValue === 'object') {
      return `${getLabel(entry.oldValue)} → ${getLabel(newValue.status)} — "${newValue.reason}"`;
    }
    return `${getLabel(entry.oldValue)} → ${getLabel(newValue)}`;
  }
  if (entry.action === 'assigned') {
    return `${entry.oldValue || 'Unassigned'} → ${entry.newValue || 'Unassigned'}`;
  }
  if (entry.action === 'note_added') {
    return entry.newValue ? `"${entry.newValue}"` : null;
  }
  return null;
}

export function ActivityLogTimeline({ entries }) {
  if (!entries || entries.length === 0) {
    return <p className="text-sm text-muted-foreground">No activity recorded yet.</p>;
  }

  return (
    <ol className="space-y-3">
      {entries.map((entry) => {
        const isContact = entry.entityType === 'contact';
        const href = isContact ? `/admin/messages/${entry.contactId}` : `/admin/applications/${entry.applicationId}`;
        const Icon = isContact ? MessageSquare : FileText;

        return (
          <li key={entry._id} className="border-l-2 border-border pl-3 text-sm">
            <div className="flex items-center gap-1.5 text-[#0A2540]">
              <span className="font-medium">{entry.adminUserName}</span>
              <span>{ACTION_LABELS[entry.action] || capitalize(entry.action)}</span>
              <span className="text-muted-foreground">for</span>
              <Link
                href={href}
                className="inline-flex items-center gap-1 font-medium text-[#00A6FB] hover:underline"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {entry.entityName || (isContact ? 'a message' : 'an application')}
              </Link>
            </div>
            {describeChange(entry) && <div className="text-xs text-muted-foreground">{describeChange(entry)}</div>}
            <div className="text-xs text-muted-foreground">{formatDateShort(entry.createdAt)}</div>
          </li>
        );
      })}
    </ol>
  );
}
