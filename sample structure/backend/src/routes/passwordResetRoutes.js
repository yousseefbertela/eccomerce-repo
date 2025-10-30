import express from 'express';
import { requestPasswordReset, resetPassword } from '../controller/passwordResetController.js';

const router = express.Router();

router.post('/request', requestPasswordReset);
router.post('/reset', resetPassword);

export default router;