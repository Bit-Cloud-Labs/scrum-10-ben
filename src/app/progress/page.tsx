'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import NavBar from '@/components/shared/NavBar';
import ProgressChart from '@/components/progress/ProgressChart';
import ProgressLog from '@/components/progress/ProgressLog';
import * as progressService from '@/lib/services/progressService';
import type { ProgressEntry } from '@/types';

function ProgressContent() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<ProgressEntry[]>([]);

  useEffect(() => {
    if (user) {
      setEntries(progressService.getProgress(user.id));
    }
  }, [user]);

  function handleAddEntry(entry: Omit<ProgressEntry, 'id' | 'userId'>) {
    if (!user) return;
    const updated = progressService.addEntry(user.id, entry);
    setEntries(updated);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6 animate-fade-up">
      <div>
        <p className="text-xs font-medium text-[var(--color-muted)] uppercase tracking-widest mb-1">Module</p>
        <h1
          className="text-3xl font-bold tracking-tight gradient-text"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Progress Tracking
        </h1>
      </div>
      <ProgressChart entries={entries} />
      <ProgressLog entries={entries} onAddEntry={handleAddEntry} />
    </div>
  );
}

export default function ProgressPage() {
  return (
    <ProtectedRoute>
      <NavBar />
      <ProgressContent />
    </ProtectedRoute>
  );
}
