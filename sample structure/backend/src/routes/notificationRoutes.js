import express from 'express';
import { listNotifications, markRead } from '../controller/notificationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, listNotifications);
router.post('/:id/read', protect, markRead);

export default router;
