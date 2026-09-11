import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAdminSession } from '@/lib/auth';
import { applicationUpdateSchema } from '@/lib/validations';
import {
  changeApplicationStatus,
  addApplicationNote,
  markVeritecChecked,
  assignApplication,
} from '@/lib/services/applicationWorkflow';

export async function GET(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
  }

  try {
    const { connectDB } = await import('@/lib/db');
    const { Application } = await import('@/models/Application');
    const { AuditLog } = await import('@/models/AuditLog');
    await connectDB();

    const application = await Application.findById(id).lean();
    if (!application) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }

    const auditLog = await AuditLog.find({ applicationId: id }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ application, auditLog }, { status: 200 });
  } catch (error) {
    console.error('Admin application detail error:', error);
    return NextResponse.json({ error: 'Failed to load application.' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
  }

  const validation = applicationUpdateSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: validation.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { action, value, reason } = validation.data;
  const actor = { adminUserId: session.adminUserId, name: session.name };

  try {
    const { connectDB } = await import('@/lib/db');
    await connectDB();

    let application;
    switch (action) {
      case 'status_change':
        application = await changeApplicationStatus({ applicationId: id, newStatus: value, actor, reason });
        break;
      case 'note_added':
        application = await addApplicationNote({ applicationId: id, note: value || '', actor });
        break;
      case 'veritec_marked':
        application = await markVeritecChecked({ applicationId: id, actor });
        break;
      case 'assigned':
        application = await assignApplication({ applicationId: id, assignee: value, actor });
        break;
      default:
        return NextResponse.json({ error: 'Unknown action.' }, { status: 422 });
    }

    return NextResponse.json({ success: true, application }, { status: 200 });
  } catch (error) {
    if (error.message === 'Application not found') {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }
    if (error.message === 'A reason is required when declining an application.') {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    console.error('Admin application update error:', error);
    return NextResponse.json({ error: 'Failed to update application.' }, { status: 500 });
  }
}
