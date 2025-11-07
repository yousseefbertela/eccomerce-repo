import Review from '../models/Review.js';
import Product from '../models/Product.js';

/**
 * Create review
 */
export const createReview = async (req, res) => {
  try {
    const { product, rating, comment, title } = req.body;

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ email: req.user.email, product });
    if (existingReview) {
      return res.status(400).json({ message: 'You already reviewed this product' });
    }

    const review = await Review.create({
      email: req.user.email,
      userName: req.user.name,
      product,
      rating,
      comment,
      title
    });

    // Update product rating and reviewCount
    const allReviews = await Review.find({ product });
    const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
    
    await Product.findByIdAndUpdate(
      product,
      { 
        rating: parseFloat(avgRating),
        reviewCount: allReviews.length 
      }
    );

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get reviews for a product
 */
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get user's own reviews
 */
export const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ email: req.user.email })
      .populate('product', 'name images')
      .sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update review
 */
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.email !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    review.title = req.body.title || review.title;
    await review.save();

    // Update product rating
    const allReviews = await Review.find({ product: review.product });
    const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
    
    await Product.findByIdAndUpdate(
      review.product,
      { rating: parseFloat(avgRating) }
    );

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete review
 */
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.email !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const productId = review.product;
    await review.deleteOne();

    // Update product rating after deletion
    const allReviews = await Review.find({ product: productId });
    if (allReviews.length > 0) {
      const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
      await Product.findByIdAndUpdate(
        productId,
        { 
          rating: parseFloat(avgRating),
          reviewCount: allReviews.length 
        }
      );
    } else {
      // No reviews left, reset rating
      await Product.findByIdAndUpdate(
        productId,
        { 
          rating: 0,
          reviewCount: 0 
        }
      );
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};