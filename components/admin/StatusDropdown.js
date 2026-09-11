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
import { Textarea } from '@/components/ui/Textarea';
import { STATUS_OPTIONS, getStatusLabel } from '@/lib/applicationStatus';

const CONFIRM_STATUSES = new Set(['approved', 'declined']);

export function StatusDropdown({ applicationId, currentStatus, onUpdated }) {
  const [pendingStatus, setPendingStatus] = useState(null);
  const [declineReason, setDeclineReason] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function applyStatusChange(newStatus, reason) {
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status_change', value: newStatus, reason }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update status.');
      }
      onUpdated(result.application, {
        _id: `local-${Date.now()}`,
        action: 'status_change',
        oldValue: currentStatus,
        newValue: newStatus === 'declined' ? { status: newStatus, reason } : newStatus,
        createdAt: new Date().toISOString(),
        adminUserName: 'You',
      });
      setPendingStatus(null);
      setDeclineReason('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleValueChange(value) {
    if (value === currentStatus) {
      return;
    }
    if (CONFIRM_STATUSES.has(value)) {
      setError('');
      setDeclineReason('');
      setPendingStatus(value);
      return;
    }
    applyStatusChange(value);
  }

  function handleConfirm() {
    if (pendingStatus === 'declined' && !declineReason.trim()) {
      setError('A reason is required when declining an application.');
      return;
    }
    applyStatusChange(pendingStatus, pendingStatus === 'declined' ? declineReason.trim() : undefined);
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

      <Dialog
        open={pendingStatus !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingStatus(null);
            setDeclineReason('');
            setError('');
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm status change</DialogTitle>
            <DialogDescription>
              Change status from <strong>{getStatusLabel(currentStatus)}</strong> to{' '}
              <strong>{pendingStatus ? getStatusLabel(pendingStatus) : ''}</strong>? This action is recorded in the
              audit log.
            </DialogDescription>
          </DialogHeader>
          {pendingStatus === 'declined' && (
            <div>
              <label htmlFor="decline-reason" className="mb-1.5 block text-xs uppercase tracking-wide text-muted-foreground">
                Reason for declining (required)
              </label>
              <Textarea
                id="decline-reason"
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="e.g. Failed Veritec check, insufficient income, duplicate application..."
                rows={3}
              />
            </div>
          )}
          {error && <p className="form-error">{error}</p>}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant={pendingStatus === 'declined' ? 'destructive' : 'accent'}
              onClick={handleConfirm}
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
