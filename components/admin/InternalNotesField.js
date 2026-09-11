'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { formatDateShort } from '@/lib/utils';

export function InternalNotesField({ applicationId, notes, legacyNote, onUpdated }) {
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    if (!draft.trim()) {
      return;
    }
    setSaving(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'note_added', value: draft.trim() }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to save note.');
      }
      onUpdated(result.application, {
        _id: `local-${Date.now()}`,
        action: 'note_added',
        oldValue: null,
        newValue: draft.trim(),
        createdAt: new Date().toISOString(),
        adminUserName: 'You',
      });
      setDraft('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const allNotes = [...(notes || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="space-y-4">
      <div>
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a note about this application..."
          rows={3}
        />
        <div className="mt-2 flex items-center gap-3">
          <Button variant="muted" size="sm" onClick={handleSave} disabled={saving || !draft.trim()}>
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Add Note
          </Button>
        </div>
        {error && <p className="form-error mt-1">{error}</p>}
      </div>

      {legacyNote && (
        <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Legacy note</div>
          <p className="mt-1 whitespace-pre-wrap text-[#0A2540]">{legacyNote}</p>
        </div>
      )}

      {allNotes.length === 0 && !legacyNote ? (
        <p className="text-sm text-muted-foreground">No notes yet.</p>
      ) : (
        <ol className="space-y-3">
          {allNotes.map((n, idx) => (
            <li key={n._id || idx} className="rounded-lg border border-border p-3 text-sm">
              <p className="whitespace-pre-wrap text-[#0A2540]">{n.text}</p>
              <div className="mt-1.5 text-xs text-muted-foreground">
                <span className="font-medium">{n.authorName}</span> · {formatDateShort(n.createdAt)}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
