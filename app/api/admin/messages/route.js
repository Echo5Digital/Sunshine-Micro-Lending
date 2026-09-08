import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { buildContactFilter, buildContactSort } from '@/lib/services/contactQuery';

const LIST_FIELDS = 'name email phone subject status createdAt resolvedAt';

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
    const sort = searchParams.get('sort') || undefined;
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const pageSize = Math.min(Math.max(parseInt(searchParams.get('pageSize') || '25', 10), 1), 100);

    const filter = buildContactFilter({ status, search, dateFrom, dateTo });
    const sortSpec = buildContactSort(sort);

    const { connectDB } = await import('@/lib/db');
    const { Contact } = await import('@/models/Contact');
    await connectDB();

    const [messages, total] = await Promise.all([
      Contact.find(filter)
        .select(LIST_FIELDS)
        .sort(sortSpec)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      Contact.countDocuments(filter),
    ]);

    return NextResponse.json({ messages, total, page, pageSize }, { status: 200 });
  } catch (error) {
    console.error('Admin messages list error:', error);
    return NextResponse.json({ error: 'Failed to load messages.' }, { status: 500 });
  }
}
