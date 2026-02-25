import { render, screen, fireEvent } from '@testing-library/react';
import PlanViewer from '../PlanViewer';
import type { WellnessPlan } from '@/types';

const mockPlan: WellnessPlan = {
  id: 'plan_1',
  userId: 'user_1',
  title: 'My Wellness Plan',
  milestones: [
    { id: 'ms_1', title: 'Walk 30 min', description: 'Daily walk', completed: false },
    { id: 'ms_2', title: 'Drink water', description: '8 glasses', completed: true },
  ],
};

describe('PlanViewer', () => {
  it('renders plan milestones', () => {
    render(<PlanViewer plan={mockPlan} />);
    expect(screen.getByTestId('plan-viewer')).toBeInTheDocument();
    expect(screen.getByText('Walk 30 min')).toBeInTheDocument();
    expect(screen.getByText('Drink water')).toBeInTheDocument();
  });

  it('shows empty state when no milestones', () => {
    const emptyPlan: WellnessPlan = { ...mockPlan, milestones: [] };
    render(<PlanViewer plan={emptyPlan} />);
    expect(screen.getByTestId('plan-empty-state')).toBeInTheDocument();
  });

  it('completed milestones have data-completed attribute', () => {
    render(<PlanViewer plan={mockPlan} />);
    expect(screen.getByTestId('milestone-ms_2')).toHaveAttribute('data-completed', 'true');
    expect(screen.getByTestId('milestone-ms_1')).toHaveAttribute('data-completed', 'false');
  });

  it('calls onToggleComplete when toggle is clicked', () => {
    const onToggle = jest.fn();
    render(<PlanViewer plan={mockPlan} onToggleComplete={onToggle} />);
    fireEvent.click(screen.getByTestId('toggle-ms_1'));
    expect(onToggle).toHaveBeenCalledWith('ms_1', true);
  });
});
