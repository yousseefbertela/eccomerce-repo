import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SizeGuide = ({ isOpen, onClose }) => {
  const sizeChart = {
    tops: [
      { size: 'XS', chest: '86-91', waist: '71-76', hips: '91-96' },
      { size: 'S', chest: '91-96', waist: '76-81', hips: '96-101' },
      { size: 'M', chest: '96-101', waist: '81-86', hips: '101-106' },
      { size: 'L', chest: '101-106', waist: '86-91', hips: '106-111' },
      { size: 'XL', chest: '106-111', waist: '91-96', hips: '111-116' },
      { size: 'XXL', chest: '111-116', waist: '96-101', hips: '116-121' },
    ],
    bottoms: [
      { size: 'XS', waist: '71-76', hips: '91-96', inseam: '76' },
      { size: 'S', waist: '76-81', hips: '96-101', inseam: '78' },
      { size: 'M', waist: '81-86', hips: '101-106', inseam: '80' },
      { size: 'L', waist: '86-91', hips: '106-111', inseam: '82' },
      { size: 'XL', waist: '91-96', hips: '111-116', inseam: '84' },
      { size: 'XXL', waist: '96-101', hips: '116-121', inseam: '86' },
    ],
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold">Size Guide</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close size guide"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* How to Measure */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">How to Measure</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape parallel to the floor.</li>
                    <li><strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.</li>
                    <li><strong>Hips:</strong> Measure around the fullest part of your hips, about 8" below your waist.</li>
                    <li><strong>Inseam:</strong> Measure from the crotch to the ankle bone.</li>
                  </ul>
                </div>

                {/* Tops Size Chart */}
                <div>
                  <h3 className="font-semibold text-xl mb-4">Tops & Outerwear (cm)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Chest</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Hips</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeChart.tops.map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 font-semibold">{row.size}</td>
                            <td className="border border-gray-300 px-4 py-3">{row.chest}</td>
                            <td className="border border-gray-300 px-4 py-3">{row.waist}</td>
                            <td className="border border-gray-300 px-4 py-3">{row.hips}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bottoms Size Chart */}
                <div>
                  <h3 className="font-semibold text-xl mb-4">Bottoms (cm)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Waist</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Hips</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Inseam</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeChart.bottoms.map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3 font-semibold">{row.size}</td>
                            <td className="border border-gray-300 px-4 py-3">{row.waist}</td>
                            <td className="border border-gray-300 px-4 py-3">{row.hips}</td>
                            <td className="border border-gray-300 px-4 py-3">{row.inseam}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Fit Tips */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-3">Fit Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
                    <li>Our garments are designed for a contemporary fit</li>
                    <li>If you're between sizes, we recommend sizing up</li>
                    <li>Check the product description for specific fit details</li>
                    <li>All measurements are approximate and may vary slightly</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SizeGuide;
