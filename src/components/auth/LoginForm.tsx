'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const inputClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_1px_var(--color-primary),0_0_12px_var(--color-primary-glow)] transition-all duration-200';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
      <div>
        <label htmlFor="login-email" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>
      {error && (
        <p
          className="rounded-lg border border-[var(--color-red)] bg-[var(--color-red-dim)] px-3 py-2 text-xs text-[var(--color-red)]"
          role="alert"
          data-testid="login-error"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--color-primary-foreground)] hover:shadow-[0_0_20px_var(--color-primary-glow)] disabled:opacity-40 transition-all duration-200"
      >
        {isSubmitting ? 'Authenticating…' : 'Sign In'}
      </button>
    </form>
  );
}
