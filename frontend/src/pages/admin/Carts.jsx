import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Package } from 'lucide-react';
import api from '../../lib/api';
import toast from 'react-hot-toast';

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/carts');
      setCarts(response.data.carts);
    } catch (error) {
      console.error('Error fetching carts:', error);
      toast.error('Failed to load carts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Active Carts</h1>
        <p className="text-gray-500 mt-2">View all user shopping carts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(carts || []).map((cart) => (
          <motion.div
            key={cart._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{cart.userEmail || 'Unknown'}</h3>
                  <p className="text-sm text-gray-500">{cart.items?.length || 0} items</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {cart.items?.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 truncate">
                    {item.productName} x {item.quantity}
                  </span>
                </div>
              ))}
              {cart.items?.length > 3 && (
                <p className="text-xs text-gray-500">
                  +{cart.items.length - 3} more items
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">Last updated</div>
              <div className="text-sm font-medium text-gray-900">
                {new Date(cart.updatedAt).toLocaleString()}
              </div>
            </div>
          </motion.div>
        ))}

        {(carts || []).length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No active carts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carts;
