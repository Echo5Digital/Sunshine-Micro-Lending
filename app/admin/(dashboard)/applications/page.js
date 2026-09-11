import { buildApplicationFilter, buildApplicationSort } from '@/lib/services/applicationQuery';
import { ApplicationsFilters } from '@/components/admin/ApplicationsFilters';
import { ApplicationsTable } from '@/components/admin/ApplicationsTable';
import { Pagination } from '@/components/admin/Pagination';

export const metadata = {
  title: 'Applications',
};

const LIST_FIELDS =
  'firstName lastName email phone loanAmount loanType status assignedTo veritecChecked nextPayDate createdAt statusChangedAt documentName';

async function getApplications(searchParams) {
  const status = searchParams.status || undefined;
  const search = searchParams.search || undefined;
  const dateFrom = searchParams.dateFrom || undefined;
  const dateTo = searchParams.dateTo || undefined;
  const sort = searchParams.sort || undefined;
  const page = Math.max(parseInt(searchParams.page || '1', 10), 1);
  const pageSize = 25;

  const filter = buildApplicationFilter({ status, search, dateFrom, dateTo });
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

  return {
    applications: JSON.parse(JSON.stringify(applications)),
    total,
    page,
    pageSize,
  };
}

export default async function AdminDashboardPage({ searchParams }) {
  const params = await searchParams;
  const { applications, total, page, pageSize } = await getApplications(params);
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[#0A2540]">Applications</h1>
        <p className="text-sm text-muted-foreground">{total} total application{total === 1 ? '' : 's'}</p>
      </div>

      <ApplicationsFilters />
      <ApplicationsTable applications={applications} />
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
