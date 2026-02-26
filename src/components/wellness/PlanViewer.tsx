'use client';

import type { WellnessMilestone, WellnessPlan } from '@/types';

interface PlanViewerProps {
  plan: WellnessPlan;
  onToggleComplete?: (milestoneId: string, completed: boolean) => void;
}

export default function PlanViewer({ plan, onToggleComplete }: PlanViewerProps) {
  if (!plan || plan.milestones.length === 0) {
    return (
      <div
        className="glass rounded-2xl p-10 text-center border-dashed"
        data-testid="plan-empty-state"
      >
        <p className="text-sm text-[var(--color-muted)]">No milestones in your plan yet.</p>
      </div>
    );
  }

  const completedCount = plan.milestones.filter((m) => m.completed).length;
  const total = plan.milestones.length;

  return (
    <section data-testid="plan-viewer">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-lg font-bold neon-text-green"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {plan.title}
        </h2>
        <span
          className="text-xs tabular-nums text-[var(--color-muted)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {completedCount}/{total} complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-[var(--color-surface-2)] overflow-hidden mb-5">
        <div
          className="h-full rounded-full transition-all duration-700 bg-[var(--color-green)]"
          style={{
            width: `${total > 0 ? (completedCount / total) * 100 : 0}%`,
            boxShadow: '0 0 6px var(--color-green-glow)',
          }}
        />
      </div>

      <ul className="space-y-3">
        {plan.milestones.map((milestone: WellnessMilestone) => (
          <li
            key={milestone.id}
            className={`glass rounded-xl p-4 transition-all duration-300 ${
              milestone.completed
                ? 'border-[var(--color-green)] opacity-70'
                : 'hover:border-[var(--color-border-bright)]'
            }`}
            style={milestone.completed ? { boxShadow: '0 0 10px var(--color-green-glow)' } : {}}
            data-testid={`milestone-${milestone.id}`}
            data-completed={milestone.completed}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onToggleComplete?.(milestone.id, !milestone.completed)}
                className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  milestone.completed
                    ? 'border-[var(--color-green)] bg-[var(--color-green)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-green)]'
                }`}
                style={milestone.completed ? { boxShadow: '0 0 8px var(--color-green-glow)' } : {}}
                aria-label={milestone.completed ? 'Mark incomplete' : 'Mark complete'}
                data-testid={`toggle-${milestone.id}`}
              >
                {milestone.completed && (
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-semibold text-sm ${
                    milestone.completed
                      ? 'line-through text-[var(--color-muted)]'
                      : 'text-[var(--color-foreground)]'
                  }`}
                >
                  {milestone.title}
                </p>
                {milestone.description && (
                  <p className="text-xs text-[var(--color-muted)] mt-0.5">{milestone.description}</p>
                )}
                {milestone.dueDate && (
                  <p
                    className="text-[10px] text-[var(--color-muted)] mt-1"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Due: {milestone.dueDate}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
