import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Clock, Shield, DollarSign, Star, Zap, Lock, Users } from 'lucide-react';
import { TrustBar } from '@/components/sections/TrustBar';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTASection } from '@/components/sections/CTASection';
import { LoanCalculator } from '@/components/sections/LoanCalculator';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateLocalBusinessSchema, generateWebsiteSchema } from '@/lib/seo/schema';

export const metadata = generatePageMetadata({
  title: 'Fast Payday Loans in Florida | Up to $500',
  description:
    'Sunshine Micro Lending offers transparent payday loans in Florida. Up to $500. Simple 10% fee + $5 verification. Florida licensed lender. Apply online today.',
  path: '/',
  keywords: ['payday loans Florida', 'online payday loans FL', 'cash advance Florida', 'emergency loans Florida'],
});

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Apply Online',
    description: 'Complete our secure application in minutes. No lengthy paperwork.',
    icon: Zap,
  },
  {
    step: '02',
    title: 'Quick Verification',
    description: 'We verify your identity and information quickly and securely.',
    icon: Shield,
  },
  {
    step: '03',
    title: 'Get Approved',
    description: 'Receive your lending decision. Review your exact fees before accepting.',
    icon: CheckCircle,
  },
  {
    step: '04',
    title: 'Repay Simply',
    description: 'Repay on your scheduled date. 60-day grace period available at no extra cost.',
    icon: Clock,
  },
];

const FEATURES = [
  {
    icon: DollarSign,
    title: 'Up to $500',
    description: 'Borrow between $100 and $500 to cover your short-term needs.',
  },
  {
    icon: CheckCircle,
    title: 'Transparent Fees',
    description: 'Simple 10% fee plus $5 verification. No hidden charges ever.',
  },
  {
    icon: Clock,
    title: '60-Day Grace Period',
    description: 'Need more time? Take up to 60 days with no additional fees.',
  },
  {
    icon: Shield,
    title: 'Florida Licensed',
    description: 'Regulated by the Florida Office of Financial Regulation (OFR).',
  },
  {
    icon: Lock,
    title: 'Bank-Level Security',
    description: 'Your data is encrypted and protected at every step.',
  },
  {
    icon: Users,
    title: 'One Loan at a Time',
    description: 'We follow Florida law: one active loan per borrower at all times.',
  },
];

const LOAN_HIGHLIGHTS = [
  { label: 'Max Loan', value: '$500', description: 'Single borrower limit' },
  { label: 'Fee Rate', value: '10%', description: '+ $5 verification fee' },
  { label: 'Single Payment', value: '7–31 days', description: 'Short-term option' },
  { label: 'Installment', value: '60–90 days', description: 'Extended option' },
];

const FEATURED_FAQS = [
  {
    q: 'How much can I borrow?',
    a: 'Florida law limits payday loans to a maximum of $500 per loan. You may borrow between $100 and $500.',
  },
  {
    q: 'What are the fees?',
    a: 'Our fee is 10% of the loan amount plus a $5 verification fee. For example, a $300 loan costs $35 in fees for a total repayment of $335.',
  },
  {
    q: 'How long do I have to repay?',
    a: 'Single payment loans are 7–31 days. Installment loans are 60–90 days. If you need more time, a 60-day grace period is available at no extra cost.',
  },
  {
    q: 'What if I have multiple active loans?',
    a: 'Florida law only permits one active payday loan at a time. We verify this through the Florida statewide database before approving any application.',
  },
];

export default async function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#0d3060] to-[#0d3a7a] py-20 md:py-28">
        {/* Background mesh */}
        <div className="absolute inset-0 bg-mesh-pattern opacity-[0.04]" aria-hidden="true" />
        {/* Gradient orbs */}
        <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#00A6FB]/10 blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 -translate-x-1/2 rounded-full bg-[#22C55E]/10 blur-3xl" aria-hidden="true" />

        <div className="container relative mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90">
                <Shield className="h-3.5 w-3.5 text-[#22C55E]" />
                Florida Licensed Payday Lender
              </div>

              {/* Headline */}
              <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Fast. Simple.{' '}
                <span className="bg-gradient-to-r from-[#00A6FB] to-[#22C55E] bg-clip-text text-transparent">
                  Transparent.
                </span>
                <br />
                Payday Loans in Florida
              </h1>

              {/* Subheadline */}
              <p className="mb-8 text-lg leading-relaxed text-white/75 md:text-xl">
                Get up to <strong className="text-white">$500</strong> with a simple{' '}
                <strong className="text-white">10% fee + $5</strong>. No hidden charges,
                no rollovers. A Florida licensed lender you can trust.
              </p>

              {/* Trust indicators */}
              <div className="mb-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                {['Up to $500', 'No Hidden Fees', '60-Day Grace Period', 'Online Only'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                    {item}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/apply"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A6FB] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-[#0097e8] hover:shadow-xl active:scale-[0.98] sm:w-auto"
                >
                  Apply Now — Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 sm:w-auto"
                >
                  How It Works
                </Link>
              </div>
            </div>

            {/* Right: Calculator */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
              <LoanCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─────────────────────────────────────────────── */}
      <TrustBar />

      {/* ─── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="section-padding bg-white" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="section-label mb-4">Simple Process</span>
            <h2 className="mt-4 text-3xl font-semibold text-[#0A2540] md:text-4xl">
              How Does a Payday Loan Work at Sunshine?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our online application takes minutes. No branch visits, no fax required.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-full -translate-y-1/2 bg-gradient-to-r from-[#00A6FB]/40 to-transparent lg:block" aria-hidden="true" />
                )}

                <div className="relative flex flex-col items-center rounded-2xl border border-border bg-[#F8FAFC] p-6 text-center transition-all duration-300 hover:border-[#00A6FB]/40 hover:shadow-card">
                  {/* Step number */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A2540] shadow-sm">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="mb-2 text-xs font-bold uppercase tracking-widest text-[#00A6FB]">
                    Step {step.step}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-[#0A2540]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00A6FB] hover:underline">
              Learn more about the process
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── LOAN HIGHLIGHTS ─────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {LOAN_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center shadow-card"
              >
                <div className="mb-1 text-3xl font-bold text-[#00A6FB] md:text-4xl">{item.value}</div>
                <div className="mb-1 text-sm font-semibold text-[#0A2540]">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <span className="section-label mb-4">Why Sunshine?</span>
            <h2 className="mt-4 text-3xl font-semibold text-[#0A2540] md:text-4xl">
              Built on Transparency and Trust
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We&apos;re a Florida-licensed lender that follows every state regulation—and then goes further.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 rounded-2xl border border-border bg-[#F8FAFC] p-6 transition-all duration-300 hover:border-[#00A6FB]/40 hover:shadow-card"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0A2540]">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="mb-1.5 font-semibold text-[#0A2540]">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────── */}
      <Testimonials />

      {/* ─── FAQ PREVIEW ─────────────────────────────────────────── */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Left: Header */}
            <div>
              <span className="section-label mb-4">Common Questions</span>
              <h2 className="mt-4 text-3xl font-semibold text-[#0A2540] md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-muted-foreground">
                Florida borrowers ask us these questions most often. For a complete list,
                visit our full FAQ page.
              </p>
              <Link
                href="/faq"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0A2540] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d3060]"
              >
                View All FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right: FAQ List */}
            <div className="space-y-4">
              {FEATURED_FAQS.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-xl border border-border bg-white p-5 shadow-card"
                >
                  <h3 className="mb-2 font-semibold text-[#0A2540]">{faq.q}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────── */}
      <CTASection
        heading="Apply for Your Florida Payday Loan"
        subheading="Complete our secure online application. See your exact fees before you commit. No surprises."
      />
    </>
  );
}
