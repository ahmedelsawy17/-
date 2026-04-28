import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, login as apiLogin, signup as apiSignup, type AuthPayload, type User } from '../lib/api';
import { authStorage } from '../lib/auth-storage';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (payload: AuthPayload) => Promise<void>;
  signup: (payload: AuthPayload) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (authStorage.isAuthenticated()) {
        try {
          const { user: userData } = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to restore session:', error);
          authStorage.clear();
        }
      }
      setLoading(false);
    };

    void initAuth();
  }, []);

  const login = async (payload: AuthPayload) => {
    const response = await apiLogin(payload);
    authStorage.setTokens(response.accessToken, response.refreshToken);
    authStorage.setUser(response.user.id, response.user.role);
    setUser(response.user);
  };

  const signup = async (payload: AuthPayload) => {
    const response = await apiSignup(payload);
    authStorage.setTokens(response.accessToken, response.refreshToken);
    authStorage.setUser(response.user.id, response.user.role);
    setUser(response.user);
  };

  const logout = () => {
    authStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
