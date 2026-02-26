'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const inputClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-violet)] focus:shadow-[0_0_0_1px_var(--color-violet),0_0_12px_var(--color-violet-glow)] transition-all duration-200';

export default function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }
    setIsSubmitting(true);
    try {
      await signup(email, password, name);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="signup-form">
      <div>
        <label htmlFor="signup-name" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Full Name
        </label>
        <input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Jane Doe"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="signup-email" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="signup-password" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
        />
      </div>
      {error && (
        <p
          className="rounded-lg border border-[var(--color-red)] bg-[var(--color-red-dim)] px-3 py-2 text-xs text-[var(--color-red)]"
          role="alert"
          data-testid="signup-error"
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[var(--color-violet)] px-4 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_20px_var(--color-violet-glow)] disabled:opacity-40 transition-all duration-200"
      >
        {isSubmitting ? 'Creating account…' : 'Create Account'}
      </button>
    </form>
  );
}
