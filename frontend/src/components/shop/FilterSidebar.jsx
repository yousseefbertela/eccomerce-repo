import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    size: true,
    color: true,
    price: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = [
    'All Products',
    'Outerwear',
    'Tops',
    'Bottoms',
    'Accessories',
    'Footwear',
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Gray', value: '#808080' },
    { name: 'Navy', value: '#000080' },
    { name: 'Beige', value: '#F5F5DC' },
    { name: 'Olive', value: '#808000' },
  ];

  const priceRanges = [
    { label: 'Under €50', min: 0, max: 50 },
    { label: '€50 - €100', min: 50, max: 100 },
    { label: '€100 - €150', min: 100, max: 150 },
    { label: '€150 - €200', min: 150, max: 200 },
    { label: 'Over €200', min: 200, max: 9999 },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
        }}
        className={`
          fixed lg:sticky top-0 left-0 
          h-screen lg:h-auto lg:max-h-screen
          w-80 bg-white z-50 lg:z-0
          overflow-y-auto border-r border-gray-200
          lg:translate-x-0
        `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="text-xl font-display font-bold">Filters</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Clear All */}
          <button
            onClick={() => onFilterChange('clear')}
            className="text-sm text-accent hover:underline mb-6"
          >
            Clear All Filters
          </button>

          {/* Filter Sections */}
          <div className="space-y-6">
            {/* Category */}
            <div className="border-b pb-6">
              <button
                onClick={() => toggleSection('category')}
                className="flex items-center justify-between w-full mb-4"
              >
                <h3 className="font-semibold uppercase text-sm tracking-wider">Category</h3>
                {expandedSections.category ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedSections.category && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3"
                  >
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.categories?.includes(cat)}
                          onChange={() => onFilterChange('category', cat)}
                          className="w-4 h-4 rounded border-gray-300 text-black focus:ring-accent"
                        />
                        <span className="text-sm group-hover:text-accent transition-colors">
                          {cat}
                        </span>
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Size */}
            <div className="border-b pb-6">
              <button
                onClick={() => toggleSection('size')}
                className="flex items-center justify-between w-full mb-4"
              >
                <h3 className="font-semibold uppercase text-sm tracking-wider">Size</h3>
                {expandedSections.size ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedSections.size && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="grid grid-cols-3 gap-2"
                  >
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => onFilterChange('size', size)}
                        className={`
                          py-2 border text-sm font-medium transition-colors
                          ${filters.sizes?.includes(size)
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-black'
                          }
                        `}
                      >
                        {size}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Color */}
            <div className="border-b pb-6">
              <button
                onClick={() => toggleSection('color')}
                className="flex items-center justify-between w-full mb-4"
              >
                <h3 className="font-semibold uppercase text-sm tracking-wider">Color</h3>
                {expandedSections.color ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedSections.color && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="grid grid-cols-4 gap-3"
                  >
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => onFilterChange('color', color.name)}
                        className={`
                          relative w-10 h-10 rounded-full border-2 transition-all
                          ${filters.colors?.includes(color.name)
                            ? 'border-black scale-110'
                            : 'border-gray-300 hover:border-gray-400'
                          }
                        `}
                        title={color.name}
                      >
                        <div
                          className="w-full h-full rounded-full"
                          style={{
                            backgroundColor: color.value,
                            border: color.value === '#FFFFFF' ? '1px solid #e5e7eb' : 'none'
                          }}
                        />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price Range */}
            <div className="pb-6">
              <button
                onClick={() => toggleSection('price')}
                className="flex items-center justify-between w-full mb-4"
              >
                <h3 className="font-semibold uppercase text-sm tracking-wider">Price</h3>
                {expandedSections.price ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedSections.price && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-3"
                  >
                    {priceRanges.map((range) => (
                      <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange?.label === range.label}
                          onChange={() => onFilterChange('price', range)}
                          className="w-4 h-4 border-gray-300 text-black focus:ring-accent"
                        />
                        <span className="text-sm group-hover:text-accent transition-colors">
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default FilterSidebar;
