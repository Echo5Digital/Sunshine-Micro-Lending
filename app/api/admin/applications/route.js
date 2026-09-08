import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { buildApplicationFilter, buildApplicationSort } from '@/lib/services/applicationQuery';

const LIST_FIELDS =
  'firstName lastName email phone loanAmount loanType status assignedTo veritecChecked nextPayDate createdAt statusChangedAt';

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
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const pageSize = Math.min(Math.max(parseInt(searchParams.get('pageSize') || '25', 10), 1), 100);

    const filter = buildApplicationFilter({ status, search, dateFrom, dateTo, assignedTo });
    const sortSpec = buildApplicationSort(sort);

    const { connectDB } = await import('@/lib/db');
    const { Application } = await import('@/models/Application');
    await connectDB();

    const [applications, total] = await Promise.all([
      Application.find(filter)
        .select(LIST_FIELDS)
        .sort(sortSpec)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      Application.countDocuments(filter),
    ]);

    return NextResponse.json({ applications, total, page, pageSize }, { status: 200 });
  } catch (error) {
    console.error('Admin applications list error:', error);
    return NextResponse.json({ error: 'Failed to load applications.' }, { status: 500 });
  }
}
