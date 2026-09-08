// Seeds the initial super-admin account. Safe to re-run (upserts by email).
// Additional staff accounts should be created from within the admin panel
// itself (Admin > Add Staff) once logged in as this account.
//
// Usage: node --env-file=.env.local scripts/seed-admin-users.mjs

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set.');
  process.exit(1);
}

const SUPER_ADMIN = {
  email: 'sony@echo5digital.com',
  name: 'Sony',
  password: 'Sony@1234',
};

const AdminUserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 255 },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true, maxlength: 200 },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

async function main() {
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);

  const passwordHash = await bcrypt.hash(SUPER_ADMIN.password, 12);

  await AdminUser.findOneAndUpdate(
    { email: SUPER_ADMIN.email.toLowerCase() },
    { email: SUPER_ADMIN.email.toLowerCase(), name: SUPER_ADMIN.name, passwordHash },
    { upsert: true, new: true }
  );

  console.log(`Super admin account ready: ${SUPER_ADMIN.email}`);
  console.log('Log in at /admin/login with the password you configured in this script.');
  console.log('IMPORTANT: this script contains a plaintext password — do not commit real production credentials to source control.');

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
