import { StaffManager } from '@/components/admin/StaffManager';

export const metadata = {
  title: 'Staff',
};

async function getStaff() {
  const { connectDB } = await import('@/lib/db');
  const { AdminUser } = await import('@/models/AdminUser');
  await connectDB();

  const staff = await AdminUser.find().select('name email createdAt').sort({ name: 1 }).lean();
  return JSON.parse(JSON.stringify(staff));
}

export default async function AdminStaffPage() {
  const staff = await getStaff();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0A2540]">Staff Accounts</h1>
        <p className="text-sm text-muted-foreground">Manage who can log in to the admin panel.</p>
      </div>
      <StaffManager initialStaff={staff} />
    </div>
  );
}
