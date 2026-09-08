import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import { ApplicationDetail } from '@/components/admin/ApplicationDetail';

export const metadata = {
  title: 'Application Detail',
};

async function getApplicationDetail(id) {
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  const { connectDB } = await import('@/lib/db');
  const { Application } = await import('@/models/Application');
  const { AuditLog } = await import('@/models/AuditLog');
  await connectDB();

  const application = await Application.findById(id).lean();
  if (!application) {
    return null;
  }

  const auditLog = await AuditLog.find({ applicationId: id }).sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify({ application, auditLog }));
}

export default async function ApplicationDetailPage({ params }) {
  const { id } = await params;
  const data = await getApplicationDetail(id);

  if (!data) {
    notFound();
  }

  return <ApplicationDetail application={data.application} auditLog={data.auditLog} />;
}
