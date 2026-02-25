import type { BillingInfo, Invoice } from '@/types';

const BILLING_KEY = 'wellness_billing';

const MOCK_BILLING: Omit<BillingInfo, 'userId'> = {
  balance: 150.0,
  nextDueDate: '2026-03-15',
  subscriptionStatus: 'active',
  invoices: [
    {
      id: 'inv_1',
      userId: '',
      description: 'Monthly Wellness Plan - February',
      amount: 150.0,
      dueDate: '2026-02-15',
      status: 'paid',
    },
    {
      id: 'inv_2',
      userId: '',
      description: 'Monthly Wellness Plan - March',
      amount: 150.0,
      dueDate: '2026-03-15',
      status: 'pending',
    },
    {
      id: 'inv_3',
      userId: '',
      description: 'Nutrition Consultation',
      amount: 75.0,
      dueDate: '2026-01-20',
      status: 'overdue',
    },
  ],
};

function getAll(): Record<string, BillingInfo> {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(BILLING_KEY);
  return raw ? (JSON.parse(raw) as Record<string, BillingInfo>) : {};
}

function saveAll(data: Record<string, BillingInfo>): void {
  localStorage.setItem(BILLING_KEY, JSON.stringify(data));
}

export function getBillingInfo(userId: string): BillingInfo {
  const all = getAll();
  if (!all[userId]) {
    all[userId] = {
      ...MOCK_BILLING,
      userId,
      invoices: MOCK_BILLING.invoices.map((inv) => ({ ...inv, userId })),
    };
    saveAll(all);
  }
  return all[userId];
}

export function processPayment(
  userId: string,
  invoiceId: string,
  cardDetails: { cardNumber: string; expiry: string; cvv: string },
): BillingInfo {
  // In production, cardDetails would be sent to a payment processor.
  // This is a mock implementation — validate the parameter is present.
  if (!cardDetails.cardNumber) throw new Error('Card number required');
  const all = getAll();
  const billing = all[userId] ?? {
    ...MOCK_BILLING,
    userId,
    invoices: MOCK_BILLING.invoices.map((inv) => ({ ...inv, userId })),
  };
  billing.invoices = billing.invoices.map((inv) =>
    inv.id === invoiceId ? { ...inv, status: 'paid' as const } : inv,
  );
  const unpaid = billing.invoices.filter((inv) => inv.status !== 'paid');
  billing.balance = unpaid.reduce((sum, inv) => sum + inv.amount, 0);
  all[userId] = billing;
  saveAll(all);
  return billing;
}

export function addInvoice(userId: string, invoice: Omit<Invoice, 'id' | 'userId'>): BillingInfo {
  const all = getAll();
  const billing = all[userId] ?? {
    ...MOCK_BILLING,
    userId,
    invoices: MOCK_BILLING.invoices.map((inv) => ({ ...inv, userId })),
  };
  const newInvoice: Invoice = {
    ...invoice,
    id: `inv_${Date.now()}`,
    userId,
  };
  billing.invoices = [...billing.invoices, newInvoice];
  all[userId] = billing;
  saveAll(all);
  return billing;
}
