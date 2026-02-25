import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PlanEditor from '../PlanEditor';

describe('PlanEditor', () => {
  it('shows add button initially', () => {
    render(<PlanEditor onSave={jest.fn()} />);
    expect(screen.getByTestId('open-plan-editor')).toBeInTheDocument();
  });

  it('opens form when add button is clicked', () => {
    render(<PlanEditor onSave={jest.fn()} />);
    fireEvent.click(screen.getByTestId('open-plan-editor'));
    expect(screen.getByTestId('plan-editor')).toBeInTheDocument();
  });

  it('calls onSave with milestone data on valid submit', async () => {
    const mockSave = jest.fn();
    render(<PlanEditor onSave={mockSave} />);
    fireEvent.click(screen.getByTestId('open-plan-editor'));

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Milestone' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Details here' } });
    fireEvent.click(screen.getByTestId('save-milestone'));

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'New Milestone', description: 'Details here' }),
      );
    });
  });

  it('shows error when title is empty', async () => {
    render(<PlanEditor onSave={jest.fn()} />);
    fireEvent.click(screen.getByTestId('open-plan-editor'));
    fireEvent.click(screen.getByTestId('save-milestone'));

    await waitFor(() => {
      expect(screen.getByTestId('editor-error')).toBeInTheDocument();
    });
  });

  it('closes form after successful save', async () => {
    const mockSave = jest.fn();
    render(<PlanEditor onSave={mockSave} />);
    fireEvent.click(screen.getByTestId('open-plan-editor'));
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Milestone' } });
    fireEvent.click(screen.getByTestId('save-milestone'));

    await waitFor(() => {
      expect(screen.queryByTestId('plan-editor')).not.toBeInTheDocument();
    });
  });
});
