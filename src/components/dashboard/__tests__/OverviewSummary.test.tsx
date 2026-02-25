import { render, screen, waitFor } from '@testing-library/react';
import OverviewSummary from '../OverviewSummary';

jest.mock('@/lib/services/wellnessService', () => ({
  getPlan: jest.fn(() => ({
    id: 'plan_1',
    userId: 'user_1',
    title: 'My Plan',
    milestones: [
      { id: 'ms_1', title: 'Walk', description: '', completed: true },
      { id: 'ms_2', title: 'Meditate', description: '', completed: false },
    ],
  })),
}));

jest.mock('@/lib/services/progressService', () => ({
  getProgress: jest.fn(() => [
    { id: 'pe_1', userId: 'user_1', category: 'fitness', note: '30 min run', value: 30, date: '2026-02-20' },
  ]),
}));

jest.mock('@/lib/services/appointmentService', () => ({
  getAppointments: jest.fn(() => [
    { id: 'appt_1', userId: 'user_1', service: 'Wellness Consultation', date: '2026-03-05', time: '10:00', status: 'upcoming' },
  ]),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'user_1', email: 'u@test.com', name: 'Test User' } }),
}));

describe('OverviewSummary', () => {
  it('renders the overview section', async () => {
    render(<OverviewSummary />);
    await waitFor(() => {
      expect(screen.getByTestId('overview-summary')).toBeInTheDocument();
    });
  });

  it('shows plan milestone summary', async () => {
    render(<OverviewSummary />);
    await waitFor(() => {
      expect(screen.getByTestId('plan-summary')).toBeInTheDocument();
      expect(screen.getByText('1/2')).toBeInTheDocument();
    });
  });

  it('shows latest progress entry', async () => {
    render(<OverviewSummary />);
    await waitFor(() => {
      expect(screen.getByTestId('progress-summary')).toBeInTheDocument();
      expect(screen.getByText('30 min run')).toBeInTheDocument();
    });
  });

  it('shows next appointment', async () => {
    render(<OverviewSummary />);
    await waitFor(() => {
      expect(screen.getByTestId('appointment-summary')).toBeInTheDocument();
      expect(screen.getByText('Wellness Consultation')).toBeInTheDocument();
    });
  });
});
