'use client';

import Link from 'next/link';

const LINKS = [
  {
    href: '/wellness-plan',
    label: 'Wellness Plan',
    description: 'View & manage milestones',
    icon: '◈',
    accent: 'var(--color-green)',
    glow: 'var(--color-green-glow)',
    dim: 'var(--color-green-dim)',
  },
  {
    href: '/progress',
    label: 'Progress',
    description: 'Track your journey',
    icon: '▲',
    accent: 'var(--color-primary)',
    glow: 'var(--color-primary-glow)',
    dim: 'var(--color-primary-dim)',
  },
  {
    href: '/appointments',
    label: 'Appointments',
    description: 'Book & manage sessions',
    icon: '◷',
    accent: 'var(--color-violet)',
    glow: 'var(--color-violet-glow)',
    dim: 'var(--color-violet-dim)',
  },
  {
    href: '/messages',
    label: 'Messages',
    description: 'Chat with your coach',
    icon: '◎',
    accent: 'var(--color-primary)',
    glow: 'var(--color-primary-glow)',
    dim: 'var(--color-primary-dim)',
  },
  {
    href: '/billing',
    label: 'Billing',
    description: 'Invoices & payments',
    icon: '◆',
    accent: 'var(--color-amber)',
    glow: 'var(--color-amber-dim)',
    dim: 'var(--color-amber-dim)',
  },
];

export default function QuickLinks() {
  return (
    <section data-testid="quick-links">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        <span className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-widest">
          Quick Access
        </span>
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group glass rounded-2xl p-4 text-center transition-all duration-300 hover:scale-[1.03]"
            style={{
              '--link-accent': link.accent,
              '--link-glow': link.glow,
              '--link-dim': link.dim,
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = link.accent;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${link.glow}`;
              (e.currentTarget as HTMLElement).style.background = link.dim;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '';
              (e.currentTarget as HTMLElement).style.boxShadow = '';
              (e.currentTarget as HTMLElement).style.background = '';
            }}
            data-testid={`quick-link-${link.href.slice(1)}`}
          >
            <span
              className="block text-2xl mb-2 transition-transform duration-200 group-hover:scale-110"
              style={{ color: link.accent, textShadow: `0 0 10px ${link.glow}` }}
            >
              {link.icon}
            </span>
            <span className="block text-xs font-semibold" style={{ color: link.accent }}>
              {link.label}
            </span>
            <span className="block text-[10px] text-[var(--color-muted)] mt-0.5 hidden sm:block">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
