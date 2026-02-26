'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getPlan } from '@/lib/services/wellnessService';
import { getProgress } from '@/lib/services/progressService';
import { getAppointments } from '@/lib/services/appointmentService';
import type { WellnessPlan, ProgressEntry, Appointment } from '@/types';

export default function OverviewSummary() {
  const { user } = useAuth();
  const [plan, setPlan] = useState<WellnessPlan | null>(null);
  const [recentEntry, setRecentEntry] = useState<ProgressEntry | null>(null);
  const [nextAppt, setNextAppt] = useState<Appointment | null>(null);

  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    const p = getPlan(userId);
    setPlan(p);
    const entries = getProgress(userId);
    setRecentEntry(entries[0] ?? null);
    const appts = getAppointments(userId);
    const upcoming = appts.filter((a) => a.status === 'upcoming');
    setNextAppt(upcoming[0] ?? null);
  }, [userId]);

  const completedCount = plan?.milestones.filter((m) => m.completed).length ?? 0;
  const totalCount = plan?.milestones.length ?? 0;

  return (
    <section className="rounded-2xl bg-[var(--color-blue-light)] p-6" data-testid="overview-summary">
      <h2 className="text-xl font-bold mb-4 text-[var(--color-blue)]">Your Overview</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm" data-testid="plan-summary">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Wellness Plan
          </p>
          <p className="mt-1 text-2xl font-bold">
            {completedCount}/{totalCount}
          </p>
          <p className="text-sm text-[var(--color-muted)]">milestones complete</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm" data-testid="progress-summary">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Latest Progress
          </p>
          {recentEntry ? (
            <>
              <p className="mt-1 text-lg font-bold capitalize">{recentEntry.category.replace('_', ' ')}</p>
              <p className="text-sm text-[var(--color-muted)]">{recentEntry.note}</p>
            </>
          ) : (
            <p className="mt-1 text-sm text-[var(--color-muted)]">No entries yet</p>
          )}
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm" data-testid="appointment-summary">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Next Appointment
          </p>
          {nextAppt ? (
            <>
              <p className="mt-1 text-lg font-bold">{nextAppt.service}</p>
              <p className="text-sm text-[var(--color-muted)]">
                {nextAppt.date} at {nextAppt.time}
              </p>
            </>
          ) : (
            <p className="mt-1 text-sm text-[var(--color-muted)]">No upcoming appointments</p>
          )}
        </div>
      </div>
    </section>
  );
}
