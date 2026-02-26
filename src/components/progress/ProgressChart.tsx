'use client';

import type { ProgressEntry } from '@/types';

interface ProgressChartProps {
  entries: ProgressEntry[];
}

const CATEGORY_COLORS: Record<string, string> = {
  fitness: 'var(--color-blue)',
  nutrition: 'var(--color-green)',
  mental_health: 'var(--color-red)',
};

const CATEGORY_LABELS: Record<string, string> = {
  fitness: 'Fitness',
  nutrition: 'Nutrition',
  mental_health: 'Mental Health',
};

export default function ProgressChart({ entries }: ProgressChartProps) {
  if (entries.length === 0) {
    return (
      <div
        className="rounded-2xl border-2 border-dashed border-[var(--color-border)] p-8 text-center"
        data-testid="chart-empty-state"
      >
        <p className="text-[var(--color-muted)]">No progress data to display yet.</p>
      </div>
    );
  }

  // Group by category and sum values
  const categories = ['fitness', 'nutrition', 'mental_health'] as const;
  const totals = categories.map((cat) => {
    const catEntries = entries.filter((e) => e.category === cat);
    return {
      category: cat,
      total: catEntries.reduce((sum, e) => sum + e.value, 0),
      count: catEntries.length,
    };
  });

  const maxTotal = Math.max(...totals.map((t) => t.total), 1);

  return (
    <section className="rounded-2xl bg-white border border-[var(--color-border)] p-6" data-testid="progress-chart">
      <h2 className="text-lg font-bold mb-6">Progress Overview</h2>
      <div className="space-y-4">
        {totals.map(({ category, total, count }) => (
          <div key={category} data-testid={`chart-bar-${category}`}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{CATEGORY_LABELS[category]}</span>
              <span className="text-sm text-[var(--color-muted)]">
                {count} entries · {total} pts
              </span>
            </div>
            <div className="h-6 rounded-full bg-[var(--color-border)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(total / maxTotal) * 100}%`,
                  backgroundColor: CATEGORY_COLORS[category],
                }}
                role="progressbar"
                aria-valuenow={total}
                aria-valuemax={maxTotal}
                aria-label={`${CATEGORY_LABELS[category]} progress`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <span key={cat} className="flex items-center gap-1.5 text-xs text-[var(--color-muted)]">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
            />
            {CATEGORY_LABELS[cat]}
          </span>
        ))}
      </div>
    </section>
  );
}
