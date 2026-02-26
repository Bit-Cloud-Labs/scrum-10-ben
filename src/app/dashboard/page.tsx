'use client';

import ProtectedRoute from '@/components/shared/ProtectedRoute';
import NavBar from '@/components/shared/NavBar';
import OverviewSummary from '@/components/dashboard/OverviewSummary';
import QuickLinks from '@/components/dashboard/QuickLinks';
import { useAuth } from '@/context/AuthContext';

function DashboardContent() {
  const { user } = useAuth();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.name ?? 'Client'}!
        </h1>
        <p className="text-[var(--color-muted)] mt-1">
          Here&apos;s a snapshot of your wellness journey.
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
