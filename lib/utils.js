import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow } from 'date-fns';

// ─── Tailwind class merger ────────────────────────────────────────────────────
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ─── Loan Calculations ────────────────────────────────────────────────────────
export function calculateLoanFee(amount) {
  const principal = parseFloat(amount) || 0;
  const percentFee = principal * 0.1; // 10%
  const verificationFee = 5.0;
  const totalFee = percentFee + verificationFee;
  const totalRepayment = principal + totalFee;

  return {
    principal,
    percentFee,
    verificationFee,
    totalFee,
    totalRepayment,
  };
}

export function calculateAPR(principal, totalFees, termDays) {
  if (!principal || !totalFees || !termDays) {
    return null;
  }
  // APR = (Fee / Principal) x (365 / Term) x 100
  return ((totalFees / principal) * (365 / termDays) * 100).toFixed(2);
}

export function formatCurrency(amount, options = {}) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
}

// ─── Reference Number Generator ──────────────────────────────────────────────
export function generateReferenceNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SML-${timestamp}-${random}`;
}

// ─── Phone Formatting ─────────────────────────────────────────────────────────
export function formatPhone(phone) {
  if (!phone) {
    return '';
  }
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

// ─── Date Formatting ──────────────────────────────────────────────────────────
export function formatDate(date, options = {}) {
  if (!date) {
    return '';
  }
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(new Date(date));
}

export function formatDateShort(date) {
  return formatDate(date, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatRelativeTime(date) {
  if (!date) {
    return '';
  }
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatReadingTime(minutes) {
  if (!minutes) {
    return '';
  }
  return `${minutes} min read`;
}

// ─── String Utilities ─────────────────────────────────────────────────────────
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text, maxLength = 160) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).trim() + '...';
}

export function capitalize(str) {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ─── Input Sanitization ───────────────────────────────────────────────────────
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input;
  }
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS chars
    .substring(0, 10000); // Limit length
}

// ─── IP Address ───────────────────────────────────────────────────────────────
export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (real) {
    return real.trim();
  }
  return 'unknown';
}

// ─── Error Handling ───────────────────────────────────────────────────────────
export function getErrorMessage(error) {
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
