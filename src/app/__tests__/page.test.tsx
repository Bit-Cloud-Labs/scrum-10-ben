import { render, screen } from '@testing-library/react';
import Home from '../page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: jest.fn(), push: jest.fn() }),
  usePathname: () => '/',
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({ isAuthenticated: false, isLoading: false }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Home', () => {
  it('renders loading spinner while redirecting', () => {
    render(<Home />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
