import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useReviews } from '../../context/ReviewContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import toast from 'react-hot-toast';

const ProductReviews = ({ productId, productName }) => {
  const { createReview, getProductReviews, loading } = useReviews();
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    title: '',
  });

  // Fetch reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getProductReviews(productId);
      setReviews(data || []);
    };
    fetchReviews();
  }, [productId, getProductReviews]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!formData.comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    const review = await createReview(
      productId,
      formData.rating,
      formData.comment,
      formData.title
    );

    if (review) {
      setReviews([review, ...reviews]);
      setFormData({ rating: 5, comment: '', title: '' });
      setShowForm(false);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const renderInteractiveStars = (value, onChange) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onChange(i + 1)}
        className="focus:outline-none"
      >
        <Star
          className={`w-6 h-6 cursor-pointer transition-all ${
            i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
          }`}
        />
      </button>
    ));
  };

  return (
    <section className="py-16 border-t border-gray-200">
      <div className="mb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Customer Reviews</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex gap-1">{renderStars(Math.round(averageRating))}</div>
            <span className="text-2xl font-semibold">{averageRating}</span>
            <span className="text-gray-600">/ 5.0</span>
          </div>
          <p className="text-gray-600">Based on {reviews.length} reviews</p>
        </motion.div>

        {/* Write Review Section */}
        {!showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 font-semibold uppercase tracking-wider text-sm"
            >
              Write a Review
            </button>
          </motion.div>
        )}

        {/* Review Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 p-8 rounded mb-12"
          >
            <h3 className="text-xl font-semibold mb-6">Share Your Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-3">Rating</label>
                <div className="flex gap-2">
                  {renderInteractiveStars(formData.rating, (newRating) =>
                    setFormData({ ...formData, rating: newRating })
                  )}
                </div>
              </div>

              {/* Title */}
              <Input
                label="Review Title"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Loved it!"
              />

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Share your thoughts about this product..."
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black resize-none"
                  rows="5"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Posting...' : 'Post Review'}
                </Button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-600 py-8">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white font-semibold">
                    {review.userName?.charAt(0) || 'U'}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{review.userName || 'Anonymous'}</h4>
                          {review.isVerifiedPurchase && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1">{renderStars(review.rating)}</div>
                    </div>
                    {review.title && <h5 className="font-semibold mb-2">{review.title}</h5>}
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
