# Sunshine Micro Lending

Production-ready website for a Florida-licensed payday lender. Built with Next.js 15, PostgreSQL (Neon), Sanity CMS, Resend, and Tailwind CSS. Deployable to Vercel.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 App Router, React 19, Tailwind CSS |
| Language | JavaScript (JSDoc typed) |
| Database | PostgreSQL via Neon + Drizzle ORM |
| CMS | Sanity v3 |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Analytics | Google Analytics 4 + Microsoft Clarity |
| Hosting | Vercel |
| SEO | next-sitemap, Schema.org, OpenGraph |

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
# Fill in all required variables
```

### 3. Database Setup (Neon)

1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new project → copy the connection string
3. Add to `.env.local` as `DATABASE_URL`
4. Run migrations:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

### 4. Sanity CMS Setup

1. Create a Sanity account at [sanity.io](https://sanity.io)
2. Create a new project → copy Project ID
3. Add to `.env.local`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET=production`
   - `SANITY_API_TOKEN` (from sanity.io → API → Tokens)
4. Configure CORS in Sanity dashboard to allow your domain

### 5. Resend Email Setup

1. Create account at [resend.com](https://resend.com)
2. Add and verify your domain
3. Create an API key
4. Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in `.env.local`

### 6. Analytics Setup

**Google Analytics 4:**
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

**Google Search Console:**
1. Add property at [search.google.com/search-console](https://search.google.com/search-console)
2. Set `SEARCH_CONSOLE_VERIFICATION=your_code`

**Microsoft Clarity:**
1. Create project at [clarity.microsoft.com](https://clarity.microsoft.com)
2. Set `NEXT_PUBLIC_CLARITY_ID=your_id`

### 7. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

**Sanity Studio:** [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Project Structure

```
sunshine-micro-lending/
├── app/
│   ├── (main)/              # All public pages with Header/Footer
│   │   ├── page.js          # Homepage
│   │   ├── how-it-works/
│   │   ├── loan-options/
│   │   ├── rates-fees/
│   │   ├── faq/
│   │   ├── borrower-rights/
│   │   ├── apply/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   ├── privacy-policy/
│   │   └── terms-of-use/
│   ├── api/
│   │   ├── applications/    # Loan application submission
│   │   ├── contact/         # Contact form
│   │   ├── newsletter/      # Newsletter signup
│   │   └── health/          # Health check endpoint
│   ├── studio/              # Sanity Studio
│   ├── layout.js            # Root layout with analytics
│   ├── error.js
│   └── not-found.js
├── components/
│   ├── layout/              # Header, Footer, Breadcrumb, PageLayout
│   ├── ui/                  # Reusable UI primitives
│   ├── sections/            # Page sections (TrustBar, Testimonials, CTA, Calculator)
│   ├── forms/               # ApplicationForm, ContactForm
│   └── analytics/           # Analytics, CookieConsent
├── lib/
│   ├── db/                  # Drizzle database connection
│   ├── sanity/              # Sanity client, queries, image
│   ├── email/               # Resend email templates
│   ├── seo/                 # Schema markup, metadata helpers
│   ├── utils.js             # Utility functions
│   └── validations.js       # Zod schemas
├── drizzle/
│   ├── schema.js            # Database tables and enums
│   ├── migrations/          # Auto-generated migrations
│   └── seed.js              # Database seed data
├── sanity/
│   ├── schemas/             # Sanity document schemas
│   └── structure.js         # Studio structure
├── hooks/                   # React hooks
├── types/                   # JSDoc type definitions
├── public/                  # Static assets
├── middleware.js            # Rate limiting, bot protection
├── next.config.mjs          # Next.js config + security headers
├── tailwind.config.js       # Brand design system
├── drizzle.config.js        # Drizzle ORM config
├── sanity.config.js         # Sanity Studio config
├── next-sitemap.config.js   # Sitemap generation
└── vercel.json              # Deployment config
```

---

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Lint code
npm run format       # Format with Prettier
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Run pending migrations
npm run db:push      # Push schema changes (development)
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed initial database data
npm run sanity:dev   # Start Sanity Studio standalone
npm run sanity:build # Build Sanity Studio
npm run sanity:deploy # Deploy Sanity Studio to CDN
```

---

## Database Schema

| Table | Description |
|-------|-------------|
| `applications` | Loan applications with all required fields |
| `contacts` | Contact form submissions |
| `newsletter_subscribers` | Email newsletter signups |
| `blog_posts` | Blog post DB mirror from Sanity |
| `blog_categories` | Blog categories |
| `testimonials` | Customer testimonials |
| `site_settings` | Key-value site configuration |
| `audit_logs` | Audit trail for all operations |

---

## Sanity CMS Schemas

| Schema | Description |
|--------|-------------|
| `post` | Blog posts with SEO fields |
| `category` | Post categories |
| `author` | Post authors |
| `faq` | FAQ entries with categories |
| `loanProduct` | Loan product definitions |
| `testimonial` | Customer testimonials |
| `siteSettings` | Global site settings |
| `seoSettings` | Global SEO settings |

---

## Page Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, features, testimonials |
| `/how-it-works` | 4-step loan process explanation |
| `/loan-options` | Single payment vs installment loans |
| `/rates-fees` | Complete fee table and APR disclosure |
| `/faq` | 20+ FAQs with FAQPage schema |
| `/borrower-rights` | Florida borrower protections |
| `/apply` | Loan application form |
| `/about` | Company mission and compliance |
| `/contact` | Contact form and information |
| `/blog` | Blog listing (Sanity powered) |
| `/blog/[slug]` | Individual blog post |
| `/privacy-policy` | Privacy policy |
| `/terms-of-use` | Terms of service |
| `/studio` | Sanity CMS Studio |

---

## Deployment (Vercel)

### 1. Connect Repository

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Framework: **Next.js** (auto-detected)

### 2. Environment Variables

Add all variables from `.env.example` to Vercel project settings.

### 3. Deploy

```bash
# Vercel CLI
npx vercel --prod

# Or push to main branch (if auto-deploy enabled)
git push origin main
```

### 4. Post-Deployment

After first deployment:
1. Run database migration: `npm run db:migrate`
2. Run database seed: `npm run db:seed`
3. Deploy Sanity Studio: `npm run sanity:deploy`
4. Submit sitemap to Google Search Console
5. Verify GA4 is receiving data

---

## Security Checklist

- [x] Rate limiting on all API routes (middleware)
- [x] Zod validation on all form inputs
- [x] Input sanitization (XSS prevention)
- [x] Security headers (CSP, X-Frame-Options, HSTS)
- [x] Bot protection on apply page
- [x] Server-only secrets (server-only package)
- [x] Environment variable validation
- [x] HTTPS enforced (Vercel)
- [x] Secure cookies
- [x] SQL injection prevention (Drizzle ORM parameterized queries)
- [x] No sensitive data in client bundle

---

## SEO Checklist

- [x] Metadata API for every page
- [x] OpenGraph and Twitter cards
- [x] Canonical URLs
- [x] XML Sitemap (next-sitemap)
- [x] robots.txt
- [x] Organization schema
- [x] LocalBusiness schema
- [x] FAQPage schema (20+ FAQs)
- [x] FinancialProduct schema
- [x] BreadcrumbList schema
- [x] Article schema (blog posts)
- [x] WebSite schema with SearchAction
- [x] Google Search Console verification
- [x] Image optimization (next/image)
- [x] Core Web Vitals optimization

---

## Accessibility Checklist

- [x] Semantic HTML (main, nav, header, footer, article, section)
- [x] ARIA labels on interactive elements
- [x] ARIA roles on navigation
- [x] Focus-visible styles
- [x] Color contrast compliant (WCAG AA)
- [x] Skip to main content link
- [x] Form labels associated with inputs
- [x] Error messages with aria-describedby
- [x] Alt text required on images
- [x] Keyboard navigable (no mouse-only interactions)
- [x] Screen reader tested elements

---

## Florida Regulatory Compliance

This application enforces the following Florida Statute 560 requirements:

| Rule | Implementation |
|------|----------------|
| Max loan $500 | Validated in Zod schema + UI |
| Fee max 10% + $5 | Calculated in `lib/utils.js` |
| One active loan | Checked via state database (future) |
| No rollovers | Disclosed in all relevant pages |
| 60-day grace period | Prominently disclosed |
| 24-hour cooling off | Disclosed in eligibility requirements |
| APR disclosure | Shown in rates-fees page and calculator |

---

## Phase 2 Architecture (Future)

The following integrations are planned for Phase 2:

```
Phase 2 Additions:
├── Lending Platform Integration
│   ├── Automated underwriting decisions
│   ├── Loan origination system (LOS)
│   └── Digital loan agreement signing
├── Credit Bureau API
│   ├── Alternative data scoring
│   └── Fraud detection
├── ACH Processor
│   ├── Plaid bank verification
│   ├── Automated disbursement
│   └── Automated collection
└── Admin Dashboard
    ├── Application pipeline management
    ├── Reporting and compliance
    └── Customer management
```

---

## Contributing

This is a production application. Changes must be reviewed and tested before deployment.

1. Create feature branch from `main`
2. Make changes with proper documentation
3. Test locally
4. Submit pull request
5. Deploy to staging for review

---

## License

Proprietary. All rights reserved. Sunshine Micro Lending.
