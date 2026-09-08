import { Suspense } from 'react';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata = {
  title: 'Log In',
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
