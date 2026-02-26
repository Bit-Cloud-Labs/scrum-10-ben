'use client';

import { useState } from 'react';

const SERVICES = [
  'Wellness Consultation',
  'Nutrition Review',
  'Fitness Assessment',
  'Mental Health Check-in',
  'Progress Review',
];

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00',
];

interface BookingFormProps {
  onBook: (appointment: { service: string; date: string; time: string }) => void;
}

const inputClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-violet)] focus:shadow-[0_0_0_1px_var(--color-violet),0_0_10px_var(--color-violet-glow)] transition-all duration-200';

export default function BookingForm({ onBook }: BookingFormProps) {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!service) newErrors.service = 'Please select a service';
    if (!date) newErrors.date = 'Please select a date';
    if (!time) newErrors.time = 'Please select a time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      onBook({ service, date, time });
      setService('');
      setDate('');
      setTime('');
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-6 space-y-4 border-[var(--color-border-bright)]"
      data-testid="booking-form"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[var(--color-violet)] text-lg">◷</span>
        <h2
          className="text-lg font-bold text-[var(--color-foreground)]"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Book an Appointment
        </h2>
      </div>

      <div>
        <label htmlFor="booking-service" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Service *
        </label>
        <select
          id="booking-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={inputClass}
          data-testid="service-select"
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.service && (
          <p className="text-xs text-[var(--color-red)] mt-1.5" role="alert" data-testid="error-service">{errors.service}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-date" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
            Date *
          </label>
          <input
            id="booking-date"
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            data-testid="date-input"
          />
          {errors.date && (
            <p className="text-xs text-[var(--color-red)] mt-1.5" role="alert" data-testid="error-date">{errors.date}</p>
          )}
        </div>
        <div>
          <label htmlFor="booking-time" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
            Time *
          </label>
          <select
            id="booking-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={inputClass}
            data-testid="time-select"
          >
            <option value="">Select time…</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.time && (
            <p className="text-xs text-[var(--color-red)] mt-1.5" role="alert" data-testid="error-time">{errors.time}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[var(--color-violet)] px-4 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_20px_var(--color-violet-glow)] disabled:opacity-40 transition-all duration-200"
        data-testid="book-submit"
      >
        {isSubmitting ? 'Booking…' : 'Confirm Booking'}
      </button>
    </form>
  );
}
