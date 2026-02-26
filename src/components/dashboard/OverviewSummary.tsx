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
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section data-testid="overview-summary">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-widest">
          Overview
        </span>
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Wellness Plan card */}
        <div
          className="glass rounded-2xl p-5 relative overflow-hidden group hover:border-[var(--color-primary)] transition-all duration-300"
          data-testid="plan-summary"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(0,217,255,0.06) 0%, transparent 70%)' }}
          />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Wellness Plan
          </p>
          <p
            className="text-4xl font-bold tabular-nums neon-text-cyan"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {completedCount}
            <span className="text-xl text-[var(--color-muted)] font-normal">/{totalCount}</span>
          </p>
          <p className="text-xs text-[var(--color-muted)] mt-1">milestones complete</p>
          {totalCount > 0 && (
            <div className="mt-3 h-1 w-full rounded-full bg-[var(--color-surface-2)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-700"
                style={{ width: `${pct}%`, boxShadow: '0 0 6px var(--color-primary-glow)' }}
              />
            </div>
          )}
        </div>

        {/* Latest Progress card */}
        <div
          className="glass rounded-2xl p-5 relative overflow-hidden group hover:border-[var(--color-violet)] transition-all duration-300"
          data-testid="progress-summary"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.06) 0%, transparent 70%)' }}
          />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Latest Progress
          </p>
          {recentEntry ? (
            <>
              <p className="text-lg font-bold capitalize" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {recentEntry.category.replace('_', ' ')}
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-1 line-clamp-2">{recentEntry.note}</p>
            </>
          ) : (
            <p className="text-sm text-[var(--color-muted)] mt-1">No entries yet</p>
          )}
        </div>

        {/* Next Appointment card */}
        <div
          className="glass rounded-2xl p-5 relative overflow-hidden group hover:border-[var(--color-green)] transition-all duration-300"
          data-testid="appointment-summary"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)' }}
          />
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-3">
            Next Appointment
          </p>
          {nextAppt ? (
            <>
              <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                {nextAppt.service}
              </p>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                {nextAppt.date} · {nextAppt.time}
              </p>
            </>
          ) : (
            <p className="text-sm text-[var(--color-muted)] mt-1">No upcoming appointments</p>
          )}
        </div>
      </div>
    </section>
  );
}
