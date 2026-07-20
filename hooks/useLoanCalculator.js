'use client';

import { useState, useMemo } from 'react';
import { calculateLoanFee, calculateAPR } from '@/lib/utils';

export function useLoanCalculator(initialAmount = 300, initialTerm = 14) {
  const [amount, setAmount] = useState(initialAmount);
  const [term, setTerm] = useState(initialTerm);
  const [loanType, setLoanType] = useState('single_payment');

  const calculation = useMemo(() => {
    const base = calculateLoanFee(amount);
    const apr = calculateAPR(amount, base.totalFee, term);
    return { ...base, apr, term, loanType };
  }, [amount, term, loanType]);

  return {
    amount,
    setAmount,
    term,
    setTerm,
    loanType,
    setLoanType,
    calculation,
  };
}
