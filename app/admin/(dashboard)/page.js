import Link from 'next/link';
import { FileText, MessageSquare, ArrowRight, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDateShort, formatRelativeTime } from '@/lib/utils';
import { getStatusLabel, getStatusBadgeVariant } from '@/lib/applicationStatus';
import { getContactStatusLabel, getContactStatusBadgeVariant } from '@/lib/contactStatus';
import { attachEntityNames } from '@/lib/services/activityLogQuery';
import { ActivityLogTimeline } from '@/components/admin/ActivityLogTimeline';

const NEEDS_ATTENTION_STATUSES = ['new', 'under_review'];
const NEEDS_ATTENTION_HOURS = 24;

const PIPELINE_STATUSES = ['new', 'under_review', 'veritec_cleared', 'approved', 'declined'];
const DASHBOARD_ACTIVITY_LIMIT = 15;

export const metadata = {
  title: 'Dashboard',
};

async function getDashboardData() {
  const { connectDB } = await import('@/lib/db');
  const { Application } = await import('@/models/Application');
  const { Contact } = await import('@/models/Contact');
  await connectDB();

  const attentionCutoff = new Date(Date.now() - NEEDS_ATTENTION_HOURS * 60 * 60 * 1000);

  const { AuditLog } = await import('@/models/AuditLog');

  const [
    totalApplications,
    totalMessages,
    newMessages,
    recentApplications,
    recentMessages,
    needsAttention,
    pipelineCounts,
    recentActivity,
  ] = await Promise.all([
    Application.countDocuments({}),
    Contact.countDocuments({}),
    Contact.countDocuments({ status: 'new' }),
    Application.find({})
      .select('firstName lastName loanAmount status createdAt')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Contact.find({})
      .select('name subject status createdAt')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Application.find({
      status: { $in: NEEDS_ATTENTION_STATUSES },
      veritecChecked: false,
      createdAt: { $lte: attentionCutoff },
    })
      .select('firstName lastName loanAmount status createdAt')
      .sort({ createdAt: 1 })
      .limit(10)
      .lean(),
    Promise.all(
      PIPELINE_STATUSES.map((status) => Application.countDocuments({ status }))
    ),
    AuditLog.find({})
      .sort({ createdAt: -1 })
      .limit(DASHBOARD_ACTIVITY_LIMIT)
      .lean(),
  ]);

  const enrichedActivity = await attachEntityNames(JSON.parse(JSON.stringify(recentActivity)));

  return {
    stats: { totalApplications, totalMessages, newMessages },
    recentApplications: JSON.parse(JSON.stringify(recentApplications)),
    recentMessages: JSON.parse(JSON.stringify(recentMessages)),
    needsAttention: JSON.parse(JSON.stringify(needsAttention)),
    pipeline: PIPELINE_STATUSES.map((status, i) => ({ status, count: pipelineCounts[i] })),
    recentActivity: enrichedActivity,
  };
}

function StatTile({ icon: Icon, label, value, subtext, href }) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center gap-2 bg-white p-5 text-center transition-colors duration-300 hover:bg-[#EFF6FF]"
    >
      {Icon && (
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00A6FB]/10 text-[#00A6FB] transition-colors duration-300 group-hover:bg-[#00A6FB] group-hover:text-white">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <div>
        <div className="text-2xl font-bold text-[#0A2540]">{value}</div>
        <div className="mt-0.5 text-xs font-medium text-muted-foreground">{label}</div>
        {subtext && <div className="mt-0.5 text-xs font-semibold text-[#00A6FB]">{subtext}</div>}
      </div>
    </Link>
  );
}

export default async function AdminDashboardPage() {
  const { stats, recentApplications, recentMessages, needsAttention, pipeline, recentActivity } =
    await getDashboardData();

  return (
    <div>
      <div className="mb-8">
        <span className="section-label">Admin Overview</span>
        <h1 className="mt-3 text-2xl font-bold text-[#0A2540] sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of applications and messages.</p>
      </div>

      {needsAttention.length > 0 && (
        <Card className="relative mb-8 overflow-hidden rounded-2xl border-amber-300 bg-amber-50/60 shadow-[0_2px_16px_rgba(217,119,6,0.08)]">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
          <div className="flex items-center gap-2.5 border-b border-amber-200 p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <AlertTriangle className="h-4.5 w-4.5 text-amber-600" />
            </div>
            <h2 className="font-semibold text-[#0A2540]">
              Needs Attention <span className="text-amber-700">({needsAttention.length})</span>
            </h2>
          </div>
          <CardContent className="p-0">
            <ul className="divide-y divide-amber-200">
              {needsAttention.map((app) => (
                <li key={app._id}>
                  <Link
                    href={`/admin/applications/${app._id}`}
                    className="flex items-center justify-between gap-3 border-l-2 border-transparent p-4 transition-all hover:border-amber-500 hover:bg-amber-100/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#0A2540]">
                        {app.firstName} {app.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(app.loanAmount)} &middot; sitting for {formatRelativeTime(app.createdAt)}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(app.status)} className="shrink-0">
                      {getStatusLabel(app.status)}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8 overflow-hidden rounded-2xl border-border/60 bg-[#F1F5F9] shadow-[0_2px_16px_rgba(10,37,64,0.06)]">
        <div className="border-b border-border bg-white px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Overview</h2>
        </div>
        <CardContent className="grid grid-cols-2 gap-px bg-border p-0 sm:grid-cols-3 lg:grid-cols-7">
          <StatTile
            icon={FileText}
            label="Total Applications"
            value={stats.totalApplications}
            href="/admin/applications"
          />
          <StatTile
            icon={MessageSquare}
            label="Total Messages"
            value={stats.totalMessages}
            subtext={stats.newMessages > 0 ? `${stats.newMessages} new` : undefined}
            href="/admin/messages"
          />
          {pipeline.map(({ status, count }) => (
            <StatTile
              key={status}
              label={getStatusLabel(status)}
              value={count}
              href={`/admin/applications?status=${status}`}
            />
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/60 shadow-[0_2px_16px_rgba(10,37,64,0.06)]">
          <div className="flex items-center justify-between border-b border-border bg-[#F8FAFC] p-5">
            <h2 className="font-semibold text-[#0A2540]">Recent Applications</h2>
            <Link
              href="/admin/applications"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#00A6FB] hover:underline"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <CardContent className="p-0">
            {recentApplications.length === 0 ? (
              <p className="p-5 text-sm text-muted-foreground">No applications yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {recentApplications.map((app) => (
                  <li key={app._id}>
                    <Link
                      href={`/admin/applications/${app._id}`}
                      className="flex items-center justify-between gap-3 border-l-2 border-transparent p-4 transition-all hover:border-[#00A6FB] hover:bg-[#F8FAFC]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#0A2540]">
                          {app.firstName} {app.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(app.loanAmount)} &middot; {formatDateShort(app.createdAt)}
                        </p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(app.status)} className="shrink-0">
                        {getStatusLabel(app.status)}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60 shadow-[0_2px_16px_rgba(10,37,64,0.06)]">
          <div className="flex items-center justify-between border-b border-border bg-[#F8FAFC] p-5">
            <h2 className="font-semibold text-[#0A2540]">Recent Messages</h2>
            <Link
              href="/admin/messages"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#00A6FB] hover:underline"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <CardContent className="p-0">
            {recentMessages.length === 0 ? (
              <p className="p-5 text-sm text-muted-foreground">No messages yet.</p>
            ) : (
              <ul className="divide-y divide-border">
                {recentMessages.map((msg) => (
                  <li key={msg._id}>
                    <Link
                      href={`/admin/messages/${msg._id}`}
                      className="flex items-center justify-between gap-3 border-l-2 border-transparent p-4 transition-all hover:border-[#00A6FB] hover:bg-[#F8FAFC]"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#0A2540]">{msg.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{msg.subject}</p>
                      </div>
                      <Badge variant={getContactStatusBadgeVariant(msg.status)} className="shrink-0">
                        {getContactStatusLabel(msg.status)}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 rounded-2xl border-border/60 shadow-[0_2px_16px_rgba(10,37,64,0.06)]">
        <div className="flex items-center justify-between border-b border-border bg-[#F8FAFC] p-5">
          <h2 className="font-semibold text-[#0A2540]">Recent Activity</h2>
          <Link
            href="/admin/activity"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#00A6FB] hover:underline"
          >
            View full log
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <CardContent className="p-5">
          <ActivityLogTimeline entries={recentActivity} />
        </CardContent>
      </Card>
    </div>
  );
}
