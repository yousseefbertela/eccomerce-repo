import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { generateToken } from '../utils/generateToken.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const BOSS_EMAIL = 'ahmedfathy12309@gmail.com';
const BOSS_PASSWORD = 'ahmedfathy12345678';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, department, position } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already registered' });
  
  const isBoss = email === BOSS_EMAIL;
  const user = await User.create({ 
    name, 
    email, 
    password, 
    department, 
    position,
    role: isBoss ? 'boss' : 'staff', 
    approved: isBoss // Only boss is auto-approved
  });
  
  if (!isBoss) {
    // For staff, send notification to boss and return success message (NO TOKEN)
    const boss = await User.findOne({ email: BOSS_EMAIL });
    if (boss) {
      await Notification.create({ 
        type: 'NEW_USER', 
        message: `New user registered: ${name} (${email}) from ${department}`, 
        to: boss._id, 
        data: { userId: user._id } 
      });
    }
    
    // Return success message without token - user cannot login yet
    res.status(201).json({ 
      message: 'Registration successful! Please wait for boss approval before you can login.',
      requiresApproval: true,
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        department: user.department,
        position: user.position,
        approved: user.approved 
      } 
    });
  } else {
    // For boss, auto-login with token
    const token = generateToken(user);
    res.status(201).json({ 
      token, 
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        department: user.department,
        position: user.position,
        approved: user.approved,
        isActive: user.isActive,
        canCreateFiles: user.canCreateFiles
      } 
    });
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const match = await user.comparePassword(password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });
  if (user.role !== 'boss' && !user.approved) return res.status(403).json({ message: 'Account not yet approved' });
  
  const token = generateToken(user);
  res.json({ 
    token, 
    user: { 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      role: user.role,
      department: user.department,
      position: user.position,
      approved: user.approved,
      isActive: user.isActive,
      canCreateFiles: user.canCreateFiles
    } 
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ 
    user: {
      _id: user._id,
      name: user.name, 
      email: user.email,
      role: user.role,
      department: user.department,
      position: user.position,
      approved: user.approved,
      isActive: user.isActive,
      canCreateFiles: user.canCreateFiles
    }
  });
});

export const approveUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.approved = true;
  await user.save();
  await Notification.create({ type: 'PERMISSION_GRANTED', message: 'Your account has been approved', to: user._id, data: { userId: user._id } });
  res.json({ message: 'User approved' });
});

export const listPendingUsers = asyncHandler(async (_req, res) => {
  const users = await User.find({ approved: false, role: 'staff' }).select('-password');
  res.json(users);
});

// Request password reset token
export const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res.status(404).json({ message: 'No account found with this email address' });
  }
  
  // Generate reset token (simple random string)
  const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Save token and expiry (1 hour from now)
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();
  
  res.json({ 
    resetToken,
    userName: user.name,
    message: 'Password reset token generated' 
  });
});

// Reset password with token
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  
  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }
  
  // Find user with valid token
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  
  if (!user) {
    return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
  }
  
  // Update password
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  
  res.json({ message: 'Password has been reset successfully' });
});
