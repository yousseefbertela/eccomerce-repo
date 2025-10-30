import express from 'express';
import { 
  register, 
  login, 
  logout, 
  getMe, 
  updatePassword 
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.use(protect); // All routes below require authentication
router.get('/me', getMe);
router.post('/logout', logout);
router.put('/update-password', updatePassword);

export default router;
