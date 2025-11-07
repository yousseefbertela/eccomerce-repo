import express from 'express';
import {
  createReview,
  getProductReviews,
  getMyReviews,
  updateReview,
  deleteReview
} from '../controller/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/product/:productId', getProductReviews);

// Protected routes
router.use(protect);
router.post('/', createReview);
router.get('/my-reviews', getMyReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
