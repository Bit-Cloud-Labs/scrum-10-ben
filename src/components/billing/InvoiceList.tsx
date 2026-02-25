'use client';

import type { Invoice } from '@/types';

interface InvoiceListProps {
  invoices: Invoice[];
  onPayInvoice?: (invoiceId: string) => void;
}

const STATUS_STYLES: Record<Invoice['status'], string> = {
  paid: 'bg-[var(--color-green-light)] text-[var(--color-green)]',
  pending: 'bg-[var(--color-blue-light)] text-[var(--color-blue)]',
  overdue: 'bg-[var(--color-red-light)] text-[var(--color-red)]',
};

export default function InvoiceList({ invoices, onPayInvoice }: InvoiceListProps) {
  if (invoices.length === 0) {
    return (
      <div
        className="rounded-2xl border-2 border-dashed border-[var(--color-border)] p-8 text-center"
        data-testid="no-invoices"
      >
        <p className="text-[var(--color-muted)]">No invoices found.</p>
      </div>
    );
  }

  return (
    <section data-testid="invoice-list">
      <h2 className="text-xl font-bold mb-4">Invoices</h2>
      <ul className="space-y-3">
        {invoices.map((invoice) => (
          <li
            key={invoice.id}
            className="flex items-center justify-between rounded-xl border border-[var(--color-border)] p-4"
            data-testid={`invoice-${invoice.id}`}
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{invoice.description}</p>
              <p className="text-xs text-[var(--color-muted)] mt-0.5">Due: {invoice.dueDate}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-sm font-bold">${invoice.amount.toFixed(2)}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                  STATUS_STYLES[invoice.status]
                }`}
                data-testid={`status-${invoice.id}`}
              >
                {invoice.status}
              </span>
              {invoice.status !== 'paid' && onPayInvoice && (
                <button
                  onClick={() => onPayInvoice(invoice.id)}
                  className="rounded-lg bg-[var(--color-green)] px-3 py-1 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  data-testid={`pay-${invoice.id}`}
                >
                  Pay
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
