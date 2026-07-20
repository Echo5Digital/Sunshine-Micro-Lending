import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ContactForm } from '@/components/forms/ContactForm';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { generateBreadcrumbSchema } from '@/lib/seo/schema';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export const metadata = generatePageMetadata({
  title: 'Contact Sunshine Micro Lending | Florida Payday Loans',
  description:
    'Contact Sunshine Micro Lending with questions about Florida payday loans, your application, or your borrower rights. We are here to help.',
  path: '/contact',
  keywords: ['contact payday lender Florida', 'Sunshine Micro Lending contact', 'payday loan support Florida'],
});

const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Phone',
    value: process.env.NEXT_PUBLIC_COMPANY_PHONE || '1-800-SUNSHINE',
    href: `tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`,
    description: 'Mon–Fri, 9AM–5PM EST',
  },
  {
    icon: Mail,
    label: 'Email',
    value: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@sunshinemicrolending.com',
    href: `mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`,
    description: 'We respond within 1 business day',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Monday–Friday',
    href: null,
    description: '9:00 AM – 5:00 PM Eastern',
  },
  {
    icon: MapPin,
    label: 'Service Area',
    value: 'Florida, United States',
    href: null,
    description: 'Online-only lender',
  },
];

export default function ContactPage() {
  const breadcrumbs = [{ name: 'Contact', href: '/contact' }];
  const bSchema = generateBreadcrumbSchema([{ name: 'Home', href: '/' }, ...breadcrumbs]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bSchema) }} />

      {/* Hero */}
      <section className="bg-[#F8FAFC] py-12 md:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbs} className="mb-6" />
          <div className="max-w-2xl">
            <span className="section-label mb-4">Get in Touch</span>
            <h1 className="mt-4 text-3xl font-bold text-[#0A2540] sm:text-4xl md:text-5xl">
              Contact Us
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Questions about your application, loan terms, or your rights as a borrower?
              Our team is here to help—clearly and promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Sidebar */}
            <div className="space-y-6">
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="flex items-start gap-4 rounded-xl border border-border p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00A6FB]/10">
                    <item.icon className="h-5 w-5 text-[#00A6FB]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-semibold text-[#0A2540] hover:text-[#00A6FB] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-[#0A2540]">{item.value}</p>
                    )}
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}

              {/* Map Placeholder */}
              <div className="rounded-xl border border-border bg-[#F8FAFC] h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-[#00A6FB]/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Florida, United States</p>
                  <p className="text-xs text-muted-foreground">Online-only service</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
