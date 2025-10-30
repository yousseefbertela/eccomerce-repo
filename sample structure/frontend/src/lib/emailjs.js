import emailjs from '@emailjs/browser';

// EmailJS Configuration - Use environment variables
const EMAILJS_CONFIG = {
  serviceID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_m3zs6le',
  templateID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_2ljuvxt',  
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'UdnPsInpQZgPAuXKy'
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
    
    // Try multiple recipient field variations to ensure EmailJS finds the email
    const templateParams = {
      // Standard EmailJS recipient fields
      to_email: userEmail,
      to_name: userEmail, 
      user_email: userEmail,
      
      // Your template variables
      name: userEmail,  // The name is the email
      message: "It seems you have forgot your password. Press on this link to reset it.",
      link: resetUrl,  // The password reset link
      
      // Additional fallbacks
      email: userEmail,
      recipient: userEmail
    };

    console.log('📧 Template parameters:', templateParams);
    console.log('📧 Reset URL:', resetUrl);

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
 * Test EmailJS configuration
 * @returns {Promise<boolean>} - Configuration validity
 */
export const testEmailJSConfig = async () => {
  try {
    console.log('🧪 Testing EmailJS configuration...');
    
    // Check if all required config values are set
    if (!EMAILJS_CONFIG.serviceID || EMAILJS_CONFIG.serviceID === 'YOUR_SERVICE_ID') {
      console.error('❌ Service ID not configured');
      return false;
    }
    
    if (!EMAILJS_CONFIG.templateID || EMAILJS_CONFIG.templateID === 'YOUR_TEMPLATE_ID') {
      console.error('❌ Template ID not configured');
      return false;
    }
    
    if (!EMAILJS_CONFIG.publicKey || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
      console.error('❌ Public Key not configured');
      return false;
    }
    
    console.log('✅ EmailJS configuration appears valid');
    console.log('📧 Service ID:', EMAILJS_CONFIG.serviceID);
    console.log('📧 Template ID:', EMAILJS_CONFIG.templateID);
    console.log('📧 Public Key:', EMAILJS_CONFIG.publicKey.substring(0, 8) + '...');
    
    return true;
  } catch (error) {
    console.error('❌ EmailJS configuration test failed:', error);
    return false;
  }
};

export default {
  sendPasswordResetEmail,
  testEmailJSConfig
};