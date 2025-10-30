import axios from 'axios';
import { storage } from './storage.js';

// Use environment variable for API URL, fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Enable cookies for JWT tokens
});

// JWT Token Management
let accessToken = null;

export const setAuthToken = (token) => {
  accessToken = token;
  if (token) {
    storage.set('angal:access-token', token);
  } else {
    storage.remove('angal:access-token');
  }
};

export const getAuthToken = () => {
  if (!accessToken) {
    accessToken = storage.get('angal:access-token');
  }
  return accessToken;
};

export const clearAuthToken = () => {
  accessToken = null;
  storage.remove('angal:access-token');
  storage.remove('angal:user-id'); // Remove old system data
  storage.remove('angal:user'); // Remove old system data
};

// Request interceptor: Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: Handle token expiration and errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const errorCode = error.response?.data?.code;
      
      // If token expired, try to refresh
      if (errorCode === 'INVALID_TOKEN' || errorCode === 'NO_TOKEN') {
        try {
          console.log('🔄 Attempting to refresh expired token...');
          const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh`, {}, {
            withCredentials: true
          });
          
          const newToken = refreshResponse.data.tokens.accessToken;
          setAuthToken(newToken);
          
          // Retry the original request with new token
          error.config.headers['Authorization'] = `Bearer ${newToken}`;
          return api.request(error.config);
        } catch (refreshError) {
          console.log('🚪 Refresh failed, redirecting to login...');
          clearAuthToken();
          window.location.href = '/auth';
          return Promise.reject(refreshError);
        }
      }
    }
    
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject({ message: error.message || 'Unexpected error occurred' });
  }
);

export const setAuthHeader = (userId) => {
  if (userId) {
    storage.set('angal:user-id', userId);
  } else {
    storage.remove('angal:user-id');
  }
};
