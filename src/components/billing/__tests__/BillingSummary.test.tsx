import { render, screen } from '@testing-library/react';
import BillingSummary from '../BillingSummary';
import type { BillingInfo } from '@/types';

const mockBillingInfo: BillingInfo = {
  userId: 'u1',
  balance: 150.0,
  nextDueDate: '2026-03-15',
  subscriptionStatus: 'active',
  invoices: [],
};

describe('BillingSummary', () => {
  it('renders billing summary section', () => {
    render(<BillingSummary billingInfo={mockBillingInfo} />);
    expect(screen.getByTestId('billing-summary')).toBeInTheDocument();
  });

  it('displays current balance', () => {
    render(<BillingSummary billingInfo={mockBillingInfo} />);
    expect(screen.getByTestId('balance-display')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
  });

  it('displays next due date', () => {
    render(<BillingSummary billingInfo={mockBillingInfo} />);
    expect(screen.getByTestId('due-date-display')).toBeInTheDocument();
    expect(screen.getByText('2026-03-15')).toBeInTheDocument();
  });

  it('displays subscription status', () => {
    render(<BillingSummary billingInfo={mockBillingInfo} />);
    expect(screen.getByTestId('subscription-status')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
  });
});
