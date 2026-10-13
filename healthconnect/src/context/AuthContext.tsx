import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../lib/storage';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  isDemo: boolean;
  avatarInitials: string;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginDemo: (role?: 'patient' | 'doctor') => void;
  loginWithCredentials: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  registerUser: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = 'healthconnect_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to demo patient session for instant ease of evaluation
        const defaultProfile = StorageService.getProfile();
        const demoUser: UserSession = {
          id: defaultProfile.id,
          name: defaultProfile.name,
          email: defaultProfile.email,
          role: 'patient',
          isDemo: true,
          avatarInitials: 'AR'
        };
        setUser(demoUser);
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(demoUser));
      }
    } catch {
      // fallback
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginDemo = (role: 'patient' | 'doctor' = 'patient') => {
    let demoSession: UserSession;
    if (role === 'doctor') {
      demoSession = {
        id: 'doc-1',
        name: 'Dr. Sarah Lin, MD',
        email: 'dr.lin@healthconnect.internal',
        role: 'doctor',
        isDemo: true,
        avatarInitials: 'SL'
      };
    } else {
      const profile = StorageService.getProfile();
      demoSession = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: 'patient',
        isDemo: true,
        avatarInitials: 'AR'
      };
    }
    setUser(demoSession);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(demoSession));
  };

  const loginWithCredentials = async (email: string, _pass: string) => {
    // Demo validation
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const session: UserSession = {
      id: `user-${Date.now()}`,
      name: formattedName || 'Verified Patient',
      email,
      role: 'patient',
      isDemo: true,
      avatarInitials: formattedName.substring(0, 2).toUpperCase() || 'VP'
    };
    setUser(session);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    return { success: true };
  };

  const registerUser = async (name: string, email: string, _pass: string) => {
    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Name must be at least 2 characters.' };
    }
    if (!email || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    const session: UserSession = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      role: 'patient',
      isDemo: true,
      avatarInitials: name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'P'
    };
    setUser(session);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginDemo,
        loginWithCredentials,
        registerUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
