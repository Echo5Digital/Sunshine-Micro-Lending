import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      required: true,
      enum: ['application', 'contact'],
      default: 'application',
    },
    // applicationId is kept as the canonical field name (rather than a generic
    // entityId) for backward compatibility with existing records and the
    // per-application query in app/admin/(dashboard)/applications/[id]/page.js.
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      index: true,
    },
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact',
      index: true,
    },
    adminUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser', required: true },
    adminUserName: { type: String, required: true, trim: true, maxlength: 200 },
    action: {
      type: String,
      required: true,
      enum: ['status_change', 'note_added', 'veritec_marked', 'assigned'],
    },
    oldValue: { type: mongoose.Schema.Types.Mixed, default: null },
    newValue: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

AuditLogSchema.index({ applicationId: 1, createdAt: -1 });
AuditLogSchema.index({ contactId: 1, createdAt: -1 });
AuditLogSchema.index({ createdAt: -1 });

export const AuditLog =
  mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
