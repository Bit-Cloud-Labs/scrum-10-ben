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
      className="rounded-2xl border border-[var(--color-blue)] bg-[var(--color-blue-light)] p-6 space-y-4"
      data-testid="booking-form"
    >
      <h2 className="text-xl font-bold text-[var(--color-blue)]">Book an Appointment</h2>

      <div>
        <label htmlFor="booking-service" className="block text-sm font-medium mb-1">
          Service *
        </label>
        <select
          id="booking-service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
          data-testid="service-select"
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && (
          <p className="text-xs text-[var(--color-red)] mt-1" role="alert" data-testid="error-service">
            {errors.service}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-date" className="block text-sm font-medium mb-1">
            Date *
          </label>
          <input
            id="booking-date"
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
            data-testid="date-input"
          />
          {errors.date && (
            <p className="text-xs text-[var(--color-red)] mt-1" role="alert" data-testid="error-date">
              {errors.date}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="booking-time" className="block text-sm font-medium mb-1">
            Time *
          </label>
          <select
            id="booking-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
            data-testid="time-select"
          >
            <option value="">Select time…</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.time && (
            <p className="text-xs text-[var(--color-red)] mt-1" role="alert" data-testid="error-time">
              {errors.time}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
        data-testid="book-submit"
      >
        {isSubmitting ? 'Booking…' : 'Book Appointment'}
      </button>
    </form>
  );
}
