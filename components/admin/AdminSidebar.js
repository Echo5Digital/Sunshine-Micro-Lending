'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, MessageSquare, Users, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/applications', label: 'Applications', icon: FileText },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/staff', label: 'Staff', icon: Users },
];

export function AdminNavLinks({ onNavigate, orientation = 'vertical' }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        orientation === 'vertical' ? 'flex flex-col gap-1' : 'flex items-center gap-1'
      )}
      aria-label="Admin navigation"
    >
      {NAV_ITEMS.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-[#00A6FB]/10 text-[#00A6FB]'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            )}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.25 : 1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#0A2540] lg:flex">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
          <Sun className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-bold text-white">
          Sunshine <span className="text-[#00A6FB]">Admin</span>
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <AdminNavLinks />
      </div>
    </aside>
  );
}
