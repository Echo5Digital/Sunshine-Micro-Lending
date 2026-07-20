import Link from 'next/link';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title: 'Terms of Use',
  description: 'Read Sunshine Micro Lending\'s terms of use. Understand the terms governing your use of our website and Florida payday loan services.',
  path: '/terms-of-use',
  noIndex: false,
});

export default function TermsOfUsePage() {
  const breadcrumbs = [{ name: 'Terms of Use', href: '/terms-of-use' }];

  return (
    <>
      <section className="bg-[#F8FAFC] py-10 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-[#0A2540] md:text-4xl">Terms of Use</h1>
            <p className="mt-3 text-sm text-muted-foreground">Last Updated: January 1, 2024</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-8 text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the website located at sunshinemicrolending.com (&quot;Site&quot;) or any
                services offered by Sunshine Micro Lending (&quot;Company&quot;), you agree to be bound by these
                Terms of Use. If you do not agree, do not use the Site or our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">2. Service Description</h2>
              <p>
                Sunshine Micro Lending is a Florida-licensed deferred presentment provider (payday lender)
                regulated by the Florida Office of Financial Regulation. We offer short-term payday loans
                to qualifying Florida residents only, subject to Florida Statute 560 and all applicable laws.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">3. Eligibility</h2>
              <p>You must meet all of the following to use our loan services:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Be at least 18 years of age</li>
                <li>Be a resident of the State of Florida</li>
                <li>Have a valid, active checking account</li>
                <li>Have a verifiable source of income</li>
                <li>Not currently have an outstanding payday loan with any Florida lender</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">4. Loan Terms and Conditions</h2>
              <p>All loans are subject to the following:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Maximum loan amount of $500 per loan</li>
                <li>Fee of 10% of the loan amount plus a $5 verification fee</li>
                <li>Single payment loans: 7–31 day repayment period</li>
                <li>Installment loans: 60–90 day repayment period</li>
                <li>No rollovers, renewals, or refinancing permitted</li>
                <li>60-day grace period available upon request at no additional cost</li>
                <li>Only one active loan permitted at any time</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">5. Application Process</h2>
              <p>
                Submitting an application does not guarantee loan approval. All applications are subject
                to verification and eligibility review. You represent that all information provided in
                your application is accurate and complete. Providing false information may result in
                application denial and may constitute fraud.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">6. ACH Authorization</h2>
              <p>
                By accepting a loan, you authorize Sunshine Micro Lending to initiate ACH debit transactions
                from your designated checking account for loan repayment on the agreed due date(s). You may
                revoke this authorization by contacting us at least 3 business days before the scheduled debit.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">7. Prohibited Uses</h2>
              <p>You may not use our Site or services to:</p>
              <ul className="list-disc pl-5 space-y-1.5 mt-3">
                <li>Violate any applicable law or regulation</li>
                <li>Provide false or misleading information</li>
                <li>Attempt to circumvent loan eligibility requirements</li>
                <li>Engage in any fraudulent activity</li>
                <li>Interfere with the operation of our website</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">8. Disclaimers</h2>
              <p>
                Our website is provided &quot;as is&quot; without warranty of any kind. We do not guarantee
                the accuracy, completeness, or timeliness of content on our site. Payday loans are
                short-term financial solutions and are not appropriate for long-term financial problems.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Sunshine Micro Lending shall not be liable
                for any indirect, incidental, or consequential damages arising from your use of our
                services. Our liability is limited to the amount of any fees you have actually paid to us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">10. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of Florida. Any dispute arising
                from these Terms shall be subject to the exclusive jurisdiction of the courts located
                in Florida.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0A2540] mb-3">11. Contact</h2>
              <p>
                For questions about these Terms, contact us at{' '}
                <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`} className="text-[#00A6FB] hover:underline">
                  {process.env.NEXT_PUBLIC_COMPANY_EMAIL}
                </a>.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
