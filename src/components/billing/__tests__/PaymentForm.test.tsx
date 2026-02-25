import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PaymentForm from '../PaymentForm';
import type { Invoice } from '@/types';

const mockInvoices: Invoice[] = [
  { id: 'inv_1', userId: 'u1', description: 'Monthly Plan', amount: 150, dueDate: '2026-03-15', status: 'pending' },
  { id: 'inv_2', userId: 'u1', description: 'Consultation', amount: 75, dueDate: '2026-01-20', status: 'overdue' },
];

const paidInvoices: Invoice[] = [
  { id: 'inv_3', userId: 'u1', description: 'All Paid', amount: 100, dueDate: '2026-02-01', status: 'paid' },
];

describe('PaymentForm', () => {
  it('renders payment form with unpaid invoices', () => {
    render(<PaymentForm invoices={mockInvoices} onProcessPayment={jest.fn()} />);
    expect(screen.getByTestId('payment-form')).toBeInTheDocument();
    expect(screen.getByTestId('card-number-input')).toBeInTheDocument();
  });

  it('shows all-paid message when no unpaid invoices', () => {
    render(<PaymentForm invoices={paidInvoices} onProcessPayment={jest.fn()} />);
    expect(screen.getByTestId('no-unpaid-invoices')).toBeInTheDocument();
  });

  it('calls onProcessPayment with correct payload on valid submit', async () => {
    const mockProcess = jest.fn();
    render(<PaymentForm invoices={mockInvoices} onProcessPayment={mockProcess} />);

    fireEvent.change(screen.getByTestId('invoice-select'), {
      target: { value: 'inv_1' },
    });
    fireEvent.change(screen.getByTestId('card-number-input'), {
      target: { value: '1234 5678 9012 3456' },
    });
    fireEvent.change(screen.getByTestId('expiry-input'), {
      target: { value: '12/27' },
    });
    fireEvent.change(screen.getByTestId('cvv-input'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByTestId('pay-submit'));

    await waitFor(() => {
      expect(mockProcess).toHaveBeenCalledWith(
        'inv_1',
        expect.objectContaining({
          cardNumber: '1234567890123456',
          expiry: '12/27',
          cvv: '123',
        }),
      );
    });
  });

  it('shows inline validation error for invalid card number', async () => {
    render(<PaymentForm invoices={mockInvoices} onProcessPayment={jest.fn()} />);

    fireEvent.change(screen.getByTestId('invoice-select'), { target: { value: 'inv_1' } });
    fireEvent.change(screen.getByTestId('card-number-input'), { target: { value: '123' } });
    fireEvent.change(screen.getByTestId('expiry-input'), { target: { value: '12/27' } });
    fireEvent.change(screen.getByTestId('cvv-input'), { target: { value: '123' } });
    fireEvent.click(screen.getByTestId('pay-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('error-card')).toBeInTheDocument();
    });
  });
});
