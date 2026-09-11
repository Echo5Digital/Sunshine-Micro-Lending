import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { getAdminSession } from '@/lib/auth';
import { contactUpdateSchema } from '@/lib/validations';
import { changeContactStatus, addContactNote } from '@/lib/services/contactWorkflow';

export async function GET(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Message not found.' }, { status: 404 });
  }

  try {
    const { connectDB } = await import('@/lib/db');
    const { Contact } = await import('@/models/Contact');
    await connectDB();

    const message = await Contact.findById(id).lean();
    if (!message) {
      return NextResponse.json({ error: 'Message not found.' }, { status: 404 });
    }

    return NextResponse.json({ message }, { status: 200 });
  } catch (error) {
    console.error('Admin message detail error:', error);
    return NextResponse.json({ error: 'Failed to load message.' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Message not found.' }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
  }

  const validation = contactUpdateSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: validation.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { action, value } = validation.data;
  const actor = { adminUserId: session.adminUserId, name: session.name };

  try {
    const { connectDB } = await import('@/lib/db');
    await connectDB();

    let message;
    switch (action) {
      case 'status_change':
        message = await changeContactStatus({ contactId: id, newStatus: value, actor });
        break;
      case 'note_added':
        message = await addContactNote({ contactId: id, note: value || '', actor });
        break;
      default:
        return NextResponse.json({ error: 'Unknown action.' }, { status: 422 });
    }

    return NextResponse.json({ success: true, message }, { status: 200 });
  } catch (error) {
    if (error.message === 'Message not found') {
      return NextResponse.json({ error: 'Message not found.' }, { status: 404 });
    }
    console.error('Admin message update error:', error);
    return NextResponse.json({ error: 'Failed to update message.' }, { status: 500 });
  }
}
