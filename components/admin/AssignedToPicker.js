'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';

export function AssignedToPicker({ applicationId, currentAssignee, onUpdated }) {
  const [staff, setStaff] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/staff')
      .then((res) => res.json())
      .then((data) => setStaff(data.staff || []))
      .catch(() => setStaff([]));
  }, []);

  async function handleChange(value) {
    const assignee = value === 'unassigned' ? null : value;
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'assigned', value: assignee }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update assignment.');
      }
      onUpdated(result.application, {
        _id: `local-${Date.now()}`,
        action: 'assigned',
        oldValue: currentAssignee,
        newValue: assignee,
        createdAt: new Date().toISOString(),
        adminUserName: 'You',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <Select value={currentAssignee || 'unassigned'} onValueChange={handleChange} disabled={saving}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unassigned">Unassigned</SelectItem>
          {staff.map((member) => (
            <SelectItem key={member.email} value={member.name}>
              {member.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="form-error mt-1">{error}</p>}
    </div>
  );
}
