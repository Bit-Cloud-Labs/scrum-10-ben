'use client';

import { useState } from 'react';
import type { Invoice } from '@/types';

interface PaymentFormProps {
  invoices: Invoice[];
  onProcessPayment: (invoiceId: string, cardDetails: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  }) => void;
}

function isValidCardNumber(num: string): boolean {
  return /^\d{16}$/.test(num.replace(/\s/g, ''));
}

function isValidExpiry(expiry: string): boolean {
  return /^\d{2}\/\d{2}$/.test(expiry);
}

function isValidCvv(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv);
}

const inputClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-green)] focus:shadow-[0_0_0_1px_var(--color-green),0_0_10px_var(--color-green-glow)] transition-all duration-200';

export default function PaymentForm({ invoices, onProcessPayment }: PaymentFormProps) {
  const unpaidInvoices = invoices.filter((inv) => inv.status !== 'paid');
  const [selectedInvoice, setSelectedInvoice] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function formatCardNumber(value: string): string {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  function formatExpiry(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!selectedInvoice) newErrors.invoice = 'Please select an invoice';
    if (!isValidCardNumber(cardNumber)) newErrors.cardNumber = 'Invalid card number (16 digits required)';
    if (!isValidExpiry(expiry)) newErrors.expiry = 'Invalid expiry (MM/YY format)';
    if (!isValidCvv(cvv)) newErrors.cvv = 'Invalid CVV (3-4 digits)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      onProcessPayment(selectedInvoice, {
        cardNumber: cardNumber.replace(/\s/g, ''),
        expiry,
        cvv,
      });
      setSelectedInvoice('');
      setCardNumber('');
      setExpiry('');
      setCvv('');
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  }

  if (unpaidInvoices.length === 0) {
    return (
      <div
        className="glass rounded-2xl p-8 text-center border-[var(--color-green)]"
        style={{ boxShadow: '0 0 20px var(--color-green-glow)' }}
        data-testid="no-unpaid-invoices"
      >
        <p className="text-[var(--color-green)] font-semibold neon-text-green">All invoices are paid</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass rounded-2xl border-[var(--color-border-bright)] p-6 space-y-4"
      data-testid="payment-form"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[var(--color-green)] text-lg">◆</span>
        <h2
          className="text-lg font-bold text-[var(--color-foreground)]"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Make a Payment
        </h2>
      </div>

      <div>
        <label htmlFor="invoice-select" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Invoice *
        </label>
        <select
          id="invoice-select"
          value={selectedInvoice}
          onChange={(e) => setSelectedInvoice(e.target.value)}
          className={inputClass}
          data-testid="invoice-select"
        >
          <option value="">Select invoice…</option>
          {unpaidInvoices.map((inv) => (
            <option key={inv.id} value={inv.id}>
              {inv.description} — ${inv.amount.toFixed(2)}
            </option>
          ))}
        </select>
        {errors.invoice && (
          <p className="text-xs text-[var(--color-red)] mt-1.5" role="alert" data-testid="error-invoice">{errors.invoice}</p>
        )}
      </div>

      <div>
        <label htmlFor="card-number" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Card Number *
        </label>
        <input
          id="card-number"
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
          className={inputClass}
          data-testid="card-number-input"
        />
        {errors.cardNumber && (
          <p className="text-xs text-[var(--color-red)] mt-1.5" role="alert" data-testid="error-card">{errors.cardNumber}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="card-expiry" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
            Expiry (MM/YY) *
          </label>
          <input
            id="card-expiry"
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="12/27"
            inputMode="numeric"
            className={inputClass}
            data-testid="expiry-input"
          />
          {errors.expiry && (
            <p className="text-xs text-[var(--color-red)] mt-1.5" role="alert" data-testid="error-expiry">{errors.expiry}</p>
          )}
        </div>
        <div>
          <label htmlFor="card-cvv" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
            CVV *
          </label>
          <input
            id="card-cvv"
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="123"
            inputMode="numeric"
            className={inputClass}
            data-testid="cvv-input"
          />
          {errors.cvv && (
            <p className="text-xs text-[var(--color-red)] mt-1.5" role="alert" data-testid="error-cvv">{errors.cvv}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-[var(--color-green)] px-4 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_20px_var(--color-green-glow)] disabled:opacity-40 transition-all duration-200"
        data-testid="pay-submit"
      >
        {isSubmitting ? 'Processing…' : 'Pay Now'}
      </button>
    </form>
  );
}
