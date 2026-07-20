import mongoose from 'mongoose';

const NewsletterSubscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 255 },
    firstName: { type: String, trim: true, maxlength: 100 },
    isActive: { type: Boolean, default: true },
    source: { type: String, default: 'website', maxlength: 100 },
    ipAddress: { type: String, maxlength: 45 },
    unsubscribedAt: { type: Date },
  },
  { timestamps: true }
);

NewsletterSubscriberSchema.index({ email: 1 }, { unique: true });
NewsletterSubscriberSchema.index({ isActive: 1 });

export const NewsletterSubscriber =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model('NewsletterSubscriber', NewsletterSubscriberSchema);
