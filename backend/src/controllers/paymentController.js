import Payment from '../models/Payment.js';
import Order from '../models/Order.js';

/**
 * @desc    Get payment by order ID
 * @route   GET /api/payments/order/:orderId
 * @access  Private
 */
export const getPaymentByOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const payment = await Payment.findOne({ order: orderId })
      .populate('order', 'orderNumber totalPrice orderStatus')
      .populate('user', 'name email');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check authorization
    if (payment.user._id.toString() !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this payment'
      });
    }

    res.status(200).json({
      success: true,
      data: { payment }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all payments (admin)
 * @route   GET /api/payments
 * @access  Private/Admin
 */
export const getAllPayments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const payments = await Payment.find(filter)
      .populate('order', 'orderNumber totalPrice')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Payment.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: payments.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: { payments }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update payment status (admin)
 * @route   PUT /api/payments/:id/status
 * @access  Private/Admin
 */
export const updatePaymentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, transactionId, notes } = req.body;

    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    payment.status = status;
    if (transactionId) payment.transactionId = transactionId;
    if (notes) payment.notes = notes;

    if (status === 'completed') {
      payment.paidAt = new Date();

      // Update order payment status
      await Order.findByIdAndUpdate(payment.order, {
        isPaid: true,
        paidAt: new Date(),
        paymentStatus: 'paid'
      });
    }

    await payment.save();

    res.status(200).json({
      success: true,
      message: 'Payment status updated',
      data: { payment }
    });
  } catch (error) {
    next(error);
  }
};
