'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import NavBar from '@/components/shared/NavBar';
import PlanViewer from '@/components/wellness/PlanViewer';
import PlanEditor from '@/components/wellness/PlanEditor';
import * as wellnessService from '@/lib/services/wellnessService';
import type { WellnessPlan } from '@/types';

function WellnessPlanContent() {
  const { user } = useAuth();
  const [plan, setPlan] = useState<WellnessPlan | null>(null);

  useEffect(() => {
    if (user) {
      setPlan(wellnessService.getPlan(user.id));
    }
  }, [user]);

  function handleToggleComplete(milestoneId: string, completed: boolean) {
    if (!user) return;
    const updated = wellnessService.updateMilestone(user.id, milestoneId, { completed });
    setPlan({ ...updated });
  }

  function handleSaveMilestone(milestone: { title: string; description: string; dueDate?: string }) {
    if (!user) return;
    const updated = wellnessService.addMilestone(user.id, { ...milestone, completed: false });
    setPlan({ ...updated });
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Wellness Plan</h1>
      {plan && (
        <PlanViewer plan={plan} onToggleComplete={handleToggleComplete} />
      )}
      <PlanEditor onSave={handleSaveMilestone} />
    </div>
  );
}

export default function WellnessPlanPage() {
  return (
    <ProtectedRoute>
      <NavBar />
      <WellnessPlanContent />
    </ProtectedRoute>
  );
}
