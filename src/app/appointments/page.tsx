'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import NavBar from '@/components/shared/NavBar';
import AppointmentList from '@/components/appointments/AppointmentList';
import BookingForm from '@/components/appointments/BookingForm';
import * as appointmentService from '@/lib/services/appointmentService';
import type { Appointment } from '@/types';

function AppointmentsContent() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (user) {
      setAppointments(appointmentService.getAppointments(user.id));
    }
  }, [user]);

  function handleBook(booking: { service: string; date: string; time: string }) {
    if (!user) return;
    const updated = appointmentService.book(user.id, booking);
    setAppointments(updated);
  }

  function handleCancel(id: string) {
    if (!user) return;
    const updated = appointmentService.cancel(user.id, id);
    setAppointments(updated);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6 animate-fade-up">
      <div>
        <p className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-widest mb-1">Module</p>
        <h1
          className="text-3xl font-bold tracking-tight gradient-text"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Appointments
        </h1>
      </div>
      <BookingForm onBook={handleBook} />
      <AppointmentList appointments={appointments} onCancel={handleCancel} />
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <ProtectedRoute>
      <NavBar />
      <AppointmentsContent />
    </ProtectedRoute>
  );
}
