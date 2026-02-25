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
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Billing &amp; Payments</h1>
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
