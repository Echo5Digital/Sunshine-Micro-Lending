import { ActivityLogTimeline } from '@/components/admin/ActivityLogTimeline';
import { Pagination } from '@/components/admin/Pagination';
import { attachEntityNames } from '@/lib/services/activityLogQuery';
import { Card, CardContent } from '@/components/ui/Card';

export const metadata = {
  title: 'Activity Log',
};

const PAGE_SIZE = 20;

async function getActivityLog(searchParams) {
  const page = Math.max(parseInt(searchParams.page || '1', 10), 1);

  const { connectDB } = await import('@/lib/db');
  const { AuditLog } = await import('@/models/AuditLog');
  await connectDB();

  const [entries, total] = await Promise.all([
    AuditLog.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    AuditLog.countDocuments({}),
  ]);

  const enriched = await attachEntityNames(JSON.parse(JSON.stringify(entries)));

  return { entries: enriched, total, page };
}

export default async function ActivityLogPage({ searchParams }) {
  const params = await searchParams;
  const { entries, total, page } = await getActivityLog(params);
  const totalPages = Math.max(Math.ceil(total / PAGE_SIZE), 1);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[#0A2540]">Activity Log</h1>
        <p className="text-sm text-muted-foreground">
          {total} total activit{total === 1 ? 'y' : 'ies'} across applications and messages
        </p>
      </div>

      <Card className="rounded-2xl border-border/60 shadow-[0_2px_16px_rgba(10,37,64,0.06)]">
        <CardContent className="p-5">
          <ActivityLogTimeline entries={entries} />
        </CardContent>
      </Card>

      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
}
