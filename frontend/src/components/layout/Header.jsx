import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Search, Menu, Heart, X, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import SearchModal from './SearchModal';
import CurrencySelector from '../ui/CurrencySelector';
import { NAVIGATION_MENU } from '../../utils/constants';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  
  const { cartItemsCount, toggleCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { wishlistCount } = useWishlist();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [location]);

  // Announcement messages rotator
  const announcements = useMemo(
    () => [
      {
        id: 'shipping',
        content: (
          <span className="uppercase tracking-[0.25em] font-light">
            Free Shipping on Orders Over €100
          </span>
        ),
      },
      {
        id: 'fw25',
        content: (
          <Link
            to="/collections/fw25"
            className="uppercase tracking-[0.25em] font-light hover:opacity-80 transition-opacity"
          >
            FALL WINTER 25 — <span className="underline underline-offset-4">SHOP NOW</span>
          </Link>
        ),
      },
    ],
    []
  );

  const [announcementIndex, setAnnouncementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4500); // rotate every 4.5s
    return () => clearInterval(interval);
  }, [announcements.length]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-2 text-[10px] md:text-xs">
        <div className="relative h-4 md:h-5 flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={announcements[announcementIndex].id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute"
            >
              {announcements[announcementIndex].content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Header */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 1)',
          paddingTop: isScrolled ? '0.75rem' : '1rem',
          paddingBottom: isScrolled ? '0.75rem' : '1rem',
        }}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'shadow-md backdrop-blur-md' : ''
        }`}
      >
        <div className="container-custom">
          <motion.div 
            animate={{
              height: isScrolled ? '3.5rem' : '4rem',
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center w-full"
          >
            {/* Logo left */}
            <Link
              to="/"
              aria-label="Go to homepage"
              className="text-xl md:text-2xl font-display font-bold tracking-wider hover:opacity-70 transition-opacity cursor-pointer mr-10"
              style={{ letterSpacing: '0.05em' }}
            >
              ANGAL
            </Link>

            {/* Navigation left of center */}
            <nav className="hidden lg:flex items-center gap-8 mr-auto">
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu('newArrivals')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={NAVIGATION_MENU.newArrivals.href}
                  className="text-[12px] md:text-[13px] uppercase tracking-[0.15em] font-light hover:opacity-70 transition-opacity px-1"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {NAVIGATION_MENU.newArrivals.title}
                </Link>
                <MegaMenu
                  isOpen={activeMenu === 'newArrivals'}
                  items={NAVIGATION_MENU.newArrivals.categories}
                  type="simple"
                />
              </div>
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu('shop')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={NAVIGATION_MENU.shop.href}
                  className="text-[12px] md:text-[13px] uppercase tracking-[0.15em] font-light hover:opacity-70 transition-opacity px-1"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {NAVIGATION_MENU.shop.title}
                </Link>
                <MegaMenu
                  isOpen={activeMenu === 'shop'}
                  items={NAVIGATION_MENU.shop.megaMenu}
                  type="mega"
                />
              </div>
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu('collections')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                  to={NAVIGATION_MENU.collections.href}
                  className="text-[12px] md:text-[13px] uppercase tracking-[0.15em] font-light hover:opacity-70 transition-opacity px-1"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {NAVIGATION_MENU.collections.title}
                </Link>
                <MegaMenu
                  isOpen={activeMenu === 'collections'}
                  items={NAVIGATION_MENU.collections.items}
                  type="simple"
                />
              </div>
            </nav>

            {/* Icons right */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Search bar (Daily Paper style - Desktop) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center border-2 border-black rounded px-3 py-1 mr-2 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5 text-gray-500" />
                <span className="px-2 text-sm text-gray-500">Search...</span>
              </button>
              
              {/* Mobile Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden p-2 hover:bg-neutral transition-colors rounded"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              {/* Currency Selector */}
              <CurrencySelector />
              
              {/* Admin Panel Button - Only for admin users */}
              {isAuthenticated && (user?.role === 'admin' || user?.role === 'super_admin') && (
                <Link 
                  to="/admin/dashboard" 
                  className="p-2 hover:bg-neutral transition-colors rounded relative group" 
                  aria-label="Admin Panel"
                  title="Admin Panel"
                >
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Admin Panel
                  </span>
                </Link>
              )}
              
              <Link to="/wishlist" className="p-2 hover:bg-neutral transition-colors rounded" aria-label="Wishlist">
                <Heart className="w-5 h-5" />
              </Link>
              <Link to={isAuthenticated ? "/account" : "/login"} className="p-2 hover:bg-neutral transition-colors rounded" aria-label="Account">
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-neutral transition-colors rounded relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full px-1.5 py-0.5 font-bold">{cartItemsCount}</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
