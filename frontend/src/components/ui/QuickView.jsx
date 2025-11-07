import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useState } from 'react';

const QuickView = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, product.colors?.[0]?.name);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-white z-50 rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Quick View</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-neutral rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Images */}
                  <div className="space-y-4">
                    <div className="aspect-[3/4] bg-neutral overflow-hidden rounded">
                      <motion.img
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {product.images?.slice(0, 4).map((img, idx) => (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedImage(idx)}
                          className={`aspect-square bg-neutral overflow-hidden rounded ${
                            selectedImage === idx ? 'ring-2 ring-accent' : ''
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${product.name} ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                        {typeof product.category === 'string'
                          ? product.category
                          : product.category?.name || product.category?.slug || 'Category'}
                      </p>
                      <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        {product.salePrice ? (
                          <>
                            <span className="text-2xl font-bold text-red-600">
                              ${product.salePrice}
                            </span>
                            <span className="text-lg text-gray-500 line-through">
                              ${product.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-bold">${product.price}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 line-clamp-4">{product.description}</p>

                    {/* Sizes */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-2">Select Size:</p>
                        <div className="flex gap-2">
                          {product.sizes.map((size) => (
                            <motion.button
                              key={size}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedSize(size)}
                              className={`px-4 py-2 border transition-colors ${
                                selectedSize === size
                                  ? 'border-black bg-black text-white'
                                  : 'border-gray-300 hover:border-black'
                              }`}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className="w-full bg-black text-white py-3 font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleWishlist(product)}
                        className={`w-full py-3 font-semibold border-2 transition-colors ${
                          isInWishlist(product._id)
                            ? 'border-red-500 text-red-500 bg-red-50'
                            : 'border-black hover:bg-black hover:text-white'
                        }`}
                      >
                        <Heart
                          className="w-5 h-5 inline mr-2"
                          fill={isInWishlist(product._id) ? 'currentColor' : 'none'}
                        />
                        {isInWishlist(product._id) ? 'In Wishlist' : 'Add to Wishlist'}
                      </motion.button>

                      <Link to={`/product/${product.slug}`} onClick={onClose}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 font-semibold text-gray-700 hover:text-black underline"
                        >
                          View Full Details
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickView;
