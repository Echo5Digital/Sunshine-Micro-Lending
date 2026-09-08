import { NextResponse } from 'next/server';
import { adminLoginSchema } from '@/lib/validations';
import { verifyPassword, signSession, SESSION_COOKIE } from '@/lib/auth';

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
    }

    const validation = adminLoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const { email, password } = validation.data;

    const { connectDB } = await import('@/lib/db');
    const { AdminUser } = await import('@/models/AdminUser');
    await connectDB();

    const user = await AdminUser.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const passwordValid = await verifyPassword(password, user.passwordHash);
    if (!passwordValid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = await signSession({
      adminUserId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    user.lastLoginAt = new Date();
    await user.save();

    const response = NextResponse.json({ success: true, name: user.name }, { status: 200 });
    response.cookies.set(SESSION_COOKIE.name, token, SESSION_COOKIE.options);
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
