'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, AlertCircle, Loader2, Info } from 'lucide-react';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { applicationSchema } from '@/lib/validations';
import { formatCurrency, calculateLoanFee } from '@/lib/utils';
import Link from 'next/link';

const LOAN_AMOUNTS = [100, 150, 200, 250, 300, 350, 400, 450, 500];

export function ApplicationForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(300);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      loanAmount: 300,
      loanType: 'single_payment',
      hasBankAccount: false,
      consentGiven: false,
    },
  });

  const loanAmount = watch('loanAmount') || selectedAmount;
  const calc = calculateLoanFee(loanAmount);

  async function onSubmit(data) {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed. Please try again.');
      }

      setReferenceNumber(result.referenceNumber || '');
      setStatus('success');
    } catch (error) {
      setErrorMessage(error.message);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-[#22C55E]/30 bg-white p-8 text-center shadow-card">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]/10">
          <CheckCircle className="h-8 w-8 text-[#16A34A]" />
        </div>
        <h2 className="mb-3 text-2xl font-bold text-[#0A2540]">Application Received!</h2>
        <p className="mb-4 text-muted-foreground">
          Thank you for applying. We have received your application and will contact you shortly
          with a lending decision.
        </p>
        {referenceNumber && (
          <div className="mb-6 rounded-lg bg-[#F8FAFC] p-4">
            <p className="text-xs text-muted-foreground">Your Reference Number</p>
            <p className="mt-1 text-xl font-bold text-[#0A2540] font-mono">{referenceNumber}</p>
            <p className="mt-1 text-xs text-muted-foreground">Save this for your records</p>
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Check your email for a confirmation message. Our team will review your application during
          business hours (Monday–Friday, 9AM–5PM EST).
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="btn-outline text-sm">Return Home</Link>
          <Link href="/how-it-works" className="btn-ghost text-sm">Learn About the Process</Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-white p-4 shadow-card sm:p-6 md:p-8"
      noValidate
      aria-label="Payday Loan Application Form"
    >
      <h2 className="mb-6 text-xl font-bold text-[#0A2540]">Loan Application</h2>

      {/* Error Banner */}
      {status === 'error' && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      {/* ─── Loan Details ─────────────────────────────── */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#00A6FB]">
          Loan Details
        </h3>

        {/* Loan Amount */}
        <div className="mb-4">
          <Label className="mb-2 block">Loan Amount *</Label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {LOAN_AMOUNTS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => {
                  setSelectedAmount(amount);
                  setValue('loanAmount', amount);
                }}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                  loanAmount === amount
                    ? 'border-[#00A6FB] bg-[#00A6FB] text-white'
                    : 'border-border bg-white text-foreground hover:border-[#00A6FB]/50'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
          {errors.loanAmount && (
            <p className="form-error">{errors.loanAmount.message}</p>
          )}
        </div>

        {/* Fee Preview */}
        <div className="mb-4 rounded-lg bg-[#F8FAFC] border border-border p-4">
          <div className="grid grid-cols-3 gap-2 text-center text-sm sm:gap-4">
            <div>
              <div className="font-bold text-[#0A2540]">{formatCurrency(calc.totalFee)}</div>
              <div className="text-xs text-muted-foreground">Total Fee</div>
            </div>
            <div>
              <div className="font-bold text-[#0A2540]">{formatCurrency(calc.totalRepayment)}</div>
              <div className="text-xs text-muted-foreground">Total Repayment</div>
            </div>
            <div>
              <div className="font-bold text-[#0A2540]">$5</div>
              <div className="text-xs text-muted-foreground">Verification Fee</div>
            </div>
          </div>
        </div>

        {/* Loan Type */}
        <div className="mb-4">
          <Label className="mb-2 block">Loan Type *</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'single_payment', label: 'Single Payment', detail: '7–31 days' },
              { value: 'installment', label: 'Installment', detail: '60–90 days' },
            ].map((type) => (
              <label
                key={type.value}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all ${
                  watch('loanType') === type.value
                    ? 'border-[#00A6FB] bg-[#00A6FB]/5'
                    : 'border-border hover:border-[#00A6FB]/40'
                }`}
              >
                <input
                  type="radio"
                  value={type.value}
                  {...register('loanType')}
                  className="mt-0.5 accent-[#00A6FB]"
                />
                <div>
                  <p className="text-sm font-medium text-[#0A2540]">{type.label}</p>
                  <p className="text-xs text-muted-foreground">{type.detail}</p>
                </div>
              </label>
            ))}
          </div>
          {errors.loanType && <p className="form-error">{errors.loanType.message}</p>}
        </div>
      </div>

      {/* ─── Personal Information ─────────────────────── */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#00A6FB]">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName" className="mb-1.5 block">First Name *</Label>
            <Input
              id="firstName"
              placeholder="John"
              autoComplete="given-name"
              {...register('firstName')}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && (
              <p id="firstName-error" className="form-error">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName" className="mb-1.5 block">Last Name *</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              autoComplete="family-name"
              {...register('lastName')}
            />
            {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
          </div>

          <div>
            <Label htmlFor="email" className="mb-1.5 block">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="mb-1.5 block">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 555-5555"
              autoComplete="tel"
              {...register('phone')}
            />
            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* ─── Employment & Income ──────────────────────── */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#00A6FB]">
          Employment & Income
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="employmentStatus" className="mb-1.5 block">Employment Status *</Label>
            <Select onValueChange={(val) => setValue('employmentStatus', val)}>
              <SelectTrigger id="employmentStatus">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="employed_full_time">Employed (Full-Time)</SelectItem>
                <SelectItem value="employed_part_time">Employed (Part-Time)</SelectItem>
                <SelectItem value="self_employed">Self-Employed</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
                <SelectItem value="disability">Disability Benefits</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
              </SelectContent>
            </Select>
            {errors.employmentStatus && (
              <p className="form-error">{errors.employmentStatus.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="payFrequency" className="mb-1.5 block">Pay Frequency *</Label>
            <Select onValueChange={(val) => setValue('payFrequency', val)}>
              <SelectTrigger id="payFrequency">
                <SelectValue placeholder="How often paid?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-Weekly (Every 2 Weeks)</SelectItem>
                <SelectItem value="semimonthly">Semi-Monthly (Twice/Month)</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            {errors.payFrequency && (
              <p className="form-error">{errors.payFrequency.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* ─── Bank Account ─────────────────────────────── */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#00A6FB]">
          Bank Account
        </h3>

        <div className="rounded-lg border border-border p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="hasBankAccount"
              onCheckedChange={(checked) => setValue('hasBankAccount', checked === true)}
            />
            <Label htmlFor="hasBankAccount" className="cursor-pointer text-sm leading-relaxed">
              I confirm that I have an active checking account in my name. I understand that loan
              repayment will be collected via ACH debit from this account on the agreed repayment date.
            </Label>
          </div>
          {errors.hasBankAccount && (
            <p className="form-error mt-2">{errors.hasBankAccount.message}</p>
          )}
        </div>
      </div>

      {/* ─── Consent ──────────────────────────────────── */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#00A6FB]">
          Terms & Consent
        </h3>

        <div className="rounded-lg border border-border p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consentGiven"
              onCheckedChange={(checked) => setValue('consentGiven', checked === true)}
            />
            <Label htmlFor="consentGiven" className="cursor-pointer text-sm leading-relaxed text-muted-foreground">
              I agree to the{' '}
              <Link href="/terms-of-use" target="_blank" className="text-[#00A6FB] hover:underline">Terms of Use</Link>
              {' '}and{' '}
              <Link href="/privacy-policy" target="_blank" className="text-[#00A6FB] hover:underline">Privacy Policy</Link>.
              I consent to Sunshine Micro Lending contacting me via phone and email regarding my application.
              I understand this is an inquiry for a payday loan and not a final approval.
              I confirm I am a Florida resident, 18 years or older, and do not currently have an outstanding payday loan.
            </Label>
          </div>
          {errors.consentGiven && (
            <p className="form-error mt-2">{errors.consentGiven.message}</p>
          )}
        </div>

        {/* Info box */}
        <div className="mt-4 flex items-start gap-2.5 rounded-lg bg-[#F8FAFC] p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#00A6FB]" />
          <p className="text-xs text-muted-foreground">
            Submitting this form is not an agreement or approval. You will receive your exact loan
            terms—including all fees—before any commitment. Florida law provides you a right to decline.
          </p>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full text-base"
        aria-label="Submit loan application"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting Application...
          </>
        ) : (
          <>Submit Application — Free</>
        )}
      </Button>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        No application fee. No credit score impact. Florida licensed lender.
      </p>
    </form>
  );
}
