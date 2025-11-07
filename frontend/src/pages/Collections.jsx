import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categoriesAPI } from '../lib/api';
import SEO from '../components/ui/SEO';

const Collections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await categoriesAPI.getAll();
        setCategories(res.data || []);
      } catch (e) {
        console.error('Failed to fetch categories', e);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <SEO 
        title="Collections | ANGAL - Browse All Categories"
        description="Explore ANGAL's curated fashion collections. From streetwear to premium apparel, find your perfect style across our diverse categories."
        keywords="fashion collections, categories, streetwear, premium fashion, ANGAL collections"
        canonicalUrl="/collections"
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white"
      >
        {/* Hero Section */}
        <section className="relative h-[50vh] bg-black text-white overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/assets/images/background 2.jpg)',
              filter: 'brightness(0.3)'
            }}
          />
          
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center px-4">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl font-bold tracking-tighter mb-6"
              >
                COLLECTIONS
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 max-w-2xl mx-auto"
              >
                Curated categories for every style. Discover your perfect collection.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="section-padding">
          <div className="max-w-screen-2xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading collections...</p>
                </div>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold mb-2">No Collections Found</h3>
                <p className="text-gray-600">Check back soon!</p>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl font-bold mb-4">Explore Our Collections</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {categories.length} carefully curated collections designed to elevate your wardrobe
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categories.map((category, index) => (
                    <motion.div
                      key={category._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link 
                        to={`/collections/${category.slug}`}
                        className="group block relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-black transition-all duration-300 bg-white"
                      >
                        {/* Category Card Content */}
                        <div className="relative h-80 p-8 flex flex-col justify-between">
                          {/* Special Badge for New Arrivals */}
                          {category.slug === 'new-arrivals' && (
                            <div className="absolute top-6 right-6 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              NEW
                            </div>
                          )}

                          {/* Category Name */}
                          <div className="flex-1 flex items-center justify-center">
                            <h3 className="text-4xl md:text-5xl font-bold text-center text-black group-hover:scale-105 transition-transform duration-300">
                              {category.name}
                            </h3>
                          </div>

                          {/* Category Footer */}
                          <div className="space-y-3">
                            <p className="text-sm text-gray-600 text-center line-clamp-2">
                              {category.description || 'Explore this collection'}
                            </p>
                            
                            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-black">
                              <span>{category.productCount || 0} Products</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>

                        {/* Subtle hover background effect */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 pointer-events-none" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {!loading && categories.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-screen-xl mx-auto px-4 text-center">
              <h3 className="text-3xl font-bold mb-4">Can't Decide?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Browse all our products in one place and filter by your preferences
              </p>
              <Link
                to="/shop"
                className="inline-block px-8 py-4 bg-black text-white font-bold hover:bg-gray-900 transition-colors duration-300 uppercase tracking-wider"
              >
                Shop All Products
              </Link>
            </div>
          </section>
        )}
      </motion.div>
    </>
  );
};

export default Collections;
