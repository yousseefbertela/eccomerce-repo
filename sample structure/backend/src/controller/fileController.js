import File from '../models/File.js';
import User from '../models/User.js';
import FileAudit from '../models/FileAudit.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// Helper function to check if user has permission for a file
function hasPermission(user, file, action) {
  // Boss has all permissions
  if (user.role === 'boss') return true;
  
  // Owner has all permissions
  if (file.createdBy && file.createdBy.toString() === user._id.toString()) {
    return true;
  }
  
  // Check user's permission array (handle case where permissions might not exist)
  if (!user.permissions || !Array.isArray(user.permissions)) {
    return false;
  }
  
  const permission = user.permissions.find(
    p => p.fileId.toString() === file._id.toString()
  );
  
  if (!permission) return false;
  
  // Check specific action
  if (action === 'view') return permission.canView;
  if (action === 'edit') return permission.canEdit;
  if (action === 'delete') return permission.canEdit; // Edit permission allows delete
  
  return false;
}

// Helper function to get files user can access
async function getUserAccessibleFileIds(user) {
  if (user.role === 'boss') {
    // Boss can see all files
    return null; // null means no filter needed
  }
  
  // Get file IDs from user's permissions (handle case where permissions might not exist)
  if (!user.permissions || !Array.isArray(user.permissions)) {
    return [];
  }
  
  const permissionFileIds = user.permissions
    .filter(p => p.canView)
    .map(p => p.fileId);
  
  return permissionFileIds;
}

export const createFile = asyncHandler(async (req, res) => {
  const { title, description, content, category, visibility, requiresApproval } = req.body;
  
  // Check if staff user has permission to create files
  if (req.user.role === 'staff' && !req.user.canCreateFiles) {
    return res.status(403).json({ 
      message: 'You do not have permission to create files. Please contact your administrator.' 
    });
  }
  
  // Determine status based on role and requiresApproval setting
  let status = 'draft';
  if (req.user.role === 'boss') {
    // Boss files don't need approval
    status = 'approved';
  } else if (requiresApproval) {
    // Staff file requiring approval
    status = 'pending';
  } else {
    // Staff file not requiring approval (if boss allows)
    status = 'approved';
  }

  const file = await File.create({ 
    title,
    description,
    content: content || '',
    category: category || 'document',
    visibility: visibility || 'private',
    requiresApproval: requiresApproval !== false, // default to true
    status,
    createdBy: req.user._id,
    lastUpdatedBy: req.user._id,
    isActive: true
  });
  
  // Log the creation
  await FileAudit.create({
    fileId: file._id,
    userId: req.user._id,
    action: 'CREATE',
    changes: { 
      title: title,
      description: description,
      content: content || '',
      category: category || 'document',
      visibility: visibility || 'private'
    }
  });

  // Populate the created file with user details
  const populatedFile = await File.findById(file._id).populate('createdBy', 'name email');
  
  res.status(201).json({ 
    success: true,
    message: status === 'pending' ? 'File created and sent for approval' : 'File created successfully',
    file: populatedFile
  });
});

export const listFiles = asyncHandler(async (req, res) => {
  let query = { isActive: true };
  
  if (req.user.role === 'boss') {
    // Boss can see all active files
    query = { isActive: true };
  } else {
    // Staff can see:
    // 1. Files they created
    // 2. Files they have explicit permission to view (from user.permissions array)
    
    const accessibleFileIds = await getUserAccessibleFileIds(req.user);
    
    query = {
      isActive: true,
      $or: [
        { createdBy: req.user._id }, // Files they created
        { _id: { $in: accessibleFileIds } } // Files they have permission to view
      ]
    };
  }
  
  const files = await File.find(query)
    .populate('createdBy', 'name email department')
    .populate('lastUpdatedBy', 'name email')
    .populate('approvedBy', 'name email')
    .sort({ updatedAt: -1 });
    
  res.json(files);
});

export const getFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id)
    .populate('createdBy', 'name email department')
    .populate('lastUpdatedBy', 'name email')
    .populate('approvedBy', 'name email');
    
  if (!file || !file.isActive) {
    return res.status(404).json({ message: 'File not found' });
  }
  
  // Check if user has permission to view
  if (!hasPermission(req.user, file, 'view')) {
    return res.status(403).json({ message: 'No permission to view this file' });
  }
  
  // Build accessList from user permissions
  const usersWithAccess = await User.find({
    'permissions.fileId': file._id
  }).select('_id name email permissions');
  
  const accessList = usersWithAccess.map(user => {
    const perm = (user.permissions || []).find(p => p.fileId.toString() === file._id.toString());
    return {
      user: { _id: user._id, name: user.name, email: user.email },
      accessLevel: perm?.canEdit ? 'edit' : 'view'
    };
  });
  
  res.json({
    ...file.toObject(),
    accessList
  });
});

export const updateFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ message: 'File not found' });
  if (!hasPermission(req.user, file, 'edit')) return res.status(403).json({ message: 'No edit permission' });
  
  const { title, content, description } = req.body;
  const oldTitle = file.title;
  const oldContent = file.content;
  const oldDescription = file.description;
  
  if (title) file.title = title;
  if (content !== undefined) file.content = content;
  if (description !== undefined) file.description = description;
  file.lastUpdatedBy = req.user._id;
  await file.save();
  
  // Log the edit
  await FileAudit.create({
    fileId: file._id,
    userId: req.user._id,
    action: 'UPDATE',
    changes: {
      oldTitle: title ? oldTitle : undefined,
      newTitle: title || undefined,
      oldContent: content !== undefined ? oldContent : undefined,
      newContent: content !== undefined ? content : undefined,
      oldDescription: description !== undefined ? oldDescription : undefined,
      newDescription: description !== undefined ? description : undefined
    }
  });
  
  res.json({ message: 'File updated', file });
});

export const grantPermissions = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { fileId, canView, canEdit, canCreate } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const existing = user.permissions.find(p => p.fileId.toString() === fileId);
  if (existing) {
    existing.canView = canView;
    existing.canEdit = canEdit;
    existing.canCreate = canCreate;
  } else {
    user.permissions.push({ fileId, canView, canEdit, canCreate });
  }
  await user.save();
  res.json({ message: 'Permissions updated' });
});

// Get files pending approval (for boss)
export const getPendingApprovals = asyncHandler(async (req, res) => {
  if (req.user.role !== 'boss') {
    return res.status(403).json({ message: 'Only boss can view pending approvals' });
  }
  
  const pendingFiles = await File.find({ 
    status: 'pending',
    isActive: true 
  })
    .populate('createdBy', 'name email department')
    .sort({ createdAt: -1 });
    
  res.json(pendingFiles);
});

// Get user's own files
export const getMyFiles = asyncHandler(async (req, res) => {
  const myFiles = await File.find({ 
    createdBy: req.user._id,
    isActive: true 
  })
    .populate('createdBy', 'name email')
    .populate('approvedBy', 'name email')
    .sort({ updatedAt: -1 });
    
  res.json(myFiles);
});

// Approve/reject file (boss only)
export const approveFile = asyncHandler(async (req, res) => {
  if (req.user.role !== 'boss') {
    return res.status(403).json({ message: 'Only boss can approve files' });
  }
  
  const { status } = req.body; // 'approved' or 'rejected'
  const file = await File.findById(req.params.id);
  
  if (!file) {
    return res.status(404).json({ message: 'File not found' });
  }
  
  file.status = status;
  file.approvedBy = req.user._id;
  file.approvedAt = new Date();
  
  await file.save();
  
  // Log the approval/rejection
  await FileAudit.create({
    fileId: file._id,
    userId: req.user._id,
    action: status === 'approved' ? 'APPROVE' : 'REJECT',
    changes: { status: status }
  });
  
  const populatedFile = await File.findById(file._id)
    .populate('createdBy', 'name email')
    .populate('approvedBy', 'name email');
    
  res.json({ 
    success: true,
    message: `File ${status} successfully`,
    file: populatedFile
  });
});

// Audit log endpoints for boss
export const getFileAuditLog = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  const audit = await FileAudit.find({ fileId })
    .populate('userId', 'name email')
    .sort({ timestamp: -1 })
    .limit(50);
  res.json(audit);
});

export const getUserAuditLog = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const audit = await FileAudit.find({ userId })
    .populate('fileId', 'title')
    .sort({ timestamp: -1 })
    .limit(50);
  res.json(audit);
});

export const getAllAuditLogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  const audit = await FileAudit.find()
    .populate('userId', 'name email')
    .populate('fileId', 'title')
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await FileAudit.countDocuments();
  
  res.json({
    audit,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const deleteFile = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  
  if (!file || !file.isActive) {
    return res.status(404).json({ message: 'File not found' });
  }
  
  // Check if user has permission to delete using new permission system
  if (!hasPermission(req.user, file, 'delete')) {
    return res.status(403).json({ message: 'No permission to delete this file' });
  }
  
  // Soft delete - set isActive to false instead of actually deleting
  file.isActive = false;
  await file.save();
  
  // Log the deletion
  await FileAudit.create({
    fileId: file._id,
    userId: req.user._id,
    action: 'DELETE',
    changes: { 
      title: file.title,
      deletedBy: req.user.name
    }
  });
  
  res.json({ 
    success: true,
    message: 'File deleted successfully' 
  });
});

// Update file share permissions
export const updateFileShares = asyncHandler(async (req, res) => {
  const file = await File.findById(req.params.id);
  
  if (!file || !file.isActive) {
    return res.status(404).json({ message: 'File not found' });
  }
  
  // Only boss or file creator can update shares
  if (req.user.role !== 'boss' && file.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'No permission to update file shares' });
  }
  
  const { shares } = req.body; // shares = [{ userId, accessLevel: 'view'|'edit' }]
  
  if (!shares || !Array.isArray(shares)) {
    return res.status(400).json({ message: 'Shares must be an array' });
  }
  
  // Update permissions for each user
  for (const share of shares) {
    const user = await User.findById(share.userId);
    if (!user) continue;
    
    // Remove existing permission for this file
    user.permissions = user.permissions.filter(
      p => p.fileId.toString() !== file._id.toString()
    );
    
    // Add new permission
    user.permissions.push({
      fileId: file._id,
      canView: true,
      canEdit: share.accessLevel === 'edit'
    });
    
    await user.save();
  }
  
  // Log the share update
  await FileAudit.create({
    fileId: file._id,
    userId: req.user._id,
    action: 'UPDATE_SHARES',
    changes: { 
      shares: shares.map(s => ({ userId: s.userId, accessLevel: s.accessLevel }))
    }
  });
  
  // Return updated file with access list
  const updatedFile = await File.findById(file._id)
    .populate('createdBy', 'name email');
  
  // Build accessList from user permissions
  const usersWithAccess = await User.find({
    'permissions.fileId': file._id
  }).select('_id name email permissions');
  
  const accessList = usersWithAccess.map(user => {
    const perm = (user.permissions || []).find(p => p.fileId.toString() === file._id.toString());
    return {
      user: { _id: user._id, name: user.name, email: user.email },
      accessLevel: perm?.canEdit ? 'edit' : 'view'
    };
  });
  
  res.json({ 
    success: true,
    message: 'File shares updated successfully',
    file: {
      ...updatedFile.toObject(),
      accessList
    }
  });
});