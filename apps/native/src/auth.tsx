import * as SecureStore from 'expo-secure-store';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Platform } from 'react-native';

const KEY = 'crossub.owner.session';

async function readSession() {
  if (Platform.OS === 'web') return globalThis.localStorage?.getItem(KEY) ?? null;
  return SecureStore.getItemAsync(KEY);
}

async function writeSession(email: string) {
  if (Platform.OS === 'web') {
    globalThis.localStorage?.setItem(KEY, email);
    return;
  }
  await SecureStore.setItemAsync(KEY, email);
}

async function clearSession() {
  if (Platform.OS === 'web') {
    globalThis.localStorage?.removeItem(KEY);
    return;
  }
  await SecureStore.deleteItemAsync(KEY);
}

type AuthApi = {
  status: 'loading' | 'authed' | 'guest';
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthApi | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthApi['status']>('loading');
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    readSession()
      .then((stored) => {
        setEmail(stored);
        setStatus(stored ? 'authed' : 'guest');
      })
      .catch(() => setStatus('guest'));
  }, []);

  const login = useCallback(async (nextEmail: string, password: string) => {
    const normalized = nextEmail.trim().toLowerCase();
    if (!normalized.includes('@')) throw new Error('Enter a valid email.');
    if (!password) throw new Error('Enter your password.');
    await writeSession(normalized);
    setEmail(normalized);
    setStatus('authed');
  }, []);

  const logout = useCallback(async () => {
    await clearSession();
    setEmail(null);
    setStatus('guest');
  }, []);

  const value = useMemo(() => ({ status, email, login, logout }), [email, login, logout, status]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
