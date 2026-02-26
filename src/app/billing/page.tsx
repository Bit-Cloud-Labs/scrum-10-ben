'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import NavBar from '@/components/shared/NavBar';
import BillingSummary from '@/components/billing/BillingSummary';
import InvoiceList from '@/components/billing/InvoiceList';
import PaymentForm from '@/components/billing/PaymentForm';
import * as billingService from '@/lib/services/billingService';
import type { BillingInfo } from '@/types';

function BillingContent() {
  const { user } = useAuth();
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);

  useEffect(() => {
    if (user) {
      setBillingInfo(billingService.getBillingInfo(user.id));
    }
  }, [user]);

  function handleProcessPayment(
    invoiceId: string,
    cardDetails: { cardNumber: string; expiry: string; cvv: string },
  ) {
    if (!user) return;
    const updated = billingService.processPayment(user.id, invoiceId, cardDetails);
    setBillingInfo({ ...updated });
  }

  if (!billingInfo) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6 animate-fade-up">
      <div>
        <p className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-widest mb-1">Module</p>
        <h1
          className="text-3xl font-bold tracking-tight gradient-text"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Billing &amp; Payments
        </h1>
      </div>
      <BillingSummary billingInfo={billingInfo} />
      <InvoiceList invoices={billingInfo.invoices} />
      <PaymentForm
        invoices={billingInfo.invoices}
        onProcessPayment={handleProcessPayment}
      />
    </div>
  );
}

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <NavBar />
      <BillingContent />
    </ProtectedRoute>
  );
}
