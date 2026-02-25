import type { ProgressEntry } from '@/types';

const PROGRESS_KEY = 'wellness_progress';

const MOCK_ENTRIES: Omit<ProgressEntry, 'userId'>[] = [
  { id: 'pe_1', category: 'fitness', note: '30 min run', value: 30, date: '2026-02-20' },
  { id: 'pe_2', category: 'nutrition', note: 'Healthy salad lunch', value: 8, date: '2026-02-21' },
  { id: 'pe_3', category: 'mental_health', note: 'Meditation session', value: 10, date: '2026-02-22' },
  { id: 'pe_4', category: 'fitness', note: '45 min yoga', value: 45, date: '2026-02-23' },
];

function getEntries(): Record<string, ProgressEntry[]> {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(PROGRESS_KEY);
  return raw ? (JSON.parse(raw) as Record<string, ProgressEntry[]>) : {};
}

function saveEntries(entries: Record<string, ProgressEntry[]>): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(entries));
}

export function getProgress(userId: string): ProgressEntry[] {
  const all = getEntries();
  if (!all[userId]) {
    const initial = MOCK_ENTRIES.map((e) => ({ ...e, userId }));
    all[userId] = initial;
    saveEntries(all);
  }
  return [...all[userId]].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function addEntry(
  userId: string,
  entry: Omit<ProgressEntry, 'id' | 'userId'>,
): ProgressEntry[] {
  const all = getEntries();
  const existing = all[userId] ?? MOCK_ENTRIES.map((e) => ({ ...e, userId }));
  const newEntry: ProgressEntry = {
    ...entry,
    id: `pe_${Date.now()}`,
    userId,
  };
  all[userId] = [newEntry, ...existing];
  saveEntries(all);
  return [...all[userId]].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
