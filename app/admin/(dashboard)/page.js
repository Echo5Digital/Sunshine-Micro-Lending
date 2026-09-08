import Link from 'next/link';
import { FileText, MessageSquare, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDateShort } from '@/lib/utils';
import { getStatusLabel, getStatusBadgeVariant } from '@/lib/applicationStatus';
import { getContactStatusLabel, getContactStatusBadgeVariant } from '@/lib/contactStatus';

export const metadata = {
  title: 'Dashboard',
};

async function getDashboardData() {
  const { connectDB } = await import('@/lib/db');
  const { Application } = await import('@/models/Application');
  const { Contact } = await import('@/models/Contact');
  await connectDB();

  const [
    totalApplications,
    newApplications,
    pendingVeritec,
    approvedApplications,
    totalMessages,
    newMessages,
    recentApplications,
    recentMessages,
  ] = await Promise.all([
    Application.countDocuments({}),
    Application.countDocuments({ status: 'new' }),
    Application.countDocuments({ status: { $in: ['under_review', 'veritec_check_pending'] } }),
    Application.countDocuments({ status: { $in: ['approved', 'veritec_cleared', 'funded'] } }),
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
  ]);

  return {
    stats: { totalApplications, newApplications, pendingVeritec, approvedApplications, totalMessages, newMessages },
    recentApplications: JSON.parse(JSON.stringify(recentApplications)),
    recentMessages: JSON.parse(JSON.stringify(recentMessages)),
  };
}

function StatCard({ icon: Icon, label, value, accent, subtext }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-2xl font-bold text-[#0A2540]">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
          {subtext && <div className="mt-0.5 text-xs font-medium text-[#00A6FB]">{subtext}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

export default async function AdminDashboardPage() {
  const { stats, recentApplications, recentMessages } = await getDashboardData();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0A2540]">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of applications and messages.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FileText}
          label="Total Applications"
          value={stats.totalApplications}
          subtext={`${stats.newApplications} new`}
          accent="bg-[#00A6FB]/10 text-[#00A6FB]"
        />
        <StatCard
          icon={ShieldCheck}
          label="Awaiting Veritec / Review"
          value={stats.pendingVeritec}
          accent="bg-amber-100 text-amber-700"
        />
        <StatCard
          icon={Clock}
          label="Approved / Cleared"
          value={stats.approvedApplications}
          accent="bg-green-100 text-green-700"
        />
        <StatCard
          icon={MessageSquare}
          label="Total Messages"
          value={stats.totalMessages}
          subtext={`${stats.newMessages} new`}
          accent="bg-[#0A2540]/10 text-[#0A2540]"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between border-b border-border p-5">
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
                      className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-[#F8FAFC]"
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

        <Card>
          <div className="flex items-center justify-between border-b border-border p-5">
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
                      className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-[#F8FAFC]"
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
    </div>
  );
}
