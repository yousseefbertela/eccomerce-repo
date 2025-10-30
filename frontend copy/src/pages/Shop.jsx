import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/shop/ProductCard';
import PageHeader from '../components/ui/PageHeader';
import { mockProducts } from '../data/mockData';
import { FILTER_CATEGORIES, SORT_OPTIONS } from '../utils/constants';

const Shop = () => {
  const location = useLocation();
  const [products] = useState(mockProducts);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');

  // Determine page title based on route
  const getPageInfo = () => {
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

  // Filter and sort logic
  const filtered = products.filter((p) =>
    category === 'all' ? true : p.category.toLowerCase().includes(category)
  );
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
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pt-8">
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
        <div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border border-white/50 rounded-full text-xs uppercase tracking-wider font-light bg-transparent text-white"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="section-padding">
        <div className="container-custom">
          {/* Product Count */}
          <div className="mb-8">
            <p className="text-white font-light">
              {sorted.length} {sorted.length === 1 ? 'Product' : 'Products'}
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {sorted.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default Shop;
