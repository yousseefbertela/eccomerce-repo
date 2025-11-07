import express from 'express';
import { 
  register, 
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getProfile,
  resendVerificationEmail
} from '../controller/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail); // Changed from GET with :token to POST with body
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/resend-verification', resendVerificationEmail);

// Protected routes
router.use(protect); // All routes below require authentication
router.get('/profile', getProfile);

export default router;

