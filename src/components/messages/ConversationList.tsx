'use client';

import type { Conversation } from '@/types';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div
        className="rounded-2xl border-2 border-dashed border-[var(--color-border)] p-8 text-center"
        data-testid="no-conversations"
      >
        <p className="text-[var(--color-muted)]">No conversations yet.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2" data-testid="conversation-list">
      {conversations.map((conv) => (
        <li key={conv.id}>
          <button
            onClick={() => onSelect(conv.id)}
            className={`w-full rounded-xl border p-3 text-left transition-colors ${
              selectedId === conv.id
                ? 'border-[var(--color-blue)] bg-[var(--color-blue-light)]'
                : 'border-[var(--color-border)] hover:bg-[var(--color-blue-light)]'
            }`}
            data-testid={`conv-${conv.id}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">{conv.coachName}</span>
              {conv.unread && (
                <span
                  className="h-2.5 w-2.5 rounded-full bg-[var(--color-blue)] shrink-0"
                  data-testid={`unread-${conv.id}`}
                  aria-label="Unread"
                />
              )}
            </div>
            <p className="text-xs text-[var(--color-muted)] mt-0.5 truncate">{conv.lastMessage}</p>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">
              {new Date(conv.lastMessageTime).toLocaleDateString()}
            </p>
          </button>
        </li>
      ))}
    </ul>
  );
}
