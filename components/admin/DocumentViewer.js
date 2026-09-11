'use client';

import { useEffect, useState } from 'react';
import { FileText, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp']);

function getExtension(name) {
  if (!name) {
    return '';
  }
  const parts = name.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
}

export function DocumentViewer({ applicationId, documentName }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!documentName) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadUrl() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/admin/applications/${applicationId}/document-url`);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || 'Failed to generate document link.');
        }
        if (!cancelled) {
          setUrl(result.url);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadUrl();
    return () => {
      cancelled = true;
    };
  }, [applicationId, documentName]);

  if (!documentName) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm text-muted-foreground">
        <FileText className="h-4 w-4 shrink-0" />
        No document on file
      </div>
    );
  }

  const extension = getExtension(documentName);
  const isImage = IMAGE_EXTENSIONS.has(extension);

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate text-sm text-[#0A2540]">{documentName}</span>
        </div>
        {url && (
          <Button variant="outline" size="sm" asChild className="shrink-0">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open in new tab
            </a>
          </Button>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-lg border border-border p-10 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      )}

      {error && <p className="form-error">{error}</p>}

      {!loading && url && isImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={documentName}
          className="max-h-[50vh] w-full rounded-lg border border-border object-contain sm:max-h-[600px]"
        />
      )}

      {!loading && url && !isImage && (
        <iframe
          src={url}
          title={documentName}
          className="h-[300px] w-full rounded-lg border border-border sm:h-[450px] lg:h-[600px]"
        />
      )}
    </div>
  );
}
