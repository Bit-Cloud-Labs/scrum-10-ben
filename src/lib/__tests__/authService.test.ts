import { login, logout, signup, getSession, getHashedPassword } from '../services/authService';

const USERS_KEY = 'wellness_users';
const SESSION_KEY = 'wellness_session';

beforeEach(() => {
  localStorage.clear();
});

describe('authService', () => {
  describe('signup', () => {
    it('creates a new user and stores session', async () => {
      const user = await signup('test@example.com', 'password123', 'Test User');
      expect(user.email).toBe('test@example.com');
      expect(user.name).toBe('Test User');
      expect(user.id).toBeTruthy();

      const session = getSession();
      expect(session).not.toBeNull();
      expect(session?.email).toBe('test@example.com');
    });

    it('throws if email already registered', async () => {
      await signup('dup@example.com', 'password123', 'First');
      await expect(signup('dup@example.com', 'password456', 'Second')).rejects.toThrow(
        'Email already registered',
      );
    });

    it('throws if password is too short', async () => {
      await expect(signup('short@example.com', 'abc', 'Short')).rejects.toThrow(
        'Password must be at least 8 characters',
      );
    });

    it('does not store password in plaintext', async () => {
      await signup('hash@example.com', 'mypassword', 'Hash User');
      const raw = localStorage.getItem(USERS_KEY);
      expect(raw).not.toContain('mypassword');
    });

    it('stored hash differs from plaintext password', () => {
      const hash = getHashedPassword('mypassword');
      expect(hash).not.toBe('mypassword');
    });
  });

  describe('login', () => {
    it('logs in with valid credentials', async () => {
      await signup('login@example.com', 'password123', 'Login User');
      logout();

      const user = await login('login@example.com', 'password123');
      expect(user.email).toBe('login@example.com');
      expect(getSession()).not.toBeNull();
    });

    it('throws on invalid credentials (wrong password)', async () => {
      await signup('login2@example.com', 'password123', 'Login User 2');
      logout();

      await expect(login('login2@example.com', 'wrongpassword')).rejects.toThrow(
        'Invalid credentials',
      );
    });

    it('throws when email not registered', async () => {
      await expect(login('nobody@example.com', 'password123')).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('logout', () => {
    it('clears the session from storage', async () => {
      await signup('logout@example.com', 'password123', 'Logout User');
      expect(getSession()).not.toBeNull();

      logout();
      expect(localStorage.getItem(SESSION_KEY)).toBeNull();
      expect(getSession()).toBeNull();
    });
  });

  describe('getSession', () => {
    it('returns null when no session', () => {
      expect(getSession()).toBeNull();
    });

    it('returns user after login', async () => {
      const user = await signup('sess@example.com', 'password123', 'Sess User');
      const session = getSession();
      expect(session?.id).toBe(user.id);
    });
  });
});
