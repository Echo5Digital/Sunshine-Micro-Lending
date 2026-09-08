import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Read Sunshine Micro Lending\'s privacy policy. Learn how we collect, use, and protect your personal information as a Florida payday lender.',
  path: '/privacy-policy',
  noIndex: false,
});

export default function PrivacyPolicyPage() {
  const breadcrumbs = [{ name: 'Privacy Policy', href: '/privacy-policy' }];
  const lastUpdated = 'January 1, 2024';

  return (
    <>
      {/* Hero */}
      <section className="bg-[#F8FAFC] py-10 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-[#0A2540] md:text-4xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last Updated: {lastUpdated} | Effective Date: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl prose prose-slate max-w-none">
            <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
              <strong>Placeholder notice:</strong> This page is draft content pending review and approval by
              the company&apos;s attorney. Do not rely on this page as final legal terms.
            </div>
            <div className="space-y-8 text-muted-foreground leading-relaxed">

              <div>
                <h2 className="text-xl font-semibold text-[#0A2540] mb-3">1. Introduction</h2>
                <p>
                  Sunshine Micro Lending (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a deferred
                  presentment provider in Florida. This Privacy Policy describes how we collect, use, disclose, and safeguard
                  your personal information when you visit our website at sunshinemicrolending.com and when
                  you apply for or receive a loan from us.
                </p>
                <p className="mt-3">
                  By using our website or applying for a loan, you agree to the terms of this Privacy Policy.
                  If you do not agree, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0A2540] mb-3">2. Information We Collect</h2>
                <h3 className="text-base font-semibold text-[#0A2540] mb-2">2.1 Information You Provide</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Name, address, email address, and phone number</li>
                  <li>Employment and income information</li>
                  <li>Bank account and routing numbers</li>
                  <li>Government-issued ID information</li>
                  <li>Loan application details and preferences</li>
                </ul>
                <h3 className="text-base font-semibold text-[#0A2540] mt-4 mb-2">2.2 Information Collected Automatically</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0A2540] mb-3">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-5 space-y-1.5 mt-3">
                  <li>Process and evaluate your loan application</li>
                  <li>Verify your identity as required by law</li>
                  <li>Check the Florida statewide payday loan database (legally required)</li>
                  <li>Communicate with you about your loan</li>
                  <li>Process loan repayments via ACH once your loan is active</li>
                  <li>Comply with Florida and federal law</li>
                  <li>Prevent fraud and unauthorized transactions</li>
                  <li>Improve our website and services</li>
                  <li>Send service-related communications</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0A2540] mb-3">4. Information Sharing and Disclosure</h2>
                <p>
                  <strong className="text-[#0A2540]">We do not sell your personal information.</strong> We may share your
                  information in the following limited circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 mt-3">
                  <li><strong className="text-[#0A2540]">Service providers:</strong> Identity verification services, ACH processors, and compliance services who process data on our behalf</li>
                  <li><strong className="text-[#0A2540]">Florida OFR:</strong> The statewide payday loan database as required by Florida Statute 560</li>
                  <li><strong className="text-[#0A2540]">Legal requirements:</strong> Law enforcement or government agencies when legally required</li>
                  <li><strong className="text-[#0A2540]">Business transfers:</strong> In connection with a merger or acquisition, with the same privacy protections</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0A2540] mb-3">5. Data Security</h2>
                <p>
                  We implement industry-standard security measures including 256-bit SSL encryption,
                  secure data storage, and access controls. No method of data transmission or storage
                  is 100% secure. We cannot guarantee absolute security, but we take reasonable steps
                  to protect your information.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0A2540] mb-3">6. Cookies</h2>
                <p>
                  We use cookies and similar technologies to improve your browsing experience and analyze
                  site traffic. You may control cookie preferences through your browser settings.
                  Disabling cookies may affect some site functionality.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0A2540] mb-3">7. Your Rights</h2>
                <p>Depending on applicable law, you may have the right to:</p>
                <ul className="list-disc pl-5 space-y-1.5 mt-3">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data (subject to legal retention requirements)</li>
                  <li>Opt out of marketing communications</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, contact us at{' '}
                  <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`} className="text-[#00A6FB] hover:underline">
                    {process.env.NEXT_PUBLIC_COMPANY_EMAIL}
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0A2540] mb-3">8. Data Retention</h2>
                <p>
                  We retain loan-related records as required by Florida law and applicable regulations.
                  Application data is generally retained for a minimum of 5 years following the loan transaction.
                  Website analytics data is retained for up to 26 months.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0A2540] mb-3">9. Children&apos;s Privacy</h2>
                <p>
                  Our services are not directed to persons under 18 years of age. We do not knowingly collect
                  personal information from minors. If we learn we have collected information from a minor,
                  we will delete it promptly.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0A2540] mb-3">10. Contact Us</h2>
                <p>For privacy questions or to exercise your rights:</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p>Sunshine Micro Lending</p>
                  <p>Florida, United States</p>
                  <p>
                    Email:{' '}
                    <a href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`} className="text-[#00A6FB] hover:underline">
                      {process.env.NEXT_PUBLIC_COMPANY_EMAIL}
                    </a>
                  </p>
                  <p>
                    Phone:{' '}
                    <a href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`} className="text-[#00A6FB] hover:underline">
                      {process.env.NEXT_PUBLIC_COMPANY_PHONE}
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
