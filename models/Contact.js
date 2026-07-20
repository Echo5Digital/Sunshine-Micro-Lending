import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 255 },
    phone: { type: String, trim: true, maxlength: 20 },
    subject: { type: String, required: true, trim: true, maxlength: 300 },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'resolved', 'closed'],
      default: 'new',
    },
    ipAddress: { type: String, maxlength: 45 },
    internalNotes: { type: String },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

ContactSchema.index({ email: 1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 });

export const Contact =
  mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
