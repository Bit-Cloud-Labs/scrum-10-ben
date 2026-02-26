'use client';

import { useState } from 'react';
import type { ProgressEntry } from '@/types';

interface ProgressLogProps {
  entries: ProgressEntry[];
  onAddEntry: (entry: Omit<ProgressEntry, 'id' | 'userId'>) => void;
}

const CATEGORY_OPTIONS = [
  { value: 'fitness', label: 'Fitness' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'mental_health', label: 'Mental Health' },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  fitness: 'var(--color-blue)',
  nutrition: 'var(--color-green)',
  mental_health: 'var(--color-red)',
};

export default function ProgressLog({ entries, onAddEntry }: ProgressLogProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [category, setCategory] = useState<ProgressEntry['category']>('fitness');
  const [note, setNote] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!note.trim()) {
      setError('Note is required');
      return;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) {
      setError('Value must be a positive number');
      return;
    }
    onAddEntry({ category, note: note.trim(), value: numValue, date });
    setNote('');
    setValue('');
    setDate(new Date().toISOString().split('T')[0]);
    setIsAdding(false);
  }

  return (
    <section data-testid="progress-log">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Progress Log</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="rounded-lg bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          data-testid="add-entry-toggle"
        >
          {isAdding ? 'Cancel' : '+ Log Entry'}
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 rounded-2xl border border-[var(--color-blue)] bg-[var(--color-blue-light)] p-4 space-y-3"
          data-testid="add-entry-form"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="entry-category" className="block text-sm font-medium mb-1">
                Category
              </label>
              <select
                id="entry-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProgressEntry['category'])}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="entry-value" className="block text-sm font-medium mb-1">
                Value (e.g. minutes)
              </label>
              <input
                id="entry-value"
                type="number"
                min="0"
                step="0.1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
                placeholder="30"
              />
            </div>
          </div>
          <div>
            <label htmlFor="entry-note" className="block text-sm font-medium mb-1">
              Note *
            </label>
            <input
              id="entry-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
              placeholder="What did you do?"
            />
          </div>
          <div>
            <label htmlFor="entry-date" className="block text-sm font-medium mb-1">
              Date
            </label>
            <input
              id="entry-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
            />
          </div>
          {error && (
            <p className="text-sm text-[var(--color-red)]" role="alert" data-testid="entry-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            data-testid="submit-entry"
          >
            Save Entry
          </button>
        </form>
      )}

      {entries.length === 0 ? (
        <div
          className="rounded-2xl border-2 border-dashed border-[var(--color-border)] p-8 text-center"
          data-testid="log-empty-state"
        >
          <p className="text-[var(--color-muted)]">No progress entries yet. Start logging!</p>
        </div>
      ) : (
        <ul className="space-y-2" data-testid="entry-list">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] p-3"
              data-testid={`entry-${entry.id}`}
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: CATEGORY_COLORS[entry.category] }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{entry.note}</p>
                <p className="text-xs text-[var(--color-muted)] capitalize">
                  {entry.category.replace('_', ' ')} · {entry.value} · {entry.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
