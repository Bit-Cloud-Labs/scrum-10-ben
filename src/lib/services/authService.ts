import type { User } from '@/types';

const USERS_KEY = 'wellness_users';
const SESSION_KEY = 'wellness_session';

interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

function hashPassword(password: string): string {
  // Encode password to avoid plaintext storage (not production-grade)
  return `hashed:${btoa(encodeURIComponent(password))}`;
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? (JSON.parse(raw) as StoredUser[]) : [];
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function signup(
  email: string,
  password: string,
  name: string,
): Promise<User> {
  const users = getStoredUsers();
  const existing = users.find((u) => u.email === email);
  if (existing) {
    throw new Error('Email already registered');
  }
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }
  const newUser: StoredUser = {
    id: `user_${Date.now()}`,
    email,
    name,
    passwordHash: hashPassword(password),
  };
  users.push(newUser);
  saveUsers(users);

  const session: User = { id: newUser.id, email: newUser.email, name: newUser.name };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function login(email: string, password: string): Promise<User> {
  const users = getStoredUsers();
  const storedUser = users.find((u) => u.email === email);
  if (!storedUser) {
    throw new Error('Invalid credentials');
  }
  if (storedUser.passwordHash !== hashPassword(password)) {
    throw new Error('Invalid credentials');
  }
  const session: User = {
    id: storedUser.id,
    email: storedUser.email,
    name: storedUser.name,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function getHashedPassword(password: string): string {
  return hashPassword(password);
}
