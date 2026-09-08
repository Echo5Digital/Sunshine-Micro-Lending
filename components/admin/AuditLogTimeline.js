'use client';

import { formatDateShort, capitalize } from '@/lib/utils';
import { getStatusLabel } from '@/lib/applicationStatus';

const ACTION_LABELS = {
  status_change: 'changed status',
  note_added: 'updated notes',
  veritec_marked: 'marked Veritec checked',
  assigned: 'updated assignment',
};

function describeChange(entry) {
  if (entry.action === 'status_change') {
    return `${getStatusLabel(entry.oldValue)} → ${getStatusLabel(entry.newValue)}`;
  }
  if (entry.action === 'assigned') {
    return `${entry.oldValue || 'Unassigned'} → ${entry.newValue || 'Unassigned'}`;
  }
  if (entry.action === 'note_added') {
    return null; // note content isn't shown inline to keep the timeline compact
  }
  return null;
}

export function AuditLogTimeline({ entries }) {
  if (!entries || entries.length === 0) {
    return <p className="text-sm text-muted-foreground">No activity recorded yet.</p>;
  }

  return (
    <ol className="space-y-3">
      {entries.map((entry) => (
        <li key={entry._id} className="border-l-2 border-border pl-3 text-sm">
          <div className="text-[#0A2540]">
            <span className="font-medium">{entry.adminUserName}</span>{' '}
            {ACTION_LABELS[entry.action] || capitalize(entry.action)}
          </div>
          {describeChange(entry) && <div className="text-xs text-muted-foreground">{describeChange(entry)}</div>}
          <div className="text-xs text-muted-foreground">{formatDateShort(entry.createdAt)}</div>
        </li>
      ))}
    </ol>
  );
}
