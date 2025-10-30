import { motion } from 'framer-motion';
import { Leaf, Recycle, Heart, Globe } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

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
      <PageHeader 
        title="Sustainability"
        subtitle="Fashion with a conscience. Style with purpose."
        breadcrumbs={[{ label: 'Sustainability' }]}
        backgroundImage="/assets/images/bckground 6.webp"
        fullScreen={true}
      />

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

export default Sustainability;