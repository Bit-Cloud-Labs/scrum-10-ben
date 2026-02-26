'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)]">
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-10 w-10 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)]"
            style={{
              animation: 'spin-glow 0.8s linear infinite',
              boxShadow: '0 0 12px var(--color-primary-glow)',
            }}
            data-testid="loading-spinner"
          />
          <p className="text-xs text-[var(--color-muted)] uppercase tracking-widest">Loading</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
