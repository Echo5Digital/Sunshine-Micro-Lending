import Link from 'next/link';
import { CheckCircle, ArrowRight, Clock, DollarSign, Calendar, Users } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTASection } from '@/components/sections/CTASection';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateFinancialProductSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { formatCurrency } from '@/lib/utils';

export const metadata = generatePageMetadata({
  title: 'Payday Loan Options in Florida | Single Payment & Installment',
  description:
    'Compare Sunshine Micro Lending loan options. Single payment loans (7–31 days) and installment loans (60–90 days). Up to $500. Simple 10% fee + $5 verification.',
  path: '/loan-options',
  keywords: ['payday loan options Florida', 'installment loan Florida', 'single payment loan', 'short term loan options'],
});

const LOAN_PRODUCTS = [
  {
    type: 'single_payment',
    name: 'Single Payment Loan',
    badge: 'Most Popular',
    badgeColor: 'bg-[#00A6FB]/10 text-[#00A6FB]',
    cardBorder: 'border-[#00A6FB]',
    description: 'Borrow what you need and repay in one payment. Perfect for covering an immediate gap until your next payday.',
    amount: { min: 100, max: 500 },
    term: { min: 7, max: 31, unit: 'days' },
    fee: '10% + $5',
    features: [
      'Online application — no branch visit',
      'Quick lending decision',
      'One-time repayment on your payday',
      'No prepayment penalties',
      '60-day grace period available',
      'No rollovers (Florida law)',
    ],
    examples: [
      { amount: 100, fee: 15, total: 115 },
      { amount: 200, fee: 25, total: 225 },
      { amount: 300, fee: 35, total: 335 },
      { amount: 400, fee: 45, total: 445 },
      { amount: 500, fee: 55, total: 555 },
    ],
  },
  {
    type: 'installment',
    name: 'Installment Loan',
    badge: 'Extended Terms',
    badgeColor: 'bg-[#22C55E]/10 text-[#16A34A]',
    cardBorder: 'border-border',
    description: 'Repay over 60–90 days with scheduled biweekly or monthly payments. More flexibility for larger needs.',
    amount: { min: 100, max: 500 },
    term: { min: 60, max: 90, unit: 'days' },
    fee: '10% + $5',
    features: [
      'Biweekly or monthly payment schedule',
      'Online application and management',
      '60–90 day repayment window',
      'No prepayment penalties',
      '60-day grace period available',
      'Structured payment plan',
    ],
    examples: [
      { amount: 200, fee: 25, total: 225, payments: '2 payments of ~$112.50' },
      { amount: 300, fee: 35, total: 335, payments: '2 payments of ~$167.50' },
      { amount: 400, fee: 45, total: 445, payments: '3 payments of ~$148.33' },
      { amount: 500, fee: 55, total: 555, payments: '3 payments of ~$185.00' },
    ],
  },
];

const ELIGIBILITY = [
  { icon: Users, label: 'Florida Resident', detail: 'You must live in Florida' },
  { icon: Calendar, label: 'Age 18+', detail: 'Must be 18 years or older' },
  { icon: DollarSign, label: 'Active Income', detail: 'Steady source of income' },
  { icon: CheckCircle, label: 'Bank Account', detail: 'Active checking account required' },
  { icon: Clock, label: 'No Active Loan', detail: 'One payday loan at a time (Florida law)' },
  { icon: Clock, label: '24-Hour Cooling Off', detail: 'After paying off previous loan' },
];

export default function LoanOptionsPage() {
  const breadcrumbs = [{ name: 'Loan Options', href: '/loan-options' }];
  const bSchema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }, ...breadcrumbs]);
  const p1Schema = generateFinancialProductSchema({
    name: 'Single Payment Payday Loan',
    description: 'Short-term payday loan repaid in one payment. Up to $500.',
    type: 'single_payment',
    minAmount: 100,
    maxAmount: 500,
    termMin: 7,
    termMax: 31,
    feePercentage: 10,
    verificationFee: 5,
  });
  const p2Schema = generateFinancialProductSchema({
    name: 'Installment Payday Loan',
    description: 'Payday loan repaid over 60–90 days in scheduled payments.',
    type: 'installment',
    minAmount: 100,
    maxAmount: 500,
    termMin: 60,
    termMax: 90,
    feePercentage: 10,
    verificationFee: 5,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(p1Schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(p2Schema) }} />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-3xl">
            <span className="section-label mb-4">Florida Payday Loans</span>
            <h1 className="mt-4 text-3xl font-bold text-[#0A2540] sm:text-4xl md:text-5xl">
              Loan Options for Florida Borrowers
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Two straightforward loan types. Both with the same transparent fee structure.
              Choose what fits your needs and repayment timeline.
            </p>
          </div>
        </div>
      </section>

      {/* Loan Products */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {LOAN_PRODUCTS.map((product) => (
              <article
                key={product.type}
                className={`flex flex-col rounded-2xl border-2 bg-white shadow-card overflow-hidden ${product.cardBorder}`}
              >
                {/* Card Header */}
                <div className="bg-[#F8FAFC] p-6 border-b border-border">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-xl font-bold text-[#0A2540]">{product.name}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-5">{product.description}</p>

                  {/* Quick stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center rounded-lg bg-white border border-border p-3">
                      <div className="text-sm font-bold text-[#0A2540]">${product.amount.min}–${product.amount.max}</div>
                      <div className="text-xs text-muted-foreground">Loan Range</div>
                    </div>
                    <div className="text-center rounded-lg bg-white border border-border p-3">
                      <div className="text-sm font-bold text-[#0A2540]">{product.term.min}–{product.term.max} days</div>
                      <div className="text-xs text-muted-foreground">Term</div>
                    </div>
                    <div className="text-center rounded-lg bg-white border border-border p-3">
                      <div className="text-sm font-bold text-[#0A2540]">{product.fee}</div>
                      <div className="text-xs text-muted-foreground">Fee</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="p-6">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#0A2540]">Features</h3>
                  <ul className="mb-6 space-y-2.5">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle className="h-4 w-4 shrink-0 text-[#22C55E]" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Fee Table */}
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#0A2540]">
                    Fee Examples
                  </h3>
                  <div className="overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#F8FAFC]">
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Amount</th>
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Fee</th>
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Total Repay</th>
                          {product.type === 'installment' && (
                            <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Payments</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {product.examples.map((ex) => (
                          <tr key={ex.amount} className="hover:bg-[#F8FAFC]/60">
                            <td className="px-4 py-2.5 font-medium text-[#0A2540]">{formatCurrency(ex.amount)}</td>
                            <td className="px-4 py-2.5 text-muted-foreground">{formatCurrency(ex.fee)}</td>
                            <td className="px-4 py-2.5 font-semibold text-[#0A2540]">{formatCurrency(ex.total)}</td>
                            {product.type === 'installment' && ex.payments && (
                              <td className="px-4 py-2.5 text-xs text-muted-foreground">{ex.payments}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-auto p-6 pt-0">
                  <Link
                    href="/apply"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A2540] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d3060]"
                  >
                    Apply for a {product.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section-padding-sm bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-[#0A2540] md:text-3xl">
              Eligibility Requirements
            </h2>
            <p className="mt-3 text-muted-foreground">All applicants must meet the following Florida requirements.</p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3">
            {ELIGIBILITY.map((req) => (
              <div key={req.label} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-card">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00A6FB]/10">
                  <req.icon className="h-4 w-4 text-[#00A6FB]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A2540]">{req.label}</p>
                  <p className="text-xs text-muted-foreground">{req.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to Choose Your Loan?"
        subheading="Apply online now. See your exact fees before signing. No surprises, no pressure."
      />
    </>
  );
}
