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
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
        <div
          className="h-10 w-10 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]"
          style={{ animation: 'spin-glow 0.8s linear infinite', boxShadow: '0 0 12px var(--color-primary-glow)' }}
          data-testid="loading-spinner"
        />
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,217,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,217,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[var(--color-primary)] opacity-[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[var(--color-violet)] opacity-[0.04] blur-3xl" />

      <div className="relative w-full max-w-md animate-fade-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[var(--color-primary-dim)] border border-[var(--color-border-bright)] mb-4 shadow-[0_0_20px_var(--color-primary-glow)]">
            <span className="text-[var(--color-primary)] text-xl font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>W</span>
          </div>
          <h1
            className="text-3xl font-bold tracking-tight gradient-text"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Wellness Portal
          </h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Your intelligent wellness command center
          </p>
        </div>

        {/* Card */}
        <div className="glass-bright rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          {/* Tabs */}
          <div className="flex border-b border-[var(--color-border)]">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                tab === 'login'
                  ? 'text-[var(--color-primary)] border-b border-[var(--color-primary)] bg-[var(--color-primary-dim)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-muted-2)]'
              }`}
              data-testid="login-tab"
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                tab === 'signup'
                  ? 'text-[var(--color-violet)] border-b border-[var(--color-violet)] bg-[var(--color-violet-dim)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-muted-2)]'
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

        <p className="text-center mt-6 text-xs text-[var(--color-muted)]">
          Secured · Encrypted · Private
        </p>
      </div>
    </main>
  );
}
