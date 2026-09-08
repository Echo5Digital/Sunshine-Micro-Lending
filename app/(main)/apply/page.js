import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { Lock, CheckCircle, Clock } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Apply for a Payday Loan in Florida | Up to $500',
  description:
    'Apply online for a Florida payday loan up to $500. Secure form. See your exact fees before you commit. Now accepting early applications ahead of launch.',
  path: '/apply',
  keywords: ['apply payday loan Florida', 'payday loan application', 'apply for cash advance Florida'],
});

const TRUST_INDICATORS = [
  { icon: Lock, text: 'SSL Encrypted' },
  { icon: CheckCircle, text: 'No Obligation' },
  { icon: Clock, text: 'Quick Decision' },
];

export default function ApplyPage() {
  const breadcrumbs = [{ name: 'Apply', href: '/apply' }];
  const bSchema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }, ...breadcrumbs]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A2540] to-[#0d3060] py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={breadcrumbs}
            className="mb-6 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/50 [&_.text-\[\#0A2540\]]:text-white"
          />
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Apply for Your Florida Payday Loan
            </h1>
            <p className="mt-3 text-white/75">
              Complete the form below. See your exact fees before you commit.
              Your information is protected by 256-bit SSL encryption.
            </p>
            {/* Trust indicators */}
            <div className="mt-5 flex flex-wrap gap-2 sm:gap-4">
              {TRUST_INDICATORS.map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 text-sm text-white/80">
                  <item.icon className="h-4 w-4 text-[#22C55E]" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-10">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <ApplicationForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Summary */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <h3 className="mb-4 font-semibold text-[#0A2540]">Loan Summary</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Maximum Amount', value: '$500' },
                    { label: 'Minimum Amount', value: '$100' },
                    { label: 'Fee', value: '10% + $5' },
                    { label: 'Single Payment Term', value: '7–31 days' },
                    { label: 'Grace Period', value: '60 days free' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between border-b border-border pb-2.5">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-[#0A2540]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <h3 className="mb-4 font-semibold text-[#0A2540]">Requirements</h3>
                <ul className="space-y-2.5">
                  {[
                    'Florida resident',
                    '18 years or older',
                    'Active checking account',
                    'Proof of income',
                    'No active payday loan',
                  ].map((req) => (
                    <li key={req} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-[#22C55E]" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Security Note */}
              <div className="rounded-2xl border border-[#22C55E]/30 bg-[#22C55E]/5 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-[#16A34A]" />
                  <p className="text-sm font-semibold text-[#0A2540]">Your data is secure</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  We use 256-bit SSL encryption. Your personal information is never sold to third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
