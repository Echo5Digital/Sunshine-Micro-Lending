'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { formatDateShort, truncate } from '@/lib/utils';
import { getContactStatusLabel, getContactStatusBadgeVariant } from '@/lib/contactStatus';

export function MessagesTable({ messages }) {
  const router = useRouter();

  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-white p-10 text-center text-sm text-muted-foreground">
        No messages match the current filters.
      </div>
    );
  }

  function goToMessage(id) {
    router.push(`/admin/messages/${id}`);
  }

  return (
    <div className="rounded-xl border border-border bg-white">
      <p className="border-b border-border px-4 py-1.5 text-center text-xs text-muted-foreground sm:hidden">
        Swipe left to see more columns →
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-[#F8FAFC] text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {messages.map((msg) => (
              <tr
                key={msg._id}
                role="link"
                tabIndex={0}
                aria-label={`View message from ${msg.name}`}
                onClick={() => goToMessage(msg._id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToMessage(msg._id);
                  }
                }}
                className="cursor-pointer transition-colors hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A6FB]"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-[#0A2540]">{msg.name}</div>
                  <div className="text-xs text-muted-foreground">{msg.email}</div>
                </td>
                <td className="px-4 py-3 text-foreground">{truncate(msg.subject, 60)}</td>
                <td className="px-4 py-3">
                  <Badge variant={getContactStatusBadgeVariant(msg.status)}>{getContactStatusLabel(msg.status)}</Badge>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {formatDateShort(msg.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
