import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

/**
 * Get user's wishlist
 */
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ email: req.user.email });
    if (!wishlist) {
      wishlist = await Wishlist.create({ email: req.user.email, products: [] });
    }

    let productDocs = [];
    // Primary: assume names
    productDocs = await Product.find({ name: { $in: wishlist.products } });
    // Fallback: if nothing matched, try legacy ObjectIds (either actual ObjectIds or hex strings)
    if (!productDocs.length && wishlist.products.length) {
      const maybeIds = wishlist.products
        .filter(v => typeof v === 'string' && v.length === 24)
        .map(v => v);
      if (maybeIds.length) {
        const productsById = await Product.find({ _id: { $in: maybeIds } });
        if (productsById.length) {
          const names = productsById.map(p => p.name);
          wishlist.products = names;
          await wishlist.save();
          productDocs = productsById;
        }
      }
    }

    const result = { ...wishlist.toObject(), products: productDocs };
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add product to wishlist
 */
export const addToWishlist = async (req, res) => {
  try {
  const { productId: bodyProductId, productSlug, productName } = req.body;
  const paramProductId = req.params?.productId;
  const productId = bodyProductId || paramProductId;

    let wishlist = await Wishlist.findOne({ email: req.user.email });
    if (!wishlist) {
      wishlist = await Wishlist.create({ email: req.user.email, products: [] });
    }

    // Resolve product document
    let product = null;
  if (productId) product = await Product.findById(productId);
    if (!product && productSlug) product = await Product.findOne({ slug: productSlug });
    if (!product && productName) product = await Product.findOne({ name: productName });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const key = product.name;
    if (!wishlist.products.includes(key)) {
      wishlist.products.push(key);
      await wishlist.save();
    }

    const productDocs = await Product.find({ name: { $in: wishlist.products } });
    const result = { ...wishlist.toObject(), products: productDocs };
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Remove product from wishlist
 */
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ email: req.user.email });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    let nameToRemove = null;
    const byId = await Product.findById(productId);
    if (byId) nameToRemove = byId.name; else nameToRemove = productId;

    wishlist.products = wishlist.products.filter(n => n !== nameToRemove);
    await wishlist.save();
    const productDocs = await Product.find({ name: { $in: wishlist.products } });
    const result = { ...wishlist.toObject(), products: productDocs };
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Toggle product in wishlist (add if not there, remove if there)
 */
export const toggleWishlist = async (req, res) => {
  try {
    const { productId, productSlug, productName } = req.body;

    let wishlist = await Wishlist.findOne({ email: req.user.email });
    if (!wishlist) {
      wishlist = await Wishlist.create({ email: req.user.email, products: [] });
    }

    // Resolve product document
    let product = null;
    if (productId) product = await Product.findById(productId);
    if (!product && productSlug) product = await Product.findOne({ slug: productSlug });
    if (!product && productName) product = await Product.findOne({ name: productName });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const key = product.name;
    const index = wishlist.products.findIndex(n => n === key);
    if (index > -1) {
      wishlist.products.splice(index, 1);
    } else {
      wishlist.products.push(key);
    }

    await wishlist.save();
    const productDocs = await Product.find({ name: { $in: wishlist.products } });
    const result = { ...wishlist.toObject(), products: productDocs };
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Clear wishlist
 */
export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ email: req.user.email });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = [];
    await wishlist.save();
    const result = { ...wishlist.toObject(), products: [] };
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Check if product is in wishlist
 */
export const checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ email: req.user.email });
    if (!wishlist) {
      return res.json({ inWishlist: false });
    }

    let key = null;
    const byId = await Product.findById(productId);
    if (byId) key = byId.name; else key = productId;

    const inWishlist = wishlist.products.includes(key);
    res.json({ inWishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};