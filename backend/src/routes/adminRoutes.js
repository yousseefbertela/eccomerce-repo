import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getSalesAnalytics,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllReviews,
  deleteReview,
  getAllCarts,
  getAllWishlists
} from '../controller/adminController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminAuth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// Dashboard & Analytics
router.get('/dashboard/stats', getDashboardStats);
router.get('/analytics/sales', getSalesAnalytics);

// User Management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Order Management
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

// Product Management
router.get('/products', getAllProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Category Management
router.get('/categories', getAllCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Review Management
router.get('/reviews', getAllReviews);
router.delete('/reviews/:id', deleteReview);

// Cart & Wishlist Management
router.get('/carts', getAllCarts);
router.get('/wishlists', getAllWishlists);

export default router;
