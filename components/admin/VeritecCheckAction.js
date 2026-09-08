'use client';

import { useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatDateShort } from '@/lib/utils';

export function VeritecCheckAction({
  applicationId,
  veritecChecked,
  veritecCheckedAt,
  veritecCheckedBy,
  onUpdated,
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleMarkChecked() {
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'veritec_marked' }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to mark Veritec checked.');
      }
      onUpdated(result.application, {
        _id: `local-${Date.now()}`,
        action: 'veritec_marked',
        oldValue: { veritecChecked: false },
        newValue: { veritecChecked: true },
        createdAt: new Date().toISOString(),
        adminUserName: 'You',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (veritecChecked) {
    return (
      <div className="rounded-lg border border-[#22C55E]/30 bg-[#22C55E]/5 p-3 text-sm">
        <div className="flex items-center gap-2 font-medium text-[#16A34A]">
          <ShieldCheck className="h-4 w-4" />
          Checked
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          by {veritecCheckedBy || 'staff'} on {veritecCheckedAt ? formatDateShort(veritecCheckedAt) : '—'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <Button variant="outline" size="sm" onClick={handleMarkChecked} disabled={saving} className="w-full">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
        Mark Veritec Checked
      </Button>
      {error && <p className="form-error mt-1">{error}</p>}
    </div>
  );
}
