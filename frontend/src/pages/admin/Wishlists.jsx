import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Package } from 'lucide-react';
import api from '../../lib/api';
import toast from 'react-hot-toast';

const Wishlists = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlists();
  }, []);

  const fetchWishlists = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/wishlists');
      setWishlists(response.data.wishlists);
    } catch (error) {
      console.error('Error fetching wishlists:', error);
      toast.error('Failed to load wishlists');
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
        <h1 className="text-3xl font-bold text-gray-900">User Wishlists</h1>
        <p className="text-gray-500 mt-2">View all user wishlists</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(wishlists || []).map((wishlist) => (
          <motion.div
            key={wishlist._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-pink-50 rounded-lg">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{wishlist.userEmail || 'Unknown'}</h3>
                  <p className="text-sm text-gray-500">{wishlist.products?.length || 0} items</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {wishlist.products?.slice(0, 3).map((product, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 truncate">
                    {typeof product === 'string' ? product : product.name || 'Unknown product'}
                  </span>
                </div>
              ))}
              {wishlist.products?.length > 3 && (
                <p className="text-xs text-gray-500">
                  +{wishlist.products.length - 3} more items
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">Last updated</div>
              <div className="text-sm font-medium text-gray-900">
                {new Date(wishlist.updatedAt).toLocaleString()}
              </div>
            </div>
          </motion.div>
        ))}

        {(wishlists || []).length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No wishlists found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlists;
