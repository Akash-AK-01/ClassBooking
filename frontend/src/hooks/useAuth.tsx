import { useState } from 'react';
import { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  function login(email: string, password: string, role: 'student' | 'admin', name: string, dateOfBirth?: string) {
    setUser({ email, role, name, password, dateOfBirth });
  }

  function logout() {
    setUser(null);
  }

  return { user, login, logout };
}
