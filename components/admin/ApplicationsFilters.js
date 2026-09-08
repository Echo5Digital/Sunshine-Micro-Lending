'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Search, Download } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { STATUS_OPTIONS } from '@/lib/applicationStatus';

export function ApplicationsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [, startTransition] = useTransition();

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    updateParam('search', search);
  }

  function handleExport() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    window.location.href = `/api/admin/applications/export?${params.toString()}`;
  }

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-border bg-white p-4 sm:flex-row sm:flex-wrap sm:items-center">
      <form onSubmit={handleSearchSubmit} className="flex flex-1 gap-2 sm:min-w-[240px]">
        <Input
          placeholder="Search name, email, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="muted" size="icon" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      <Select
        value={searchParams.get('status') || 'all'}
        onValueChange={(val) => updateParam('status', val === 'all' ? '' : val)}
      >
        <SelectTrigger className="sm:w-[220px]">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('sort') || 'createdAt:desc'}
        onValueChange={(val) => updateParam('sort', val)}
      >
        <SelectTrigger className="sm:w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt:desc">Newest First</SelectItem>
          <SelectItem value="createdAt:asc">Oldest First</SelectItem>
          <SelectItem value="loanAmount:desc">Loan Amount (High-Low)</SelectItem>
          <SelectItem value="loanAmount:asc">Loan Amount (Low-High)</SelectItem>
          <SelectItem value="nextPayDate:asc">Next Pay Date</SelectItem>
        </SelectContent>
      </Select>

      <Button type="button" variant="outline" size="default" onClick={handleExport}>
        <Download className="h-4 w-4" />
        Export CSV
      </Button>
    </div>
  );
}
