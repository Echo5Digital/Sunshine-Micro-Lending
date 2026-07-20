import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 100 },
    lastName: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 255 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    loanAmount: { type: Number, required: true, min: 100, max: 500 },
    loanType: { type: String, required: true, enum: ['single_payment', 'installment'], default: 'single_payment' },
    loanPurpose: { type: String, trim: true },
    employmentStatus: {
      type: String,
      required: true,
      enum: ['employed_full_time', 'employed_part_time', 'self_employed', 'unemployed', 'retired', 'disability'],
    },
    payFrequency: {
      type: String,
      required: true,
      enum: ['weekly', 'biweekly', 'semimonthly', 'monthly'],
    },
    monthlyIncome: { type: Number },
    employer: { type: String, trim: true, maxlength: 200 },
    hasBankAccount: { type: Boolean, required: true, default: false },
    bankName: { type: String, trim: true, maxlength: 200 },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'approved', 'denied', 'withdrawn'],
      default: 'pending',
    },
    internalNotes: { type: String },
    consentGiven: { type: Boolean, required: true, default: false },
    consentTimestamp: { type: Date },
    ipAddress: { type: String, maxlength: 45 },
    userAgent: { type: String },
    estimatedFee: { type: Number },
    verificationFee: { type: Number, default: 5.0 },
    referenceNumber: { type: String, unique: true, sparse: true, maxlength: 20 },
    utmSource: { type: String, maxlength: 100 },
    utmMedium: { type: String, maxlength: 100 },
    utmCampaign: { type: String, maxlength: 200 },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

ApplicationSchema.index({ email: 1 });
ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ createdAt: -1 });
ApplicationSchema.index({ referenceNumber: 1 }, { unique: true, sparse: true });

export const Application =
  mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
