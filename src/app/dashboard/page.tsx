'use client';

import ProtectedRoute from '@/components/shared/ProtectedRoute';
import NavBar from '@/components/shared/NavBar';
import OverviewSummary from '@/components/dashboard/OverviewSummary';
import QuickLinks from '@/components/dashboard/QuickLinks';
import { useAuth } from '@/context/AuthContext';

function DashboardContent() {
  const { user } = useAuth();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8 animate-fade-up">
      <div>
        <p className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-widest mb-1">
          Welcome back
        </p>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          <span className="gradient-text">{user?.name ?? 'Client'}</span>
        </h1>
        <p className="text-sm text-[var(--color-muted)] mt-1">
          Here&apos;s a real-time snapshot of your wellness journey.
        </p>
      </div>
      <OverviewSummary />
      <QuickLinks />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <NavBar />
      <DashboardContent />
    </ProtectedRoute>
  );
}
