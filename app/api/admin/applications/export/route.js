import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { buildApplicationFilter, buildApplicationSort } from '@/lib/services/applicationQuery';
import { toCSV } from '@/lib/csv';
import { formatDate } from '@/lib/utils';

const MAX_EXPORT_ROWS = 10000;

const EXPORT_COLUMNS = [
  { label: 'Reference Number', value: (r) => r.referenceNumber },
  { label: 'Submitted At', value: (r) => (r.createdAt ? new Date(r.createdAt).toISOString() : '') },
  { label: 'First Name', value: (r) => r.firstName },
  { label: 'Last Name', value: (r) => r.lastName },
  { label: 'Email', value: (r) => r.email },
  { label: 'Phone', value: (r) => r.phone },
  { label: 'Date of Birth', value: (r) => (r.dateOfBirth ? formatDate(r.dateOfBirth) : '') },
  { label: 'Street Address', value: (r) => r.streetAddress },
  { label: 'City', value: (r) => r.city },
  { label: 'State', value: (r) => r.state },
  { label: 'ZIP', value: (r) => r.zipCode },
  { label: 'Loan Amount', value: (r) => r.loanAmount },
  { label: 'Loan Type', value: (r) => r.loanType },
  { label: 'Pay Frequency', value: (r) => r.payFrequency },
  { label: 'Next Pay Date', value: (r) => (r.nextPayDate ? formatDate(r.nextPayDate) : '') },
  { label: 'Employer', value: (r) => r.employer },
  { label: 'Monthly Income', value: (r) => r.monthlyIncome },
  { label: 'Status', value: (r) => r.status },
  { label: 'Status Changed At', value: (r) => (r.statusChangedAt ? new Date(r.statusChangedAt).toISOString() : '') },
  { label: 'Assigned To', value: (r) => r.assignedTo },
  { label: 'Veritec Checked', value: (r) => (r.veritecChecked ? 'Yes' : 'No') },
  { label: 'Veritec Checked At', value: (r) => (r.veritecCheckedAt ? new Date(r.veritecCheckedAt).toISOString() : '') },
  { label: 'Veritec Checked By', value: (r) => r.veritecCheckedBy },
  { label: 'Internal Notes', value: (r) => r.internalNotes },
  { label: 'Created At', value: (r) => (r.createdAt ? new Date(r.createdAt).toISOString() : '') },
  { label: 'Updated At', value: (r) => (r.updatedAt ? new Date(r.updatedAt).toISOString() : '') },
];

export async function GET(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const dateFrom = searchParams.get('dateFrom') || undefined;
    const dateTo = searchParams.get('dateTo') || undefined;
    const assignedTo = searchParams.get('assignedTo') || undefined;
    const sort = searchParams.get('sort') || undefined;

    const filter = buildApplicationFilter({ status, search, dateFrom, dateTo, assignedTo });
    const sortSpec = buildApplicationSort(sort);

    const { connectDB } = await import('@/lib/db');
    const { Application } = await import('@/models/Application');
    await connectDB();

    const applications = await Application.find(filter).sort(sortSpec).limit(MAX_EXPORT_ROWS).lean();

    const csv = toCSV(applications, EXPORT_COLUMNS);
    const filename = `applications-export-${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Admin CSV export error:', error);
    return NextResponse.json({ error: 'Failed to export applications.' }, { status: 500 });
  }
}
