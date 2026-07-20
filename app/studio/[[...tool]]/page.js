'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Sanity Studio to avoid SSR issues with React context
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A2540',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
          Loading Sanity Studio...
        </p>
      </div>
    ),
  }
);

export default function StudioPage() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    import('@/sanity.config').then((mod) => {
      setConfig(mod.default);
    });
  }, []);

  if (!config) {
    return (
      <div style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A2540',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
          Initializing...
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
