/**
 * Request validation middleware
 */

/**
 * Validate required fields
 */
export const validateRequiredFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    next();
  };
};

/**
 * Validate email format
 */
export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
  }

  next();
};

/**
 * Validate password strength
 */
export const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password) {
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }
  }

  next();
};

/**
 * Validate phone number
 */
export const validatePhone = (req, res, next) => {
  const { phone } = req.body;

  if (phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number format'
      });
    }
  }

  next();
};

/**
 * Validate MongoDB ObjectId
 */
export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!objectIdRegex.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format'
      });
    }

    next();
  };
};

/**
 * Validate product data
 */
export const validateProduct = (req, res, next) => {
  const { name, description, price, stock, category } = req.body;

  const errors = [];

  if (name && name.length > 200) {
    errors.push('Product name cannot exceed 200 characters');
  }

  if (description && description.length > 2000) {
    errors.push('Description cannot exceed 2000 characters');
  }

  if (price !== undefined && (price < 0 || isNaN(price))) {
    errors.push('Price must be a positive number');
  }

  if (stock !== undefined && (stock < 0 || !Number.isInteger(Number(stock)))) {
    errors.push('Stock must be a non-negative integer');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

/**
 * Validate review data
 */
export const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;

  const errors = [];

  if (rating !== undefined && (rating < 1 || rating > 5 || !Number.isInteger(Number(rating)))) {
    errors.push('Rating must be an integer between 1 and 5');
  }

  if (comment && comment.length > 1000) {
    errors.push('Comment cannot exceed 1000 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};
