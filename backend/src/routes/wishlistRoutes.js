import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  checkWishlist,
  toggleWishlist
} from '../controller/wishlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All wishlist routes require authentication
router.use(protect);

router.get('/', getWishlist);
router.post('/toggle', toggleWishlist);
router.get('/check/:productId', checkWishlist);
router.post('/:productId', addToWishlist);
router.delete('/:productId', removeFromWishlist);
router.delete('/', clearWishlist);

export default router;
