import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProfileRequest, loginRequest, registerRequest } from '../lib/api.js';
import { storage } from '../lib/storage.js';
import { api, setAuthToken, getAuthToken, clearAuthToken } from '../lib/axios.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          setInitializing(false);
          return;
        }

        // Try to get user profile with stored token
        const profile = await getProfileRequest();
        if (profile?.user) {
          setUser(profile.user);
        } else {
          clearAuthToken();
        }
      } catch (error) {
        console.error('Failed to bootstrap auth state:', error);
        clearAuthToken();
      } finally {
        setInitializing(false);
      }
    };

    bootstrap();
  }, []);

  const login = async (payload) => {
    const response = await loginRequest(payload);
    if (response?.user && response?.token) {
      // Store JWT token instead of user ID
      setAuthToken(response.token);
      setUser(response.user);
      console.log('🔐 User logged in with JWT token');
    }
    return response;
  };

  const register = async (payload) => {
    const response = await registerRequest(payload);
    return response;
  };

  const logout = async () => {
    try {
      // Call backend logout endpoint to clear cookies
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear frontend state regardless
      clearAuthToken();
      setUser(null);
      console.log('🚪 User logged out');
    }
  };

  const refreshProfile = async () => {
    try {
      const profile = await getProfileRequest();
      if (profile?.user) {
        setUser(profile.user);
        return profile.user;
      }
      return null;
    } catch (error) {
      console.error('Failed to refresh profile:', error);
      clearAuthToken();
      setUser(null);
      return null;
    }
  };

  const value = useMemo(
    () => ({ user, setUser, login, register, logout, refreshProfile, initializing }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
