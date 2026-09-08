'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sun, LogOut, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AdminShell({ adminName, children }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="border-b border-border bg-[#0A2540]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <Sun className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold text-white">
              Sunshine <span className="text-[#00A6FB]">Admin</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/staff"
              className="hidden items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white sm:flex"
            >
              <Users className="h-4 w-4" />
              Staff
            </Link>
            {adminName && <span className="hidden text-sm text-white/70 sm:inline">{adminName}</span>}
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/10">
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
