import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

/**
 * Create new order
 */
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;

    // Validate items exist
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Normalize items and check stock availability
    const normalizedItems = [];
    for (const item of items) {
      const productId = typeof item.product === 'object' ? item.product._id : item.product;
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      // Decrement stock
      product.stock -= item.quantity;
      await product.save();

      normalizedItems.push({
        product: productId,
        name: product.name,
        quantity: item.quantity,
        price: item.price ?? product.price,
        image: Array.isArray(product.images) ? (product.images[0] || '') : '',
        // Keep variant info if present (not enforced by schema yet)
        size: item.size || null,
        color: item.color || null,
      });
    }

    // Create order
    const order = await Order.create({
      email: req.user.email,
      items: normalizedItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      orderStatus: 'pending',
      paymentStatus: 'pending'
    });

    // Clear cart after order
    await Cart.findOneAndUpdate(
      { email: req.user.email },
      { items: [], totalPrice: 0, totalItems: 0 }
    );

    await order.populate('items.product');
    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get user's orders
 */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ email: req.user.email }).populate('items.product').sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if user owns this order or is admin
    if (order.email !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all orders (Admin only)
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product').sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update order status (Admin only)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // expected one of ['pending','processing','shipped','delivered','cancelled']

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.orderStatus = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Cancel order
 */
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns this order or is admin
    if (order.email !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Can only cancel if order is pending or processing
    if (order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') {
      return res.status(400).json({ 
        message: `Cannot cancel order with status: ${order.orderStatus}` 
      });
    }

    order.orderStatus = 'cancelled';
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};