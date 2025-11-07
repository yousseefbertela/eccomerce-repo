import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Unauthorized - clear auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.error('Session expired. Please login again.');
      window.location.href = '/login';
    }
    
    // Let individual contexts/components handle their own error toasts
    // This prevents duplicate error messages
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/profile'),
  verifyEmail: (email, code) => api.post('/auth/verify-email', { email, code }), // Changed to POST with email and code
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (data) => api.post('/auth/reset-password', data), // Now accepts object with token and newPassword
  resendVerification: (data) => api.post('/auth/resend-verification', data),
};

// Products API
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getBySlug: (slug) => api.get(`/products/slug/${slug}`),
  getByCategory: (category, params) => api.get(`/products/category/${category}`, { params }),
  getFeatured: () => api.get('/products/featured'),
  getNewArrivals: (params) => api.get('/products/new-arrivals', { params }),
  getBestSellers: (params) => api.get('/products/best-sellers', { params }),
  search: (query, params) => api.get('/products/search', { params: { q: query, ...params } }),
};

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  getBySlug: (slug) => api.get(`/categories/slug/${slug}`),
};

// Cart API (for authenticated users)
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (productId, quantity, size, color) => 
    api.post('/cart/items', { productId, quantity, size, color }),
  update: (productId, quantity) => api.put(`/cart/items/${productId}`, { quantity }),
  remove: (productId) => api.delete(`/cart/items/${productId}`),
  clear: () => api.delete('/cart'),
};

// Wishlist API
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  add: (productId) => api.post('/wishlist/add', { productId }),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
  toggle: (productId) => api.post('/wishlist/toggle', { productId }),
};

// Orders API
export const ordersAPI = {
  create: (orderData) => api.post('/orders', orderData),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  cancel: (id) => api.put(`/orders/${id}/cancel`),
};

// Reviews API
export const reviewsAPI = {
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`),
  create: (reviewData) => api.post('/reviews', reviewData),
  update: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (userData) => api.put('/user/profile', userData),
  changePassword: (passwordData) => api.put('/user/password', passwordData),
  getAddresses: () => api.get('/user/addresses'),
  addAddress: (addressData) => api.post('/user/addresses', addressData),
  updateAddress: (id, addressData) => api.put(`/user/addresses/${id}`, addressData),
  deleteAddress: (id) => api.delete(`/user/addresses/${id}`),
};

// Payment API
export const paymentAPI = {
  createIntent: (amount) => api.post('/payment/create-intent', { amount }),
  processPayment: (paymentData) => api.post('/payment/process', paymentData),
};

export default api;
