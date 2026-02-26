'use client';

import type { Appointment } from '@/types';

interface AppointmentListProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
}

const STATUS_STYLES: Record<Appointment['status'], { label: string; color: string; dim: string }> = {
  upcoming:  { label: 'Upcoming',  color: 'var(--color-primary)', dim: 'var(--color-primary-dim)' },
  completed: { label: 'Completed', color: 'var(--color-green)',   dim: 'var(--color-green-dim)' },
  cancelled: { label: 'Cancelled', color: 'var(--color-muted)',   dim: 'transparent' },
};

export default function AppointmentList({ appointments, onCancel }: AppointmentListProps) {
  const upcoming = appointments.filter((a) => a.status === 'upcoming');
  const past = appointments.filter((a) => a.status !== 'upcoming');

  return (
    <section data-testid="appointment-list" className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="h-px flex-1 bg-[var(--color-border)]" />
          <span className="text-xs font-medium text-[var(--color-primary)] uppercase tracking-widest">
            Upcoming
          </span>
          <span className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        {upcoming.length === 0 ? (
          <p className="text-sm text-[var(--color-muted)] text-center py-4" data-testid="no-upcoming">
            No upcoming appointments scheduled.
          </p>
        ) : (
          <ul className="space-y-3" data-testid="upcoming-list">
            {upcoming.map((appt) => (
              <li
                key={appt.id}
                className="glass rounded-xl p-4 flex items-center justify-between gap-3 hover:border-[var(--color-primary)] transition-all duration-200"
                data-testid={`appt-${appt.id}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]"
                    style={{ boxShadow: '0 0 6px var(--color-primary-glow)' }}
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[var(--color-foreground)]">{appt.service}</p>
                    <p className="text-xs text-[var(--color-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {appt.date} · {appt.time}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onCancel(appt.id)}
                  className="shrink-0 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] hover:border-[var(--color-red)] hover:text-[var(--color-red)] hover:shadow-[0_0_8px_var(--color-red-glow)] transition-all duration-200"
                  data-testid={`cancel-${appt.id}`}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {past.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px flex-1 bg-[var(--color-border)]" />
            <span className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-widest">
              History
            </span>
            <span className="h-px flex-1 bg-[var(--color-border)]" />
          </div>
          <ul className="space-y-2" data-testid="past-list">
            {past.map((appt) => {
              const style = STATUS_STYLES[appt.status];
              return (
                <li
                  key={appt.id}
                  className="glass rounded-xl p-4 flex items-center justify-between gap-3 opacity-70"
                  data-testid={`appt-${appt.id}`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[var(--color-foreground)]">{appt.service}</p>
                    <p className="text-xs text-[var(--color-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {appt.date} · {appt.time}
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize"
                    style={{ color: style.color, background: style.dim, border: `1px solid ${style.color}33` }}
                  >
                    {style.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
