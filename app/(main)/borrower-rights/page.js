import Link from 'next/link';
import { Shield, Clock, Ban, Database, AlertCircle, CheckCircle, Phone, ExternalLink } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata = generatePageMetadata({
  title: 'Florida Payday Loan Borrower Rights | Know Your Protections',
  description:
    'Understand your rights as a payday loan borrower in Florida. 60-day grace period, one-loan rule, no rollover protection, 24-hour cooling off, and how to file a complaint.',
  path: '/borrower-rights',
  keywords: ['Florida payday loan rights', 'borrower protections Florida', 'payday loan grace period', 'Florida OFR complaint'],
});

const RIGHTS = [
  {
    icon: Clock,
    color: 'bg-[#00A6FB]/10 text-[#00A6FB]',
    title: '60-Day Grace Period',
    subtitle: 'No Additional Fees',
    content: `Florida law (Statute 560.404) requires all licensed payday lenders to offer a 60-day grace period if you cannot repay your loan on time. During this grace period, the lender may not charge any additional fees, interest, or penalties. To access the grace period, you must request it from your lender before or on the due date. You will be required to enroll in and complete a consumer credit counseling program from a nonprofit credit counseling agency during the 60-day period.`,
    bullets: [
      'Available to all borrowers—no exceptions',
      'Zero additional fees during the grace period',
      'Must be requested before or on the due date',
      'Financial counseling required during the 60 days',
      'Lenders must accept the grace period if requested',
    ],
  },
  {
    icon: Shield,
    color: 'bg-[#22C55E]/10 text-[#16A34A]',
    title: 'One Loan at a Time Rule',
    subtitle: 'Protected by State Database',
    content: `Florida maintains a statewide deferred presentment database that all licensed lenders must check before approving a loan. This database prevents any borrower from having more than one active payday loan at any time across all Florida licensed lenders. This protection exists specifically to prevent borrowers from accumulating multiple loans and falling into a debt spiral.`,
    bullets: [
      'Only one active payday loan permitted statewide',
      'All lenders must check the database before approving',
      'Applies to all Florida-licensed payday lenders',
      'Protects against debt accumulation',
      'Legally enforceable—lenders face penalties for violations',
    ],
  },
  {
    icon: Ban,
    color: 'bg-red-100 text-red-600',
    title: 'No Rollover Rule',
    subtitle: 'Prohibited by Florida Law',
    content: `Loan rollovers—where a borrower pays a fee to extend a loan instead of repaying it—are strictly prohibited under Florida law. This is a critical consumer protection. Rollovers trap borrowers in cycles of debt where fees accumulate rapidly. In Florida, when your loan is due, you must either repay it, use the 60-day grace period, or default. No lender can legally roll over, renew, or refinance a payday loan.`,
    bullets: [
      'Rollovers are illegal under Florida Statute 560.404',
      'Renewals and refinancing are equally prohibited',
      'Lenders found to offer rollovers face license revocation',
      'The only extension available is the 60-day grace period',
      'Protects borrowers from compounding fee cycles',
    ],
  },
  {
    icon: Clock,
    color: 'bg-purple-100 text-purple-600',
    title: '24-Hour Cooling-Off Period',
    subtitle: 'Mandatory Wait Between Loans',
    content: `After repaying a payday loan in full, you must wait at least 24 hours before taking out another payday loan. If you have taken out six or more payday loans in a 12-month period, Florida law requires a 60-day waiting period before you can take another loan. These cooling-off periods are designed to prevent habitual borrowing and encourage borrowers to consider whether a payday loan is truly the right solution.`,
    bullets: [
      '24-hour wait required after each loan repayment',
      '60-day wait required after 6 loans in 12 months',
      'Waiting periods are tracked in the statewide database',
      'Cannot be waived or shortened by any lender',
      'Applies across all Florida payday lenders',
    ],
  },
  {
    icon: Database,
    color: 'bg-[#0A2540]/10 text-[#0A2540]',
    title: 'Florida Statewide Database',
    subtitle: 'Transparency and Accountability',
    content: `The Florida Department of Financial Services maintains a real-time database of all active payday loans in the state. Every licensed lender must report every loan issued to this database and must query it before issuing any new loan. This database is the enforcement mechanism behind the one-loan rule and the cooling-off periods. It creates accountability and protects borrowers from lenders who might otherwise ignore the rules.`,
    bullets: [
      'Real-time database updated by all licensed lenders',
      'Every loan must be reported within one business day',
      'Accessible only to licensed lenders (not consumers or third parties)',
      'Enforced by the Florida OFR with audits',
      'Grounds for license revocation if not followed',
    ],
  },
];

const RESPONSIBILITIES = [
  'Read and understand your loan agreement before signing',
  'Repay your loan on the agreed due date',
  'Contact your lender immediately if you cannot repay',
  'Request the grace period before your due date if needed',
  'Complete the required credit counseling during the grace period',
  'Do not apply for a new loan while one is active',
  'Wait 24 hours after repayment before taking a new loan',
];

export default function BorrowerRightsPage() {
  const breadcrumbs = [{ name: 'Borrower Rights', href: '/borrower-rights' }];
  const bSchema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }, ...breadcrumbs]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }} />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-3xl">
            <span className="section-label mb-4">Consumer Protection</span>
            <h1 className="mt-4 text-3xl font-bold text-[#0A2540] sm:text-4xl md:text-5xl">
              Your Borrower Rights in Florida
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Florida law provides payday loan borrowers with strong protections. Know your rights
              before you borrow—and know what to do if a lender violates them.
            </p>
          </div>
        </div>
      </section>

      {/* Rights Sections */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {RIGHTS.map((right, index) => (
              <div
                key={right.title}
                className="grid grid-cols-1 gap-8 rounded-2xl border border-border p-8 md:grid-cols-3"
              >
                {/* Left: Icon & Title */}
                <div className="flex flex-col items-start gap-4 md:col-span-1">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${right.color}`}>
                    <right.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0A2540]">{right.title}</h2>
                    <p className="text-sm text-[#00A6FB] font-medium">{right.subtitle}</p>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="md:col-span-2">
                  <p className="mb-5 text-muted-foreground leading-relaxed">{right.content}</p>
                  <ul className="space-y-2">
                    {right.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                        <span className="text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Borrower Responsibilities */}
      <section className="section-padding-sm bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-semibold text-[#0A2540]">
              Your Responsibilities as a Borrower
            </h2>
            <p className="mb-6 text-muted-foreground">
              Along with your rights, you also have responsibilities under Florida law and your loan agreement.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {RESPONSIBILITIES.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-white p-4">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#00A6FB]" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Complaint Process */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-semibold text-[#0A2540]">
              How to File a Complaint
            </h2>
            <p className="mb-6 text-muted-foreground">
              If you believe a payday lender has violated your rights under Florida law, you have
              options to seek help and file a formal complaint.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-[#F8FAFC] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A2540] text-xs font-bold text-white">1</div>
                  <h3 className="font-semibold text-[#0A2540]">Contact Us First</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Contact Sunshine Micro Lending directly. We are committed to resolving any issues quickly.
                  Reach us at{' '}
                  <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`} className="text-[#00A6FB] hover:underline">
                    {process.env.NEXT_PUBLIC_COMPANY_EMAIL}
                  </a>
                  {' '}or{' '}
                  <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="text-[#00A6FB] hover:underline">
                    {process.env.NEXT_PUBLIC_COMPANY_PHONE}
                  </a>.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-[#F8FAFC] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A2540] text-xs font-bold text-white">2</div>
                  <h3 className="font-semibold text-[#0A2540]">Florida Office of Financial Regulation (OFR)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  The OFR licenses and regulates payday lenders in Florida. File a complaint if a lender violates state law.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    1-850-487-9687
                  </div>
                  <a
                    href="https://www.flofr.gov/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#00A6FB] hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    flofr.gov
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-[#F8FAFC] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A2540] text-xs font-bold text-white">3</div>
                  <h3 className="font-semibold text-[#0A2540]">Consumer Financial Protection Bureau (CFPB)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  The CFPB oversees federal consumer financial protection laws.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    1-855-411-2372
                  </div>
                  <a
                    href="https://www.consumerfinance.gov/complaint/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#00A6FB] hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    consumerfinance.gov/complaint
                  </a>
                </div>
              </div>
            </div>

            {/* Alert */}
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#00A6FB]/30 bg-[#00A6FB]/5 p-5">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#00A6FB]" />
              <div>
                <p className="text-sm font-medium text-[#0A2540] mb-1">Looking for credit counseling?</p>
                <p className="text-sm text-muted-foreground">
                  The National Foundation for Credit Counseling (NFCC) provides nonprofit credit counseling services.
                  Visit{' '}
                  <a href="https://www.nfcc.org/" target="_blank" rel="noopener noreferrer" className="text-[#00A6FB] hover:underline">
                    nfcc.org
                  </a>{' '}
                  or call 1-800-388-2227.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
