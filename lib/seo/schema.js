const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sunshinemicrolending.com';

// ─── Organization Schema ──────────────────────────────────────────────────────
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Sunshine Micro Lending',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.svg`,
      width: 200,
      height: 60,
    },
    description:
      'Florida licensed payday lender offering transparent, fast online loans up to $500. No hidden fees. 60-day grace period.',
    foundingLocation: {
      '@type': 'State',
      name: 'Florida',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'State',
      name: 'Florida',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: process.env.NEXT_PUBLIC_COMPANY_PHONE || '+1-800-SUNSHINE',
        contactType: 'customer support',
        availableLanguage: ['English', 'Spanish'],
        areaServed: 'US-FL',
      },
    ],
    sameAs: [],
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
      'Florida licensed online payday lender. Fast loans up to $500 with transparent fees and a 60-day grace period.',
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
          name: 'Installment Loan',
          description: 'Loans up to $500 with 60–90 day repayment terms',
          price: '5.00',
          priceCurrency: 'USD',
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

// ─── Website Schema ───────────────────────────────────────────────────────────
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Sunshine Micro Lending',
    url: SITE_URL,
    description: 'Florida licensed payday lender offering transparent online loans.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
