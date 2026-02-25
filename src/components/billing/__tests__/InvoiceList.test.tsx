import { render, screen } from '@testing-library/react';
import InvoiceList from '../InvoiceList';
import type { Invoice } from '@/types';

const mockInvoices: Invoice[] = [
  { id: 'inv_1', userId: 'u1', description: 'Monthly Plan - Feb', amount: 150, dueDate: '2026-02-15', status: 'paid' },
  { id: 'inv_2', userId: 'u1', description: 'Monthly Plan - Mar', amount: 150, dueDate: '2026-03-15', status: 'pending' },
  { id: 'inv_3', userId: 'u1', description: 'Consultation', amount: 75, dueDate: '2026-01-20', status: 'overdue' },
];

describe('InvoiceList', () => {
  it('renders all invoices', () => {
    render(<InvoiceList invoices={mockInvoices} />);
    expect(screen.getByTestId('invoice-list')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-inv_1')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-inv_2')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-inv_3')).toBeInTheDocument();
  });

  it('shows correct status labels for each invoice', () => {
    render(<InvoiceList invoices={mockInvoices} />);
    expect(screen.getByTestId('status-inv_1')).toHaveTextContent('paid');
    expect(screen.getByTestId('status-inv_2')).toHaveTextContent('pending');
    expect(screen.getByTestId('status-inv_3')).toHaveTextContent('overdue');
  });

  it('shows no-invoices state when list is empty', () => {
    render(<InvoiceList invoices={[]} />);
    expect(screen.getByTestId('no-invoices')).toBeInTheDocument();
  });

  it('shows pay button for unpaid invoices when onPayInvoice provided', () => {
    render(<InvoiceList invoices={mockInvoices} onPayInvoice={jest.fn()} />);
    expect(screen.queryByTestId('pay-inv_1')).not.toBeInTheDocument(); // paid - no button
    expect(screen.getByTestId('pay-inv_2')).toBeInTheDocument(); // pending
    expect(screen.getByTestId('pay-inv_3')).toBeInTheDocument(); // overdue
  });
});
