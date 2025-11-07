import crypto from 'crypto';
import User from '../models/User.js';
import { generateToken } from '../utils/tokenService.js';
import { sendVerificationEmail, sendPasswordResetEmail, generateVerificationCode } from '../utils/emailService.js';

/**
 * Register new user
 * POST /api/auth/register
 */
export const register = async (req, res) => {
  try {
    console.log('📝 Register request received:', req.body);
    const { name, email, password } = req.body;

    // Check if user already exists and is verified
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser && existingUser.isEmailVerified) {
      return res.status(400).json({ message: 'Email already registered and verified. Please login or use forgot password.' });
    }

    // Generate 6-digit verification code
    const verificationCode = generateVerificationCode();

    let user;
    if (existingUser && !existingUser.isEmailVerified) {
      // User exists but not verified - update registration details and resend code
      console.log('🔄 User exists but not verified - updating registration details');
      user = await User.findByIdAndUpdate(
        existingUser._id,
        {
          name,
          password,
          emailVerificationCode: verificationCode,
          emailVerificationExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
        },
        { new: true }
      );
    } else {
      // Create new user (not verified yet)
      user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        isEmailVerified: false,
        emailVerificationCode: verificationCode,
        emailVerificationExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
      });
    }

    // Send verification email
    try {
      await sendVerificationEmail(user.email, verificationCode, user.name);
      console.log('✅ Verification email sent successfully');
    } catch (emailError) {
      console.error('❌ Failed to send verification email:', emailError);
      // Don't fail registration if email fails
    }

    const responseData = {
      message: 'Registration successful! Please check your email for the verification code.',
      requiresVerification: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
    };
    
    console.log('📤 Sending response:', responseData);
    res.status(201).json(responseData);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

/**
 * Verify email with code
 * POST /api/auth/verify-email
 */
export const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Email and verification code are required' });
    }

    // Find user with matching email and code
    const user = await User.findOne({
      email: email.toLowerCase(),
      emailVerificationCode: code,
      emailVerificationExpires: { $gt: Date.now() },
    }).select('+emailVerificationCode +emailVerificationExpires');

    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid or expired verification code' 
      });
    }

    // Verify user
    user.isEmailVerified = true;
    user.emailVerificationCode = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Generate token for automatic login
    const authToken = generateToken(user._id);

    res.json({
      message: 'Email verified successfully!',
      token: authToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({ 
        message: 'Please verify your email before logging in. Check your inbox for the verification link.',
        requiresVerification: true 
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

/**
 * Request password reset
 * POST /api/auth/forgot-password
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ 
        message: 'No account found with this email address' 
      });
    }

    // Generate random reset token (32 characters)
    const resetToken = crypto.randomBytes(16).toString('hex');

    // Save token and expiry (1 hour from now)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    // Send password reset email with token
    try {
      await sendPasswordResetEmail(user.email, resetToken, user.name);
      res.json({ 
        message: 'Password reset link sent. Please check your email.' 
      });
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      res.status(500).json({ 
        message: 'Failed to send reset email. Please try again later.' 
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Request failed', error: error.message });
  }
};

/**
 * Reset password with token
 * POST /api/auth/reset-password
 */
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ 
        message: 'Reset token and new password are required' 
      });
    }

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    }).select('+password +resetPasswordToken +resetPasswordExpires');

    if (!user) {
      return res.status(400).json({ 
        message: 'Invalid or expired reset link. Please request a new one.' 
      });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password has been reset successfully. You can now login.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Reset failed', error: error.message });
  }
};

/**
 * Get current user profile
 * GET /api/auth/profile
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        isEmailVerified: user.isEmailVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to get profile', error: error.message });
  }
};

/**
 * Resend verification email
 * POST /api/auth/resend-verification
 */
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    // Generate new 6-digit verification code
    const verificationCode = generateVerificationCode();

    user.emailVerificationCode = verificationCode;
    user.emailVerificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationCode, user.name);

    res.json({ message: 'Verification code sent. Please check your email.' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ message: 'Failed to resend email', error: error.message });
  }
};
