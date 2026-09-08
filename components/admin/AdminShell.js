'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminMobileNav } from '@/components/admin/AdminMobileNav';

export function AdminShell({ adminName, children }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminSidebar />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-[#0A2540] px-4 sm:px-6 lg:bg-white">
          <div className="flex items-center gap-2 lg:hidden">
            <AdminMobileNav />
          </div>
          <div className="hidden lg:block" />

          <div className="flex items-center gap-2 sm:gap-3">
            {adminName && (
              <span className="hidden text-sm text-white/70 sm:inline lg:text-muted-foreground">
                {adminName}
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="h-11 px-2.5 text-white hover:bg-white/10 sm:px-4 lg:text-foreground lg:hover:bg-muted"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
