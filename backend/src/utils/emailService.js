import emailjs from '@emailjs/nodejs';
import emailConfig from '../config/email.js';

/**
 * Send email using EmailJS
 * @param {Object} params - Email parameters
 * @param {string} params.to_email - Recipient email
 * @param {string} params.to_name - Recipient name
 * @param {string} params.subject - Email subject
 * @param {string} params.message - Email message
 * @param {Object} additionalParams - Additional template parameters
 */
export const sendEmail = async ({ to_email, to_name, subject, message, ...additionalParams }) => {
  try {
    const templateParams = {
      to_email,
      to_name,
      subject,
      message,
      ...additionalParams
    };

    const response = await emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      templateParams,
      {
        publicKey: emailConfig.publicKey,
        privateKey: emailConfig.privateKey,
      }
    );

    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
};

/**
 * Send welcome email to new user
 */
export const sendWelcomeEmail = async (user) => {
  return sendEmail({
    to_email: user.email,
    to_name: user.name,
    subject: 'Welcome to Angal E-commerce!',
    message: `Hi ${user.name}, welcome to Angal! We're excited to have you with us.`
  });
};

/**
 * Send order confirmation email
 */
export const sendOrderConfirmationEmail = async (user, order) => {
  return sendEmail({
    to_email: user.email,
    to_name: user.name,
    subject: `Order Confirmation - ${order.orderNumber}`,
    message: `Your order ${order.orderNumber} has been confirmed. Total: EGP ${order.totalPrice}`,
    order_number: order.orderNumber,
    order_total: order.totalPrice
  });
};

/**
 * Send order status update email
 */
export const sendOrderStatusEmail = async (user, order) => {
  const statusMessages = {
    processing: 'is being processed',
    shipped: 'has been shipped',
    delivered: 'has been delivered',
    cancelled: 'has been cancelled'
  };

  return sendEmail({
    to_email: user.email,
    to_name: user.name,
    subject: `Order ${order.orderNumber} Status Update`,
    message: `Your order ${order.orderNumber} ${statusMessages[order.orderStatus] || 'status has been updated'}.`,
    order_number: order.orderNumber,
    order_status: order.orderStatus
  });
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  
  return sendEmail({
    to_email: user.email,
    to_name: user.name,
    subject: 'Password Reset Request',
    message: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    reset_url: resetUrl
  });
};
