import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';
import { productsAPI } from '../lib/api';
import SEO from '../components/ui/SEO';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        const res = await productsAPI.getByCategory('new-arrivals');
        setProducts(res.data || []);
      } catch (e) {
        console.error('Failed to fetch new arrivals', e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <>
      <SEO 
        title="New Arrivals | ANGAL - Latest Fashion Drops"
        description="Discover the latest arrivals at ANGAL. Shop new drops, trending styles, and fresh fashion pieces before they're gone."
        keywords="new arrivals, latest fashion, new drops, trending, ANGAL new products"
        canonicalUrl="/new-arrivals"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen"
      >
        {/* Hero Section */}
        <div className="relative h-[60vh] bg-black text-white overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/assets/images/background1.jpeg)',
              filter: 'brightness(0.4)'
            }}
          />
          
          {/* Hero Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center px-4 max-w-4xl">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                  NEW ARRIVALS
                </h1>
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Fresh drops and exclusive pieces. Be the first to own the latest trends.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="inline-block px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-sm font-semibold tracking-wider"
              >
                {loading ? 'LOADING...' : `${products.length} NEW ITEMS`}
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Products Section */}
        <section className="section-padding bg-white">
          <div className="max-w-screen-2xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading new arrivals...</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold mb-2">No New Arrivals Yet</h3>
                <p className="text-gray-600">Check back soon for the latest drops!</p>
              </div>
            ) : (
              <>
                {/* Section Header */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4">
                    Latest Drops
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover our newest additions. Premium quality meets cutting-edge style.
                  </p>
                </div>

                {/* Products Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </section>

        {/* Call to Action */}
        {!loading && products.length > 0 && (
          <section className="bg-black text-white py-16">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Want More?
              </h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Explore our full collection and discover your perfect style
              </p>
              <a
                href="/shop"
                className="inline-block px-8 py-4 bg-white text-black font-bold hover:bg-gray-100 transition-colors duration-300 uppercase tracking-wider"
              >
                Shop All Products
              </a>
            </div>
          </section>
        )}
      </motion.div>
    </>
  );
};

export default NewArrivals;
