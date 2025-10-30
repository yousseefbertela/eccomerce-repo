import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getSalesAnalytics
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly, superAdminOnly } from '../middleware/adminAuth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

router.get('/dashboard/stats', getDashboardStats);
router.get('/analytics/sales', getSalesAnalytics);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', superAdminOnly, deleteUser);

export default router;
