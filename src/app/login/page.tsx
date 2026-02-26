'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-blue)] border-t-transparent"
          data-testid="loading-spinner"
        />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-gradient-to-br from-[var(--color-blue-light)] to-[var(--color-green-light)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-blue)]">Wellness Portal</h1>
          <p className="mt-2 text-[var(--color-muted)]">Your journey to better wellness starts here</p>
        </div>

        <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
          <div className="flex border-b border-[var(--color-border)]">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                tab === 'login'
                  ? 'border-b-2 border-[var(--color-blue)] text-[var(--color-blue)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
              }`}
              data-testid="login-tab"
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                tab === 'signup'
                  ? 'border-b-2 border-[var(--color-green)] text-[var(--color-green)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
              }`}
              data-testid="signup-tab"
            >
              Create Account
            </button>
          </div>
          <div className="p-6">
            {tab === 'login' ? <LoginForm /> : <SignupForm />}
          </div>
        </div>
      </div>
    </main>
  );
}
