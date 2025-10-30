import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';
import PageHeader from '../components/ui/PageHeader';
import FilterSidebar from '../components/shop/FilterSidebar';
import { mockProducts } from '../data/mockData';
import { FILTER_CATEGORIES, SORT_OPTIONS } from '../utils/constants';

const Shop = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  
  const [products] = useState(mockProducts);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: null,
  });

  const handleFilterChange = (type, value) => {
    if (type === 'clear') {
      setFilters({ categories: [], sizes: [], colors: [], priceRange: null });
      setCategory('all');
      return;
    }

    if (type === 'category') {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.includes(value)
          ? prev.categories.filter(c => c !== value)
          : [...prev.categories, value]
      }));
    } else if (type === 'size') {
      setFilters(prev => ({
        ...prev,
        sizes: prev.sizes.includes(value)
          ? prev.sizes.filter(s => s !== value)
          : [...prev.sizes, value]
      }));
    } else if (type === 'color') {
      setFilters(prev => ({
        ...prev,
        colors: prev.colors.includes(value)
          ? prev.colors.filter(c => c !== value)
          : [...prev.colors, value]
      }));
    } else if (type === 'price') {
      setFilters(prev => ({ ...prev, priceRange: value }));
    }
  };

  // Determine page title based on route
  const getPageInfo = () => {
    if (searchQuery) {
      return {
        title: 'Search Results',
        subtitle: `Showing results for "${searchQuery}"`,
        breadcrumbs: [{ label: 'Shop', href: '/shop' }, { label: 'Search Results' }],
        backgroundImage: '/assets/images/background1.jpeg',
        fullScreen: true
      };
    }
    
    if (location.pathname === '/shop') {
      return {
        title: 'Shop All',
        subtitle: 'Discover our complete collection of contemporary streetwear',
        breadcrumbs: [{ label: 'Shop' }],
        backgroundImage: '/assets/images/background1.jpeg',
        fullScreen: true
      };
    } else if (location.pathname === '/collections') {
      return {
        title: 'Collections',
        subtitle: 'Curated selections for the modern individual',
        breadcrumbs: [{ label: 'Collections' }],
        backgroundImage: '/assets/images/newbackground.png',
        fullScreen: true
      };
    } else if (location.pathname === '/new-arrivals') {
      return {
        title: 'New Arrivals',
        subtitle: 'Fresh styles. Bold statements.',
        breadcrumbs: [{ label: 'New Arrivals' }],
        backgroundImage: '/assets/images/background1.jpeg',
        fullScreen: true
      };
    }
    return {
      title: 'Shop',
      breadcrumbs: [{ label: 'Shop' }]
    };
  };

  const pageInfo = getPageInfo();

  // Advanced filter and sort logic
  let filtered = products.filter((p) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
    }

    // Category filter (legacy)
    if (category !== 'all' && !p.category.toLowerCase().includes(category)) {
      return false;
    }

    // New filters
    if (filters.categories.length > 0) {
      const hasMatchingCategory = filters.categories.some(cat => 
        cat === 'All Products' || p.category.toLowerCase().includes(cat.toLowerCase())
      );
      if (!hasMatchingCategory) return false;
    }

    if (filters.sizes.length > 0) {
      const hasMatchingSize = p.sizes?.some(size => filters.sizes.includes(size));
      if (!hasMatchingSize) return false;
    }

    if (filters.colors.length > 0) {
      const hasMatchingColor = p.colors?.some(color => 
        filters.colors.includes(color.name)
      );
      if (!hasMatchingColor) return false;
    }

    if (filters.priceRange) {
      const price = p.salePrice || p.price;
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'best_selling') return b.reviewCount - a.reviewCount;
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative"
    >
      {/* Full Page Background */}
      {pageInfo.backgroundImage && (
        <>
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url(${pageInfo.backgroundImage})` }}
          />
          <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-0" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Page Header */}
        <PageHeader 
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          breadcrumbs={pageInfo.breadcrumbs}
          backgroundImage={null}
          fullScreen={pageInfo.fullScreen}
        />

        {/* Controls */}
        <div className="container-custom pt-8 mb-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="ml-auto px-4 py-2 border border-white/50 rounded-full text-xs uppercase tracking-wider font-light bg-transparent text-white"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="text-black">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Legacy Category Pills */}
          <div className="flex gap-2 flex-wrap">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 text-xs uppercase tracking-wider border rounded-full font-light transition-colors duration-200 ${
                  category === cat.value 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products with Sidebar */}
        <div className="section-padding">
          <div className="container-custom">
            <div className="flex gap-8">
              {/* Filter Sidebar */}
              <div className="hidden lg:block flex-shrink-0">
                <FilterSidebar
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Mobile Filter Sidebar */}
              <div className="lg:hidden">
                <FilterSidebar
                  isOpen={isSidebarOpen}
                  onClose={() => setIsSidebarOpen(false)}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Product Count */}
                <div className="mb-8">
                  <p className="text-white font-light">
                    {sorted.length} {sorted.length === 1 ? 'Product' : 'Products'}
                  </p>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {sorted.map((product, index) => (
                    <ProductCard key={product._id} product={product} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
