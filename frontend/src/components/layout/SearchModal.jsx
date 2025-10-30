import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import { mockProducts } from '../../data/mockData';
import ProductCard from '../shop/ProductCard';

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [recentSearches] = useState(['Hoodie', 'Jacket', 'Sneakers']);
  
  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];
    
    const productNames = mockProducts.map(p => p.name);
    const categories = [...new Set(mockProducts.map(p => p.category))];
    const allSuggestions = [...productNames, ...categories];
    
    return allSuggestions
      .filter(item => item.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query]);

  // Search results
  const results = query
    ? mockProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const trendingSearches = ['Oversized Hoodie', 'Cargo Pants', 'Leather Jacket', 'Denim'];

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    // Automatically search when clicking a suggestion
    navigate(`/shop?search=${encodeURIComponent(suggestion)}`);
    onClose();
  };

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden relative flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black transition-colors"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    icon={SearchIcon}
                    iconPosition="left"
                    placeholder="Search products, categories..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    autoFocus
                    className="bg-neutral flex-1"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSearch}
                    className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors font-semibold"
                  >
                    Search
                  </motion.button>
                </div>
                
                {/* Autocomplete Suggestions Dropdown */}
                <div className="relative">
                  <AnimatePresence>
                    {suggestions.length > 0 && query.length >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-0 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
                      >
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 border-b last:border-b-0"
                          >
                            <SearchIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{suggestion}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {!query ? (
                /* Empty State - Show Trending & Recent */
                <div className="space-y-8">
                  {/* Trending Searches */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold">Trending Searches</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setQuery(term);
                            navigate(`/shop?search=${encodeURIComponent(term)}`);
                            onClose();
                          }}
                          className="px-4 py-2 bg-neutral hover:bg-gray-200 rounded-full text-sm transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <h3 className="font-semibold">Recent Searches</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => {
                              setQuery(term);
                              navigate(`/shop?search=${encodeURIComponent(term)}`);
                              onClose();
                            }}
                            className="px-4 py-2 border border-gray-200 hover:border-gray-300 rounded-full text-sm transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : results.length === 0 ? (
                /* No Results */
                <div className="text-center py-12">
                  <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">No products found for "{query}"</p>
                  <p className="text-sm text-gray-500">Try searching for something else</p>
                </div>
              ) : (
                /* Search Results */
                <div>
                  <p className="text-sm text-gray-600 mb-6">
                    {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {results.slice(0, 6).map((product, index) => (
                      <div key={product._id} onClick={onClose}>
                        <ProductCard product={product} index={index} />
                      </div>
                    ))}
                  </div>
                  {results.length > 6 && (
                    <div className="text-center mt-6">
                      <button
                        onClick={onClose}
                        className="text-accent hover:underline font-semibold"
                      >
                        View all {results.length} results
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
