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
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-display font-semibold uppercase">
                Shopping Cart ({cart.length})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-neutral transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
                <p className="text-lg text-gray-600 mb-2">Your cart is empty</p>
                <p className="text-sm text-gray-500 mb-6">Add items to get started</p>
                <Button onClick={closeCart}>Continue Shopping</Button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
                  {cart.map((item) => (
                    <motion.div
                      key={item.cartId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 pb-4 border-b"
                    >
                      {/* Image */}
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="flex-shrink-0"
                      >
                        <img
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
                          <div className="flex items-center border border-gray-300">
                            <button
                              onClick={() =>
                                updateQuantity(item.cartId, item.quantity - 1)
                              }
                              className="p-2 hover:bg-neutral transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.cartId, item.quantity + 1)
                              }
                              className="p-2 hover:bg-neutral transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-sm text-red-600 hover:text-red-700 underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold">{formatPrice(cartTotal)}</span>
                  </div>

                  <p className="text-sm text-gray-600">
                    Shipping and taxes calculated at checkout
                  </p>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <Link to="/checkout" onClick={closeCart}>
                      <Button fullWidth size="lg">
                        Checkout
                      </Button>
                    </Link>
                    <Link to="/cart" onClick={closeCart}>
                      <Button fullWidth size="lg" variant="secondary">
                        View Cart
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
