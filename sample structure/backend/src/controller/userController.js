import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
});

export const getPendingUsers = asyncHandler(async (req, res) => {
  const pendingUsers = await User.find({ 
    approved: false,
    role: 'staff' 
  }).select('-password').sort({ createdAt: -1 });
  res.json(pendingUsers);
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, role, approved, isActive, department, position } = req.body;
  
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Update fields if provided
  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;
  if (approved !== undefined) user.isApproved = approved;
  if (isActive !== undefined) user.isActive = isActive;
  if (department) user.department = department;
  if (position) user.position = position;
  
  await user.save();
  
  // Return user without password
  const updatedUser = await User.findById(user._id).select('-password');
  res.json({ message: 'User updated successfully', user: updatedUser });
});

export const approveUser = asyncHandler(async (req, res) => {
  const { approved, canCreateFiles, assignments } = req.body;
  
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  user.approved = approved;
  
  // If approving, set permissions
  if (approved) {
    // Set canCreateFiles permission if provided
    if (canCreateFiles !== undefined) {
      user.canCreateFiles = canCreateFiles;
    }
    
    // Clear existing permissions and add new ones
    user.permissions = [];
    
    // Add file permissions based on assignments
    if (assignments && assignments.length > 0) {
      for (const assignment of assignments) {
        user.permissions.push({
          fileId: assignment.fileId,
          canView: true, // Always give view permission
          canEdit: assignment.accessLevel === 'edit', // Edit only if specified
        });
      }
    }
  }
  
  await user.save();
  
  // Return user without password
  const updatedUser = await User.findById(user._id).select('-password');
  res.json({ 
    success: true,
    message: approved ? 'User approved successfully' : 'User rejected',
    user: updatedUser 
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Don't allow deleting the boss
  if (user.role === 'boss') {
    return res.status(403).json({ message: 'Cannot delete boss user' });
  }
  
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted successfully' });
});