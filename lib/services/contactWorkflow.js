import 'server-only';

const VALID_STATUSES = ['new', 'in_progress', 'resolved', 'closed'];

async function recordAudit({ contactId, actor, action, oldValue, newValue }) {
  const { AuditLog } = await import('@/models/AuditLog');
  await AuditLog.create({
    entityType: 'contact',
    contactId,
    adminUserId: actor.adminUserId,
    adminUserName: actor.name,
    action,
    oldValue,
    newValue,
  });
}

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

async function getCurrentValue(contactId, field) {
  const { Contact } = await import('@/models/Contact');
  const contact = await Contact.findById(contactId).select(field).lean();
  if (!contact) {
    throw new Error('Message not found');
  }
  return contact;
}

export async function changeContactStatus({ contactId, newStatus, actor }) {
  if (!VALID_STATUSES.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  const before = await getCurrentValue(contactId, 'status');
  const oldStatus = before.status;

  const update = { status: newStatus };
  if (newStatus === 'resolved' || newStatus === 'closed') {
    update.resolvedAt = new Date();
  } else {
    update.resolvedAt = null;
  }

  const contact = await updateContactOrThrow(contactId, update);

  await recordAudit({
    contactId,
    actor,
    action: 'status_change',
    oldValue: oldStatus,
    newValue: newStatus,
  });

  return contact;
}

export async function addContactNote({ contactId, note, actor }) {
  const contact = await updateContactOrThrow(contactId, { internalNotes: note });

  await recordAudit({
    contactId,
    actor,
    action: 'note_added',
    oldValue: null,
    newValue: note,
  });

  return contact;
}
