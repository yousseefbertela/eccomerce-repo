import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ProductReviews = ({ productName }) => {
  // Fake reviews data - in production, this would come from an API
  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      date: '2 weeks ago',
      review: 'Absolutely love this piece! The quality is outstanding and the fit is perfect. Daily Paper never disappoints.',
      verified: true,
    },
    {
      id: 2,
      name: 'Marcus T.',
      rating: 5,
      date: '3 weeks ago',
      review: 'The attention to detail is incredible. Material feels premium and the design is exactly what I was looking for.',
      verified: true,
    },
    {
      id: 3,
      name: 'Lisa K.',
      rating: 4,
      date: '1 month ago',
      review: 'Great product! Runs slightly large, so I recommend sizing down if you want a more fitted look. Otherwise perfect.',
      verified: true,
    },
    {
      id: 4,
      name: 'James R.',
      rating: 5,
      date: '1 month ago',
      review: 'This is my third purchase from this collection. Quality speaks for itself. Will definitely buy again!',
      verified: true,
    },
    {
      id: 5,
      name: 'Nina P.',
      rating: 5,
      date: '2 months ago',
      review: 'Exceeded my expectations! The color is vibrant and the craftsmanship is top-notch. Highly recommend.',
      verified: true,
    },
  ];

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
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

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white font-semibold">
                  {review.name.charAt(0)}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{review.name}</h4>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex gap-1">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.review}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Write Review CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 border-2 border-black hover:bg-black hover:text-white transition-all duration-300 font-semibold uppercase tracking-wider text-sm">
            Write a Review
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductReviews;
