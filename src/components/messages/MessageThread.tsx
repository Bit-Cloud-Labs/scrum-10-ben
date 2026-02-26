'use client';

import { useRef, useState, useEffect } from 'react';
import type { Conversation } from '@/types';

interface MessageThreadProps {
  conversation: Conversation | null;
  currentUserId: string;
  onSend: (content: string) => void;
}

export default function MessageThread({
  conversation,
  currentUserId,
  onSend,
}: MessageThreadProps) {
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div
        className="flex items-center justify-center rounded-2xl border-2 border-dashed border-[var(--color-border)] p-8 text-center h-64"
        data-testid="no-conversation-selected"
      >
        <p className="text-[var(--color-muted)]">Select a conversation to start messaging.</p>
      </div>
    );
  }

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!draft.trim()) {
      setError('Message cannot be empty');
      return;
    }
    onSend(draft.trim());
    setDraft('');
  }

  return (
    <section className="flex flex-col h-full" data-testid="message-thread">
      <div className="border-b border-[var(--color-border)] p-3 font-semibold">
        {conversation.coachName}
      </div>
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3 min-h-48"
        data-testid="message-list"
      >
        {conversation.messages.map((msg) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              data-testid={`msg-${msg.id}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                  isMe
                    ? 'bg-[var(--color-blue)] text-white rounded-br-sm'
                    : 'bg-[var(--color-border)] rounded-bl-sm'
                }`}
              >
                {!isMe && (
                  <p className="text-xs font-semibold mb-1 opacity-70">{msg.senderName}</p>
                )}
                <p>{msg.content}</p>
                <p className="text-xs opacity-60 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSend} className="border-t border-[var(--color-border)] p-3 flex gap-2" data-testid="compose-form">
        <div className="flex-1">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message…"
            className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue)]"
            data-testid="message-input"
          />
          {error && (
            <p className="text-xs text-[var(--color-red)] mt-1" role="alert">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="rounded-lg bg-[var(--color-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity shrink-0"
          data-testid="send-button"
        >
          Send
        </button>
      </form>
    </section>
  );
}
