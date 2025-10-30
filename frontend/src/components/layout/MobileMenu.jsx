import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { NAVIGATION_MENU } from '../../utils/constants';

const MobileMenu = ({ isOpen, onClose }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const { isAuthenticated, user } = useAuth();

  const toggleMenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-50 overflow-y-auto scrollbar-thin"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-display font-bold">ANGAL</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* User Section */}
            {isAuthenticated ? (
              <div className="p-6 bg-neutral border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                    <Link
                      to="/account"
                      onClick={onClose}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      View Account
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 border-b space-y-3">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block w-full py-3 text-center bg-black text-white hover:bg-accent transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={onClose}
                  className="block w-full py-3 text-center border-2 border-black hover:bg-black hover:text-white transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Navigation */}
            <nav className="p-6 space-y-2">
              {/* New Arrivals */}
              <div>
                <button
                  onClick={() => toggleMenu('newArrivals')}
                  className="flex items-center justify-between w-full py-3 text-left font-normal uppercase tracking-[0.2em]"
                >
                  New Arrivals
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedMenu === 'newArrivals' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedMenu === 'newArrivals' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 space-y-2 overflow-hidden"
                    >
                      {NAVIGATION_MENU.newArrivals.categories.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          onClick={onClose}
                          className="block py-2 text-sm text-gray-700 hover:text-black"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shop */}
              <div>
                <button
                  onClick={() => toggleMenu('shop')}
                  className="flex items-center justify-between w-full py-3 text-left font-normal uppercase tracking-[0.2em]"
                >
                  Shop
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedMenu === 'shop' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedMenu === 'shop' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 space-y-3 overflow-hidden"
                    >
                      {Object.entries(NAVIGATION_MENU.shop.megaMenu).map(([key, section]) => (
                        <div key={key}>
                          <h4 className="font-normal text-xs uppercase tracking-[0.2em] text-gray-700 mb-2">{section.title}</h4>
                          <div className="space-y-2 pl-2">
                            {section.items.map((item, index) => (
                              <Link
                                key={index}
                                to={item.href}
                                onClick={onClose}
                                className="block py-1 text-xs text-gray-700 hover:text-black tracking-wide"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Collections */}
              <div>
                <button
                  onClick={() => toggleMenu('collections')}
                  className="flex items-center justify-between w-full py-3 text-left font-normal uppercase tracking-[0.2em]"
                >
                  Collections
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedMenu === 'collections' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {expandedMenu === 'collections' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 space-y-2 overflow-hidden"
                    >
                      {NAVIGATION_MENU.collections.items.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          onClick={onClose}
                          className="block py-2 text-xs text-gray-700 hover:text-black tracking-wide"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Additional Links */}
              <div className="pt-4 border-t">
                <Link
                  to="/about"
                  onClick={onClose}
                  className="block py-3 text-sm uppercase tracking-wider hover:text-gray-600"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="block py-3 text-sm uppercase tracking-wider hover:text-gray-600"
                >
                  Contact
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
