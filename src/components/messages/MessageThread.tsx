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
        className="flex flex-1 items-center justify-center p-8 text-center"
        data-testid="no-conversation-selected"
      >
        <div>
          <span className="block text-4xl text-[var(--color-muted)] mb-3 opacity-30">◎</span>
          <p className="text-sm text-[var(--color-muted)]">Select a conversation to start messaging.</p>
        </div>
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
      {/* Header */}
      <div className="border-b border-[var(--color-border)] p-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[var(--color-green)]" style={{ boxShadow: '0 0 6px var(--color-green-glow)' }} />
        <span className="text-sm font-semibold text-[var(--color-foreground)]">{conversation.coachName}</span>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
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
                className={`max-w-xs rounded-2xl px-4 py-2.5 text-sm ${
                  isMe
                    ? 'rounded-br-sm text-[var(--color-primary-foreground)]'
                    : 'rounded-bl-sm border border-[var(--color-border)] bg-[var(--color-surface)]'
                }`}
                style={isMe ? {
                  background: 'var(--color-primary)',
                  boxShadow: '0 0 12px var(--color-primary-glow)',
                } : {}}
              >
                {!isMe && (
                  <p className="text-[10px] font-semibold mb-1 text-[var(--color-muted-2)] uppercase tracking-wider">{msg.senderName}</p>
                )}
                <p className={isMe ? 'text-[var(--color-primary-foreground)]' : 'text-[var(--color-foreground)]'}>
                  {msg.content}
                </p>
                <p
                  className="text-[10px] mt-1 opacity-60"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Compose */}
      <form
        onSubmit={handleSend}
        className="border-t border-[var(--color-border)] p-3 flex gap-2"
        data-testid="compose-form"
      >
        <div className="flex-1">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type a message…"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-foreground)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:shadow-[0_0_0_1px_var(--color-primary),0_0_10px_var(--color-primary-glow)] transition-all duration-200"
            data-testid="message-input"
          />
          {error && (
            <p className="text-xs text-[var(--color-red)] mt-1" role="alert">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-foreground)] hover:shadow-[0_0_14px_var(--color-primary-glow)] transition-all duration-200"
          data-testid="send-button"
        >
          Send
        </button>
      </form>
    </section>
  );
}
