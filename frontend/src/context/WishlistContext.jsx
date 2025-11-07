import { createContext, useContext, useState, useEffect } from 'react';
import { wishlistAPI, productsAPI } from '../lib/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist from backend when user authenticates
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated && user) {
        try {
          setLoading(true);
          const response = await wishlistAPI.get();
          setWishlist(response.data?.products || []);
        } catch (error) {
          console.error('Failed to fetch wishlist:', error);
          setWishlist([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWishlist();
  }, [isAuthenticated, user]);

  // Toggle wishlist (add or remove)
  const toggleWishlist = async (productOrId) => {
    if (!isAuthenticated) {
      toast.error('Please login to use wishlist');
      return;
    }

    try {
      setLoading(true);
      // Accept either a product ID or a full product object (from mock UI)
      let productId = typeof productOrId === 'string' ? productOrId : productOrId?._id;
      const isValidObjectId = typeof productId === 'string' && productId.length === 24;

      if (!isValidObjectId) {
        const slug = typeof productOrId === 'object' ? productOrId?.slug : undefined;
        if (slug) {
          const { data } = await productsAPI.getBySlug(slug);
          productId = data?._id;
        }
      }

      if (!productId || productId.length !== 24) {
        throw new Error('Unable to resolve product ID for wishlist. Please open the product page again.');
      }

      // Check if item is CURRENTLY in wishlist BEFORE toggling
      const wasInWishlist = wishlist.some(p => p._id === productId);

      const response = await wishlistAPI.toggle(productId);
      setWishlist(response.data?.products || []);
      
      // Show correct message based on previous state
      toast.success(wasInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
      toast.error('Failed to update wishlist');
    } finally {
      setLoading(false);
    }
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    toggleWishlist(product._id);
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    toggleWishlist(productId);
  };

  // Remove from wishlist silently (no toast)
  const removeFromWishlistSilent = async (productId) => {
    if (!isAuthenticated) return false;

    try {
      setLoading(true);
      await wishlistAPI.remove(productId);
      // Update local state
      setWishlist(prev => prev.filter(item => item._id !== productId));
      return true;
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    if (!wishlist) return false;
    return wishlist.some((item) => item._id === productId);
  };

  // Clear wishlist
  const clearWishlist = async () => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return;
    }

    // Remove all items one by one
    if (wishlist && wishlist.length > 0) {
      try {
        for (const item of wishlist) {
          await wishlistAPI.remove(item._id);
        }
        setWishlist([]);
        toast.success('Wishlist cleared');
      } catch (error) {
        console.error('Failed to clear wishlist:', error);
        toast.error('Failed to clear wishlist');
      }
    }
  };

  // Clear wishlist silently (no toast)
  const clearWishlistSilent = async () => {
    if (!isAuthenticated) return false;

    if (wishlist && wishlist.length > 0) {
      try {
        for (const item of wishlist) {
          await wishlistAPI.remove(item._id);
        }
        setWishlist([]);
        return true;
      } catch (error) {
        console.error('Failed to clear wishlist:', error);
        return false;
      }
    }
    return true;
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    removeFromWishlistSilent, // silent version for bulk operations
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    clearWishlistSilent, // silent version for bulk operations
    loading,
    wishlistCount: wishlist?.length || 0,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
