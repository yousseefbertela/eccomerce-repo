import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import KeepInTouchButton from './KeepInTouchButton';
import NewsletterModal from './NewsletterModal';

import { useState } from 'react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {!hideButton && (
        <KeepInTouchButton onClick={() => setNewsletterOpen(true)} />
      )}
      <NewsletterModal
        open={newsletterOpen}
        onClose={() => setNewsletterOpen(false)}
        onSuccess={() => { setNewsletterOpen(false); setHideButton(true); }}
      />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex-1"
      >
        {children}
      </motion.main>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Layout;
