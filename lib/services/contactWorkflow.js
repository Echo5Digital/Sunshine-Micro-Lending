import 'server-only';

const VALID_STATUSES = ['new', 'in_progress', 'resolved', 'closed'];

// Uses findByIdAndUpdate (not findById + .save()) for the same reason as
// lib/services/applicationWorkflow.js — validation runs only on the fields
// being changed, not the whole document.
async function updateContactOrThrow(contactId, update) {
  const { Contact } = await import('@/models/Contact');
  const contact = await Contact.findByIdAndUpdate(contactId, update, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  if (!contact) {
    throw new Error('Message not found');
  }
  return contact;
}

export async function changeContactStatus({ contactId, newStatus }) {
  if (!VALID_STATUSES.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  const update = { status: newStatus };
  if (newStatus === 'resolved' || newStatus === 'closed') {
    update.resolvedAt = new Date();
  } else {
    update.resolvedAt = null;
  }

  return updateContactOrThrow(contactId, update);
}

export async function addContactNote({ contactId, note }) {
  return updateContactOrThrow(contactId, { internalNotes: note });
}
