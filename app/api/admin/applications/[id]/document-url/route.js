import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAdminSession } from '@/lib/auth';
import { getSignedDocumentUrl } from '@/lib/imagekit';

const EXPIRE_SECONDS = 300;

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
    await connectDB();

    const application = await Application.findById(id).select('documentUrl').lean();
    if (!application) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }
    if (!application.documentUrl) {
      return NextResponse.json({ error: 'No document on file for this application.' }, { status: 404 });
    }

    const url = getSignedDocumentUrl(application.documentUrl, EXPIRE_SECONDS);
    const expiresAt = new Date(Date.now() + EXPIRE_SECONDS * 1000).toISOString();

    return NextResponse.json({ url, expiresAt }, { status: 200 });
  } catch (error) {
    console.error('Admin document URL error:', error);
    return NextResponse.json({ error: 'Failed to generate document link.' }, { status: 500 });
  }
}
