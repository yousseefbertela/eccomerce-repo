/**
 * Payment utility functions
 */

/**
 * Process cash on delivery payment
 * @param {Object} order - Order object
 * @returns {Object} Payment result
 */
export const processCashOnDelivery = async (order) => {
  try {
    // For COD, we don't process payment immediately
    // Payment will be marked as completed when order is delivered
    
    return {
      success: true,
      paymentMethod: 'cash_on_delivery',
      status: 'pending',
      message: 'Cash on delivery order created successfully',
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        totalAmount: order.totalPrice
      }
    };
  } catch (error) {
    throw new Error('Failed to process cash on delivery payment');
  }
};

/**
 * Calculate shipping price based on order total
 * @param {number} orderTotal - Total order amount
 * @param {string} city - Delivery city
 * @returns {number} Shipping price
 */
export const calculateShippingPrice = (orderTotal, city = '') => {
  // Free shipping for orders above 500 EGP
  if (orderTotal >= 500) {
    return 0;
  }

  // Standard shipping rates
  const shippingRates = {
    cairo: 30,
    giza: 30,
    alexandria: 50,
    default: 50
  };

  const normalizedCity = city.toLowerCase().trim();
  return shippingRates[normalizedCity] || shippingRates.default;
};

/**
 * Calculate tax (if applicable)
 * @param {number} amount - Amount to calculate tax on
 * @returns {number} Tax amount
 */
export const calculateTax = (amount) => {
  // No tax for now, but can be added later
  const TAX_RATE = 0; // 0% tax
  return Math.round(amount * TAX_RATE * 100) / 100;
};

/**
 * Validate payment amount
 * @param {number} amount - Payment amount
 * @returns {boolean} Is valid
 */
export const isValidPaymentAmount = (amount) => {
  return !isNaN(amount) && amount > 0 && amount <= 1000000; // Max 1M EGP
};

/**
 * Generate payment reference
 * @returns {string} Payment reference
 */
export const generatePaymentReference = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `PAY${timestamp}${random}`;
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount, currency = 'EGP') => {
  return `${currency} ${amount.toFixed(2)}`;
};
