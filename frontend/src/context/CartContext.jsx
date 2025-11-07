import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { cartAPI, productsAPI } from '../lib/api';
import { useAuth } from './AuthContext';
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
  const { isAuthenticated, user } = useAuth();

  // Keep the raw cart document from backend
  const [cartDoc, setCartDoc] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend when user authenticates
  useEffect(() => {
    const fetchCart = async () => {
      if (isAuthenticated && user) {
        try {
          setLoading(true);
          const response = await cartAPI.get();
          setCartDoc(response.data || { items: [], totalPrice: 0, totalItems: 0 });
        } catch (error) {
          console.error('Failed to fetch cart:', error);
          setCartDoc({ items: [], totalPrice: 0, totalItems: 0 });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCart();
  }, [isAuthenticated, user]);

  // Derived, UI-friendly cart items array
  const cart = useMemo(() => {
    if (!cartDoc || !Array.isArray(cartDoc.items)) return [];
    // Map backend items to UI shape expected by CartDrawer
    return cartDoc.items.map((it) => ({
      cartId: it._id, // cart item id
      productId: it.product?._id || it.product, // ref
      slug: it.product?.slug,
      images: it.product?.images || [],
      name: it.product?.name || 'Product',
      price: it.price,
      quantity: it.quantity,
      // selected variants aren't persisted yet
      selectedSize: it.size,
      selectedColor: it.color,
    }));
  }, [cartDoc]);

  const cartTotal = cartDoc?.totalPrice || 0;

  // Add item to cart
  const addToCart = async (product, quantity = 1, size = null, color = null) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      setLoading(true);
      // Compatibility: If product._id is not a valid Mongo ObjectId (e.g., mock data),
      // try resolving the real product by slug from backend first.
      let productId = product?._id;
      const isValidObjectId = typeof productId === 'string' && productId.length === 24;
      if (!isValidObjectId) {
        if (product?.slug) {
          const { data } = await productsAPI.getBySlug(product.slug);
          productId = data?._id;
        }
      }

      if (!productId || productId.length !== 24) {
        throw new Error('Unable to resolve product ID. Please open the product page again.');
      }

      const response = await cartAPI.add(productId, quantity, size, color);
      setCartDoc(response.data);
      toast.success('Added to cart');
      setIsCartOpen(true);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  // Add to cart silently (no toast notifications)
  const addToCartSilent = async (product, quantity = 1, size = null, color = null) => {
    if (!isAuthenticated) {
      return false;
    }

    try {
      setLoading(true);
      let productId = product?._id;
      const isValidObjectId = typeof productId === 'string' && productId.length === 24;
      if (!isValidObjectId) {
        if (product?.slug) {
          const { data } = await productsAPI.getBySlug(product.slug);
          productId = data?._id;
        }
      }

      if (!productId || productId.length !== 24) {
        return false;
      }

      const response = await cartAPI.add(productId, quantity, size, color);
      setCartDoc(response.data);
      return true;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity (expects cart item id)
  const updateQuantity = async (itemId, quantity) => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.update(itemId, quantity);
      setCartDoc(response.data);
      toast.success('Cart updated');
    } catch (error) {
      console.error('Failed to update cart:', error);
      toast.error('Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart (expects cart item id)
  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.remove(itemId);
      setCartDoc(response.data);
      toast.success('Removed from cart');
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      toast.error('Failed to remove from cart');
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return;
    }

    try {
      setLoading(true);
      await cartAPI.clear();
      setCartDoc({ items: [], totalPrice: 0, totalItems: 0 });
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    // UI-facing
    cart,
    cartTotal,
    cartItemsCount: cart.length, // total number of items in cart
    isCartOpen,
    setIsCartOpen, // backward compatibility
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    toggleCart: () => setIsCartOpen(prev => !prev), // toggle cart drawer
    // actions
    addToCart,
    addToCartSilent, // silent version for bulk operations
    updateQuantity,
    updateCart: updateQuantity, // backward compatibility
    removeFromCart,
    clearCart,
    loading,
    // expose raw doc if needed elsewhere
    cartDoc,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
