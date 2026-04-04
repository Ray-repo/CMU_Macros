import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://127.0.0.1:8000/api/auth';

interface AuthContextType {
  token: string | null;
  username: string | null;
  isLoaded: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadAuth = async () => {
      const savedToken = await AsyncStorage.getItem('token');
      const savedUsername = await AsyncStorage.getItem('username');
      if (savedToken) setToken(savedToken);
      if (savedUsername) setUsername(savedUsername);
      setIsLoaded(true);
    };
    loadAuth();
  }, []);

  const login = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  setToken(data.token);
  setUsername(data.username);
  await AsyncStorage.setItem('token', data.token);
  await AsyncStorage.setItem('username', data.username);
};

const register = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Register failed');
  setToken(data.token);
  setUsername(data.username);
  await AsyncStorage.setItem('token', data.token);
  await AsyncStorage.setItem('username', data.username);
};

  const logout = async () => {
    setToken(null);
    setUsername(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ token, username, isLoaded, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}