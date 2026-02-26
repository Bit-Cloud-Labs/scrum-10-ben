'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const NAV_LINKS = [
  { href: '/dashboard',     label: 'Dashboard',    icon: '⬡' },
  { href: '/wellness-plan', label: 'Plan',          icon: '◈' },
  { href: '/progress',      label: 'Progress',      icon: '▲' },
  { href: '/appointments',  label: 'Appointments',  icon: '◷' },
  { href: '/messages',      label: 'Messages',      icon: '◎' },
  { href: '/billing',       label: 'Billing',       icon: '◆' },
];

export default function NavBar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[rgba(3,7,18,0.85)] backdrop-blur-xl"
      data-testid="navbar"
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 group"
          data-testid="nav-logo"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-primary-dim)] border border-[var(--color-border-bright)] text-[var(--color-primary)] text-xs font-bold group-hover:shadow-[0_0_12px_var(--color-primary-glow)] transition-all duration-300">
            W
          </span>
          <span
            className="text-sm font-semibold tracking-wide hidden sm:block"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            <span className="text-[var(--color-primary)]">Wellness</span>
            <span className="text-[var(--color-muted-2)]"> Portal</span>
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 ${
                  active
                    ? 'text-[var(--color-primary)] bg-[var(--color-primary-dim)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-muted-2)] hover:bg-white/[0.03]'
                }`}
                data-testid={`nav-${link.href.slice(1)}`}
              >
                <span className={`text-[10px] ${active ? 'text-[var(--color-primary)]' : 'opacity-50'}`}>
                  {link.icon}
                </span>
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-4 bg-[var(--color-primary)] shadow-[0_0_6px_var(--color-primary-glow)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* User controls */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-green)] shadow-[0_0_6px_var(--color-green-glow)]" />
              <span className="text-xs text-[var(--color-muted-2)] font-medium">{user.name}</span>
            </div>
          )}
          <button
            onClick={logout}
            className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] hover:border-[var(--color-red)] hover:text-[var(--color-red)] hover:shadow-[0_0_10px_var(--color-red-glow)] transition-all duration-200"
            data-testid="logout-button"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
