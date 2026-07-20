import Link from 'next/link';
import { ArrowRight, FileText, UserCheck, ThumbsUp, CreditCard, AlertCircle, Clock, Phone } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTASection } from '@/components/sections/CTASection';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata = generatePageMetadata({
  title: 'How Our Payday Loan Process Works',
  description:
    'Learn how Sunshine Micro Lending works in 4 simple steps. Apply online, get verified, receive approval, and repay. Florida payday loans made simple.',
  path: '/how-it-works',
  keywords: ['how payday loans work Florida', 'payday loan process', 'apply for payday loan'],
});

const STEPS = [
  {
    number: '01',
    icon: FileText,
    title: 'How Do I Apply Online?',
    description:
      'Complete our secure online application form. You&apos;ll provide basic personal information, employment details, and your desired loan amount (up to $500). The application typically takes 5–10 minutes.',
    details: [
      'Personal information (name, address, phone, email)',
      'Employment status and income information',
      'Active checking account confirmation',
      'Desired loan amount between $100 and $500',
    ],
  },
  {
    number: '02',
    icon: UserCheck,
    title: 'What Happens During Verification?',
    description:
      'We verify your identity and eligibility according to Florida law. This includes checking the Florida statewide database to confirm you do not have another active payday loan. The $5 verification fee covers this compliance step.',
    details: [
      'Identity verification for fraud prevention',
      'Florida statewide database check (required by law)',
      'Employment and income confirmation',
      'Active bank account verification',
    ],
  },
  {
    number: '03',
    icon: ThumbsUp,
    title: 'How Does Loan Approval Work?',
    description:
      'Once verified, you receive a lending decision. If approved, we present your loan agreement showing the exact loan amount, fees, and repayment date—before you commit. There is no obligation to accept.',
    details: [
      'Receive clear loan terms including exact fee breakdown',
      'Review and sign your loan agreement electronically',
      'No obligation until you sign and accept',
      'Funds disbursed upon acceptance',
    ],
  },
  {
    number: '04',
    icon: CreditCard,
    title: 'What Are My Repayment Options?',
    description:
      'Single payment loans are repaid in full on your agreed repayment date (7–31 days). Installment loans are repaid over 60–90 days in scheduled payments. If you need more time, a 60-day grace period is available.',
    details: [
      'Single payment on your scheduled date',
      'Installment payments (biweekly or monthly)',
      '60-day grace period at no additional cost',
      'No rollovers permitted under Florida law',
    ],
  },
];

const GRACE_PERIOD_DETAILS = [
  'Available to all borrowers at no extra charge',
  'Loan amount principal remains unchanged',
  'No additional interest or fees accrue',
  'You must request the grace period before the due date',
  'You must complete a financial counseling course during the grace period',
  'After 60 days, normal repayment resumes',
];

export default function HowItWorksPage() {
  const breadcrumbs = [{ name: 'How It Works', href: '/how-it-works' }];
  const schema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }, ...breadcrumbs]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-3xl">
            <span className="section-label mb-4">Simple Process</span>
            <h1 className="mt-4 text-4xl font-bold text-[#0A2540] md:text-5xl">
              How Sunshine Micro Lending Works
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              From application to repayment—a clear, step-by-step guide to our Florida payday loan process.
              No hidden steps, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 !== 0 ? 'lg:col-start-2' : ''}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-sm font-bold uppercase tracking-widest text-[#00A6FB]">
                      Step {step.number}
                    </span>
                  </div>
                  <h2 className="mb-4 text-2xl font-semibold text-[#0A2540] md:text-3xl">
                    {step.title}
                  </h2>
                  <p
                    className="mb-6 text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                  <ul className="space-y-2.5">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5 text-sm">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22C55E]/15">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" />
                        </div>
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className={`flex justify-center ${index % 2 !== 0 ? 'lg:col-start-1' : ''}`}>
                  <div className="flex h-56 w-56 flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-[#0A2540] to-[#00A6FB] shadow-premium">
                    <span className="mb-3 text-6xl font-bold text-white/20">{step.number}</span>
                    <step.icon className="h-14 w-14 text-white" />
                    <span className="mt-3 text-sm font-semibold text-white/80">{step.title.split('?')[0].split('Do')[1]?.trim() || step.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grace Period Section */}
      <section className="bg-[#F8FAFC] section-padding-sm">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl rounded-2xl border border-[#22C55E]/30 bg-white p-8 shadow-card">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#22C55E]/10">
                <Clock className="h-6 w-6 text-[#16A34A]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#0A2540]">
                  What Happens If I Can&apos;t Repay on Time?
                </h2>
                <p className="text-sm text-muted-foreground">The 60-Day Grace Period Explained</p>
              </div>
            </div>

            <p className="mb-6 text-muted-foreground">
              Florida law requires us to offer a 60-day grace period upon request. This means that if you
              cannot make your payment on the due date, you can request additional time at absolutely
              no additional cost—no extra fees, no penalty interest.
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {GRACE_PERIOD_DETAILS.map((detail) => (
                <div key={detail} className="flex items-start gap-2.5 text-sm">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                  <span className="text-muted-foreground">{detail}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-lg bg-[#F8FAFC] p-4">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00A6FB]" />
              <p className="text-xs text-muted-foreground">
                <strong className="text-[#0A2540]">Important:</strong> No rollovers, refinancing,
                or extensions are permitted under Florida law. The 60-day grace period is available
                once per loan at no additional charge. Contact us before your due date to request it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Requirements */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-semibold text-[#0A2540]">
              Who Qualifies for a Florida Payday Loan?
            </h2>
            <p className="mb-10 text-muted-foreground">
              To be eligible, you must meet all of the following requirements under Florida state law.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Florida Resident', detail: 'You must reside in Florida' },
              { label: '18 Years or Older', detail: 'Valid government-issued ID required' },
              { label: 'Active Bank Account', detail: 'Checking account in your name' },
              { label: 'Proof of Income', detail: 'Regular source of income' },
              { label: 'No Current Payday Loan', detail: 'One loan at a time under Florida law' },
              { label: '24-Hour Cooling Off', detail: 'After repaying previous loan' },
            ].map((req) => (
              <div
                key={req.label}
                className="flex items-start gap-3 rounded-xl border border-border bg-[#F8FAFC] p-5"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00A6FB]/10">
                  <div className="h-2 w-2 rounded-full bg-[#00A6FB]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[#0A2540]">{req.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{req.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#F8FAFC] py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Phone className="h-5 w-5 text-[#00A6FB]" />
            <h3 className="text-lg font-semibold text-[#0A2540]">Still have questions?</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Our team is available Monday–Friday 9AM–5PM EST to answer any questions.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="btn-outline text-sm"
            >
              Contact Us
            </Link>
            <Link
              href="/faq"
              className="btn-ghost text-sm"
            >
              Read Our FAQ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
