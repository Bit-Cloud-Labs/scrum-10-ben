import type { Appointment } from '@/types';

const APPOINTMENTS_KEY = 'wellness_appointments';

const MOCK_APPOINTMENTS: Omit<Appointment, 'userId'>[] = [
  {
    id: 'appt_1',
    service: 'Wellness Consultation',
    date: '2026-03-05',
    time: '10:00',
    status: 'upcoming',
  },
  {
    id: 'appt_2',
    service: 'Nutrition Review',
    date: '2026-02-15',
    time: '14:00',
    status: 'completed',
  },
  {
    id: 'appt_3',
    service: 'Fitness Assessment',
    date: '2026-03-12',
    time: '09:00',
    status: 'upcoming',
  },
];

function getAll(): Record<string, Appointment[]> {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(APPOINTMENTS_KEY);
  return raw ? (JSON.parse(raw) as Record<string, Appointment[]>) : {};
}

function saveAll(data: Record<string, Appointment[]>): void {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(data));
}

export function getAppointments(userId: string): Appointment[] {
  const all = getAll();
  if (!all[userId]) {
    all[userId] = MOCK_APPOINTMENTS.map((a) => ({ ...a, userId }));
    saveAll(all);
  }
  return all[userId];
}

export function book(
  userId: string,
  appointment: Omit<Appointment, 'id' | 'userId' | 'status'>,
): Appointment[] {
  const all = getAll();
  const existing = all[userId] ?? MOCK_APPOINTMENTS.map((a) => ({ ...a, userId }));
  const newAppt: Appointment = {
    ...appointment,
    id: `appt_${Date.now()}`,
    userId,
    status: 'upcoming',
  };
  all[userId] = [...existing, newAppt];
  saveAll(all);
  return all[userId];
}

export function cancel(userId: string, appointmentId: string): Appointment[] {
  const all = getAll();
  const existing = all[userId] ?? [];
  all[userId] = existing.map((a) =>
    a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a,
  );
  saveAll(all);
  return all[userId];
}
