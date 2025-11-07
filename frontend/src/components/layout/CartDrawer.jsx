import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice, getImageUrl } from '../../utils/helpers';
import Button from '../ui/Button';

const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal 
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              damping: 25, 
              stiffness: 300 
            }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-display font-semibold uppercase"
              >
                Shopping Cart ({cart.length})
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="p-2 hover:bg-neutral transition-colors rounded-full"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Cart Items */}
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-1 flex flex-col items-center justify-center p-6"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
                </motion.div>
                <p className="text-lg text-gray-600 mb-2">Your cart is empty</p>
                <p className="text-sm text-gray-500 mb-6">Add items to get started</p>
                <Button onClick={closeCart}>Continue Shopping</Button>
              </motion.div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.cartId}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 100, height: 0 }}
                      transition={{
                        type: 'spring',
                        damping: 20,
                        stiffness: 300,
                        delay: index * 0.05
                      }}
                      className="flex gap-4 pb-4 border-b"
                    >
                      {/* Image */}
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="flex-shrink-0 overflow-hidden rounded"
                      >
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          src={getImageUrl(item.images?.[0])}
                          alt={item.name}
                          className="w-24 h-32 object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-medium hover:underline mb-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && ' • '}
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                        </p>
                        <p className="font-semibold mb-3">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mt-auto">
                          <div className="flex items-center border border-gray-300 rounded">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(item.cartId, item.quantity - 1)
                              }
                              className="p-2 hover:bg-neutral transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <motion.span 
                              key={item.quantity}
                              initial={{ scale: 1.2, color: '#2563eb' }}
                              animate={{ scale: 1, color: '#000000' }}
                              className="px-4 text-sm font-medium"
                            >
                              {item.quantity}
                            </motion.span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(item.cartId, item.quantity + 1)
                              }
                              className="p-2 hover:bg-neutral transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05, color: '#dc2626' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-sm text-red-600 hover:text-red-700 underline"
                          >
                            Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border-t p-6 space-y-4"
                >
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-medium">Subtotal</span>
                    <motion.span 
                      key={cartTotal}
                      initial={{ scale: 1.2, color: '#2563eb' }}
                      animate={{ scale: 1, color: '#000000' }}
                      className="font-bold"
                    >
                      {formatPrice(cartTotal)}
                    </motion.span>
                  </div>

                  <p className="text-sm text-gray-600">
                    Shipping and taxes calculated at checkout
                  </p>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <Link to="/checkout" onClick={closeCart}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button fullWidth size="lg">
                          Checkout
                        </Button>
                      </motion.div>
                    </Link>
                    <Link to="/cart" onClick={closeCart}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button fullWidth size="lg" variant="secondary">
                          View Cart
                        </Button>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
