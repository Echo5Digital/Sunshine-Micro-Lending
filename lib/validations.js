import { z } from 'zod';

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
  loanAmount: z
    .number({ invalid_type_error: 'Please enter a loan amount' })
    .min(100, 'Minimum loan amount is $100')
    .max(500, 'Maximum loan amount is $500'),
  loanType: z.enum(['single_payment', 'installment'], {
    required_error: 'Please select a loan type',
  }),
  payFrequency: z.enum(['weekly', 'biweekly', 'semimonthly', 'monthly'], {
    required_error: 'Please select your pay frequency',
  }),
  employmentStatus: z.enum(
    ['employed_full_time', 'employed_part_time', 'self_employed', 'unemployed', 'retired', 'disability'],
    { required_error: 'Please select your employment status' }
  ),
  hasBankAccount: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must have an active checking account to apply',
    }),
  consentGiven: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms to continue',
    }),
  loanPurpose: z.string().max(500, 'Purpose description is too long').optional(),
  monthlyIncome: z.number().positive().optional(),
  employer: z.string().max(200, 'Employer name is too long').optional(),
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
