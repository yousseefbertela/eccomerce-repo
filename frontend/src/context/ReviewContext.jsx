import { createContext, useContext, useState } from 'react';
import { reviewsAPI } from '../lib/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  // Create a new review
  const createReview = async (productId, rating, comment, title = '') => {
    if (!isAuthenticated) {
      toast.error('Please login to write a review');
      return null;
    }

    if (!rating || !comment) {
      toast.error('Please provide a rating and comment');
      return null;
    }

    try {
      setLoading(true);
      const response = await reviewsAPI.create({
        product: productId,
        rating,
        comment,
        title,
      });
      toast.success('Review posted successfully');
      return response.data;
    } catch (error) {
      console.error('Failed to create review:', error);
      toast.error(error.response?.data?.message || 'Failed to post review');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get product reviews
  const getProductReviews = async (productId) => {
    try {
      setLoading(true);
      const response = await reviewsAPI.getByProduct(productId);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Update a review
  const updateReview = async (reviewId, rating, comment, title = '') => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return null;
    }

    try {
      setLoading(true);
      const response = await reviewsAPI.update(reviewId, {
        rating,
        comment,
        title,
      });
      toast.success('Review updated successfully');
      return response.data;
    } catch (error) {
      console.error('Failed to update review:', error);
      toast.error('Failed to update review');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Delete a review
  const deleteReview = async (reviewId) => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return false;
    }

    try {
      setLoading(true);
      await reviewsAPI.delete(reviewId);
      toast.success('Review deleted successfully');
      return true;
    } catch (error) {
      console.error('Failed to delete review:', error);
      toast.error('Failed to delete review');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview,
    loading,
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewContext;
