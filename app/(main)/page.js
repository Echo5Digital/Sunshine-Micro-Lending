import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react';
import { CTASection } from '@/components/sections/CTASection';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateFaqPageSchema, generateHomeFinancialProductSchema } from '@/lib/seo/schema';

export const metadata = generatePageMetadata({
  title: 'Payday Loans Florida | Fast Cash Advance Online | Sunshine Micro Lending',
  description:
    'Apply online for a payday loan up to $500 anywhere in Florida. State-licensed lender, transparent fees (10% + $5), fast decisions, no hidden charges.',
  path: '/',
  image: '/images/og-home.jpg',
  keywords: ['payday loans Florida', 'online payday loans FL', 'cash advance Florida', 'emergency loans Florida'],
  ogTitle: 'Payday Loans Florida | Sunshine Micro Lending',
  ogDescription: 'Fast, transparent payday loans up to $500 for Florida residents. Licensed, no hidden fees.',
  twitterTitle: 'Payday Loans Florida | Sunshine Micro Lending',
  twitterDescription: 'Fast, transparent payday loans up to $500 for Florida residents.',
});

const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Apply Online',
    description:
      'Fill out our short application from your phone or computer. You\'ll need to be a Florida resident, 18 or older, with a steady income and an active checking account.',
    icon: Zap,
  },
  {
    step: '02',
    title: 'Get a Fast Decision',
    description:
      'We verify your identity and check Florida\'s state lending database (state law allows one payday loan at a time). Most applicants get a decision the same day.',
    icon: Shield,
  },
  {
    step: '03',
    title: 'Receive Your Funds',
    description:
      'Once approved and signed, your money is sent directly to your bank account. Repayment is due on your scheduled date, 7 to 31 days later — one payment, no rollovers.',
    icon: CheckCircle,
  },
];

const FEE_EXAMPLES = [
  { borrow: '$100', fee: '$15', repay: '$115' },
  { borrow: '$300', fee: '$35', repay: '$335' },
  { borrow: '$500', fee: '$55', repay: '$555' },
];

const FEATURED_FAQS = [
  {
    q: 'How much can I borrow with a payday loan in Florida?',
    a: 'Florida law caps payday loans at $500 per loan. At Sunshine Micro Lending you can borrow between $100 and $500, based on your income and eligibility.',
  },
  {
    q: 'How many payday loans can I have at once in Florida?',
    a: 'One. Florida maintains a statewide database of active payday loans, and lenders must check it before funding. If you have an open payday loan anywhere in Florida, a new one cannot be issued until it is paid off, plus a 24-hour waiting period.',
  },
  {
    q: 'What happens if I can\'t repay my payday loan on time in Florida?',
    a: 'If you notify the lender before your due date that you cannot pay, Florida law requires a 60-day grace period with no additional fees or interest, provided you complete credit counseling with an approved agency. Payday loan rollovers are illegal in Florida.',
  },
  {
    q: 'Is Sunshine Micro Lending a licensed payday lender?',
    a: 'Yes. Sunshine Micro Lending is licensed as a deferred presentment provider by the Florida Office of Financial Regulation. The license can be verified on the OFR\'s public database.',
  },
];

export default async function HomePage() {
  const financialProductSchema = generateHomeFinancialProductSchema();
  const faqSchema = generateFaqPageSchema(
    FEATURED_FAQS.map((f) => ({ question: f.q, answer: f.a }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Mount scroll-reveal observer (client component, renders nothing) */}
      <ScrollReveal />

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative -mt-[7.375rem] flex min-h-screen flex-col overflow-hidden md:-mt-[10.375rem]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-florida-payday-loan-application.webp')" }}
          aria-hidden="true"
        />
        {/* Dark overlay — left side heavier, right side lighter to reveal image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/90 via-[#0A2540]/70 to-[#0A2540]/30" aria-hidden="true" />
        {/* Bottom fade for trust bar */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0A2540]/80 to-transparent" aria-hidden="true" />

        {/* ── Hero content ── */}
        <div className="container relative mx-auto flex flex-1 items-center px-4 py-24 sm:py-32 md:py-40">
          <div className="max-w-xl lg:max-w-2xl">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
              <Shield className="h-3.5 w-3.5 text-[#22C55E]" />
              Florida Licensed Payday Lender
            </div>

            {/* H1 */}
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Fast, Transparent{' '}
              <span className="block bg-gradient-to-r from-[#00A6FB] to-[#22C55E] bg-clip-text text-transparent">
                Payday Loans
              </span>
              <span className="block text-3xl font-bold text-white/90 sm:text-4xl md:text-5xl lg:text-6xl">
                for Florida Residents
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mb-8 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
              Borrow <strong className="text-white">$100–$500</strong> online with clear, capped
              fees and no surprises. Sunshine Micro Lending is a Florida-licensed lender. Apply
              in minutes from anywhere in the state.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              {/* Primary */}
              <Link
                href="/apply"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A6FB] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(0,166,251,0.45)] transition-all duration-200 hover:bg-[#0097e8] hover:shadow-[0_6px_28px_rgba(0,166,251,0.55)] active:scale-[0.97] sm:w-auto sm:text-base"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              {/* Secondary — ghost outlined */}
              <Link
                href="/rates-fees"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-white/20 active:scale-[0.97] sm:w-auto sm:text-base"
              >
                See Exact Fees
                <ArrowRight className="h-4 w-4 opacity-70" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Trust bar (dark strip, inside hero, pinned to bottom) ── */}
        <div className="relative border-t border-white/10 bg-[#0A2540]/70 py-5 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
              {[
                { text: 'Florida State-Licensed Lender' },
                { text: 'Fees Capped by Law: 10% + $5' },
                { text: 'No Rollovers, No Hidden Charges' },
                { text: '100% Online — All 67 Florida Counties' },
              ].map((item, i) => (
                <li
                  key={item.text}
                  className={`flex items-center justify-center gap-2.5 text-center text-sm font-medium text-white/85${i < 3 ? ' lg:border-r lg:border-white/10' : ''}`}
                >
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#22C55E]" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────────────── */}
      {/* Light section — pure white with dark step numbers for contrast */}
      <section className="section-padding relative overflow-hidden bg-white" id="how-it-works">
        {/* Subtle decorative top border gradient */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00A6FB]/30 to-transparent" />

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center" data-animate>
            <span className="section-label mb-4">How It Works</span>
            <h2 className="mt-4 text-2xl font-semibold text-[#0A2540] sm:text-3xl md:text-4xl">
              How Do Payday Loans Work at Sunshine Micro Lending?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Getting a payday loan with us takes three simple steps — most applicants finish in under 10 minutes.
            </p>
          </div>

          {/* Steps — 3 columns */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div key={step.step} className="relative" data-animate data-delay={String(idx + 1)}>
                <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center shadow-[0_2px_12px_rgba(10,37,64,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00A6FB]/50 hover:shadow-[0_8px_32px_rgba(0,166,251,0.14)] md:p-8">
                  {/* Top accent line — animates width on hover */}
                  <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#00A6FB] via-[#3B82F6] to-[#00A6FB] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Step number — dark pill */}
                  <div className="mb-4 inline-flex items-center justify-center rounded-full bg-[#0A2540] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
                    Step {step.step}
                  </div>
                  {/* Icon container — dark on hover */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF] transition-colors duration-300 group-hover:bg-[#0A2540]">
                    <step.icon className="h-6 w-6 text-[#00A6FB] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  {/* Title */}
                  <h3 className="mb-3 text-lg font-semibold text-[#0A2540]">{step.title}</h3>
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center" data-animate>
            <Link
              href="/apply"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A6FB] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,166,251,0.35)] transition-all hover:bg-[#0097e8] hover:shadow-[0_6px_20px_rgba(0,166,251,0.45)] active:scale-[0.97] sm:w-auto sm:justify-start"
            >
              Start Your Application
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A6FB] underline-offset-4 hover:underline"
            >
              Read the full step-by-step process
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOUR LOAN COSTS ────────────────────────────────── */}
      {/* Dark navy section — strong brand contrast */}
      <section className="section-padding relative overflow-hidden bg-[#0A2540]">
        {/* Mesh texture overlay */}
        <div className="absolute inset-0 bg-mesh-pattern opacity-40" aria-hidden="true" />
        {/* Subtle radial glow top-right */}
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#00A6FB]/10 blur-3xl" aria-hidden="true" />
        {/* Subtle radial glow bottom-left */}
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#22C55E]/8 blur-3xl" aria-hidden="true" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl">

            {/* Header */}
            <div className="mb-8 text-center" data-animate>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm mb-4">
                What Your Loan Costs
              </span>
              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                What Does a Payday Loan Cost in Florida?
              </h2>
            </div>

            {/* Fee transparency card */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.3)] backdrop-blur-sm" data-animate-scale>
              {/* Card top accent */}
              <div className="bg-gradient-to-r from-[#00A6FB] to-[#3B82F6] px-6 py-4 sm:px-8">
                <p className="text-sm font-semibold text-white/90 sm:text-base">
                  Florida law caps payday loan fees at{' '}
                  <strong className="text-white">10% of the amount borrowed, plus a $5 state verification fee</strong>
                  {' '}— and that&apos;s exactly what you pay at Sunshine Micro Lending. There is no interest on
                  top, no rollover fees, and no hidden charges.{' '}
                  <strong className="text-white">A payday loan in Florida may never exceed $500.</strong>
                </p>
              </div>

              <div className="p-6 sm:p-8">
                {/* Fee table */}
                <div className="overflow-hidden rounded-xl border border-white/10">
                  {/* Table header */}
                  <div className="grid grid-cols-3 bg-white/10 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white/70 sm:px-6">
                    <span>You Borrow</span>
                    <span className="text-center">Fee (10% + $5)</span>
                    <span className="text-right">You Repay</span>
                  </div>
                  {/* Table rows */}
                  {FEE_EXAMPLES.map((row, i) => (
                    <div
                      key={row.borrow}
                      className={`grid grid-cols-3 px-4 py-4 text-sm sm:px-6 sm:text-base transition-colors duration-200 hover:bg-white/5 ${
                        i < FEE_EXAMPLES.length - 1 ? 'border-b border-white/10' : ''
                      } bg-transparent`}
                    >
                      <span className="font-semibold text-white">{row.borrow}</span>
                      <span className="text-center font-semibold text-[#00A6FB]">{row.fee}</span>
                      <span className="text-right font-bold text-[#22C55E]">{row.repay}</span>
                    </div>
                  ))}
                </div>

                {/* Below-table note */}
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  Repayment is a single payment due on your scheduled date, 7–31 days after funding.
                </p>
                <p className="mt-1 text-xs text-white/40">
                  [APR disclosure line — supplied by counsel — goes here in small print.]
                </p>

                {/* CTA link */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <Link
                    href="/rates-fees"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A6FB] underline-offset-4 hover:underline"
                  >
                    See our full Rates &amp; Fees page
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOAN OPTIONS ────────────────────────────────────────── */}
      {/* Light section — clean white, cards pop with stronger shadows */}
      <section className="section-padding relative overflow-hidden bg-white">
        {/* Decorative top gradient line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#22C55E]/30 to-transparent" />

        <div className="container mx-auto px-4">
          <div className="mb-10 text-center" data-animate>
            <span className="section-label mb-4">Loan Options</span>
            <h2 className="mt-4 text-2xl font-semibold text-[#0A2540] sm:text-3xl md:text-4xl">
              Payday Loan Options for Florida Residents
            </h2>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">

            {/* Card 1 — Single-Payment */}
            <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#BFDBFE] bg-white shadow-[0_4px_20px_rgba(0,166,251,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00A6FB]/60 hover:shadow-[0_12px_40px_rgba(0,166,251,0.18)]" data-animate data-delay="1">
              {/* Top accent — thicker, with shimmer effect */}
              <div className="h-2 bg-gradient-to-r from-[#00A6FB] via-[#3B82F6] to-[#00A6FB] bg-[length:200%_100%]" />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                {/* Badge */}
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-[#0A2540] px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Single-Payment
                </span>
                <h3 className="mb-3 text-xl font-bold text-[#0A2540]">Single-Payment Payday Loan</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Borrow <strong className="text-[#0A2540]">$100–$500</strong> and repay in one
                  payment on your next payday, <strong className="text-[#0A2540]">7–31 days</strong> out.
                </p>
                {/* Fee callout — dark treatment */}
                <div className="mb-4 rounded-xl border border-[#0A2540]/10 bg-[#0A2540] p-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#00A6FB]">Fee</div>
                  <div className="mt-1 text-lg font-bold text-white">10% of loan + $5</div>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Best for covering a short gap until your paycheck arrives.
                </p>
                <div className="mt-auto">
                  <Link
                    href="/loan-options"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A6FB] underline-offset-4 hover:underline"
                  >
                    Compare loan options
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 — Installment */}
            <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#BBF7D0] bg-white shadow-[0_4px_20px_rgba(34,197,94,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#22C55E]/60 hover:shadow-[0_12px_40px_rgba(34,197,94,0.18)]" data-animate data-delay="2">
              {/* Top accent */}
              <div className="h-2 bg-gradient-to-r from-[#22C55E] via-[#16A34A] to-[#22C55E] bg-[length:200%_100%]" />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                {/* Badge — dark green */}
                <span className="mb-4 inline-flex w-fit items-center rounded-full bg-[#14532d] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#22C55E]">
                  Installment
                </span>
                <h3 className="mb-3 text-xl font-bold text-[#0A2540]">Installment Payday Loan</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Need more time? Repay over{' '}
                  <strong className="text-[#0A2540]">60–90 days</strong> in scheduled biweekly or monthly payments.
                </p>
                {/* Fee callout — dark green treatment */}
                <div className="mb-4 rounded-xl border border-[#14532d]/20 bg-[#14532d] p-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#22C55E]">Fee</div>
                  <div className="mt-1 text-lg font-bold text-white">8% of outstanding balance biweekly</div>
                  <div className="mt-0.5 text-xs text-[#22C55E]/70">Capped by Florida law</div>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Fees are capped by Florida law at 8% of your outstanding balance biweekly.
                </p>
                <div className="mt-auto">
                  <Link
                    href="/loan-options"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#16A34A] underline-offset-4 hover:underline"
                  >
                    Compare loan options
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ───────────────────────────────────────── */}
      {/* Deep blue-slate section — alternates with white */}
      <section className="section-padding relative overflow-hidden bg-[#0d1f35]">
        {/* Subtle radial glow */}
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A6FB]/8 blur-3xl" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00A6FB]/40 to-transparent" />

        <div className="container relative mx-auto px-4">

          {/* Header */}
          <div className="mb-12 text-center" data-animate>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm mb-4">
              Why Borrowers Choose Us
            </span>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
              Why Choose Sunshine Micro Lending?
            </h2>
          </div>

          {/* Four columns */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* 1 — Licensed & Regulated */}
            <div className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00A6FB]/40 hover:bg-white/8 hover:shadow-[0_8px_32px_rgba(0,166,251,0.15)]" data-animate data-delay="1">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00A6FB]/20 transition-colors duration-300 group-hover:bg-[#00A6FB]">
                <Shield className="h-5 w-5 text-[#00A6FB] transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Licensed &amp; Regulated</h3>
              <p className="text-sm leading-relaxed text-white/60">
                We&apos;re licensed by the Florida Office of Financial Regulation and follow every
                borrower protection in Florida law — including the ones most lenders don&apos;t advertise.
              </p>
            </div>

            {/* 2 — Total Fee Transparency */}
            <div className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00A6FB]/40 hover:bg-white/8 hover:shadow-[0_8px_32px_rgba(0,166,251,0.15)]" data-animate data-delay="2">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00A6FB]/20 transition-colors duration-300 group-hover:bg-[#00A6FB]">
                <CheckCircle className="h-5 w-5 text-[#00A6FB] transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Total Fee Transparency</h3>
              <p className="text-sm leading-relaxed text-white/60">
                The fee you see is the fee you pay. Our costs match Florida&apos;s legal caps exactly,
                published right on this site.
              </p>
            </div>

            {/* 3 — Built-In Borrower Protections */}
            <div className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#22C55E]/40 hover:bg-white/8 hover:shadow-[0_8px_32px_rgba(34,197,94,0.15)]" data-animate data-delay="3">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#22C55E]/20 transition-colors duration-300 group-hover:bg-[#22C55E]">
                <CheckCircle className="h-5 w-5 text-[#22C55E] transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Built-In Borrower Protections</h3>
              <p className="text-sm leading-relaxed text-white/60">
                If you can&apos;t repay on time and tell us before your due date, Florida law gives you a{' '}
                <strong className="text-white">60-day grace period with zero additional fees</strong>.
                We honor it — and we explain it up front.
              </p>
            </div>

            {/* 4 — Fast & Fully Online */}
            <div className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00A6FB]/40 hover:bg-white/8 hover:shadow-[0_8px_32px_rgba(0,166,251,0.15)]" data-animate data-delay="4">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00A6FB]/20 transition-colors duration-300 group-hover:bg-[#00A6FB]">
                <Zap className="h-5 w-5 text-[#00A6FB] transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-white">Fast &amp; Fully Online</h3>
              <p className="text-sm leading-relaxed text-white/60">
                Apply, sign, and receive funds without leaving home. We serve every county in Florida.
              </p>
            </div>

          </div>

          {/* Text link */}
          <div className="mt-10 text-center" data-animate>
            <Link
              href="/borrower-rights"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A6FB] underline-offset-4 hover:underline"
            >
              Know your rights as a Florida borrower
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ─── FAQ PREVIEW ─────────────────────────────────────────── */}
      {/* Light section — alternates after dark Why Choose Us */}
      <section className="section-padding relative overflow-hidden bg-[#F8FAFC]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00A6FB]/20 to-transparent" />

        <div className="container relative mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center" data-animate>
            <span className="section-label mb-4">Common Questions</span>
            <h2 className="mt-4 text-2xl font-semibold text-[#0A2540] sm:text-3xl md:text-4xl">
              Common Questions About Florida Payday Loans
            </h2>
          </div>

          {/* FAQ grid — 2 columns on md+, 1 column on mobile */}
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
            {FEATURED_FAQS.map((faq, idx) => (
              <div
                key={faq.q}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_2px_10px_rgba(10,37,64,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:bg-[#0A2540] hover:shadow-[0_12px_40px_rgba(10,37,64,0.22)]"
                data-animate
                data-delay={String(idx + 1)}
              >
                {/* Top accent line — appears on hover */}
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#00A6FB] via-[#3B82F6] to-[#22C55E] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Number badge */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF] text-sm font-bold text-[#00A6FB] ring-1 ring-[#BFDBFE] transition-all duration-300 group-hover:bg-[#00A6FB] group-hover:text-white group-hover:ring-[#00A6FB]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-[#E2E8F0] transition-colors duration-300 group-hover:bg-white/20" />
                </div>

                {/* Question */}
                <h3 className="mb-3 text-base font-semibold leading-snug text-[#0A2540] transition-colors duration-300 group-hover:text-white">
                  {faq.q}
                </h3>

                {/* Answer */}
                <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white/70">
                  {faq.a}
                </p>

                {/* Bottom glow — appears on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A6FB]/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center" data-animate>
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A6FB] underline-offset-4 hover:underline"
            >
              See all FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ───────────────────────────────────────────── */}
      <CTASection
        heading="Ready When You Are"
        subheading="Apply in minutes. Clear fees, fast decisions, and the borrower protections Florida law promises you — all in one place."
        subLine="Questions first? Call us at +1-800-SUNSHINE or read How It Works."
      />
    </>
  );
}
