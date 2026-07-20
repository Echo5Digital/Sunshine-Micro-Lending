import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { getClientIp, sanitizeInput } from '@/lib/utils';
import { sendContactEmail, sendContactConfirmationEmail } from '@/lib/email/resend';

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
    }

    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed.',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = validation.data;
    const ipAddress = getClientIp(request);

    // Save to database
    try {
      const { db } = await import('@/lib/db');
      const { contacts } = await import('@/drizzle/schema');

      await db.insert(contacts).values({
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email.toLowerCase()),
        phone: data.phone ? sanitizeInput(data.phone) : null,
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message),
        ipAddress: sanitizeInput(ipAddress),
        status: 'new',
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
    }

    // Send admin notification
    try {
      await sendContactEmail({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      });
    } catch (emailError) {
      console.error('Email error (contact admin):', emailError);
    }

    // Send confirmation to user
    try {
      await sendContactConfirmationEmail({
        to: data.email,
        name: data.name,
        subject: data.subject,
      });
    } catch (emailError) {
      console.error('Email error (contact confirmation):', emailError);
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
