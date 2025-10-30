/**
 * Validation helper functions
 */

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

/**
 * Validate MongoDB ObjectId
 */
export const isValidObjectId = (id) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
};

/**
 * Sanitize string input
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str.trim().replace(/<[^>]*>/g, ''); // Remove HTML tags
};

/**
 * Validate price
 */
export const isValidPrice = (price) => {
  return !isNaN(price) && price >= 0;
};

/**
 * Validate stock quantity
 */
export const isValidStock = (stock) => {
  return Number.isInteger(Number(stock)) && stock >= 0;
};

/**
 * Validate rating
 */
export const isValidRating = (rating) => {
  return Number.isInteger(Number(rating)) && rating >= 1 && rating <= 5;
};

/**
 * Validate URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
