'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/wellness-plan', label: 'Plan' },
  { href: '/progress', label: 'Progress' },
  { href: '/appointments', label: 'Appointments' },
  { href: '/messages', label: 'Messages' },
  { href: '/billing', label: 'Billing' },
];

export default function NavBar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-[var(--color-border)] bg-white px-4 py-3"
      data-testid="navbar"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-lg font-bold text-[var(--color-blue)]"
          data-testid="nav-logo"
        >
          Wellness Portal
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'bg-[var(--color-blue-light)] text-[var(--color-blue)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
              }`}
              data-testid={`nav-${link.href.slice(1)}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm text-[var(--color-muted)] hidden sm:block">
              {user.name}
            </span>
          )}
          <button
            onClick={logout}
            className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm hover:bg-[var(--color-border)] transition-colors"
            data-testid="logout-button"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
