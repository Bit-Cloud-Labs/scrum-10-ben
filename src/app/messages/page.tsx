'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import NavBar from '@/components/shared/NavBar';
import ConversationList from '@/components/messages/ConversationList';
import MessageThread from '@/components/messages/MessageThread';
import * as messageService from '@/lib/services/messageService';
import type { Conversation } from '@/types';

function MessagesContent() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setConversations(messageService.getConversations(user.id));
    }
  }, [user]);

  function handleSelectConversation(id: string) {
    setSelectedId(id);
    if (user) {
      messageService.markRead(user.id, id);
      setConversations(messageService.getConversations(user.id));
    }
  }

  function handleSend(content: string) {
    if (!user || !selectedId) return;
    const updated = messageService.send(user.id, selectedId, content);
    setConversations(updated);
  }

  const selectedConversation = conversations.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <ConversationList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={handleSelectConversation}
          />
        </div>
        <div className="md:col-span-2 rounded-2xl border border-[var(--color-border)] overflow-hidden">
          <MessageThread
            conversation={selectedConversation}
            currentUserId={user?.id ?? ''}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <ProtectedRoute>
      <NavBar />
      <MessagesContent />
    </ProtectedRoute>
  );
}
