import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProgressLog from '../ProgressLog';
import type { ProgressEntry } from '@/types';

const mockEntries: ProgressEntry[] = [
  { id: 'pe_1', userId: 'u1', category: 'fitness', note: 'Morning run', value: 30, date: '2026-02-22' },
  { id: 'pe_2', userId: 'u1', category: 'nutrition', note: 'Healthy lunch', value: 8, date: '2026-02-21' },
];

describe('ProgressLog', () => {
  it('renders log entries in reverse-chronological order', () => {
    render(<ProgressLog entries={mockEntries} onAddEntry={jest.fn()} />);
    expect(screen.getByTestId('progress-log')).toBeInTheDocument();
    expect(screen.getByText('Morning run')).toBeInTheDocument();
    expect(screen.getByText('Healthy lunch')).toBeInTheDocument();
  });

  it('shows empty state when no entries', () => {
    render(<ProgressLog entries={[]} onAddEntry={jest.fn()} />);
    expect(screen.getByTestId('log-empty-state')).toBeInTheDocument();
  });

  it('opens add entry form when button clicked', () => {
    render(<ProgressLog entries={mockEntries} onAddEntry={jest.fn()} />);
    fireEvent.click(screen.getByTestId('add-entry-toggle'));
    expect(screen.getByTestId('add-entry-form')).toBeInTheDocument();
  });

  it('calls onAddEntry when form is submitted with valid data', async () => {
    const mockAdd = jest.fn();
    render(<ProgressLog entries={mockEntries} onAddEntry={mockAdd} />);
    fireEvent.click(screen.getByTestId('add-entry-toggle'));

    fireEvent.change(screen.getByLabelText(/note/i), { target: { value: 'New workout' } });
    fireEvent.change(screen.getByLabelText(/value/i), { target: { value: '45' } });
    fireEvent.click(screen.getByTestId('submit-entry'));

    await waitFor(() => {
      expect(mockAdd).toHaveBeenCalledWith(
        expect.objectContaining({ note: 'New workout', value: 45 }),
      );
    });
  });

  it('shows error when note is empty on submit', async () => {
    render(<ProgressLog entries={mockEntries} onAddEntry={jest.fn()} />);
    fireEvent.click(screen.getByTestId('add-entry-toggle'));
    fireEvent.click(screen.getByTestId('submit-entry'));

    await waitFor(() => {
      expect(screen.getByTestId('entry-error')).toBeInTheDocument();
    });
  });
});
