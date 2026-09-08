import { NextResponse } from 'next/server';
import { getAdminSession, hashPassword } from '@/lib/auth';
import { adminCreateUserSchema } from '@/lib/validations';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { connectDB } = await import('@/lib/db');
    const { AdminUser } = await import('@/models/AdminUser');
    await connectDB();

    const staff = await AdminUser.find().select('name email createdAt').sort({ name: 1 }).lean();
    return NextResponse.json({ staff }, { status: 200 });
  } catch (error) {
    console.error('Admin staff list error:', error);
    return NextResponse.json({ error: 'Failed to load staff list.' }, { status: 500 });
  }
}

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
  }

  const validation = adminCreateUserSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: 'Validation failed.', details: validation.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { email, name, password } = validation.data;

  try {
    const { connectDB } = await import('@/lib/db');
    const { AdminUser } = await import('@/models/AdminUser');
    await connectDB();

    const existing = await AdminUser.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const user = await AdminUser.create({ email: email.toLowerCase(), name, passwordHash });

    return NextResponse.json(
      { success: true, user: { id: user._id, email: user.email, name: user.name } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Admin create staff error:', error);
    return NextResponse.json({ error: 'Failed to create staff account.' }, { status: 500 });
  }
}
