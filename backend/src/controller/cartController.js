import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

/**
 * Get user's cart
 */
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ email: req.user.email }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ email: req.user.email, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add item to cart
 */
export const addToCart = async (req, res) => {
  try {
    const { productId, productSlug, productName, quantity, size, color } = req.body;

    // Resolve product by id, slug, or name
    let product = null;
    let resolvedId = productId;
    if (resolvedId) {
      product = await Product.findById(resolvedId);
    }
    if (!product && productSlug) {
      product = await Product.findOne({ slug: productSlug });
      resolvedId = product?._id?.toString();
    }
    if (!product && productName) {
      product = await Product.findOne({ name: productName });
      resolvedId = product?._id?.toString();
    }
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ email: req.user.email });
    if (!cart) {
      cart = await Cart.create({ email: req.user.email, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === resolvedId && item.size === size && item.color === color
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: resolvedId,
        productName: product.name,
        productSlug: product.slug,
        quantity,
        size,
        color,
        price: product.price
      });
    }

    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update cart item quantity
 */
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ email: req.user.email });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({ email: req.user.email });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Clear cart
 */
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ email: req.user.email });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};