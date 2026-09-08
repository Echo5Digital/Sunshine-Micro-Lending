const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sunshinemicrolending.com';

// ─── Organization / FinancialService Schema (Block 1 — sitewide) ─────────────
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${SITE_URL}/#organization`,
    name: 'Sunshine Micro Lending',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/logo.png`,
    description:
      'Sunshine Micro Lending is a Florida payday lender offering transparent short-term loans up to $500 to Florida residents, with fees capped by state law at 10% plus a $5 verification fee.',
    areaServed: {
      '@type': 'State',
      name: 'Florida',
    },
    telephone: process.env.NEXT_PUBLIC_COMPANY_PHONE || '[PHONE]',
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || '[EMAIL]',
    sameAs: [
      'https://www.facebook.com/[PAGE]',
      'https://www.linkedin.com/company/[PAGE]',
    ],
  };
}

// ─── Local Business Schema ─────────────────────────────────────────────────────
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'Sunshine Micro Lending',
    url: SITE_URL,
    description:
      'Florida online payday lender. Loans up to $500 with transparent fees and a 60-day grace period.',
    image: `${SITE_URL}/og-image.png`,
    telephone: process.env.NEXT_PUBLIC_COMPANY_PHONE || '+1-800-SUNSHINE',
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@sunshinemicrolending.com',
    address: {
      '@type': 'PostalAddress',
      addressState: 'FL',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'State',
      name: 'Florida',
    },
    openingHours: ['Mo-Fr 09:00-17:00'],
    priceRange: '$',
    hasMap: 'https://maps.google.com',
    knowsLanguage: ['en', 'es'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Payday Loan Products',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Single Payment Payday Loan',
          description: 'Loans from $100–$500 with 7–31 day repayment terms',
          price: '5.00',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '10',
            priceCurrency: 'USD',
            description: '10% of loan amount plus $5 verification fee',
            unitText: 'PERCENT',
          },
        },
        {
          '@type': 'Offer',
          name: 'Installment Loan (Coming Soon)',
          description: 'Planned product: loans up to $500 with 60–90 day repayment terms, billed biweekly at 8% of remaining balance. Not yet available.',
          availability: 'https://schema.org/PreOrder',
        },
      ],
    },
  };
}

// ─── Financial Product Schema ─────────────────────────────────────────────────
export function generateFinancialProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LoanOrCredit',
    name: product.name,
    description: product.description,
    url: `${SITE_URL}/loan-options`,
    provider: {
      '@type': 'Organization',
      name: 'Sunshine Micro Lending',
      url: SITE_URL,
    },
    loanType: product.type === 'single_payment' ? 'Payday Loan' : 'Installment Loan',
    amount: {
      '@type': 'MonetaryAmount',
      minValue: product.minAmount || 100,
      maxValue: product.maxAmount || 500,
      currency: 'USD',
    },
    loanTerm: {
      '@type': 'QuantitativeValue',
      minValue: product.termMin,
      maxValue: product.termMax,
      unitCode: 'DAY',
    },
    interestRate: product.feePercentage || 10,
    feesAndCommissionsSpecification: `${product.feePercentage || 10}% of loan amount plus $${product.verificationFee || 5} verification fee`,
    areaServed: {
      '@type': 'State',
      name: 'Florida',
    },
    eligibleRegion: {
      '@type': 'State',
      name: 'Florida',
    },
  };
}

// ─── FAQ Page Schema ──────────────────────────────────────────────────────────
export function generateFaqPageSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── Breadcrumb Schema ────────────────────────────────────────────────────────
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };
}

// ─── Article / Blog Post Schema ───────────────────────────────────────────────
export function generateArticleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.seoDescription,
    image: post.mainImage?.asset?.url
      ? [post.mainImage.asset.url]
      : [`${SITE_URL}/og-image.png`],
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Sunshine Micro Lending Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sunshine Micro Lending',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug?.current || post.slug}`,
    },
  };
}

// ─── Website Schema (Block 2 — sitewide) ─────────────────────────────────────
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Sunshine Micro Lending',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

// ─── Home FinancialProduct Schema (Block 3 — homepage only) ──────────────────
export function generateHomeFinancialProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Florida Payday Loan (Deferred Presentment)',
    provider: { '@id': `${SITE_URL}/#organization` },
    description:
      'Short-term payday loan for Florida residents. Borrow $100 to $500, repaid in a single payment within 7 to 31 days. Fee capped by Florida law at 10% of the amount borrowed plus a $5 verification fee. No rollovers permitted.',
    feesAndCommissionsSpecification:
      '10% of amount financed plus $5 verification fee (Florida statutory maximum). No rollover, renewal, or hidden fees.',
    areaServed: { '@type': 'State', name: 'Florida' },
    url: `${SITE_URL}/loan-options`,
  };
}
