import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import { MessageDetail } from '@/components/admin/MessageDetail';

export const metadata = {
  title: 'Message Detail',
};

async function getMessageDetail(id) {
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  const { connectDB } = await import('@/lib/db');
  const { Contact } = await import('@/models/Contact');
  await connectDB();

  const message = await Contact.findById(id).lean();
  if (!message) {
    return null;
  }

  return JSON.parse(JSON.stringify(message));
}

export default async function MessageDetailPage({ params }) {
  const { id } = await params;
  const message = await getMessageDetail(id);

  if (!message) {
    notFound();
  }

  return <MessageDetail message={message} />;
}
