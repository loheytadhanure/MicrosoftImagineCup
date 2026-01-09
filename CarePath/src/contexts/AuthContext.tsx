import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface GoogleJwtPayload {
  sub: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  handleGoogleLogin: (credentialResponse: CredentialResponse) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('carepath_user');
    const storedToken = localStorage.getItem('carepath_token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Replace with real API call to your backend
    // For now, simulate API authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password.length < 8) {
      throw new Error('Invalid credentials');
    }
    
    const user: User = {
      id: `user_${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      avatar: undefined
    };
    
    setUser(user);
    localStorage.setItem('carepath_user', JSON.stringify(user));
    localStorage.setItem('carepath_token', 'dummy_token_' + Date.now());
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credential received from Google');
      }

      // Decode the JWT token from Google
      const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
      
      // Create user object from Google data
      const user: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture
      };

      // TODO: Send credential to your backend for verification
      // const response = await fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ credential: credentialResponse.credential })
      // });
      // const data = await response.json();

      // Store user and token
      setUser(user);
      localStorage.setItem('carepath_user', JSON.stringify(user));
      localStorage.setItem('carepath_token', credentialResponse.credential);
      
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error('Google authentication failed');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // TODO: Replace with real API call to your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    
    const user: User = {
      id: `user_${Date.now()}`,
      name: name,
      email: email,
      avatar: undefined
    };
    
    setUser(user);
    localStorage.setItem('carepath_user', JSON.stringify(user));
    localStorage.setItem('carepath_token', 'dummy_token_' + Date.now());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carepath_user');
    localStorage.removeItem('carepath_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        handleGoogleLogin,
        signup,
        logout,
        isAuthenticated: !!user,
        isLoading
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
