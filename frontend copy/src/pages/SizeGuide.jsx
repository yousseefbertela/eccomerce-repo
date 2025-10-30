import { motion } from 'framer-motion';
import { useState } from 'react';
import { Ruler } from 'lucide-react';
import { sizeGuide } from '../data/mockData';
import PageHeader from '../components/ui/PageHeader';

const SizeGuide = () => {
  const [activeTab, setActiveTab] = useState('tops');

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="Size Guide"
        subtitle="Find your perfect fit"
        breadcrumbs={[{ label: 'Size Guide' }]}
        backgroundImage="/assets/images/background 5.webp"
        fullScreen={true}
      />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('tops')}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'tops'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tops
          </button>
          <button
            onClick={() => setActiveTab('bottoms')}
            className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'bottoms'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Bottoms
          </button>
        </div>

        {/* Size Table */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="overflow-x-auto mb-12"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-4 text-left">Size</th>
                {activeTab === 'tops' ? (
                  <>
                    <th className="p-4 text-center">Chest (cm)</th>
                    <th className="p-4 text-center">Length (cm)</th>
                    <th className="p-4 text-center">Sleeve (cm)</th>
                  </>
                ) : (
                  <>
                    <th className="p-4 text-center">Waist (cm)</th>
                    <th className="p-4 text-center">Hip (cm)</th>
                    <th className="p-4 text-center">Inseam (cm)</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sizeGuide[activeTab].map((row) => (
                <tr key={row.size} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-semibold">{row.size}</td>
                  {activeTab === 'tops' ? (
                    <>
                      <td className="p-4 text-center">{row.chest}</td>
                      <td className="p-4 text-center">{row.length}</td>
                      <td className="p-4 text-center">{row.sleeve}</td>
                    </>
                  ) : (
                    <>
                      <td className="p-4 text-center">{row.waist}</td>
                      <td className="p-4 text-center">{row.hip}</td>
                      <td className="p-4 text-center">{row.inseam}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Measuring Instructions */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Ruler className="w-6 h-6" />
              <h2 className="text-2xl font-bold uppercase">How to Measure</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold mb-2">Chest</h3>
                <p>Measure around the fullest part of your chest, keeping the tape horizontal.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Waist</h3>
                <p>Measure around your natural waistline, keeping the tape comfortably loose.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Hip</h3>
                <p>Measure around the fullest part of your hips, approximately 20cm below your waist.</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold uppercase mb-4">Fit Tips</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>Measurements can vary by style. Check product descriptions for fit details.</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>When between sizes, we recommend sizing up for a more relaxed fit.</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>All measurements are approximate and may vary slightly.</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Contact our support team if you need help finding your size.</span>
              </li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;