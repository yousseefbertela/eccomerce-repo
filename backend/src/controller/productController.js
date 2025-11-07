import Product from '../models/Product.js';
import Category from '../models/Category.js';

/**
 * Get all products with filters
 */
export const getProducts = async (req, res) => {
  try {
    const { category, categorySlug, search, minPrice, maxPrice, sort } = req.query;
    const query = {};

    // Support filtering by category id or category slug
    if (category) query.category = category;
    if (categorySlug) {
      const cat = await Category.findOne({ slug: categorySlug });
      if (cat) query.category = cat._id;
    }
    if (search) query.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = {};
    if (sort === 'price-asc') sortOption.price = 1;
    else if (sort === 'price-desc') sortOption.price = -1;
    else if (sort === 'newest') sortOption.createdAt = -1;
    else sortOption.createdAt = -1;

    const products = await Product.find(query).sort(sortOption).populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get product by ID
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get product by slug
 */
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get products by category slug
 */
export const getProductsByCategorySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    const products = await Product.find({ category: category._id }).sort('-createdAt').populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create new product (Admin only)
 */
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update product (Admin only)
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete product (Admin only)
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8).populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get related products
 */
export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(4).populate('category');
    
    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};