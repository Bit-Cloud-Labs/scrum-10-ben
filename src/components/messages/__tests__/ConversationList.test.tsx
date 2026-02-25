import { render, screen, fireEvent } from '@testing-library/react';
import ConversationList from '../ConversationList';
import type { Conversation } from '@/types';

const mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    userId: 'u1',
    coachName: 'Dr. Sarah Chen',
    lastMessage: 'Great progress!',
    lastMessageTime: '2026-02-24T14:30:00Z',
    unread: true,
    messages: [],
  },
  {
    id: 'conv_2',
    userId: 'u1',
    coachName: 'Nutritionist Mike',
    lastMessage: 'Your meal plan is ready.',
    lastMessageTime: '2026-02-23T10:00:00Z',
    unread: false,
    messages: [],
  },
];

describe('ConversationList', () => {
  it('renders a list of conversations', () => {
    render(
      <ConversationList
        conversations={mockConversations}
        selectedId={null}
        onSelect={jest.fn()}
      />,
    );
    expect(screen.getByTestId('conversation-list')).toBeInTheDocument();
    expect(screen.getByText('Dr. Sarah Chen')).toBeInTheDocument();
    expect(screen.getByText('Nutritionist Mike')).toBeInTheDocument();
  });

  it('shows unread indicator for unread conversations', () => {
    render(
      <ConversationList
        conversations={mockConversations}
        selectedId={null}
        onSelect={jest.fn()}
      />,
    );
    expect(screen.getByTestId('unread-conv_1')).toBeInTheDocument();
    expect(screen.queryByTestId('unread-conv_2')).not.toBeInTheDocument();
  });

  it('calls onSelect when a conversation is clicked', () => {
    const mockSelect = jest.fn();
    render(
      <ConversationList
        conversations={mockConversations}
        selectedId={null}
        onSelect={mockSelect}
      />,
    );
    fireEvent.click(screen.getByTestId('conv-conv_1'));
    expect(mockSelect).toHaveBeenCalledWith('conv_1');
  });

  it('shows empty state when no conversations', () => {
    render(
      <ConversationList conversations={[]} selectedId={null} onSelect={jest.fn()} />,
    );
    expect(screen.getByTestId('no-conversations')).toBeInTheDocument();
  });
});
