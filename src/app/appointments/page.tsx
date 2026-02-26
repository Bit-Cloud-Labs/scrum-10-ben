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
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Appointments</h1>
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
