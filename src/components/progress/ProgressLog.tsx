'use client';

import { useState } from 'react';
import type { ProgressEntry } from '@/types';

interface ProgressLogProps {
  entries: ProgressEntry[];
  onAddEntry: (entry: Omit<ProgressEntry, 'id' | 'userId'>) => void;
}

const CATEGORY_OPTIONS = [
  { value: 'fitness',       label: 'Fitness',      color: 'var(--color-primary)', glow: 'var(--color-primary-glow)' },
  { value: 'nutrition',     label: 'Nutrition',    color: 'var(--color-green)',   glow: 'var(--color-green-glow)' },
  { value: 'mental_health', label: 'Mental Health', color: 'var(--color-violet)', glow: 'var(--color-violet-glow)' },
] as const;

const CATEGORY_META: Record<string, { color: string; glow: string }> = {
  fitness:      { color: 'var(--color-primary)', glow: 'var(--color-primary-glow)' },
  nutrition:    { color: 'var(--color-green)',   glow: 'var(--color-green-glow)' },
  mental_health:{ color: 'var(--color-violet)',  glow: 'var(--color-violet-glow)' },
};

const inputClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_1px_var(--color-primary),0_0_10px_var(--color-primary-glow)] transition-all duration-200';

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
        <h2
          className="text-xl font-bold"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Progress Log
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`rounded-lg px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
            isAdding
              ? 'border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-red)] hover:text-[var(--color-red)]'
              : 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:shadow-[0_0_16px_var(--color-primary-glow)]'
          }`}
          data-testid="add-entry-toggle"
        >
          {isAdding ? 'Cancel' : '+ Log Entry'}
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="mb-4 glass rounded-2xl border-[var(--color-border-bright)] p-5 space-y-4"
          data-testid="add-entry-form"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="entry-category" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
                Category
              </label>
              <select
                id="entry-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProgressEntry['category'])}
                className={inputClass}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="entry-value" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
                Value (e.g. minutes)
              </label>
              <input
                id="entry-value"
                type="number"
                min="0"
                step="0.1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={inputClass}
                placeholder="30"
              />
            </div>
          </div>
          <div>
            <label htmlFor="entry-note" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
              Note *
            </label>
            <input
              id="entry-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className={inputClass}
              placeholder="What did you do?"
            />
          </div>
          <div>
            <label htmlFor="entry-date" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
              Date
            </label>
            <input
              id="entry-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </div>
          {error && (
            <p className="rounded-lg border border-[var(--color-red)] bg-[var(--color-red-dim)] px-3 py-2 text-xs text-[var(--color-red)]" role="alert" data-testid="entry-error">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--color-primary-foreground)] hover:shadow-[0_0_16px_var(--color-primary-glow)] transition-all duration-200"
            data-testid="submit-entry"
          >
            Save Entry
          </button>
        </form>
      )}

      {entries.length === 0 ? (
        <div
          className="glass rounded-2xl p-10 text-center border-dashed"
          data-testid="log-empty-state"
        >
          <p className="text-sm text-[var(--color-muted)]">No progress entries yet. Start logging!</p>
        </div>
      ) : (
        <ul className="space-y-2" data-testid="entry-list">
          {entries.map((entry) => {
            const meta = CATEGORY_META[entry.category] ?? CATEGORY_META.fitness;
            return (
              <li
                key={entry.id}
                className="glass flex items-center gap-3 rounded-xl p-3 hover:border-[var(--color-border-bright)] transition-all duration-200"
                data-testid={`entry-${entry.id}`}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: meta.color, boxShadow: `0 0 6px ${meta.glow}` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-foreground)]">{entry.note}</p>
                  <p className="text-xs text-[var(--color-muted)] capitalize" style={{ fontFamily: 'var(--font-mono)' }}>
                    {entry.category.replace('_', ' ')} · {entry.value} · {entry.date}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
