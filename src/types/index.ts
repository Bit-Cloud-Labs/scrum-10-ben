export interface User {
  id: string;
  email: string;
  name: string;
}

export interface WellnessMilestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

export interface WellnessPlan {
  id: string;
  userId: string;
  title: string;
  milestones: WellnessMilestone[];
}

export interface ProgressEntry {
  id: string;
  userId: string;
  category: 'fitness' | 'nutrition' | 'mental_health';
  note: string;
  value: number;
  date: string;
}

export interface Appointment {
  id: string;
  userId: string;
  service: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  userId: string;
  coachName: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  messages: Message[];
}

export interface Invoice {
  id: string;
  userId: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface BillingInfo {
  userId: string;
  balance: number;
  nextDueDate: string;
  subscriptionStatus: 'active' | 'paused' | 'cancelled';
  invoices: Invoice[];
}
