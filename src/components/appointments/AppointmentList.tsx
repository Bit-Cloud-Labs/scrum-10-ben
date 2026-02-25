'use client';

import type { Appointment } from '@/types';

interface AppointmentListProps {
  appointments: Appointment[];
  onCancel: (id: string) => void;
}

const STATUS_STYLES: Record<Appointment['status'], string> = {
  upcoming: 'bg-[var(--color-blue-light)] text-[var(--color-blue)]',
  completed: 'bg-[var(--color-green-light)] text-[var(--color-green)]',
  cancelled: 'bg-[var(--color-border)] text-[var(--color-muted)]',
};

export default function AppointmentList({ appointments, onCancel }: AppointmentListProps) {
  const upcoming = appointments.filter((a) => a.status === 'upcoming');
  const past = appointments.filter((a) => a.status !== 'upcoming');

  return (
    <section data-testid="appointment-list">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-[var(--color-blue)]">Upcoming Appointments</h2>
        {upcoming.length === 0 ? (
          <p className="text-[var(--color-muted)] text-sm" data-testid="no-upcoming">
            No upcoming appointments.
          </p>
        ) : (
          <ul className="space-y-3" data-testid="upcoming-list">
            {upcoming.map((appt) => (
              <li
                key={appt.id}
                className="flex items-center justify-between rounded-xl border border-[var(--color-blue)] bg-[var(--color-blue-light)] p-4"
                data-testid={`appt-${appt.id}`}
              >
                <div>
                  <p className="font-semibold">{appt.service}</p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {appt.date} at {appt.time}
                  </p>
                </div>
                <button
                  onClick={() => onCancel(appt.id)}
                  className="rounded-lg border border-[var(--color-red)] px-3 py-1 text-sm text-[var(--color-red)] hover:bg-[var(--color-red-light)] transition-colors"
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
          <h2 className="text-xl font-bold mb-3 text-[var(--color-muted)]">Past Appointments</h2>
          <ul className="space-y-3" data-testid="past-list">
            {past.map((appt) => (
              <li
                key={appt.id}
                className="flex items-center justify-between rounded-xl border border-[var(--color-border)] p-4"
                data-testid={`appt-${appt.id}`}
              >
                <div>
                  <p className="font-semibold">{appt.service}</p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {appt.date} at {appt.time}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[appt.status]}`}
                >
                  {appt.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
