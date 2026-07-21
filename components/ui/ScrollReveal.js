'use client';

import { useEffect, useRef } from 'react';

/**
 * Mounts an IntersectionObserver that adds the class `is-visible`
 * to every element with [data-animate] or [data-animate-scale]
 * once it enters the viewport. Zero content rendering — purely behavioural.
 */
export function ScrollReveal() {
  const observerRef = useRef(null);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-animate], [data-animate-scale]');

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return null;
}
