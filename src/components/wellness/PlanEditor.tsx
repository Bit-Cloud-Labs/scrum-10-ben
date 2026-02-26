'use client';

import { useState } from 'react';

interface PlanEditorProps {
  onSave: (milestone: { title: string; description: string; dueDate?: string }) => void;
}

const inputClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-green)] focus:shadow-[0_0_0_1px_var(--color-green),0_0_10px_var(--color-green-glow)] transition-all duration-200';

export default function PlanEditor({ onSave }: PlanEditorProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onSave({ title: title.trim(), description: description.trim(), dueDate: dueDate || undefined });
    setTitle('');
    setDescription('');
    setDueDate('');
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 w-full rounded-xl border border-dashed border-[var(--color-green)] px-4 py-3.5 text-sm font-semibold text-[var(--color-green)] hover:bg-[var(--color-green-dim)] hover:shadow-[0_0_12px_var(--color-green-glow)] transition-all duration-200"
        data-testid="open-plan-editor"
      >
        <span>+</span> Add Milestone
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass rounded-2xl border-[var(--color-green)] p-5 space-y-4"
      style={{ boxShadow: '0 0 20px var(--color-green-glow)' }}
      data-testid="plan-editor"
    >
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-green)]">◈</span>
        <h3
          className="font-semibold text-[var(--color-green)]"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          New Milestone
        </h3>
      </div>

      <div>
        <label htmlFor="milestone-title" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Title *
        </label>
        <input
          id="milestone-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="e.g. Walk 30 minutes daily"
        />
      </div>

      <div>
        <label htmlFor="milestone-desc" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Description
        </label>
        <textarea
          id="milestone-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={inputClass}
          rows={2}
          placeholder="Add details…"
        />
      </div>

      <div>
        <label htmlFor="milestone-due" className="block text-xs font-medium text-[var(--color-muted-2)] mb-1.5 uppercase tracking-wider">
          Due Date
        </label>
        <input
          id="milestone-due"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={inputClass}
        />
      </div>

      {error && (
        <p
          className="rounded-lg border border-[var(--color-red)] bg-[var(--color-red-dim)] px-3 py-2 text-xs text-[var(--color-red)]"
          role="alert"
          data-testid="editor-error"
        >
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-[var(--color-green)] px-4 py-2.5 text-sm font-semibold text-white hover:shadow-[0_0_16px_var(--color-green-glow)] transition-all duration-200"
          data-testid="save-milestone"
        >
          Save Milestone
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-muted)] hover:border-[var(--color-border-bright)] hover:text-[var(--color-muted-2)] transition-all duration-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
