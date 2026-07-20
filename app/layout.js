import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@/components/analytics/Analytics';
import { CookieConsent } from '@/components/analytics/CookieConsent';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo/schema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sunshinemicrolending.com'),
  title: {
    default: 'Sunshine Micro Lending | Fast Payday Loans in Florida',
    template: '%s | Sunshine Micro Lending',
  },
  description:
    'Get a fast, transparent payday loan in Florida. Up to $500. 10% fee + $5 verification. Florida licensed lender. Apply online in minutes.',
  keywords: [
    'payday loans Florida',
    'online payday loans FL',
    'cash advance Florida',
    'short term loans Florida',
    'emergency loans Florida',
    'payday loan online',
    'fast cash Florida',
    'licensed payday lender Florida',
  ],
  authors: [{ name: 'Sunshine Micro Lending' }],
  creator: 'Sunshine Micro Lending',
  publisher: 'Sunshine Micro Lending',
  category: 'Finance',
  classification: 'Financial Services',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://sunshinemicrolending.com',
    siteName: 'Sunshine Micro Lending',
    title: 'Sunshine Micro Lending | Fast Payday Loans in Florida',
    description:
      'Get a fast, transparent payday loan in Florida. Up to $500. Licensed Florida lender. Apply online in minutes.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sunshine Micro Lending - Fast Payday Loans in Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunshine Micro Lending | Fast Payday Loans in Florida',
    description: 'Fast, transparent payday loans in Florida. Up to $500. Licensed lender.',
    images: ['/og-image.png'],
    creator: '@sunshinelending',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.SEARCH_CONSOLE_VERIFICATION,
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A2540" />
        <meta name="color-scheme" content="light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Analytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
