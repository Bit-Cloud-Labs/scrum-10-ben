import { render, screen } from '@testing-library/react';
import QuickLinks from '../QuickLinks';

jest.mock('next/link', () => {
  return ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

describe('QuickLinks', () => {
  it('renders links to all main sections', () => {
    render(<QuickLinks />);
    expect(screen.getByTestId('quick-link-wellness-plan')).toBeInTheDocument();
    expect(screen.getByTestId('quick-link-progress')).toBeInTheDocument();
    expect(screen.getByTestId('quick-link-appointments')).toBeInTheDocument();
    expect(screen.getByTestId('quick-link-messages')).toBeInTheDocument();
    expect(screen.getByTestId('quick-link-billing')).toBeInTheDocument();
  });

  it('all quick links point to correct routes', () => {
    render(<QuickLinks />);
    expect(screen.getByTestId('quick-link-wellness-plan')).toHaveAttribute('href', '/wellness-plan');
    expect(screen.getByTestId('quick-link-progress')).toHaveAttribute('href', '/progress');
    expect(screen.getByTestId('quick-link-appointments')).toHaveAttribute('href', '/appointments');
    expect(screen.getByTestId('quick-link-messages')).toHaveAttribute('href', '/messages');
    expect(screen.getByTestId('quick-link-billing')).toHaveAttribute('href', '/billing');
  });

  it('renders link labels', () => {
    render(<QuickLinks />);
    expect(screen.getByText('Wellness Plan')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText('Appointments')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });
});
