'use client';

import Link from 'next/link';

const LINKS = [
  {
    href: '/wellness-plan',
    label: 'Wellness Plan',
    icon: '🌿',
    description: 'View and manage your plan',
    color: 'var(--color-green)',
    bg: 'var(--color-green-light)',
  },
  {
    href: '/progress',
    label: 'Progress',
    icon: '📈',
    description: 'Track your wellness journey',
    color: 'var(--color-blue)',
    bg: 'var(--color-blue-light)',
  },
  {
    href: '/appointments',
    label: 'Appointments',
    icon: '📅',
    description: 'Book and manage sessions',
    color: 'var(--color-red)',
    bg: 'var(--color-red-light)',
  },
  {
    href: '/messages',
    label: 'Messages',
    icon: '💬',
    description: 'Chat with your coach',
    color: 'var(--color-blue)',
    bg: 'var(--color-blue-light)',
  },
  {
    href: '/billing',
    label: 'Billing',
    icon: '💳',
    description: 'View invoices and payments',
    color: 'var(--color-green)',
    bg: 'var(--color-green-light)',
  },
];

export default function QuickLinks() {
  return (
    <section data-testid="quick-links">
      <h2 className="text-xl font-bold mb-4">Quick Links</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group flex flex-col items-center rounded-2xl p-4 text-center transition-transform hover:scale-105"
            style={{ backgroundColor: link.bg }}
            data-testid={`quick-link-${link.href.slice(1)}`}
          >
            <span className="text-3xl mb-2">{link.icon}</span>
            <span className="text-sm font-semibold" style={{ color: link.color }}>
              {link.label}
            </span>
            <span className="text-xs text-[var(--color-muted)] mt-1 hidden sm:block">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
