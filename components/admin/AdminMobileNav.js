'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AdminNavLinks } from '@/components/admin/AdminSidebar';

export function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FB]"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="admin-mobile-menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              key="drawer"
              id="admin-mobile-menu"
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-[#0A2540] shadow-2xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              aria-label="Admin navigation"
            >
              <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <Sun className="h-5 w-5 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-bold text-white">
                    Sunshine <span className="text-[#00A6FB]">Admin</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <AdminNavLinks onNavigate={() => setIsOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
