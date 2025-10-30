import express from 'express';
import { 
  createFile, 
  listFiles, 
  getFile, 
  updateFile,
  deleteFile,
  grantPermissions,
  getFileAuditLog,
  getUserAuditLog,
  getAllAuditLogs,
  getMyFiles,
  getPendingApprovals,
  approveFile,
  updateFileShares
} from '../controller/fileController.js';
import { protect, requireBoss } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createFile);
router.get('/', protect, listFiles);
router.get('/my-files', protect, getMyFiles);
router.get('/pending-approvals', protect, requireBoss, getPendingApprovals);
router.get('/:id', protect, getFile);
router.put('/:id', protect, updateFile);
router.patch('/:id', protect, updateFile);
router.delete('/:id', protect, deleteFile);
router.patch('/:id/approve', protect, requireBoss, approveFile);
router.patch('/:id/shares', protect, updateFileShares);
router.post('/grant/:userId', protect, requireBoss, grantPermissions);

// Audit log routes (boss only)
router.get('/audit/all', protect, requireBoss, getAllAuditLogs);
router.get('/audit/file/:fileId', protect, requireBoss, getFileAuditLog);
router.get('/audit/user/:userId', protect, requireBoss, getUserAuditLog);

export default router;
