import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  serviceID: 'service_m3zs6le',
  templateID: 'template_2ljuvxt',  
  publicKey: 'UdnPsInpQZgPAuXKy'
};

/**
 * Send password reset email using EmailJS
 * @param {string} userEmail - Recipient email address
 * @param {string} userName - Recipient name
 * @param {string} resetToken - Password reset token
 * @returns {Promise<boolean>} - Success status
 */
export const sendPasswordResetEmail = async (userEmail, userName, resetToken) => {
  try {
    // Initialize EmailJS right before sending (not at module load)
    emailjs.init(EMAILJS_CONFIG.publicKey);
    
    console.log('📧 Sending password reset email via EmailJS...');
    console.log(`📧 To: ${userEmail}`);
    console.log(`📧 User: ${userName}`);
    
    const resetUrl = `${window.location.origin}/reset-password?token=${resetToken}`;
    
    // Simplified template parameters matching standard EmailJS format
    const templateParams = {
      to_name: userName,
      to_email: userEmail,
      message: `Hello ${userName},

We received a request to reset your password for your Angal Aziz System account.

Click this link to reset your password:
${resetUrl}

This link will expire in 30 minutes for your security.

If you didn't request this password reset, you can safely ignore this email.

Best regards,
The Angal Aziz System Team`,
      reset_link: resetUrl,
      user_name: userName
    };

    console.log('📧 Template parameters:', templateParams);

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      templateParams
    );

    console.log('✅ EmailJS Response:', response);
    return response.status === 200;
    
  } catch (error) {
    console.error('❌ EmailJS Error:', error);
    console.error('❌ Error Message:', error.message);
    console.error('❌ Error Text:', error.text);
    
    // Common EmailJS error codes
    if (error.status === 400) {
      console.error('❌ Bad Request - Check template ID and parameters');
    } else if (error.status === 401) {
      console.error('❌ Unauthorized - Check public key');
    } else if (error.status === 404) {
      console.error('❌ Not Found - Check service ID and template ID');
    }
    
    return false;
  }
};

/**
 * Test EmailJS with minimal parameters
 */
export const testEmailJS = async () => {
  try {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    
    const testParams = {
      to_name: 'Test User',
      to_email: 'youssefezzat764@gmail.com',
      message: 'This is a test message from Angal Aziz System.',
      reset_link: 'http://localhost:5173/test'
    };
    
    console.log('🧪 Testing EmailJS with params:', testParams);
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      testParams
    );
    
    console.log('✅ Test successful:', response);
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
};

export default {
  sendPasswordResetEmail,
  testEmailJS
};