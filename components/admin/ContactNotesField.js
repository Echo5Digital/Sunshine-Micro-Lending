'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function ContactNotesField({ contactId, initialNote, onUpdated }) {
  const [note, setNote] = useState(initialNote || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const response = await fetch(`/api/admin/messages/${contactId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'note_added', value: note }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save note.');
      }
      onUpdated(result.message);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <Textarea
        value={note}
        onChange={(e) => {
          setNote(e.target.value);
          setSaved(false);
        }}
        placeholder="Staff-only notes about this message..."
        rows={4}
      />
      <div className="mt-2 flex items-center gap-3">
        <Button variant="muted" size="sm" onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save Note
        </Button>
        {saved && <span className="text-xs text-[#16A34A]">Saved</span>}
      </div>
      {error && <p className="form-error mt-1">{error}</p>}
    </div>
  );
}
