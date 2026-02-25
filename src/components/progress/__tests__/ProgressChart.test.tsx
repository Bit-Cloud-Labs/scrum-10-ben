import { render, screen } from '@testing-library/react';
import ProgressChart from '../ProgressChart';
import type { ProgressEntry } from '@/types';

const mockEntries: ProgressEntry[] = [
  { id: 'pe_1', userId: 'u1', category: 'fitness', note: 'Run', value: 30, date: '2026-02-20' },
  { id: 'pe_2', userId: 'u1', category: 'nutrition', note: 'Salad', value: 8, date: '2026-02-21' },
  { id: 'pe_3', userId: 'u1', category: 'mental_health', note: 'Meditate', value: 10, date: '2026-02-22' },
];

describe('ProgressChart', () => {
  it('renders chart with data', () => {
    render(<ProgressChart entries={mockEntries} />);
    expect(screen.getByTestId('progress-chart')).toBeInTheDocument();
  });

  it('shows empty state when no entries', () => {
    render(<ProgressChart entries={[]} />);
    expect(screen.getByTestId('chart-empty-state')).toBeInTheDocument();
  });

  it('renders bars for each category', () => {
    render(<ProgressChart entries={mockEntries} />);
    expect(screen.getByTestId('chart-bar-fitness')).toBeInTheDocument();
    expect(screen.getByTestId('chart-bar-nutrition')).toBeInTheDocument();
    expect(screen.getByTestId('chart-bar-mental_health')).toBeInTheDocument();
  });

  it('renders category labels', () => {
    render(<ProgressChart entries={mockEntries} />);
    expect(screen.getAllByText('Fitness').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Nutrition').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Mental Health').length).toBeGreaterThan(0);
  });
});
