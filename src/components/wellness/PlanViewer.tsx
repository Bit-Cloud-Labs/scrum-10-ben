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
        className="rounded-2xl border-2 border-dashed border-[var(--color-border)] p-8 text-center"
        data-testid="plan-empty-state"
      >
        <p className="text-[var(--color-muted)]">No milestones in your plan yet.</p>
      </div>
    );
  }

  return (
    <section data-testid="plan-viewer">
      <h2 className="text-xl font-bold mb-4 text-[var(--color-green)]">{plan.title}</h2>
      <ul className="space-y-3">
        {plan.milestones.map((milestone: WellnessMilestone) => (
          <li
            key={milestone.id}
            className={`rounded-xl border p-4 transition-colors ${
              milestone.completed
                ? 'border-[var(--color-green)] bg-[var(--color-green-light)]'
                : 'border-[var(--color-border)] bg-white'
            }`}
            data-testid={`milestone-${milestone.id}`}
            data-completed={milestone.completed}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onToggleComplete?.(milestone.id, !milestone.completed)}
                className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${
                  milestone.completed
                    ? 'border-[var(--color-green)] bg-[var(--color-green)]'
                    : 'border-[var(--color-border)]'
                }`}
                aria-label={milestone.completed ? 'Mark incomplete' : 'Mark complete'}
                data-testid={`toggle-${milestone.id}`}
              >
                {milestone.completed && (
                  <span className="flex h-full items-center justify-center text-white text-xs">✓</span>
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-semibold ${
                    milestone.completed ? 'line-through text-[var(--color-muted)]' : ''
                  }`}
                >
                  {milestone.title}
                </p>
                <p className="text-sm text-[var(--color-muted)] mt-0.5">{milestone.description}</p>
                {milestone.dueDate && (
                  <p className="text-xs text-[var(--color-muted)] mt-1">Due: {milestone.dueDate}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
