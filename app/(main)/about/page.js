import Link from 'next/link';
import { Shield, Heart, Eye, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CTASection } from '@/components/sections/CTASection';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata = generatePageMetadata({
  title: 'About Sunshine Micro Lending | Florida Licensed Payday Lender',
  description:
    'Learn about Sunshine Micro Lending—a Florida-licensed payday lender committed to transparency, responsible lending, and treating borrowers with respect.',
  path: '/about',
  keywords: ['about Sunshine Micro Lending', 'Florida payday lender', 'licensed payday lender Florida'],
});

const VALUES = [
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We show you every fee before you sign. No hidden charges, no surprises. Ever.',
  },
  {
    icon: Shield,
    title: 'Compliance',
    description: 'We exceed Florida regulatory requirements—not just meet them. Your protections matter.',
  },
  {
    icon: Heart,
    title: 'Respect',
    description: 'We treat every borrower with dignity. Financial difficulty can happen to anyone.',
  },
  {
    icon: Award,
    title: 'Responsibility',
    description: 'We lend responsibly. If a payday loan is not right for you, we will tell you so.',
  },
];

export default function AboutPage() {
  const breadcrumbs = [{ name: 'About', href: '/about' }];
  const bSchema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }, ...breadcrumbs]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }} />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-3xl">
            <span className="section-label mb-4">Our Story</span>
            <h1 className="mt-4 text-4xl font-bold text-[#0A2540] md:text-5xl">
              About Sunshine Micro Lending
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A Florida-licensed payday lender built on the conviction that short-term lending
              should be transparent, respectful, and genuinely helpful.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-5 text-3xl font-semibold text-[#0A2540]">Our Mission</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Sunshine Micro Lending exists to provide Florida residents with access to
                short-term credit when they need it most—without exploitation, confusion, or
                debt traps.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We believe that payday lending, done right, can be a legitimate financial tool.
                That means clear fees, no rollovers, a genuine grace period when life gets hard,
                and treating every borrower as a human being—not a revenue source.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As a Florida-licensed lender regulated by the Office of Financial Regulation,
                we follow every state law—and we go further by building our product around
                borrower protection, not around maximizing fee extraction.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '$500', label: 'Maximum Loan', description: 'Florida legal limit' },
                { value: '10%', label: 'Simple Fee', description: 'No hidden charges' },
                { value: '60', label: 'Day Grace Period', description: 'At zero cost' },
                { value: 'OFR', label: 'Florida Licensed', description: 'Regulated & compliant' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-[#F8FAFC] p-6 text-center">
                  <div className="text-3xl font-bold text-[#00A6FB]">{stat.value}</div>
                  <div className="mt-1 text-sm font-semibold text-[#0A2540]">{stat.label}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding-sm bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold text-[#0A2540] md:text-3xl">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-xl border border-border bg-white p-6 shadow-card text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A2540]">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-semibold text-[#0A2540]">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Florida Compliance */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-2xl font-semibold text-[#0A2540]">
              Florida Licensing & Compliance
            </h2>
            <p className="mb-6 text-muted-foreground">
              Sunshine Micro Lending operates under a license issued by the Florida Office of Financial
              Regulation (OFR). All our lending practices comply with Florida Statute 560—the Florida
              Deferred Presentment Act.
            </p>
            <div className="space-y-3">
              {[
                'Licensed by the Florida Office of Financial Regulation (OFR)',
                'Compliant with Florida Statute 560 (Deferred Presentment Act)',
                'Connected to the Florida statewide payday loan database',
                'Maximum loan amount adheres to $500 Florida cap',
                'Fee structure complies with Florida maximum limits',
                '60-day grace period provided as required by law',
                'No rollovers, renewals, or extensions offered',
                'One active loan per borrower enforced via state database',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle className="h-4 w-4 shrink-0 text-[#22C55E]" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/borrower-rights" className="btn-outline text-sm">
                Borrower Rights
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-ghost text-sm">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        variant="subtle"
        heading="Questions About Who We Are?"
        subheading="Our team is available to answer any questions about our company, our license, or how we operate."
        primaryCTA={{ label: 'Contact Us', href: '/contact' }}
        secondaryCTA={{ label: 'Apply Now', href: '/apply' }}
      />
    </>
  );
}
