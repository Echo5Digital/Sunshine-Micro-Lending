'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, Sun, ArrowRight, Phone, Clock,
  Zap, DollarSign, FileText, MessageCircle, User, PenSquare, PhoneCall,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/how-it-works', label: 'How It Works', icon: Zap },
  { href: '/loan-options',  label: 'Loan Options',  icon: DollarSign },
  { href: '/rates-fees',    label: 'Rates & Fees',  icon: FileText },
  { href: '/faq',           label: 'FAQ',            icon: MessageCircle },
  { href: '/about',         label: 'About',          icon: User },
  { href: '/blog',          label: 'Blog',           icon: PenSquare },
  { href: '/contact',       label: 'Contact',        icon: PhoneCall },
];

// Top bar height: h-10 = 40px
const TOP_BAR_H = 40;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* ══════════════════════════════════════════
          TOP BAR — slides away on scroll
      ══════════════════════════════════════════ */}
      <motion.div
        className="fixed top-0 z-50 hidden w-full px-6 md:block"
        animate={{ y: isScrolled ? -48 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
      >
        <div
          className="mx-auto flex h-10 max-w-7xl items-center justify-end rounded-b-2xl px-6"
          style={{
            background: 'linear-gradient(135deg, #0A2540 0%, #031B4E 100%)',
            boxShadow: '0 4px 16px rgba(3,27,78,0.35)',
          }}
        >
          {/* Right */}
          <div className="flex items-center gap-3 text-xs text-white/80">
            <a href="tel:18005867846" className="flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="h-3.5 w-3.5 text-[#00A6FB]" />
              <span className="font-semibold text-white">+1-800-SUNSHINE</span>
            </a>
            <span className="h-3 w-px bg-white/20" />
            <Clock className="h-3.5 w-3.5 text-white/50" />
            <span>Mon–Fri 9AM–5PM EST</span>
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════
          MAIN BAR — always fixed, never moves
      ══════════════════════════════════════════ */}
      <div className="fixed z-40 w-full px-4 md:px-6" style={{ top: 0 }}>
        {/* Sits below top bar on desktop, flush on mobile */}
        <div className="pt-0 md:pt-[calc(2.5rem+8px)]">
          <motion.div
            className="mx-auto max-w-7xl overflow-hidden bg-white"
            style={{ borderRadius: 36 }}
            animate={{
              boxShadow: isScrolled
                ? '0 12px 48px rgba(0,0,0,0.16), 0 4px 16px rgba(0,0,0,0.08)'
                : '0 8px 40px rgba(0,0,0,0.12), 0 2px 12px rgba(0,0,0,0.06)',
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-[6.875rem] items-stretch">

              {/* ── LOGO SECTION (300px) ── */}
              <Link
                href="/"
                aria-label="Sunshine Micro Lending - Home"
                className="relative flex shrink-0 items-center gap-4 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00A6FB]"
                style={{ width: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#EFF6FF]" />
                <svg
                  className="absolute right-0 top-0 h-full"
                  viewBox="0 0 120 110"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M120,0 L120,110 L30,110 Q0,55 30,0 Z" fill="url(#logoGrad)" />
                  <defs>
                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00A6FB" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="relative z-10 flex items-center gap-3 pl-6">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #1a56db 0%, #00A6FB 100%)' }}
                  >
                    <Sun className="h-7 w-7 text-[#FCD34D]" strokeWidth={2} />
                  </div>
                  <div className="leading-tight">
                    <div className="text-[1.35rem] font-extrabold tracking-tight text-[#0A2540]">Sunshine</div>
                    <div className="text-sm font-bold text-[#1a56db]">Micro Lending</div>
                  </div>
                </div>
              </Link>

              {/* ── CENTER NAV ── */}
              <nav className="hidden flex-1 items-center justify-center gap-0 lg:flex" aria-label="Main navigation">
                {NAV_LINKS.map((link) => {
                  const Icon = link.icon;
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'group relative flex flex-col items-center justify-center gap-1.5 px-5 py-3 transition-all duration-300 focus-visible:outline-none xl:px-6',
                        active ? 'text-[#00A6FB]' : 'text-[#0A2540] hover:text-[#00A6FB]'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-6 w-6 transition-colors duration-300',
                          active ? 'text-[#00A6FB]' : 'text-[#0A2540] group-hover:text-[#00A6FB]'
                        )}
                        strokeWidth={1.75}
                      />
                      <span className="text-[13px] font-medium leading-none whitespace-nowrap">
                        {link.label}
                      </span>
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute bottom-1 h-1 w-1 rounded-full bg-[#00A6FB]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* ── RIGHT SECTION ── */}
              <div className="hidden shrink-0 items-center gap-3 pr-5 lg:flex">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2.5 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,166,251,0.5)] active:scale-[0.97]"
                  style={{
                    height: 56,
                    padding: '0 32px',
                    background: '#00A6FB',
                    borderRadius: 18,
                    fontSize: 15,
                    boxShadow: '0 4px 16px rgba(0,166,251,0.35)',
                  }}
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* ── MOBILE HAMBURGER ── */}
              <div className="ml-auto flex items-center px-5 lg:hidden">
                <button
                  className="flex items-center justify-center rounded-2xl p-2.5 text-[#0A2540] transition-colors hover:bg-[#EFF6FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FB]"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="drawer"
              id="mobile-menu"
              className="fixed inset-x-4 top-[6.875rem] z-40 overflow-hidden rounded-3xl bg-white shadow-[0_24px_64px_rgba(0,0,0,0.18)] lg:hidden"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col p-4">
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => {
                    const Icon = link.icon;
                    const active = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200',
                            active
                              ? 'bg-[#EFF6FF] text-[#00A6FB]'
                              : 'text-[#0A2540] hover:bg-[#F8FAFF] hover:text-[#00A6FB]'
                          )}
                        >
                          <Icon
                            className={cn('h-5 w-5 shrink-0', active ? 'text-[#00A6FB]' : 'text-[#64748B]')}
                            strokeWidth={1.75}
                          />
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
                <div className="my-3 h-px bg-[#E8EDF5]" />
                <Link
                  href="/apply"
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#00A6FB] py-4 text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(0,166,251,0.35)] transition-all hover:-translate-y-0.5 hover:bg-[#0097e8] hover:shadow-[0_8px_24px_rgba(0,166,251,0.45)] active:scale-[0.98]"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
