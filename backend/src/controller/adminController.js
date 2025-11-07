import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';
import Cart from '../models/Cart.js';
import Wishlist from '../models/Wishlist.js';

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalReviews = await Review.countDocuments();
    
    const totalRevenue = await Order.aggregate([
      { $match: { orderStatus: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    const processingOrders = await Order.countDocuments({ orderStatus: 'processing' });

    // Recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('_id email totalPrice orderStatus createdAt items');

    res.json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalCategories,
      totalReviews,
      totalRevenue: totalRevenue[0]?.total || 0,
      pendingOrders,
      processingOrders,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all users
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update user
 */
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete user
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get sales analytics
 */
export const getSalesAnalytics = async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalSales: { $sum: '$totalPrice' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 30 }
    ]);

    res.json(salesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============= ORDER MANAGEMENT =============

/**
 * Get all orders with filters
 */
export const getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { orderStatus: status } : {};
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Order.countDocuments(query);
    
    res.json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.orderStatus = status;
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      note: `Status updated by admin`
    });
    
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete order
 */
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============= PRODUCT MANAGEMENT =============

/**
 * Get all products (admin view)
 */
export const getAllProducts = async (req, res) => {
  try {
    const { category, inStock, page = 1, limit = 50 } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (inStock !== undefined) query.stock = inStock === 'true' ? { $gt: 0 } : 0;
    
    const products = await Product.find(query)
      .populate('category')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Product.countDocuments(query);
    
    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create new product
 */
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    // Update category product count
    if (product.category) {
      await Category.findByIdAndUpdate(
        product.category,
        { $inc: { productCount: 1 } }
      );
    }
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update product
 */
export const updateProduct = async (req, res) => {
  try {
    const oldProduct = await Product.findById(req.params.id);
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update category counts if category changed
    if (oldProduct.category.toString() !== product.category.toString()) {
      await Category.findByIdAndUpdate(oldProduct.category, { $inc: { productCount: -1 } });
      await Category.findByIdAndUpdate(product.category, { $inc: { productCount: 1 } });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete product
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update category product count
    if (product.category) {
      await Category.findByIdAndUpdate(
        product.category,
        { $inc: { productCount: -1 } }
      );
    }
    
    // Delete associated reviews
    await Review.deleteMany({ product: req.params.id });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============= CATEGORY MANAGEMENT =============

/**
 * Get all categories
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create category
 */
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update category
 */
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete category
 */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    // Note: You may want to handle products in this category
    // Either delete them or reassign to another category
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============= REVIEW MANAGEMENT =============

/**
 * Get all reviews
 */
export const getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const reviews = await Review.find()
      .populate('product', 'name slug')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const count = await Review.countDocuments();
    
    res.json({
      reviews,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete review
 */
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============= USER/CART/WISHLIST MANAGEMENT =============

/**
 * Get all carts
 */
export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find()
      .populate('items.product', 'name slug price')
      .sort({ updatedAt: -1 })
      .limit(50);
    
    res.json({ carts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all wishlists
 */
export const getAllWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find()
      .sort({ updatedAt: -1 })
      .limit(50);
    
    res.json({ wishlists });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};