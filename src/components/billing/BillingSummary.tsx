'use client';

import type { BillingInfo } from '@/types';

interface BillingSummaryProps {
  billingInfo: BillingInfo;
}

const STATUS_STYLES: Record<BillingInfo['subscriptionStatus'], string> = {
  active: 'bg-[var(--color-green-light)] text-[var(--color-green)]',
  paused: 'bg-[var(--color-red-light)] text-[var(--color-red)]',
  cancelled: 'bg-[var(--color-border)] text-[var(--color-muted)]',
};

export default function BillingSummary({ billingInfo }: BillingSummaryProps) {
  return (
    <section
      className="rounded-2xl bg-[var(--color-green-light)] p-6"
      data-testid="billing-summary"
    >
      <h2 className="text-xl font-bold mb-4 text-[var(--color-green)]">Billing Summary</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow-sm" data-testid="balance-display">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Current Balance
          </p>
          <p className="mt-1 text-3xl font-bold">
            ${billingInfo.balance.toFixed(2)}
          </p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm" data-testid="due-date-display">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Next Due Date
          </p>
          <p className="mt-1 text-xl font-bold">{billingInfo.nextDueDate}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm" data-testid="subscription-status">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Subscription
          </p>
          <span
            className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold capitalize ${
              STATUS_STYLES[billingInfo.subscriptionStatus]
            }`}
          >
            {billingInfo.subscriptionStatus}
          </span>
        </div>
      </div>
    </section>
  );
}
