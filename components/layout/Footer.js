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
    <footer className="bg-[#0A2540] text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-12 md:pt-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
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
            <div className="mb-6 space-y-2 text-xs leading-relaxed text-white/50">
              <p>
                Sunshine Micro Lending is licensed by the Florida Office of Financial Regulation,
                License #[LICENSE #]. Payday loans (deferred presentment transactions) are governed
                by Chapter 560, Florida Statutes.
              </p>
              <p>
                Maximum loan amount $500. Fee: 10% of amount financed plus a $5 verification fee.
                Single-payment terms 7–31 days.
              </p>
              <p className="italic text-white/30">[APR disclosure — counsel to supply]</p>
              <p className="italic text-white/30">[Additional required disclosures — counsel to supply]</p>
            </div>
            {/* Contact Info */}
            <div className="space-y-2.5">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE || '18005867846'}`}
                className="flex items-center gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-[#00A6FB]" />
                {process.env.NEXT_PUBLIC_COMPANY_PHONE || '1-800-SUNSHINE'}
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@sunshinemicrolending.com'}`}
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

        {/* Divider */}
        <div className="mt-12 border-t border-white/10 pb-6 pt-6">
          {/* Trust items + copyright on one row */}
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
    </footer>
  );
}
