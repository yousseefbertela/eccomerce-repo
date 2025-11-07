import Payment from '../models/Payment.js';
import Order from '../models/Order.js';

/**
 * Create payment (currently cash on delivery)
 */
export const createPayment = async (req, res) => {
  try {
    const { orderId, amount, method } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const payment = await Payment.create({
      user: req.user.id,
      order: orderId,
      amount,
      method,
      status: method === 'cash_on_delivery' ? 'pending' : 'completed'
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get payment by ID
 */
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('order');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get payment by order ID
 */
export const getPaymentByOrder = async (req, res) => {
  try {
    const payment = await Payment.findOne({ order: req.params.orderId }).populate('order');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found for this order' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all payments (Admin only)
 */
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'name email')
      .populate('order')
      .sort('-createdAt');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update payment status (Admin only)
 */
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};