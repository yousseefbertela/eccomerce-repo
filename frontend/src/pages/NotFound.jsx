import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useState } from 'react';

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const popularLinks = [
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Shop All', path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'About Us', path: '/about' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container-custom max-w-2xl mx-auto text-center relative z-10 px-4">
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-[120px] md:text-[180px] font-display font-bold leading-none bg-gradient-to-b from-black to-gray-400 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onSubmit={handleSearch}
          className="mb-12"
        >
          <div className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-full focus:border-accent focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-black hover:bg-accent text-white rounded-full font-semibold transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </motion.form>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            Popular Pages
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {popularLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 border border-gray-300 hover:border-black hover:bg-black hover:text-white rounded-full text-sm transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link to="/">
            <Button
              size="lg"
              icon={Home}
              iconPosition="left"
              className="bg-black hover:bg-accent text-white"
            >
              Back to Homepage
            </Button>
          </Link>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-sm text-gray-500 mt-12"
        >
          Need help?{' '}
          <Link to="/contact" className="text-accent hover:underline font-semibold">
            Contact our support team
          </Link>
        </motion.p>
      </div>
    </section>
  );
};

export default NotFound;
