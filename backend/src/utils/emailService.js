import nodemailer from 'nodemailer';

/**
 * Generate a random 6-digit verification code
 */
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Get Gmail transporter (created on-demand to ensure env vars are loaded)
 */
const getTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

/**
 * Send email verification code
 */
export const sendVerificationEmail = async (toEmail, verificationCode, userName) => {
  try {
    // Format code with spaces for better display (e.g., "123 456")
    const formattedCode = verificationCode.slice(0, 3) + ' ' + verificationCode.slice(3);

    const mailOptions = {
      from: `"Angal System" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: 'Email Verification - Angal E-commerce',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Hello ${userName},</p>
          <p>Welcome to Angal E-commerce! Your verification code is:</p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; letter-spacing: 5px; font-size: 28px; font-weight: bold; color: #007bff;">
              ${formattedCode}
            </div>
          </div>
          <p>This code will expire in <strong>10 minutes</strong>.</p>
          <p style="color: #666; font-size: 14px;">
            If you didn't create this account, please ignore this email.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">Angal E-commerce System</p>
        </div>
      `,
    };

    const transporter = getTransporter();
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Verification email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending verification email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send password reset email with reset link
 */
export const sendPasswordResetEmail = async (toEmail, resetToken, userName) => {
  try {
    // Create reset link that user can click
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetLink = `${frontendURL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: `"Angal System" <${process.env.GMAIL_USER}>`,
      to: toEmail,
      subject: 'Password Reset Request - Angal E-commerce',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello ${userName},</p>
          <p>You requested a password reset for your Angal account. Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #007bff; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #007bff; font-size: 12px;">${resetLink}</p>
          <p style="color: #666; font-size: 14px;">
            This link will expire in <strong>1 hour</strong>. If you didn't request this, please ignore this email.
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">Angal E-commerce System</p>
        </div>
      `,
    };

    const transporter = getTransporter();
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};
