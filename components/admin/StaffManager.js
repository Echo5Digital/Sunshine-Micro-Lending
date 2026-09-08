'use client';

import { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { formatDateShort } from '@/lib/utils';

export function StaffManager({ initialStaff }) {
  const [staff, setStaff] = useState(initialStaff);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create staff account.');
      }

      setStaff((prev) =>
        [...prev, { name: form.name, email: form.email.toLowerCase(), createdAt: new Date().toISOString() }].sort(
          (a, b) => a.name.localeCompare(b.name)
        )
      );
      setSuccess(`Account created for ${form.name}. Share the password with them securely.`);
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Current Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="border-b border-border bg-[#F8FAFC] text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5">Name</th>
                  <th className="px-4 py-2.5">Email</th>
                  <th className="px-4 py-2.5">Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {staff.map((member) => (
                  <tr key={member.email}>
                    <td className="max-w-[140px] truncate px-4 py-2.5 font-medium text-[#0A2540]">{member.name}</td>
                    <td className="max-w-[180px] truncate px-4 py-2.5 text-muted-foreground">{member.email}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">{formatDateShort(member.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Staff Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && <p className="form-error">{error}</p>}
            {success && <p className="text-sm text-[#16A34A]">{success}</p>}

            <div>
              <Label htmlFor="staff-name" className="mb-1.5 block">Name</Label>
              <Input
                id="staff-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="staff-email" className="mb-1.5 block">Email</Label>
              <Input
                id="staff-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="staff-password" className="mb-1.5 block">Temporary Password</Label>
              <Input
                id="staff-password"
                type="text"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                minLength={8}
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">
                At least 8 characters. Share this with the new staff member securely — it isn&apos;t emailed
                automatically.
              </p>
            </div>

            <Button type="submit" variant="default" disabled={saving} className="w-full">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
              Add Staff Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
