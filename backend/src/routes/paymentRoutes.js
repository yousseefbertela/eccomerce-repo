import express from 'express';
import {
  getPaymentByOrder,
  getAllPayments,
  updatePaymentStatus
} from '../controller/paymentController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/adminAuth.js';

const router = express.Router();

// Protected routes
router.use(protect);

router.get('/order/:orderId', getPaymentByOrder);

// Admin routes
router.get('/', adminOnly, getAllPayments);
router.put('/:id/status', adminOnly, updatePaymentStatus);

export default router;
