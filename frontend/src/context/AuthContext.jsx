import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../lib/api';
import { storage } from '../utils/helpers';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedToken = storage.get('token');
    const savedUser = storage.get('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });

      const { token: authToken, user: userData } = response.data;

      setToken(authToken);
      setUser(userData);
      
      storage.set('token', authToken);
      storage.set('user', userData);

      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true, user: userData };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      const requiresVerification = error.response?.data?.requiresVerification || false;
      
      toast.error(message);
      return {
        success: false,
        error: message,
        requiresVerification,
      };
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      
      console.log('Registration response:', response.data);

      // Registration returns requiresVerification, not a token
      // User must verify email before logging in
      toast.success(response.data.message || 'Registration successful! Check your email.');
      return { 
        success: true, 
        requiresVerification: response.data.requiresVerification,
        user: response.data.user 
      };
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    storage.remove('token');
    storage.remove('user');
    storage.remove('cart');
    storage.remove('wishlist');
    toast.success('Logged out successfully');
  };

  // Update user
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    storage.set('user', updatedUser);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
