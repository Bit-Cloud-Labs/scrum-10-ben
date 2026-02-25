import type { WellnessPlan, WellnessMilestone } from '@/types';

const PLANS_KEY = 'wellness_plans';

const DEFAULT_PLAN: Omit<WellnessPlan, 'userId'> = {
  id: 'plan_default',
  title: 'My Wellness Plan',
  milestones: [
    {
      id: 'ms_1',
      title: 'Daily 30-minute walk',
      description: 'Build a habit of walking every day',
      completed: false,
      dueDate: '2026-03-01',
    },
    {
      id: 'ms_2',
      title: 'Drink 8 glasses of water',
      description: 'Stay hydrated throughout the day',
      completed: true,
      dueDate: '2026-02-28',
    },
    {
      id: 'ms_3',
      title: 'Meditate for 10 minutes',
      description: 'Practice mindfulness daily',
      completed: false,
      dueDate: '2026-03-15',
    },
  ],
};

function getPlans(): Record<string, WellnessPlan> {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(PLANS_KEY);
  return raw ? (JSON.parse(raw) as Record<string, WellnessPlan>) : {};
}

function savePlans(plans: Record<string, WellnessPlan>): void {
  localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
}

export function getPlan(userId: string): WellnessPlan {
  const plans = getPlans();
  if (!plans[userId]) {
    const plan: WellnessPlan = { ...DEFAULT_PLAN, userId };
    plans[userId] = plan;
    savePlans(plans);
  }
  return plans[userId];
}

export function updateMilestone(
  userId: string,
  milestoneId: string,
  updates: Partial<WellnessMilestone>,
): WellnessPlan {
  const plans = getPlans();
  const plan = plans[userId] ?? { ...DEFAULT_PLAN, userId };
  plan.milestones = plan.milestones.map((m) =>
    m.id === milestoneId ? { ...m, ...updates } : m,
  );
  plans[userId] = plan;
  savePlans(plans);
  return plan;
}

export function addMilestone(userId: string, milestone: Omit<WellnessMilestone, 'id'>): WellnessPlan {
  const plans = getPlans();
  const plan = plans[userId] ?? { ...DEFAULT_PLAN, userId };
  const newMilestone: WellnessMilestone = {
    ...milestone,
    id: `ms_${Date.now()}`,
  };
  plan.milestones = [...plan.milestones, newMilestone];
  plans[userId] = plan;
  savePlans(plans);
  return plan;
}
