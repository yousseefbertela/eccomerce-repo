import { motion } from 'framer-motion';
import { useState } from 'react';
import { faqs } from '../data/mockData';
import { ChevronDown } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader 
        title="FAQ"
        subtitle="Find answers to common questions"
        breadcrumbs={[{ label: 'FAQ' }]}
        backgroundImage="/assets/images/background 2.jpg"
        fullScreen={true}
      />
      
      <div className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="text-sm text-gray-500 font-semibold uppercase">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold mt-1">{faq.question}</h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openId === faq.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openId === faq.id && (
                <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-black text-white rounded-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="mb-6 text-gray-300">
            Our customer service team is here to help
          </p>
          <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
