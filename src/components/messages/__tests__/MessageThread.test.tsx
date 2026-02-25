import { render, screen, fireEvent } from '@testing-library/react';
import MessageThread from '../MessageThread';
import type { Conversation } from '@/types';

const mockConversation: Conversation = {
  id: 'conv_1',
  userId: 'u1',
  coachName: 'Dr. Sarah Chen',
  lastMessage: 'Hello!',
  lastMessageTime: '2026-02-24T14:30:00Z',
  unread: false,
  messages: [
    {
      id: 'msg_1',
      conversationId: 'conv_1',
      senderId: 'coach_1',
      senderName: 'Dr. Sarah Chen',
      content: 'Welcome!',
      timestamp: '2026-02-20T09:00:00Z',
    },
    {
      id: 'msg_2',
      conversationId: 'conv_1',
      senderId: 'u1',
      senderName: 'Me',
      content: 'Thank you!',
      timestamp: '2026-02-20T09:05:00Z',
    },
  ],
};

describe('MessageThread', () => {
  it('shows placeholder when no conversation selected', () => {
    render(
      <MessageThread conversation={null} currentUserId="u1" onSend={jest.fn()} />,
    );
    expect(screen.getByTestId('no-conversation-selected')).toBeInTheDocument();
  });

  it('renders messages in a conversation', () => {
    render(
      <MessageThread conversation={mockConversation} currentUserId="u1" onSend={jest.fn()} />,
    );
    expect(screen.getByTestId('message-thread')).toBeInTheDocument();
    expect(screen.getByTestId('message-list')).toBeInTheDocument();
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Thank you!')).toBeInTheDocument();
  });

  it('calls onSend when message is submitted', () => {
    const mockSend = jest.fn();
    render(
      <MessageThread conversation={mockConversation} currentUserId="u1" onSend={mockSend} />,
    );
    fireEvent.change(screen.getByTestId('message-input'), {
      target: { value: 'Hello there!' },
    });
    fireEvent.click(screen.getByTestId('send-button'));
    expect(mockSend).toHaveBeenCalledWith('Hello there!');
  });

  it('clears input after sending', () => {
    render(
      <MessageThread conversation={mockConversation} currentUserId="u1" onSend={jest.fn()} />,
    );
    const input = screen.getByTestId('message-input');
    fireEvent.change(input, { target: { value: 'A message' } });
    fireEvent.click(screen.getByTestId('send-button'));
    expect(input).toHaveValue('');
  });
});
