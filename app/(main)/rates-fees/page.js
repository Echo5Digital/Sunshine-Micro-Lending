import Link from 'next/link';
import { Info, CheckCircle, AlertCircle } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTASection } from '@/components/sections/CTASection';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateFinancialProductSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { calculateLoanFee, calculateAPR, formatCurrency } from '@/lib/utils';

export const metadata = generatePageMetadata({
  title: 'Payday Loan Rates & Fees in Florida | Transparent Pricing',
  description:
    'See exactly what you will pay for a payday loan from Sunshine Micro Lending. Simple 10% fee + $5 verification. No hidden fees. APR examples included.',
  path: '/rates-fees',
  keywords: ['payday loan rates Florida', 'payday loan fees', 'payday loan APR Florida', 'loan fee calculator'],
});

const FEE_EXAMPLES = [100, 150, 200, 250, 300, 350, 400, 450, 500].map((amount) => {
  const calc = calculateLoanFee(amount);
  return {
    amount,
    ...calc,
    apr14: calculateAPR(amount, calc.totalFee, 14),
    apr30: calculateAPR(amount, calc.totalFee, 30),
  };
});

const WHAT_WE_CHARGE = [
  {
    item: 'Loan Fee',
    amount: '10% of principal',
    example: '$30 on a $300 loan',
    notes: 'Set by Florida law (maximum)',
  },
  {
    item: 'Verification Fee',
    amount: '$5 flat',
    example: '$5 on every loan',
    notes: 'Required database check',
  },
];

const WHAT_WE_NEVER_CHARGE = [
  'Application fees',
  'Early repayment penalties',
  'Rollover fees',
  'Extension fees',
  'Late fees during the 60-day grace period',
  'NSF fees (returned payment fees)',
];

export default function RatesFeesPage() {
  const breadcrumbs = [{ name: 'Rates & Fees', href: '/rates-fees' }];
  const bSchema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }, ...breadcrumbs]);
  const productSchema = generateFinancialProductSchema({
    name: 'Florida Payday Loan',
    description: 'Transparent payday loans in Florida with simple fee structure.',
    type: 'single_payment',
    minAmount: 100,
    maxAmount: 500,
    termMin: 7,
    termMax: 31,
    feePercentage: 10,
    verificationFee: 5,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-3xl">
            <span className="section-label mb-4">Full Transparency</span>
            <h1 className="mt-4 text-3xl font-bold text-[#0A2540] sm:text-4xl md:text-5xl">
              Rates & Fees: Nothing Hidden
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              We believe you should know exactly what a loan costs before you apply.
              Here is every fee, explained clearly and completely.
            </p>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* What We Charge */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-[#0A2540]">What We Charge</h2>
              <div className="space-y-4">
                {WHAT_WE_CHARGE.map((item) => (
                  <div key={item.item} className="rounded-xl border border-border bg-[#F8FAFC] p-5">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-[#0A2540]">{item.item}</h3>
                      <span className="rounded-full bg-[#0A2540] px-3 py-0.5 text-xs font-bold text-white whitespace-nowrap">
                        {item.amount}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.notes}</p>
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2 border border-border">
                      <Info className="h-3.5 w-3.5 shrink-0 text-[#00A6FB]" />
                      <span className="text-xs font-medium text-[#0A2540]">Example: {item.example}</span>
                    </div>
                  </div>
                ))}

                {/* Total formula */}
                <div className="rounded-xl border-2 border-[#00A6FB] bg-[#00A6FB]/5 p-5">
                  <h3 className="mb-2 font-semibold text-[#0A2540]">Total Cost Formula</h3>
                  <div className="font-mono text-sm">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="mx-2 text-[#00A6FB]">+</span>
                    <span className="text-muted-foreground">(10% × Loan Amount)</span>
                    <span className="mx-2 text-[#00A6FB]">+</span>
                    <span className="text-muted-foreground">$5</span>
                    <span className="mx-2 text-[#0A2540] font-bold">=</span>
                    <span className="font-bold text-[#0A2540]">Total Repayment</span>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground">
                    Example: $300 + $30 + $5 = <strong className="text-[#0A2540]">$335</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* What We Never Charge */}
            <div>
              <h2 className="mb-6 text-2xl font-semibold text-[#0A2540]">What We Never Charge</h2>
              <div className="rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/5 p-6">
                <ul className="space-y-3">
                  {WHAT_WE_NEVER_CHARGE.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 shrink-0 text-[#16A34A]" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* APR Explanation */}
              <div className="mt-6 rounded-xl border border-border bg-[#F8FAFC] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-[#00A6FB]" />
                  <h3 className="font-semibold text-[#0A2540]">About APR (Annual Percentage Rate)</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Florida law requires us to disclose APR. Because payday loans are short-term (7–31 days),
                  the APR appears very high when annualized, even though the actual dollar cost is fixed and
                  transparent. A $300 loan for 14 days costs $35 total, regardless of what the APR figure says.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  APR for a 14-day $300 loan: approximately <strong className="text-[#0A2540]">
                    {calculateAPR(300, calculateLoanFee(300).totalFee, 14)}%
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Fee Table */}
      <section className="section-padding-sm bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-semibold text-[#0A2540]">
            Complete Fee Table: All Loan Amounts
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0A2540] text-white">
                  <th className="px-5 py-4 text-left font-semibold">Loan Amount</th>
                  <th className="px-5 py-4 text-left font-semibold">10% Fee</th>
                  <th className="px-5 py-4 text-left font-semibold">Verification Fee</th>
                  <th className="px-5 py-4 text-left font-semibold">Total Fee</th>
                  <th className="px-5 py-4 text-left font-semibold">Total Repayment</th>
                  <th className="px-5 py-4 text-left font-semibold">APR (14 days)</th>
                  <th className="px-5 py-4 text-left font-semibold">APR (30 days)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {FEE_EXAMPLES.map((row, index) => (
                  <tr key={row.amount} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                    <td className="px-5 py-3.5 font-semibold text-[#0A2540]">{formatCurrency(row.amount)}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{formatCurrency(row.percentFee)}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{formatCurrency(row.verificationFee)}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{formatCurrency(row.totalFee)}</td>
                    <td className="px-5 py-3.5 font-bold text-[#0A2540]">{formatCurrency(row.totalRepayment)}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.apr14}%</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{row.apr30}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            APR is displayed as required by Florida law. Actual dollar cost is fixed as shown above.
          </p>
        </div>
      </section>

      {/* Compliance Note */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-[#F8FAFC] p-6">
            <h3 className="mb-3 font-semibold text-[#0A2540]">Florida Regulatory Compliance</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All fees charged by Sunshine Micro Lending are within the limits set by Florida
              Statute 560.404. Maximum fee is 10% of the check amount. Maximum verification fee is $5.00.
              Maximum loan amount is $500.
              No rollovers permitted. One active loan per borrower at any time.{' '}
              <Link href="/borrower-rights" className="text-[#00A6FB] hover:underline">
                Learn more about your borrower rights.
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CTASection
        heading="Know Exactly What You'll Pay"
        subheading="Apply now and see your personalized fee quote before you commit. Zero obligation."
      />
    </>
  );
}
