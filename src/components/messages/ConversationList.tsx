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
        className="glass rounded-2xl p-8 text-center h-full flex items-center justify-center"
        data-testid="no-conversations"
      >
        <p className="text-sm text-[var(--color-muted)]">No conversations yet.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2" data-testid="conversation-list">
      {conversations.map((conv) => {
        const active = selectedId === conv.id;
        return (
          <li key={conv.id}>
            <button
              onClick={() => onSelect(conv.id)}
              className={`w-full rounded-xl border p-3.5 text-left transition-all duration-200 ${
                active
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-dim)] shadow-[0_0_12px_var(--color-primary-glow)]'
                  : 'border-[var(--color-border)] bg-[var(--color-surface-3)] hover:border-[var(--color-border-bright)]'
              }`}
              data-testid={`conv-${conv.id}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-semibold text-sm ${active ? 'text-[var(--color-primary)]' : 'text-[var(--color-foreground)]'}`}>
                  {conv.coachName}
                </span>
                {conv.unread && (
                  <span
                    className="h-2 w-2 rounded-full bg-[var(--color-primary)]"
                    style={{ boxShadow: '0 0 6px var(--color-primary-glow)' }}
                    data-testid={`unread-${conv.id}`}
                    aria-label="Unread"
                  />
                )}
              </div>
              <p className="text-xs text-[var(--color-muted)] truncate">{conv.lastMessage}</p>
              <p className="text-[10px] text-[var(--color-muted)] mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
                {new Date(conv.lastMessageTime).toLocaleDateString()}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
