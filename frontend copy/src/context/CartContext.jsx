import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/helpers';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = storage.get('cart', []);
    setCart(savedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    storage.set('cart', cart);
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1, size = null, color = null) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item._id === product._id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingItem) {
        toast.success('Cart updated');
        return prevCart.map((item) =>
          item._id === product._id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      toast.success('Added to cart');
      return [
        ...prevCart,
        {
          ...product,
          quantity,
          selectedSize: size,
          selectedColor: color,
          cartId: `${product._id}-${size}-${color}-${Date.now()}`,
        },
      ];
    });
    
    setIsCartOpen(true);
  };

  // Remove item from cart
  const removeFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
    toast.success('Removed from cart');
  };

  // Update quantity
  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  // Calculate totals
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Open/close cart drawer
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemsCount,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
