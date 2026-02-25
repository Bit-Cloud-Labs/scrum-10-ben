import { render, screen, fireEvent } from '@testing-library/react';
import AppointmentList from '../AppointmentList';
import type { Appointment } from '@/types';

const mockAppointments: Appointment[] = [
  { id: 'appt_1', userId: 'u1', service: 'Wellness Consultation', date: '2026-03-05', time: '10:00', status: 'upcoming' },
  { id: 'appt_2', userId: 'u1', service: 'Nutrition Review', date: '2026-02-15', time: '14:00', status: 'completed' },
  { id: 'appt_3', userId: 'u1', service: 'Fitness Assessment', date: '2026-01-10', time: '09:00', status: 'cancelled' },
];

describe('AppointmentList', () => {
  it('renders upcoming and past sections', () => {
    render(<AppointmentList appointments={mockAppointments} onCancel={jest.fn()} />);
    expect(screen.getByTestId('appointment-list')).toBeInTheDocument();
    expect(screen.getByTestId('upcoming-list')).toBeInTheDocument();
    expect(screen.getByTestId('past-list')).toBeInTheDocument();
  });

  it('renders upcoming appointments', () => {
    render(<AppointmentList appointments={mockAppointments} onCancel={jest.fn()} />);
    expect(screen.getByText('Wellness Consultation')).toBeInTheDocument();
  });

  it('shows cancel button for upcoming appointments', () => {
    render(<AppointmentList appointments={mockAppointments} onCancel={jest.fn()} />);
    expect(screen.getByTestId('cancel-appt_1')).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const mockCancel = jest.fn();
    render(<AppointmentList appointments={mockAppointments} onCancel={mockCancel} />);
    fireEvent.click(screen.getByTestId('cancel-appt_1'));
    expect(mockCancel).toHaveBeenCalledWith('appt_1');
  });

  it('shows no-upcoming message when no upcoming appointments', () => {
    const noUpcoming = mockAppointments.filter((a) => a.status !== 'upcoming');
    render(<AppointmentList appointments={noUpcoming} onCancel={jest.fn()} />);
    expect(screen.getByTestId('no-upcoming')).toBeInTheDocument();
  });
});
