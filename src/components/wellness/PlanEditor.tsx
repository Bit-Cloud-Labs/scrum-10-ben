'use client';

import { useState } from 'react';

interface PlanEditorProps {
  onSave: (milestone: { title: string; description: string; dueDate?: string }) => void;
}

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
        className="flex items-center gap-2 rounded-xl border-2 border-dashed border-[var(--color-green)] px-4 py-3 text-sm font-semibold text-[var(--color-green)] hover:bg-[var(--color-green-light)] transition-colors w-full justify-center"
        data-testid="open-plan-editor"
      >
        + Add Milestone
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--color-green)] bg-[var(--color-green-light)] p-4 space-y-3"
      data-testid="plan-editor"
    >
      <h3 className="font-semibold text-[var(--color-green)]">Add New Milestone</h3>
      <div>
        <label htmlFor="milestone-title" className="block text-sm font-medium mb-1">
          Title *
        </label>
        <input
          id="milestone-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
          placeholder="e.g. Walk 30 minutes daily"
        />
      </div>
      <div>
        <label htmlFor="milestone-desc" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="milestone-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
          rows={2}
          placeholder="Add details…"
        />
      </div>
      <div>
        <label htmlFor="milestone-due" className="block text-sm font-medium mb-1">
          Due Date
        </label>
        <input
          id="milestone-due"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-green)]"
        />
      </div>
      {error && (
        <p className="text-sm text-[var(--color-red)]" role="alert" data-testid="editor-error">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-[var(--color-green)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          data-testid="save-milestone"
        >
          Save Milestone
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm hover:bg-[var(--color-border)] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
