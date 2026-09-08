'use client';

import { useState } from 'react';
import { FileText, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DocumentViewer({ applicationId, documentName }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleView() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/admin/applications/${applicationId}/document-url`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate document link.');
      }
      window.open(result.url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
      <div className="flex min-w-0 items-center gap-2">
        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate text-sm text-[#0A2540]">{documentName || 'No document on file'}</span>
      </div>
      {documentName && (
        <Button variant="outline" size="sm" onClick={handleView} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ExternalLink className="h-4 w-4" />}
          View
        </Button>
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
