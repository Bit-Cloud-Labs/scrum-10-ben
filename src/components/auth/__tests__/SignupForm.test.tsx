import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupForm from '../SignupForm';

const mockPush = jest.fn();
const mockSignup = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, replace: jest.fn() }),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    signup: mockSignup,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('SignupForm', () => {
  it('renders name, email, and password fields', () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('calls authService.signup with name, email, password on submit', async () => {
    mockSignup.mockResolvedValueOnce({ id: '2', email: 'new@test.com', name: 'New User' });
    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'new@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith('new@test.com', 'password123', 'New User');
    });
  });

  it('redirects to dashboard on successful signup', async () => {
    mockSignup.mockResolvedValueOnce({ id: '2', email: 'new@test.com', name: 'New User' });
    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'new@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('shows error when signup fails', async () => {
    mockSignup.mockRejectedValueOnce(new Error('Email already registered'));
    render(<SignupForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Dup User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'dup@test.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByTestId('signup-error')).toHaveTextContent('Email already registered');
    });
  });

  it('shows validation error when fields are empty', async () => {
    render(<SignupForm />);
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    await waitFor(() => {
      expect(screen.getByTestId('signup-error')).toBeInTheDocument();
    });
    expect(mockSignup).not.toHaveBeenCalled();
  });
});
