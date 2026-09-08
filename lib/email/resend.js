import 'server-only';
import { Resend } from 'resend';
import { formatCurrency } from '@/lib/utils';

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@sunshinemicrolending.com';
const ADMIN_EMAIL = process.env.RESEND_ADMIN_EMAIL || 'admin@sunshinemicrolending.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sunshinemicrolending.com';
const COMPANY_NAME = 'Sunshine Micro Lending';

// ─── Shared Email Wrapper ─────────────────────────────────────────────────────
function emailWrapper(content, previewText = '') {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${COMPANY_NAME}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background: #F8FAFC; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .header { background: #0A2540; padding: 32px 40px; text-align: center; }
    .header-logo { color: #ffffff; font-size: 20px; font-weight: 700; }
    .header-logo span { color: #00A6FB; }
    .content { padding: 40px; }
    .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 24px 40px; text-align: center; }
    .footer p { color: #94A3B8; font-size: 11px; line-height: 1.6; }
    .btn { display: inline-block; background: #00A6FB; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 16px 0; }
    .info-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 16px 0; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #E2E8F0; font-size: 14px; }
    .info-row:last-child { border-bottom: none; }
    .label { color: #64748B; }
    .value { color: #0A2540; font-weight: 600; }
    h1 { color: #0A2540; font-size: 22px; font-weight: 700; margin-bottom: 8px; }
    h2 { color: #0A2540; font-size: 16px; font-weight: 600; margin: 20px 0 8px; }
    p { color: #475569; font-size: 14px; line-height: 1.7; margin-bottom: 12px; }
    .ref { background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0; }
    .ref-label { color: #64748B; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .ref-number { color: #0A2540; font-size: 20px; font-weight: 700; font-family: monospace; margin-top: 4px; }
  </style>
</head>
<body>
  <div style="display:none;max-height:0;overflow:hidden;">${previewText}</div>
  <div class="wrapper">
    <div class="header">
      <div class="header-logo">
        Sunshine <span>Micro Lending</span>
      </div>
      <p style="color: rgba(255,255,255,0.6); font-size: 12px; margin-top: 4px;">Serving Florida Residents Statewide</p>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>
        Sunshine Micro Lending | Florida Deferred Presentment Transactions<br>
        <a href="${SITE_URL}" style="color: #00A6FB; text-decoration: none;">${SITE_URL}</a>
      </p>
      <p style="margin-top: 8px;">
        This email was sent because you submitted an application or inquiry at ${SITE_URL}.<br>
        Maximum loan: $500. Fee: 10% + $5. Florida residents only.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// ─── Application Received Email ───────────────────────────────────────────────
export async function sendApplicationEmail({
  to,
  firstName,
  lastName,
  referenceNumber,
  loanAmount,
  estimatedFee,
  loanType,
  launchingSoon = false,
}) {
  const loanTypeLabel = loanType === 'single_payment' ? 'Single Payment Loan' : 'Installment Loan';
  const totalRepayment = loanAmount + estimatedFee;

  const content = `
    <h1>${launchingSoon ? "Thanks for your interest — we're launching soon!" : 'Application Received!'}</h1>
    <p>Hi ${firstName},</p>
    <p>${
      launchingSoon
        ? `Thank you for your interest in ${COMPANY_NAME}. We are not yet open for lending, but we have received your information and will reach out as soon as we launch.`
        : `Thank you for applying with ${COMPANY_NAME}. We have received your loan application and our team will review it shortly during business hours (Monday–Friday, 9AM–5PM EST).`
    }</p>

    <div class="ref">
      <div class="ref-label">Your Reference Number</div>
      <div class="ref-number">${referenceNumber}</div>
    </div>

    <h2>Application Summary</h2>
    <div class="info-box">
      <div class="info-row">
        <span class="label">Applicant</span>
        <span class="value">${firstName} ${lastName}</span>
      </div>
      <div class="info-row">
        <span class="label">Loan Amount</span>
        <span class="value">${formatCurrency(loanAmount)}</span>
      </div>
      <div class="info-row">
        <span class="label">Estimated Fee</span>
        <span class="value">${formatCurrency(estimatedFee)}</span>
      </div>
      <div class="info-row">
        <span class="label">Est. Total Repayment</span>
        <span class="value">${formatCurrency(totalRepayment)}</span>
      </div>
      <div class="info-row">
        <span class="label">Loan Type</span>
        <span class="value">${loanTypeLabel}</span>
      </div>
    </div>

    <h2>What Happens Next?</h2>
    ${
      launchingSoon
        ? `
    <p>1. We are finalizing our launch and are not yet processing loan applications.</p>
    <p>2. We will keep your information on file and notify you by email as soon as we launch.</p>
    <p>3. No fees or charges apply, and nothing has been submitted for a lending decision.</p>
    `
        : `
    <p>1. Our team reviews your application and verifies your information.</p>
    <p>2. We check the Florida statewide payday loan database as required by law.</p>
    <p>3. You will receive a lending decision via email.</p>
    <p>4. If approved, you will receive your loan agreement with exact terms before any commitment.</p>
    `
    }

    <p style="margin-top: 20px;">Have questions? Reply to this email or contact us at <a href="tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}" style="color: #00A6FB;">${process.env.NEXT_PUBLIC_COMPANY_PHONE}</a>.</p>

    <p style="margin-top: 16px; font-size: 12px; color: #94A3B8;">
      This application does not guarantee loan approval. All loans are subject to eligibility verification
      and Florida state law. You will not be charged until you sign and accept a loan agreement.
    </p>
  `;

  const resend = getResend();
  if (!resend) {
    return;
  }
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject: `Application Received: Ref ${referenceNumber} | ${COMPANY_NAME}`,
    html: emailWrapper(content, `Your loan application has been received. Reference: ${referenceNumber}`),
  });
}

// ─── Admin Notification Email ─────────────────────────────────────────────────
export async function sendAdminNotificationEmail({
  referenceNumber,
  firstName,
  lastName,
  email,
  phone,
  loanAmount,
  loanType,
  employmentStatus,
}) {
  const content = `
    <h1>New Loan Application</h1>
    <p>A new loan application has been submitted and requires review.</p>

    <div class="ref">
      <div class="ref-label">Reference Number</div>
      <div class="ref-number">${referenceNumber}</div>
    </div>

    <div class="info-box">
      <div class="info-row">
        <span class="label">Applicant</span>
        <span class="value">${firstName} ${lastName}</span>
      </div>
      <div class="info-row">
        <span class="label">Email</span>
        <span class="value">${email}</span>
      </div>
      <div class="info-row">
        <span class="label">Phone</span>
        <span class="value">${phone}</span>
      </div>
      <div class="info-row">
        <span class="label">Loan Amount</span>
        <span class="value">${formatCurrency(loanAmount)}</span>
      </div>
      <div class="info-row">
        <span class="label">Loan Type</span>
        <span class="value">${loanType}</span>
      </div>
      <div class="info-row">
        <span class="label">Employment</span>
        <span class="value">${employmentStatus.replace(/_/g, ' ')}</span>
      </div>
      <div class="info-row">
        <span class="label">Submitted</span>
        <span class="value">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</span>
      </div>
    </div>
  `;

  const resend = getResend();
  if (!resend) {
    return;
  }
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    subject: `[NEW APPLICATION] ${firstName} ${lastName}: ${formatCurrency(loanAmount)} (Ref ${referenceNumber})`,
    html: emailWrapper(content, `New application from ${firstName} ${lastName}`),
  });
}

// ─── Contact Form Emails ──────────────────────────────────────────────────────
export async function sendContactEmail({ name, email, phone, subject, message }) {
  const content = `
    <h1>New Contact Message</h1>
    <div class="info-box">
      <div class="info-row">
        <span class="label">Name</span>
        <span class="value">${name}</span>
      </div>
      <div class="info-row">
        <span class="label">Email</span>
        <span class="value">${email}</span>
      </div>
      ${phone ? `<div class="info-row"><span class="label">Phone</span><span class="value">${phone}</span></div>` : ''}
      <div class="info-row">
        <span class="label">Subject</span>
        <span class="value">${subject}</span>
      </div>
    </div>
    <h2>Message</h2>
    <p style="white-space: pre-wrap; background: #F8FAFC; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0;">${message}</p>
  `;

  const resend = getResend();
  if (!resend) {
    return;
  }
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [ADMIN_EMAIL],
    replyTo: email,
    subject: `[CONTACT] ${subject} (from ${name})`,
    html: emailWrapper(content, `Contact from ${name}: ${subject}`),
  });
}

export async function sendContactConfirmationEmail({ to, name, subject }) {
  const content = `
    <h1>Message Received</h1>
    <p>Hi ${name},</p>
    <p>Thank you for contacting ${COMPANY_NAME}. We have received your message regarding <strong>${subject}</strong> and will respond within 1 business day during our hours of operation (Monday–Friday, 9AM–5PM ET).</p>
    <p>If your inquiry is urgent, you can also reach us by phone at <a href="tel:${process.env.NEXT_PUBLIC_COMPANY_PHONE}" style="color: #00A6FB;">${process.env.NEXT_PUBLIC_COMPANY_PHONE}</a>.</p>
    <a href="${SITE_URL}/faq" class="btn">Browse Our FAQ</a>
  `;

  const resend = getResend();
  if (!resend) {
    return;
  }
  await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject: `We received your message | ${COMPANY_NAME}`,
    html: emailWrapper(content, 'We received your message and will respond within 1 business day.'),
  });
}
