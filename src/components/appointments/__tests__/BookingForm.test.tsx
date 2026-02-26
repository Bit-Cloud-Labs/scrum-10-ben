import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from '../BookingForm';

describe('BookingForm', () => {
  it('renders service, date, and time fields', () => {
    render(<BookingForm onBook={jest.fn()} />);
    expect(screen.getByTestId('booking-form')).toBeInTheDocument();
    expect(screen.getByTestId('service-select')).toBeInTheDocument();
    expect(screen.getByTestId('date-input')).toBeInTheDocument();
    expect(screen.getByTestId('time-select')).toBeInTheDocument();
  });

  it('calls onBook with correct payload on valid submit', async () => {
    const mockBook = jest.fn();
    render(<BookingForm onBook={mockBook} />);

    fireEvent.change(screen.getByTestId('service-select'), {
      target: { value: 'Wellness Consultation' },
    });
    fireEvent.change(screen.getByTestId('date-input'), {
      target: { value: '2026-03-10' },
    });
    fireEvent.change(screen.getByTestId('time-select'), {
      target: { value: '10:00' },
    });
    fireEvent.click(screen.getByTestId('book-submit'));

    await waitFor(() => {
      expect(mockBook).toHaveBeenCalledWith({
        service: 'Wellness Consultation',
        date: '2026-03-10',
        time: '10:00',
      });
    });
  });

  it('shows inline validation errors when required fields are empty', async () => {
    render(<BookingForm onBook={jest.fn()} />);
    fireEvent.click(screen.getByTestId('book-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('error-service')).toBeInTheDocument();
      expect(screen.getByTestId('error-date')).toBeInTheDocument();
      expect(screen.getByTestId('error-time')).toBeInTheDocument();
    });
  });

  it('does not call onBook when validation fails', async () => {
    const mockBook = jest.fn();
    render(<BookingForm onBook={mockBook} />);
    fireEvent.click(screen.getByTestId('book-submit'));

    await waitFor(() => {
      expect(screen.getByTestId('error-service')).toBeInTheDocument();
    });
    expect(mockBook).not.toHaveBeenCalled();
  });
});
