import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';
import PageHeader from '../components/ui/PageHeader';
import FilterSidebar from '../components/shop/FilterSidebar';
import { productsAPI } from '../lib/api';
import { SORT_OPTIONS, FILTER_CATEGORIES } from '../utils/constants';
import SEO from '../components/ui/SEO';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('newest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: null,
  });

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = searchQuery ? { search: searchQuery } : {};
        const res = await productsAPI.getAll(params);
        setProducts(res.data || []);
      } catch (e) {
        console.error('Failed to fetch products', e);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  const handleFilterChange = (type, value) => {
    if (type === 'clear') {
      setFilters({ categories: [], sizes: [], colors: [], priceRange: null });
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

  // Determine page title based on search
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
    
    return {
      title: 'Shop All',
      subtitle: 'Discover our complete collection of contemporary streetwear',
      breadcrumbs: [{ label: 'Shop' }],
      backgroundImage: '/assets/images/background1.jpeg',
      fullScreen: true
    };
  };

  const pageInfo = getPageInfo();

  // Advanced filter and sort logic
  let filtered = products.filter((p) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        p.name?.toLowerCase().includes(query) ||
        (typeof p.category === 'string'
          ? p.category.toLowerCase().includes(query)
          : (p.category?.name || p.category?.slug || '').toLowerCase().includes(query)) ||
        p.description?.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
    }

    // Category filters
    if (filters.categories.length > 0) {
      const hasMatchingCategory = filters.categories.some(cat => 
        cat === 'All Products' ||
        (typeof p.category === 'string'
          ? p.category.toLowerCase().includes(cat.toLowerCase())
          : (p.category?.name || p.category?.slug || '').toLowerCase().includes(cat.toLowerCase()))
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
      const price = p.salePrice || p.price || 0;
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

  // SEO data based on current view
  const seoTitle = searchQuery 
    ? `Search Results for "${searchQuery}" | ANGAL Shop`
    : filters.categories.length > 0
    ? `${filters.categories.join(', ')} | ANGAL Shop`
    : 'Shop All Products | ANGAL';
  
  const seoDescription = searchQuery
    ? `Browse ${filtered.length} products matching "${searchQuery}" at ANGAL.`
    : `Shop premium fashion and streetwear. Browse ${filtered.length} products across all categories.`;

  return (
    <>
      <SEO 
        title={seoTitle}
        description={seoDescription}
        keywords="shop, fashion, clothing, streetwear, apparel, men's fashion, women's fashion"
        canonicalUrl="/shop"
      />
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

        {/* Active Filters Display */}
        {filters.categories.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            <span className="text-white/70 text-sm">Active filters:</span>
            {filters.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange('category', cat)}
                className="px-3 py-1 text-xs bg-white text-black rounded-full font-medium flex items-center gap-1 hover:bg-gray-200 transition-colors"
              >
                {cat}
                <span className="text-lg leading-none">&times;</span>
              </button>
            ))}
            <button
              onClick={() => handleFilterChange('clear')}
              className="px-3 py-1 text-xs text-white/70 hover:text-white underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>        {/* Products with Sidebar */}
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
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                      <p className="text-white">Loading products...</p>
                    </div>
                  </div>
                ) : sorted.length === 0 ? (
                  <div className="text-center py-20">
                    <h3 className="text-2xl font-bold text-white mb-4">No Products Found</h3>
                    <p className="text-gray-300 mb-8">
                      {searchQuery 
                        ? `No products match "${searchQuery}". Try adjusting your search or filters.`
                        : 'Try adjusting your filters to see more products.'}
                    </p>
                    <button
                      onClick={() => {
                        handleFilterChange('clear');
                        window.history.pushState({}, '', '/shop');
                      }}
                      className="px-8 py-3 bg-white text-black font-bold hover:bg-gray-100 transition-colors duration-300 uppercase tracking-wider"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </>
  );
};

export default Shop;
