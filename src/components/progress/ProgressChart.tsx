'use client';

import type { ProgressEntry } from '@/types';

interface ProgressChartProps {
  entries: ProgressEntry[];
}

const CATEGORIES = [
  { key: 'fitness',       label: 'Fitness',       color: 'var(--color-primary)',  glow: 'var(--color-primary-glow)' },
  { key: 'nutrition',     label: 'Nutrition',      color: 'var(--color-green)',    glow: 'var(--color-green-glow)' },
  { key: 'mental_health', label: 'Mental Health',  color: 'var(--color-violet)',   glow: 'var(--color-violet-glow)' },
] as const;

export default function ProgressChart({ entries }: ProgressChartProps) {
  if (entries.length === 0) {
    return (
      <div
        className="glass rounded-2xl p-10 text-center border-dashed"
        data-testid="chart-empty-state"
      >
        <p className="text-xs uppercase tracking-widest text-[var(--color-muted)]">No data yet</p>
        <p className="text-sm text-[var(--color-muted)] mt-1">Log your first entry below to see your chart.</p>
      </div>
    );
  }

  const totals = CATEGORIES.map((cat) => {
    const catEntries = entries.filter((e) => e.category === cat.key);
    return {
      ...cat,
      total: catEntries.reduce((sum, e) => sum + e.value, 0),
      count: catEntries.length,
    };
  });

  const maxTotal = Math.max(...totals.map((t) => t.total), 1);

  return (
    <section className="glass rounded-2xl p-6" data-testid="progress-chart">
      <h2
        className="text-lg font-bold mb-6 text-[var(--color-foreground)]"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        Progress Overview
      </h2>
      <div className="space-y-5">
        {totals.map(({ key, label, color, glow, total, count }) => (
          <div key={key} data-testid={`chart-bar-${key}`}>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm font-medium" style={{ color }}>{label}</span>
              <span
                className="text-xs tabular-nums"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
              >
                {count} entries · {total} pts
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[var(--color-surface-2)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(total / maxTotal) * 100}%`,
                  background: color,
                  boxShadow: `0 0 8px ${glow}`,
                }}
                role="progressbar"
                aria-valuenow={total}
                aria-valuemax={maxTotal}
                aria-label={`${label} progress`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-4">
        {CATEGORIES.map((cat) => (
          <span key={cat.key} className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: cat.color, boxShadow: `0 0 4px ${cat.glow}` }}
            />
            {cat.label}
          </span>
        ))}
      </div>
    </section>
  );
}
