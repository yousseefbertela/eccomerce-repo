import express from 'express';
import { register, login, approveUser, listPendingUsers, getMe, forgotPasswordToken, resetPassword } from '../controller/authController.js';
import { protect, requireBoss } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/pending', protect, requireBoss, listPendingUsers);
router.post('/approve/:userId', protect, requireBoss, approveUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.post('/reset-password', resetPassword);

export default router;
