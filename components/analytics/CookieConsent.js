'use client';

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import Link from 'next/link';

const CONSENT_KEY = 'sunshine_cookie_consent';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      // Small delay to avoid layout shift
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: true, marketing: true, date: new Date().toISOString() }));
    setShow(false);
    // Enable analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
      });
    }
  }

  function acceptEssential() {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ analytics: false, marketing: false, date: new Date().toISOString() }));
    setShow(false);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      });
    }
  }

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl animate-slide-up"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <div className="rounded-2xl border border-border bg-white p-6 shadow-premium">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00A6FB]/10">
            <Cookie className="h-5 w-5 text-[#00A6FB]" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 text-sm font-semibold text-[#0A2540]">
              We use cookies
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              We use analytics cookies to understand how visitors interact with our site and improve your experience.
              We never sell your data.{' '}
              <Link href="/privacy-policy" className="text-[#00A6FB] hover:underline">
                Privacy Policy
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={acceptAll}
                className="rounded-lg bg-[#0A2540] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0d3060]"
              >
                Accept All
              </button>
              <button
                onClick={acceptEssential}
                className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Essential Only
              </button>
            </div>
          </div>
          <button
            onClick={acceptEssential}
            className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted"
            aria-label="Dismiss cookie notice"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
