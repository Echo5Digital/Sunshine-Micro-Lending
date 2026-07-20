'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';
import { calculateLoanFee, calculateAPR, formatCurrency } from '@/lib/utils';

export function LoanCalculator() {
  const [amount, setAmount] = useState(300);
  const [term, setTerm] = useState(14);

  const calculation = calculateLoanFee(amount);
  const apr = calculateAPR(amount, calculation.totalFee, term);

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-premium lg:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00A6FB]/10">
          <Calculator className="h-5 w-5 text-[#00A6FB]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#0A2540]">Fee Estimator</h3>
          <p className="text-xs text-muted-foreground">See your exact fees before applying</p>
        </div>
      </div>

      {/* Amount Slider */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Loan Amount</label>
          <span className="text-lg font-bold text-[#0A2540]">{formatCurrency(amount)}</span>
        </div>
        <input
          type="range"
          min={100}
          max={500}
          step={50}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E2E8F0] accent-[#00A6FB]"
          aria-label="Loan amount"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>$100</span>
          <span>$500</span>
        </div>
      </div>

      {/* Term Slider */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Repayment Term</label>
          <span className="text-lg font-bold text-[#0A2540]">{term} days</span>
        </div>
        <input
          type="range"
          min={7}
          max={31}
          step={1}
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#E2E8F0] accent-[#00A6FB]"
          aria-label="Loan term in days"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>7 days</span>
          <span>31 days</span>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="mb-6 rounded-xl bg-[#F8FAFC] p-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Loan Amount</span>
            <span className="font-medium">{formatCurrency(calculation.principal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Fee (10%)</span>
            <span className="font-medium">{formatCurrency(calculation.percentFee)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Verification Fee</span>
            <span className="font-medium">{formatCurrency(calculation.verificationFee)}</span>
          </div>
          <div className="border-t border-border pt-2.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0A2540]">Total Repayment</span>
              <span className="text-lg font-bold text-[#0A2540]">
                {formatCurrency(calculation.totalRepayment)}
              </span>
            </div>
          </div>
          {apr && (
            <div className="flex items-center justify-between border-t border-border pt-2.5">
              <span className="text-xs text-muted-foreground">Estimated APR ({term} days)</span>
              <span className="text-xs font-medium text-muted-foreground">{apr}%</span>
            </div>
          )}
        </div>
      </div>

      <Link
        href="/apply"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A6FB] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0097e8]"
      >
        Apply for {formatCurrency(amount)}
        <ArrowRight className="h-4 w-4" />
      </Link>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        No obligation. See exact fees before committing.
      </p>
    </div>
  );
}
