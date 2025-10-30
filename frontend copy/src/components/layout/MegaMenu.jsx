import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MegaMenu = ({ isOpen, items, type = 'simple' }) => {
  if (type === 'simple') {
    // Editorial dropdown for New Arrivals & Collections
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-4 bg-white shadow-2xl border-t-2 border-black w-[700px] max-w-[95vw]"
          >
            <div className="flex">
              <div className="flex-1 px-8 py-8">
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 border-b border-gray-200 pb-2">{type === 'simple' ? 'Categories' : ''}</h3>
                <ul className="space-y-3">
                  {items.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={item.href}
                        className="text-xs md:text-sm text-gray-700 hover:text-black hover:translate-x-1 inline-block transition-all duration-200 tracking-wide"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-[250px] hidden md:flex items-center justify-center bg-neutral border-l border-gray-200 relative">
                <img
                  src="/assets/images/Screenshot 2025-10-16 003548.png"
                  alt="Menu example"
                  className="object-cover w-full h-full max-h-[180px] rounded shadow-lg"
                  style={{ filter: 'brightness(0.95)' }}
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <Link to={items[0]?.href || '/'} className="px-6 py-2 bg-white text-black font-display font-semibold uppercase tracking-wider border border-black shadow hover:bg-black hover:text-white transition-colors text-xs">Discover</Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Mega menu for Shop (Daily Paper style, centered)
  // Ensure parent is relative for correct centering
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-4 bg-white shadow-2xl border-t-2 border-black w-[1100px] max-w-[95vw] z-50"
          >
            <div className="flex">
              {/* Menu columns */}
              <div className="flex-1 grid grid-cols-3 gap-12 px-8 py-8">
                {Object.entries(items).map(([key, section]) => (
                  <div key={key}>
                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 border-b border-gray-200 pb-2">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.items.map((item, index) => (
                        <li key={index}>
                          <Link
                            to={item.href}
                            className="text-xs md:text-sm text-gray-700 hover:text-black hover:translate-x-1 inline-block transition-all duration-200 tracking-wide"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Example image */}
              <div className="w-[400px] hidden lg:flex items-center justify-center bg-neutral border-l border-gray-200 relative">
                <img
                  src="/assets/images/Screenshot 2025-10-16 003548.png"
                  alt="Shop example"
                  className="object-cover w-full h-full max-h-[350px] rounded shadow-lg"
                  style={{ filter: 'brightness(0.95)' }}
                />
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  <Link to="/shop" className="px-8 py-3 bg-white text-black font-display font-semibold uppercase tracking-wider border border-black shadow hover:bg-black hover:text-white transition-colors">Discover</Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
