import mongoose from 'mongoose';

const AdminUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 255 },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 200 },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const AdminUser =
  mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
