import { motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import SEO from '../components/ui/SEO';



const Wishlist = () => {
  const { wishlist, removeFromWishlistSilent, clearWishlist, clearWishlistSilent } = useWishlist();
  const { addToCartSilent, openCart } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleAddToCart = (product) => {
    // Add to cart silently (no toast)
    addToCartSilent(product, 1, 'M');
    
    // Remove from wishlist silently (no toast)
    removeFromWishlistSilent(product._id);
    
    // Show single combined toast
    toast.success('Moved to cart', { icon: '🛒' });
    
    // Open cart drawer
    openCart();
  };

  const handleMoveAllToCart = () => {
    if (!wishlist || wishlist.length === 0) return;
    
    const count = wishlist.length;
    
    // Add all items to cart silently
    wishlist.forEach(product => {
      addToCartSilent(product, 1, 'M');
    });
    
    // Clear wishlist silently (no toast)
    clearWishlistSilent();
    
    // Show single custom toast
    toast.success(`${count} ${count === 1 ? 'item' : 'items'} moved to cart`, { icon: '🛒' });
    
    // Open cart drawer
    openCart();
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg px-6"
        >
          {/* Empty Heart Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="mb-8"
          >
            <svg
              className="w-32 h-32 mx-auto text-white/10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-white/60 mb-8 text-lg">
            Start adding items you love to save them for later
          </p>

          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 font-semibold hover:bg-white/90 transition-colors"
            >
              EXPLORE SHOP
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`Wishlist (${wishlist.length}) | ANGAL`}
        description="Save your favorite items to your wishlist and shop them later. Easily add products to cart from your wishlist."
        keywords="wishlist, saved items, favorites, fashion wishlist"
        canonicalUrl="/wishlist"
      />
      <div className="min-h-screen bg-black text-white py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-6 mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-2">
              Your Wishlist
            </h1>
            <p className="text-white/60 text-lg">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMoveAllToCart}
              className="bg-accent text-white px-6 py-3 font-semibold hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20"
            >
              MOVE ALL TO CART
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowClearConfirm(true)}
              className="border border-white/20 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors"
            >
              CLEAR ALL
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Wishlist Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-accent/50 transition-all duration-300"
            >
              {/* Product Image */}
              <Link to={`/product/${product.slug}`}>
                <div className="aspect-[3/4] overflow-hidden bg-white/5">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={product.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              {/* Remove Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 z-10"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>

              {/* Product Info */}
              <div className="p-4">
                <Link to={`/product/${product.slug}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-accent transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-white/60 text-sm mb-3 line-clamp-1">
                  {product.category}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    {product.discount > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-accent">
                          ${product.discountedPrice}
                        </span>
                        <span className="text-sm text-white/40 line-through">
                          ${product.price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold">
                        ${product.price}
                      </span>
                    )}
                  </div>

                  {product.stock === 0 && (
                    <span className="text-xs text-red-400 font-semibold">
                      OUT OF STOCK
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    product.stock === 0
                      ? 'bg-white/5 text-white/40 cursor-not-allowed'
                      : 'bg-white text-black hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/30'
                  }`}
                >
                  {product.stock === 0 ? 'OUT OF STOCK' : 'MOVE TO CART'}
                </motion.button>
              </div>

              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Continue Shopping */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto px-6 mt-16 text-center"
      >
        <Link to="/shop">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white/20 text-white px-8 py-4 font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            CONTINUE SHOPPING
          </motion.button>
        </Link>
      </motion.div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowClearConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-black p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold mb-4">Clear Wishlist?</h3>
            <p className="text-black/60 mb-6">
              Are you sure you want to remove all items from your wishlist? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  clearWishlist();
                  setShowClearConfirm(false);
                }}
                className="flex-1 bg-red-600 text-white py-3 font-semibold hover:bg-red-700 transition-colors"
              >
                CLEAR ALL
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 border-2 border-black py-3 font-semibold hover:bg-black hover:text-white transition-all"
              >
                CANCEL
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </div>
    </>
  );
};

export default Wishlist;
