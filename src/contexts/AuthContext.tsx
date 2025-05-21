"use client";

import type { User } from '@/types';
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  register: (email: string, name?: string) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Mock loading user from storage or API
    const storedUser = localStorage.getItem('pharmaflow-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, name: string = 'User') => {
    const mockUser: User = { id: Date.now().toString(), email, name };
    setUser(mockUser);
    localStorage.setItem('pharmaflow-user', JSON.stringify(mockUser));
    router.push('/profile');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharmaflow-user');
    router.push('/login');
  };

  const register = (email: string, name: string = 'New User') => {
    // In a real app, this would hit an API
    const mockUser: User = { id: Date.now().toString(), email, name };
    setUser(mockUser);
    localStorage.setItem('pharmaflow-user', JSON.stringify(mockUser));
    router.push('/profile');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
