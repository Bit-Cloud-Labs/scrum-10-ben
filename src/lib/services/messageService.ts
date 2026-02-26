import type { Conversation, Message } from '@/types';

const CONVOS_KEY = 'wellness_conversations';

const MOCK_CONVERSATIONS: Omit<Conversation, 'userId'>[] = [
  {
    id: 'conv_1',
    coachName: 'Dr. Sarah Chen',
    lastMessage: 'Great progress this week! Keep it up.',
    lastMessageTime: '2026-02-24T14:30:00Z',
    unread: true,
    messages: [
      {
        id: 'msg_1',
        conversationId: 'conv_1',
        senderId: 'coach_1',
        senderName: 'Dr. Sarah Chen',
        content: 'Welcome to your wellness journey!',
        timestamp: '2026-02-20T09:00:00Z',
      },
      {
        id: 'msg_2',
        conversationId: 'conv_1',
        senderId: 'coach_1',
        senderName: 'Dr. Sarah Chen',
        content: 'Great progress this week! Keep it up.',
        timestamp: '2026-02-24T14:30:00Z',
      },
    ],
  },
  {
    id: 'conv_2',
    coachName: 'Nutritionist Mike',
    lastMessage: 'Your meal plan is ready for review.',
    lastMessageTime: '2026-02-23T10:00:00Z',
    unread: false,
    messages: [
      {
        id: 'msg_3',
        conversationId: 'conv_2',
        senderId: 'coach_2',
        senderName: 'Nutritionist Mike',
        content: 'Your meal plan is ready for review.',
        timestamp: '2026-02-23T10:00:00Z',
      },
    ],
  },
];

function getAll(): Record<string, Conversation[]> {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(CONVOS_KEY);
  return raw ? (JSON.parse(raw) as Record<string, Conversation[]>) : {};
}

function saveAll(data: Record<string, Conversation[]>): void {
  localStorage.setItem(CONVOS_KEY, JSON.stringify(data));
}

export function getConversations(userId: string): Conversation[] {
  const all = getAll();
  if (!all[userId]) {
    all[userId] = MOCK_CONVERSATIONS.map((c) => ({ ...c, userId }));
    saveAll(all);
  }
  return [...all[userId]].sort(
    (a, b) =>
      new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime(),
  );
}

export function send(
  userId: string,
  conversationId: string,
  content: string,
): Conversation[] {
  const all = getAll();
  const existing =
    all[userId] ?? MOCK_CONVERSATIONS.map((c) => ({ ...c, userId }));
  const newMsg: Message = {
    id: `msg_${Date.now()}`,
    conversationId,
    senderId: userId,
    senderName: 'Me',
    content,
    timestamp: new Date().toISOString(),
  };
  all[userId] = existing.map((conv) =>
    conv.id === conversationId
      ? {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: content,
          lastMessageTime: newMsg.timestamp,
          unread: false,
        }
      : conv,
  );
  saveAll(all);
  return all[userId];
}

export function markRead(userId: string, conversationId: string): void {
  const all = getAll();
  if (!all[userId]) return;
  all[userId] = all[userId].map((c) =>
    c.id === conversationId ? { ...c, unread: false } : c,
  );
  saveAll(all);
}
