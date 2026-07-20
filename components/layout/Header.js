'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/loan-options', label: 'Loan Options' },
  { href: '/rates-fees', label: 'Rates & Fees' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-border/60 bg-white/98 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-white'
      )}
    >
      {/* Top Bar */}
      <div className="hidden border-b border-border/40 bg-[#0A2540] py-1.5 md:block">
        <div className="container mx-auto flex items-center justify-between px-4 text-xs text-white/80">
          <span>Florida Licensed Payday Lender | OFR License</span>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3 w-3" />
              {process.env.NEXT_PUBLIC_COMPANY_PHONE || '1-800-SUNSHINE'}
            </a>
            <span>|</span>
            <span>Mon–Fri 9AM–5PM EST</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FB] focus-visible:ring-offset-2 rounded-lg"
            aria-label="Sunshine Micro Lending - Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0A2540] to-[#00A6FB] shadow-sm">
              <Sun className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold text-[#0A2540]">Sunshine</div>
              <div className="text-xs font-medium text-[#00A6FB]">Micro Lending</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FB]',
                  pathname === link.href
                    ? 'bg-[#00A6FB]/10 text-[#00A6FB]'
                    : 'text-[#1F2937] hover:bg-muted hover:text-[#0A2540]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact"
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#0A2540] transition-colors hover:bg-muted"
            >
              Contact
            </Link>
            <Link
              href="/apply"
              className="btn-secondary text-sm"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-[#0A2540] transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FB] lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-[calc(4rem+2.5rem)] z-40 bg-white md:top-16 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="container mx-auto flex h-full flex-col px-4 py-6">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-xl px-4 py-3.5 text-base font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-[#00A6FB]/10 text-[#00A6FB]'
                      : 'text-[#1F2937] hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className={cn(
                  'rounded-xl px-4 py-3.5 text-base font-medium transition-colors',
                  pathname === '/contact'
                    ? 'bg-[#00A6FB]/10 text-[#00A6FB]'
                    : 'text-[#1F2937] hover:bg-muted'
                )}
              >
                Contact
              </Link>
            </nav>
            <div className="mt-auto flex flex-col gap-3 pb-6">
              <Link
                href="/apply"
                className="w-full rounded-xl bg-[#00A6FB] px-6 py-4 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#0097e8]"
              >
                Apply Now
              </Link>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-6 py-4 text-base font-medium text-[#0A2540] transition-colors hover:bg-muted"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
