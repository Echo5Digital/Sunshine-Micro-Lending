'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { contactSchema } from '@/lib/validations';

const SUBJECTS = [
  'Question about my application',
  'Question about loan terms',
  'Question about repayment',
  'Request for grace period',
  'Complaint',
  'General inquiry',
  'Other',
];

export function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data) {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to send message.');
      }

      setStatus('success');
      reset();
    } catch (error) {
      setErrorMessage(error.message);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-[#22C55E]/30 bg-white p-10 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#22C55E]/10">
          <CheckCircle className="h-7 w-7 text-[#16A34A]" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-[#0A2540]">Message Sent!</h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. We will respond within 1 business day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-medium text-[#00A6FB] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-white p-6 shadow-card md:p-8"
      noValidate
      aria-label="Contact form"
    >
      <h2 className="mb-6 text-xl font-bold text-[#0A2540]">Send Us a Message</h2>

      {status === 'error' && (
        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="contact-name" className="mb-1.5 block">Full Name *</Label>
            <Input
              id="contact-name"
              placeholder="Your full name"
              autoComplete="name"
              {...register('name')}
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-email" className="mb-1.5 block">Email Address *</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="contact-phone" className="mb-1.5 block">Phone (Optional)</Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="(555) 555-5555"
            autoComplete="tel"
            {...register('phone')}
          />
          {errors.phone && <p className="form-error">{errors.phone.message}</p>}
        </div>

        <div>
          <Label htmlFor="contact-subject" className="mb-1.5 block">Subject *</Label>
          <Select onValueChange={(val) => setValue('subject', val)}>
            <SelectTrigger id="contact-subject">
              <SelectValue placeholder="What is your inquiry about?" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((subject) => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.subject && <p className="form-error">{errors.subject.message}</p>}
        </div>

        <div>
          <Label htmlFor="contact-message" className="mb-1.5 block">Message *</Label>
          <Textarea
            id="contact-message"
            placeholder="Please describe your question or concern in detail..."
            rows={5}
            {...register('message')}
          />
          {errors.message && <p className="form-error">{errors.message.message}</p>}
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={status === 'submitting'}
          className="w-full"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </Button>
      </div>
    </form>
  );
}
