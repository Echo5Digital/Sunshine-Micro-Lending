import { z } from 'zod';

// Florida ZIP codes fall within these three ranges (320xx–329xx, 33xxx–34xxx, and
// the panhandle military-adjacent 344xx). Covers all standard FL ZIPs.
const FLORIDA_ZIP_REGEX = /^(3[2-4]\d{3})$/;

function isFutureWithinDays(dateString, maxDays) {
  if (!dateString) {
    return false;
  }
  const inputDate = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(inputDate.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + maxDays);

  return inputDate > today && inputDate <= maxDate;
}

function isAdult(dateString, minAge) {
  if (!dateString) {
    return false;
  }
  const dob = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(dob.getTime())) {
    return false;
  }

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age >= minAge;
}

// ─── Application Form Schema ──────────────────────────────────────────────────
export const applicationSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name contains invalid characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name contains invalid characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  phone: z
    .string()
    .regex(
      /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      'Please enter a valid US phone number'
    ),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => isAdult(val, 18), 'You must be at least 18 years old to apply'),
  streetAddress: z
    .string()
    .min(3, 'Street address is required')
    .max(200, 'Street address is too long'),
  city: z
    .string()
    .min(2, 'City is required')
    .max(100, 'City is too long'),
  state: z.literal('FL', { message: 'Sunshine Micro Lending currently only serves Florida residents' }),
  zipCode: z
    .string()
    .regex(FLORIDA_ZIP_REGEX, 'Please enter a valid Florida ZIP code'),
  loanAmount: z
    .number({ invalid_type_error: 'Please enter a loan amount' })
    .min(100, 'Minimum loan amount is $100')
    .max(500, 'Maximum loan amount is $500'),
  loanType: z.enum(['single_payment', 'installment']).default('single_payment'),
  payFrequency: z.enum(['weekly', 'biweekly', 'semimonthly', 'monthly'], {
    required_error: 'Please select your pay frequency',
  }),
  nextPayDate: z
    .string()
    .min(1, 'Next pay date is required')
    .refine((val) => isFutureWithinDays(val, 31), 'Next pay date must be a future date within 31 days'),
  employmentStatus: z.enum(
    ['employed_full_time', 'employed_part_time', 'self_employed', 'unemployed', 'retired', 'disability'],
    { required_error: 'Please select your employment status' }
  ),
  employer: z
    .string()
    .min(1, 'Employer name is required')
    .max(200, 'Employer name is too long'),
  monthlyIncome: z
    .number({ invalid_type_error: 'Please enter your monthly income' })
    .positive('Monthly income must be greater than $0'),
  hasBankAccount: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must have an active checking account to apply',
    }),
  documentFileId: z
    .string()
    .min(1, 'Please upload your most recent pay stub or bank statement'),
  documentUrl: z.string().optional(),
  documentName: z.string().optional(),
  consentGiven: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms to continue',
    }),
  loanPurpose: z.string().max(500, 'Purpose description is too long').optional(),
});

// ─── Contact Form Schema ──────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(200, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  phone: z
    .string()
    .regex(/^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(300, 'Subject is too long'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(5000, 'Message is too long'),
});

// ─── Newsletter Schema ────────────────────────────────────────────────────────
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  firstName: z.string().max(100, 'First name is too long').optional(),
});

// ─── Loan Calculator Schema ───────────────────────────────────────────────────
export const loanCalculatorSchema = z.object({
  amount: z
    .number()
    .min(100, 'Minimum loan is $100')
    .max(500, 'Maximum loan is $500'),
  term: z
    .number()
    .min(7, 'Minimum term is 7 days')
    .max(90, 'Maximum term is 90 days'),
  type: z.enum(['single_payment', 'installment']),
});

// ─── Admin Login Schema ───────────────────────────────────────────────────────
export const adminLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// ─── Admin Application Update Schema ──────────────────────────────────────────
export const applicationUpdateSchema = z.object({
  action: z.enum(['status_change', 'note_added', 'veritec_marked', 'assigned']),
  value: z.union([z.string(), z.null()]).optional(),
});

// ─── Admin Create Staff User Schema ───────────────────────────────────────────
export const adminCreateUserSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(255, 'Email is too long'),
  name: z.string().min(1, 'Name is required').max(200, 'Name is too long'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(200, 'Password is too long'),
});

// ─── Admin Contact Message Update Schema ──────────────────────────────────────
export const contactUpdateSchema = z.object({
  action: z.enum(['status_change', 'note_added']),
  value: z.union([z.string(), z.null()]).optional(),
});
