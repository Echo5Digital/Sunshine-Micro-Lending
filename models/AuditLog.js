import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
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

export const AuditLog =
  mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
