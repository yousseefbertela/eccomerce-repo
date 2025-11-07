import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';

const CurrencySelector = () => {
  const { currency, currencies, changeCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 transition-colors rounded"
        aria-label="Select currency"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currency}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded z-20 overflow-hidden"
            >
              {currencies.map((curr) => (
                <motion.button
                  key={curr}
                  whileHover={{ backgroundColor: '#f5f5f5' }}
                  onClick={() => {
                    changeCurrency(curr);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                    curr === currency
                      ? 'bg-accent text-white font-semibold'
                      : 'text-black hover:bg-neutral'
                  }`}
                >
                  {curr}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CurrencySelector;
