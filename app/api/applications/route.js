import { NextResponse } from 'next/server';
import { applicationSchema } from '@/lib/validations';
import { generateReferenceNumber, getClientIp, sanitizeInput } from '@/lib/utils';
import { sendApplicationEmail, sendAdminNotificationEmail } from '@/lib/email/resend';

export async function POST(request) {
  try {
    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request format.' }, { status: 400 });
    }

    // Validate with Zod
    const validation = applicationSchema.safeParse(body);
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

    // Generate reference number
    const referenceNumber = generateReferenceNumber();

    // Get client IP for compliance/audit
    const ipAddress = getClientIp(request);
    const userAgent = request.headers.get('user-agent') || '';

    // Calculate fees
    const loanAmount = parseFloat(data.loanAmount);
    const percentFee = loanAmount * 0.1;
    const verificationFee = 5.0;
    const estimatedFee = percentFee + verificationFee;

    // Attempt to save to database
    try {
      const { db } = await import('@/lib/db');
      const { applications } = await import('@/drizzle/schema');

      await db.insert(applications).values({
        firstName: sanitizeInput(data.firstName),
        lastName: sanitizeInput(data.lastName),
        email: sanitizeInput(data.email.toLowerCase()),
        phone: sanitizeInput(data.phone),
        loanAmount: data.loanAmount.toString(),
        loanType: data.loanType,
        payFrequency: data.payFrequency,
        employmentStatus: data.employmentStatus,
        hasBankAccount: data.hasBankAccount,
        consentGiven: data.consentGiven,
        consentTimestamp: new Date(),
        ipAddress: sanitizeInput(ipAddress),
        userAgent: sanitizeInput(userAgent).substring(0, 500),
        referenceNumber,
        estimatedFee: estimatedFee.toString(),
        verificationFee: verificationFee.toString(),
        status: 'pending',
        loanPurpose: data.loanPurpose ? sanitizeInput(data.loanPurpose) : null,
        monthlyIncome: data.monthlyIncome ? data.monthlyIncome.toString() : null,
        employer: data.employer ? sanitizeInput(data.employer) : null,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with email even if DB fails
    }

    // Send confirmation email to applicant
    try {
      await sendApplicationEmail({
        to: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        referenceNumber,
        loanAmount,
        estimatedFee,
        loanType: data.loanType,
      });
    } catch (emailError) {
      console.error('Email error (applicant):', emailError);
    }

    // Send admin notification
    try {
      await sendAdminNotificationEmail({
        referenceNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        loanAmount,
        loanType: data.loanType,
        employmentStatus: data.employmentStatus,
      });
    } catch (emailError) {
      console.error('Email error (admin):', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        referenceNumber,
        message: 'Application submitted successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Application API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
