'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { STATUS_OPTIONS, getStatusLabel } from '@/lib/applicationStatus';

const CONFIRM_STATUSES = new Set(['approved', 'declined']);

export function StatusDropdown({ applicationId, currentStatus, onUpdated }) {
  const [pendingStatus, setPendingStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function applyStatusChange(newStatus) {
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status_change', value: newStatus }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update status.');
      }
      onUpdated(result.application, {
        _id: `local-${Date.now()}`,
        action: 'status_change',
        oldValue: currentStatus,
        newValue: newStatus,
        createdAt: new Date().toISOString(),
        adminUserName: 'You',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
      setPendingStatus(null);
    }
  }

  function handleValueChange(value) {
    if (value === currentStatus) {
      return;
    }
    if (CONFIRM_STATUSES.has(value)) {
      setPendingStatus(value);
      return;
    }
    applyStatusChange(value);
  }

  return (
    <>
      <Select value={currentStatus} onValueChange={handleValueChange} disabled={saving}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="form-error mt-1">{error}</p>}

      <Dialog open={pendingStatus !== null} onOpenChange={(open) => !open && setPendingStatus(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm status change</DialogTitle>
            <DialogDescription>
              Change status from <strong>{getStatusLabel(currentStatus)}</strong> to{' '}
              <strong>{pendingStatus ? getStatusLabel(pendingStatus) : ''}</strong>? This action is recorded in the
              audit log.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant={pendingStatus === 'declined' ? 'destructive' : 'accent'}
              onClick={() => applyStatusChange(pendingStatus)}
              disabled={saving}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
