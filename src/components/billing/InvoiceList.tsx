'use client';

import type { Invoice } from '@/types';

interface InvoiceListProps {
  invoices: Invoice[];
  onPayInvoice?: (invoiceId: string) => void;
}

const STATUS_META: Record<Invoice['status'], { label: string; color: string; glow: string; dim: string }> = {
  paid:    { label: 'Paid',    color: 'var(--color-green)',  glow: 'var(--color-green-glow)',   dim: 'var(--color-green-dim)' },
  pending: { label: 'Pending', color: 'var(--color-primary)', glow: 'var(--color-primary-glow)', dim: 'var(--color-primary-dim)' },
  overdue: { label: 'Overdue', color: 'var(--color-red)',    glow: 'var(--color-red-glow)',     dim: 'var(--color-red-dim)' },
};

export default function InvoiceList({ invoices, onPayInvoice }: InvoiceListProps) {
  if (invoices.length === 0) {
    return (
      <div
        className="glass rounded-2xl p-10 text-center border-dashed"
        data-testid="no-invoices"
      >
        <p className="text-sm text-[var(--color-muted)]">No invoices found.</p>
      </div>
    );
  }

  return (
    <section data-testid="invoice-list">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-widest">
          Invoices
        </span>
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>
      <ul className="space-y-2">
        {invoices.map((invoice) => {
          const meta = STATUS_META[invoice.status];
          return (
            <li
              key={invoice.id}
              className="glass flex items-center justify-between rounded-xl p-4 gap-3 hover:border-[var(--color-border-bright)] transition-all duration-200"
              data-testid={`invoice-${invoice.id}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[var(--color-foreground)]">{invoice.description}</p>
                <p className="text-[10px] text-[var(--color-muted)] mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
                  Due: {invoice.dueDate}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--color-foreground)' }}
                >
                  ${invoice.amount.toFixed(2)}
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    color: meta.color,
                    background: meta.dim,
                    border: `1px solid ${meta.color}33`,
                    boxShadow: `0 0 6px ${meta.glow}`,
                  }}
                  data-testid={`status-${invoice.id}`}
                >
                  {meta.label}
                </span>
                {invoice.status !== 'paid' && onPayInvoice && (
                  <button
                    onClick={() => onPayInvoice(invoice.id)}
                    className="rounded-lg bg-[var(--color-green)] px-3 py-1 text-xs font-semibold text-white hover:shadow-[0_0_10px_var(--color-green-glow)] transition-all duration-200"
                    data-testid={`pay-${invoice.id}`}
                  >
                    Pay
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
