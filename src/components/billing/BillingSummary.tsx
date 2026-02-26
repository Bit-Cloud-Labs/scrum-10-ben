'use client';

import type { BillingInfo } from '@/types';

interface BillingSummaryProps {
  billingInfo: BillingInfo;
}

const STATUS_META: Record<BillingInfo['subscriptionStatus'], { label: string; color: string; glow: string; dim: string }> = {
  active:    { label: 'Active',    color: 'var(--color-green)',   glow: 'var(--color-green-glow)',   dim: 'var(--color-green-dim)' },
  paused:    { label: 'Paused',    color: 'var(--color-amber)',   glow: 'var(--color-amber-dim)',    dim: 'var(--color-amber-dim)' },
  cancelled: { label: 'Cancelled', color: 'var(--color-muted)',   glow: 'transparent',               dim: 'transparent' },
};

export default function BillingSummary({ billingInfo }: BillingSummaryProps) {
  const sub = STATUS_META[billingInfo.subscriptionStatus];

  return (
    <section className="glass rounded-2xl p-6" data-testid="billing-summary">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[var(--color-amber)] text-lg">◆</span>
        <h2
          className="text-lg font-bold text-[var(--color-foreground)]"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Billing Summary
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Balance */}
        <div
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 group hover:border-[var(--color-primary)] transition-all duration-200"
          data-testid="balance-display"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">
            Current Balance
          </p>
          <p
            className="text-3xl font-bold neon-text-cyan tabular-nums"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            ${billingInfo.balance.toFixed(2)}
          </p>
        </div>

        {/* Due Date */}
        <div
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-violet)] transition-all duration-200"
          data-testid="due-date-display"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">
            Next Due Date
          </p>
          <p
            className="text-xl font-bold text-[var(--color-foreground)] tabular-nums"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {billingInfo.nextDueDate}
          </p>
        </div>

        {/* Subscription */}
        <div
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-green)] transition-all duration-200"
          data-testid="subscription-status"
        >
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">
            Subscription
          </p>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              color: sub.color,
              background: sub.dim,
              border: `1px solid ${sub.color}33`,
              boxShadow: `0 0 8px ${sub.glow}`,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: sub.color, boxShadow: `0 0 4px ${sub.glow}` }}
            />
            {sub.label}
          </span>
        </div>
      </div>
    </section>
  );
}
