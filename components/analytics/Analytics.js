'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics 4
function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
            });
          `,
        }}
      />
    </>
  );
}

// Microsoft Clarity
function MicrosoftClarity() {
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!CLARITY_ID) {
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `,
      }}
    />
  );
}

// Page View Tracker
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
      if (GA_ID) {
        window.gtag('config', GA_ID, {
          page_path: pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''),
        });
      }
    }
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <MicrosoftClarity />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}

// Utility to track events
export function trackEvent(eventName, parameters = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

// Predefined events
export const events = {
  applyNowClick: () => trackEvent('apply_now_click', { category: 'CTA' }),
  applicationSubmit: (amount) =>
    trackEvent('application_submit', {
      category: 'Application',
      loan_amount: amount,
    }),
  contactFormSubmit: () => trackEvent('contact_form_submit', { category: 'Contact' }),
  phoneClick: () => trackEvent('phone_click', { category: 'Contact' }),
  emailClick: () => trackEvent('email_click', { category: 'Contact' }),
  newsletterSignup: () => trackEvent('newsletter_signup', { category: 'Engagement' }),
  blogPostView: (title) =>
    trackEvent('blog_post_view', { category: 'Blog', post_title: title }),
  faqExpand: (question) =>
    trackEvent('faq_expand', { category: 'FAQ', question }),
};
