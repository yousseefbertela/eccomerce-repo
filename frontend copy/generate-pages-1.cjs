const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const pages = {
  'ShippingReturns.jsx': `import { motion } from 'framer-motion';
import { Package, RotateCcw, Truck, Globe } from 'lucide-react';

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-['Archivo'] font-bold uppercase mb-6">
            Shipping & Returns
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about delivery and returns
          </p>
        </motion.div>

        {/* Shipping Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-8 h-8" />
            <h2 className="text-3xl font-bold uppercase">Shipping Information</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Standard Shipping
              </h3>
              <p className="text-gray-700 mb-2"><strong>Delivery Time:</strong> 3-5 business days</p>
              <p className="text-gray-700 mb-2"><strong>Cost:</strong> Free on orders over $100, otherwise $9.99</p>
              <p className="text-gray-600">
                Standard shipping is available for all domestic orders. Tracking information will be provided once your order ships.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                International Shipping
              </h3>
              <p className="text-gray-700 mb-2"><strong>Delivery Time:</strong> 7-14 business days</p>
              <p className="text-gray-700 mb-2"><strong>Cost:</strong> Calculated at checkout</p>
              <p className="text-gray-600">
                We ship worldwide. International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Order Processing</h3>
              <p className="text-gray-600">
                Orders are processed Monday through Friday, excluding holidays. Orders placed on weekends or holidays will be processed the next business day. You will receive an email confirmation once your order ships.
              </p>
            </div>
          </div>
        </section>

        {/* Returns Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="w-8 h-8" />
            <h2 className="text-3xl font-bold uppercase">Return Policy</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">30-Day Returns</h3>
              <p className="text-gray-600 mb-4">
                We offer free returns within 30 days of delivery. Items must be:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Unworn and unwashed</li>
                <li>In original condition with all tags attached</li>
                <li>In original packaging when possible</li>
                <li>Accompanied by original receipt or order confirmation</li>
              </ul>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">How to Return</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-600 ml-4">
                <li>Log into your account and navigate to Orders</li>
                <li>Select the item(s) you wish to return</li>
                <li>Follow the prompts to generate a return label</li>
                <li>Package your item(s) securely</li>
                <li>Drop off at any authorized carrier location</li>
              </ol>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Refund Processing</h3>
              <p className="text-gray-600">
                Once we receive your return, we'll inspect the items and process your refund within 5-7 business days. The refund will be issued to your original payment method. Please allow additional time for your bank to process the refund.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Exchanges</h3>
              <p className="text-gray-600">
                For size or color exchanges, we recommend returning your original item for a refund and placing a new order. This ensures you receive your preferred item as quickly as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-black text-white rounded-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-3">Need Help?</h2>
          <p className="mb-6 text-gray-300">
            Our customer service team is ready to assist you
          </p>
          <button className="bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingReturns;`,

  'SizeGuide.jsx': `import { motion } from 'framer-motion';
import { useState } from 'react';
import { Ruler } from 'lucide-react';
import { sizeGuide } from '../data/mockData';

const SizeGuide = () => {
  const [activeTab, setActiveTab] = useState('tops');

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-['Archivo'] font-bold uppercase mb-6">
            Size Guide
          </h1>
          <p className="text-xl text-gray-600">
            Find your perfect fit with our comprehensive size charts
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('tops')}
            className={\`px-8 py-3 rounded-lg font-semibold transition-colors \${
              activeTab === 'tops'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }\`}
          >
            Tops
          </button>
          <button
            onClick={() => setActiveTab('bottoms')}
            className={\`px-8 py-3 rounded-lg font-semibold transition-colors \${
              activeTab === 'bottoms'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }\`}
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
  );
};

export default SizeGuide;`,

  'Sustainability.jsx': `import { motion } from 'framer-motion';
import { Leaf, Recycle, Heart, Globe } from 'lucide-react';

const Sustainability = () => {
  const initiatives = [
    {
      icon: Leaf,
      title: 'Sustainable Materials',
      description: 'We prioritize organic cotton, recycled polyester, and eco-friendly fabrics in our collections.',
      stats: '75% of our products use sustainable materials',
    },
    {
      icon: Recycle,
      title: 'Circular Fashion',
      description: 'Our take-back program gives your old clothes a second life through recycling and upcycling.',
      stats: '10,000+ items recycled since 2025',
    },
    {
      icon: Heart,
      title: 'Ethical Production',
      description: 'Fair wages, safe working conditions, and transparent supply chains are non-negotiable.',
      stats: '100% of factories audited annually',
    },
    {
      icon: Globe,
      title: 'Carbon Neutral Shipping',
      description: 'We offset 100% of shipping emissions and use minimal, recycled packaging.',
      stats: 'Carbon neutral since day one',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] bg-gradient-to-br from-green-900 to-green-700 text-white flex items-center justify-center"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-['Archivo'] font-bold uppercase mb-6"
          >
            Sustainability
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Fashion with a conscience. Building a better future, one garment at a time.
          </motion.p>
        </div>
      </motion.div>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-['Archivo'] font-bold uppercase mb-8">Our Commitment</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              We believe that great fashion shouldn't come at the cost of our planet. That's why we're committed
              to sustainable practices at every stage—from sourcing raw materials to delivering your order. We're
              not perfect, but we're constantly evolving and improving our impact on the environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-['Archivo'] font-bold uppercase mb-16 text-center"
          >
            Our Initiatives
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm"
              >
                <initiative.icon className="w-12 h-12 mb-4 text-green-600" />
                <h3 className="text-2xl font-bold mb-3">{initiative.title}</h3>
                <p className="text-gray-700 mb-4">{initiative.description}</p>
                <div className="text-sm font-semibold text-green-600 uppercase">
                  {initiative.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-['Archivo'] font-bold uppercase mb-8 text-center">2030 Goals</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">100% Sustainable Materials</h3>
                  <span className="text-2xl font-bold text-green-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">Zero Waste Production</h3>
                  <span className="text-2xl font-bold text-green-600">60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">Renewable Energy</h3>
                  <span className="text-2xl font-bold text-green-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-['Archivo'] font-bold uppercase mb-6">
              Join the Movement
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Every purchase supports our mission to create a more sustainable fashion industry.
            </p>
            <button className="bg-white text-black px-12 py-4 text-lg font-semibold uppercase hover:bg-gray-100 transition-colors">
              Shop Sustainable
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;`,

  'Careers.jsx': `import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react';

const Careers = () => {
  const benefits = [
    'Competitive salary and performance bonuses',
    'Comprehensive health insurance',
    'Flexible work arrangements',
    'Professional development opportunities',
    'Employee discount on all products',
    'Paid time off and holidays',
    'Creative and collaborative environment',
    'Wellness programs and gym membership',
  ];

  const openings = [
    {
      title: 'Senior Fashion Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time',
    },
    {
      title: 'E-commerce Manager',
      department: 'Digital',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Social Media Coordinator',
      department: 'Marketing',
      location: 'Los Angeles, CA',
      type: 'Full-time',
    },
    {
      title: 'Retail Store Manager',
      department: 'Retail',
      location: 'Miami, FL',
      type: 'Full-time',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] bg-black text-white flex items-center justify-center"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-['Archivo'] font-bold uppercase mb-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300"
          >
            Build your career with a brand that values creativity, diversity, and innovation
          </motion.p>
        </div>
      </motion.div>

      {/* Why Join */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-['Archivo'] font-bold uppercase mb-16 text-center"
          >
            Why ANGAL?
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, title: 'Growth', desc: 'Continuous learning and career advancement' },
              { icon: Users, title: 'Culture', desc: 'Collaborative and inclusive workplace' },
              { icon: TrendingUp, title: 'Innovation', desc: 'Work on cutting-edge projects' },
              { icon: Heart, title: 'Impact', desc: 'Make a difference in sustainable fashion' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <item.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-['Archivo'] font-bold uppercase mb-12 text-center">Benefits</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3 p-4 bg-white rounded-lg">
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-['Archivo'] font-bold uppercase mb-12 text-center">Open Positions</h2>
            <div className="space-y-4">
              {openings.map((job) => (
                <div key={job.title} className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <button className="bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-['Archivo'] font-bold uppercase mb-6">
              Don't See a Perfect Fit?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always looking for talented individuals. Send us your resume!
            </p>
            <button className="bg-white text-black px-12 py-4 text-lg font-semibold uppercase hover:bg-gray-100 transition-colors">
              Submit Resume
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Careers;`,
};

// Write all pages
Object.entries(pages).forEach(([filename, content]) => {
  const filepath = path.join(pagesDir, filename);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`✅ Created ${filename}`);
});

console.log(`\n🎉 Generated ${Object.keys(pages).length} complete pages!`);
