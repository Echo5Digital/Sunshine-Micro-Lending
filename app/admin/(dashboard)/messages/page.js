import { buildContactFilter, buildContactSort } from '@/lib/services/contactQuery';
import { MessagesFilters } from '@/components/admin/MessagesFilters';
import { MessagesTable } from '@/components/admin/MessagesTable';
import { Pagination } from '@/components/admin/Pagination';

export const metadata = {
  title: 'Messages',
};

const LIST_FIELDS = 'name email phone subject status createdAt resolvedAt';

async function getMessages(searchParams) {
  const status = searchParams.status || undefined;
  const search = searchParams.search || undefined;
  const dateFrom = searchParams.dateFrom || undefined;
  const dateTo = searchParams.dateTo || undefined;
  const sort = searchParams.sort || undefined;
  const page = Math.max(parseInt(searchParams.page || '1', 10), 1);
  const pageSize = 25;

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

  return {
    messages: JSON.parse(JSON.stringify(messages)),
    total,
    page,
    pageSize,
  };
}

export default async function AdminMessagesPage({ searchParams }) {
  const params = await searchParams;
  const { messages, total, page, pageSize } = await getMessages(params);
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[#0A2540]">Messages</h1>
        <p className="text-sm text-muted-foreground">{total} total message{total === 1 ? '' : 's'}</p>
      </div>

      <MessagesFilters />
      <MessagesTable messages={messages} />
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
