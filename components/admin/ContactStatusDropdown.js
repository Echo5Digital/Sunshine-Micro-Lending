'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { CONTACT_STATUS_OPTIONS } from '@/lib/contactStatus';

export function ContactStatusDropdown({ contactId, currentStatus, onUpdated }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleValueChange(newStatus) {
    if (newStatus === currentStatus) {
      return;
    }
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/messages/${contactId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status_change', value: newStatus }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update status.');
      }
      onUpdated(result.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <Select value={currentStatus} onValueChange={handleValueChange} disabled={saving}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CONTACT_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="form-error mt-1">{error}</p>}
    </div>
  );
}
