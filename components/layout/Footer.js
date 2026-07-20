import Link from 'next/link';
import { Sun, Phone, Mail, Shield, ExternalLink } from 'lucide-react';

const FOOTER_LINKS = {
  loans: [
    { href: '/loan-options', label: 'Loan Options' },
    { href: '/rates-fees', label: 'Rates & Fees' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/apply', label: 'Apply Now' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
  ],
  legal: [
    { href: '/borrower-rights', label: 'Borrower Rights' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-use', label: 'Terms of Use' },
  ],
};

const TRUST_ITEMS = [
  { icon: Shield, text: 'Florida OFR Licensed' },
  { icon: Shield, text: 'SSL Secured' },
  { icon: Shield, text: 'No Hidden Fees' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[#0A2540] text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2.5"
              aria-label="Sunshine Micro Lending"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <Sun className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <div className="text-base font-bold text-white">Sunshine</div>
                <div className="text-sm font-medium text-[#00A6FB]">Micro Lending</div>
              </div>
            </Link>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/70">
              A Florida licensed payday lender committed to transparent, responsible short-term lending.
              We believe borrowers deserve clarity, dignity, and fair terms.
            </p>
            {/* Contact Info */}
            <div className="space-y-2.5">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
                className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-[#00A6FB]" />
                {process.env.NEXT_PUBLIC_COMPANY_PHONE || '1-800-SUNSHINE'}
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL}`}
                className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#00A6FB]" />
                {process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@sunshinemicrolending.com'}
              </a>
            </div>
          </div>

          {/* Loans Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#00A6FB]">
              Our Loans
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.loans.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#00A6FB]">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#00A6FB]">
              Legal
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="https://www.flofr.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
              >
                Florida OFR
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              {TRUST_ITEMS.map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 text-xs text-white/60">
                  <Shield className="h-3.5 w-3.5 text-[#22C55E]" />
                  {item.text}
                </div>
              ))}
            </div>
            <div className="text-xs text-white/40">
              &copy; {currentYear} Sunshine Micro Lending. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-xs leading-relaxed text-white/40">
            Sunshine Micro Lending is a licensed payday lender in the State of Florida, regulated by
            the Office of Financial Regulation (OFR). Payday loans are short-term financial solutions.
            Maximum loan amount: $500. Fee: 10% of loan amount plus $5 verification fee. Only one active
            loan permitted per borrower. 60-day grace period available at no additional charge.
            This is a payday loan. Payday loans are not a solution for long-term financial problems.
            Borrowers with credit difficulties should seek credit counseling.{' '}
            <Link href="/rates-fees" className="text-white/60 hover:text-white underline">
              See full rates and fees.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
