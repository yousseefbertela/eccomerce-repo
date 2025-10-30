import express from 'express';
import { getAllUsers, getPendingUsers, getUserById, updateUser, approveUser, deleteUser } from '../controller/userController.js';
import { protect, requireBoss } from '../middleware/auth.js';

const router = express.Router();

// All user routes require authentication and boss role
router.get('/', protect, requireBoss, getAllUsers);
router.get('/pending', protect, requireBoss, getPendingUsers);
router.get('/:id', protect, requireBoss, getUserById);
router.put('/:id', protect, requireBoss, updateUser);
router.patch('/:id/approve', protect, requireBoss, approveUser);
router.delete('/:id', protect, requireBoss, deleteUser);

export default router;