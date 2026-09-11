import 'server-only';

const VALID_STATUSES = [
  'new',
  'under_review',
  'veritec_check_pending',
  'veritec_cleared',
  'approved',
  'declined',
  'funded',
  'repaid',
  'past_due',
];

async function recordAudit({ applicationId, actor, action, oldValue, newValue }) {
  const { AuditLog } = await import('@/models/AuditLog');
  await AuditLog.create({
    entityType: 'application',
    applicationId,
    adminUserId: actor.adminUserId,
    adminUserName: actor.name,
    action,
    oldValue,
    newValue,
  });
}

// Uses findByIdAndUpdate (not findById + .save()) so validation runs only on
// the fields being changed, not the whole document. This matters because
// legacy/incomplete records predating a schema change would otherwise fail
// to save even when the update itself is valid.
async function updateApplicationOrThrow(applicationId, update) {
  const { Application } = await import('@/models/Application');
  const application = await Application.findByIdAndUpdate(applicationId, update, {
    new: true,
    runValidators: true,
    context: 'query',
  });
  if (!application) {
    throw new Error('Application not found');
  }
  return application;
}

async function getCurrentValue(applicationId, field) {
  const { Application } = await import('@/models/Application');
  const application = await Application.findById(applicationId).select(field).lean();
  if (!application) {
    throw new Error('Application not found');
  }
  return application;
}

export async function changeApplicationStatus({ applicationId, newStatus, actor, reason }) {
  if (!VALID_STATUSES.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }

  if (newStatus === 'declined' && !reason?.trim()) {
    throw new Error('A reason is required when declining an application.');
  }

  const before = await getCurrentValue(applicationId, 'status');
  const oldStatus = before.status;

  const update = {
    status: newStatus,
    statusChangedAt: new Date(),
    declineReason: newStatus === 'declined' ? reason.trim() : null,
  };

  const application = await updateApplicationOrThrow(applicationId, update);

  await recordAudit({
    applicationId,
    actor,
    action: 'status_change',
    oldValue: oldStatus,
    newValue: newStatus === 'declined' ? { status: newStatus, reason: reason.trim() } : newStatus,
  });

  return application;
}

export async function addApplicationNote({ applicationId, note, actor }) {
  if (!note?.trim()) {
    throw new Error('Note text is required.');
  }

  const { Application } = await import('@/models/Application');

  const entry = {
    text: note.trim(),
    authorId: actor.adminUserId,
    authorName: actor.name,
    createdAt: new Date(),
  };

  const application = await Application.findByIdAndUpdate(
    applicationId,
    { $push: { notes: entry } },
    { new: true, runValidators: true, context: 'query' }
  );
  if (!application) {
    throw new Error('Application not found');
  }

  await recordAudit({
    applicationId,
    actor,
    action: 'note_added',
    oldValue: null,
    newValue: entry.text,
  });

  return application;
}

export async function markVeritecChecked({ applicationId, actor }) {
  const before = await getCurrentValue(applicationId, 'veritecChecked veritecCheckedAt veritecCheckedBy');
  const oldValue = {
    veritecChecked: before.veritecChecked,
    veritecCheckedAt: before.veritecCheckedAt,
    veritecCheckedBy: before.veritecCheckedBy,
  };

  const veritecCheckedAt = new Date();
  const application = await updateApplicationOrThrow(applicationId, {
    veritecChecked: true,
    veritecCheckedAt,
    veritecCheckedBy: actor.name,
  });

  await recordAudit({
    applicationId,
    actor,
    action: 'veritec_marked',
    oldValue,
    newValue: { veritecChecked: true, veritecCheckedAt, veritecCheckedBy: actor.name },
  });

  return application;
}

export async function assignApplication({ applicationId, assignee, actor }) {
  const before = await getCurrentValue(applicationId, 'assignedTo');
  const oldValue = before.assignedTo || null;
  const newValue = assignee || null;

  const application = await updateApplicationOrThrow(applicationId, { assignedTo: newValue });

  await recordAudit({
    applicationId,
    actor,
    action: 'assigned',
    oldValue,
    newValue,
  });

  return application;
}
