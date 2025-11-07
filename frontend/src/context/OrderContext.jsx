import { createContext, useContext, useState, useEffect } from 'react';
import { ordersAPI, cartAPI } from '../lib/api';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import toast from 'react-hot-toast';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { clearCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (isAuthenticated && user) {
        try {
          setLoading(true);
          const response = await ordersAPI.getAll();
          setOrders(response.data || []);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
          setOrders([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [isAuthenticated, user]);

  // Create an order from cart
  const createOrder = async (shippingAddress, paymentMethod = 'cash_on_delivery') => {
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      return null;
    }

    try {
      setLoading(true);
      
      // Get current cart
      const cartResponse = await cartAPI.get();
      const cart = cartResponse.data;

      if (!cart.items || cart.items.length === 0) {
        toast.error('Your cart is empty');
        return null;
      }

      // Prepare order data
      const orderData = {
        items: cart.items,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.totalPrice,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: cart.totalPrice,
      };

      // Create order
      const response = await ordersAPI.create(orderData);
      
      // Clear cart after successful order
      await clearCart();
      
      // Add order to list
      setOrders((prev) => [response.data, ...prev]);
      
      toast.success('Order placed successfully!');
      return response.data;
    } catch (error) {
      console.error('Failed to create order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get a single order by ID
  const getOrder = async (orderId) => {
    try {
      setLoading(true);
      const response = await ordersAPI.getById(orderId);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch order:', error);
      toast.error('Failed to fetch order details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Cancel an order
  const cancelOrder = async (orderId) => {
    if (!isAuthenticated) {
      toast.error('Please login');
      return false;
    }

    try {
      setLoading(true);
      await ordersAPI.cancel(orderId);
      
      // Update orders list
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: 'cancelled' } : order
        )
      );
      
      toast.success('Order cancelled successfully');
      return true;
    } catch (error) {
      console.error('Failed to cancel order:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel order');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    orders,
    createOrder,
    getOrder,
    cancelOrder,
    loading,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
