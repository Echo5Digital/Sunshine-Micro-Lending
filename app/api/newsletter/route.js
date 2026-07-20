import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validations';
import { sanitizeInput, getClientIp } from '@/lib/utils';

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    const validation = newsletterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 422 }
      );
    }

    const { email, firstName } = validation.data;
    const ipAddress = getClientIp(request);

    try {
      const { db } = await import('@/lib/db');
      const { newsletterSubscribers } = await import('@/drizzle/schema');

      await db
        .insert(newsletterSubscribers)
        .values({
          email: sanitizeInput(email.toLowerCase()),
          firstName: firstName ? sanitizeInput(firstName) : null,
          ipAddress: sanitizeInput(ipAddress),
          source: 'website',
          isActive: true,
        })
        .onConflictDoNothing();
    } catch (dbError) {
      console.error('Newsletter DB error:', dbError);
    }

    return NextResponse.json({ success: true, message: 'Successfully subscribed.' });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: 'Subscription failed.' }, { status: 500 });
  }
}
