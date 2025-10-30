import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

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
      <PageHeader 
        title="Join Our Team"
        subtitle="Build your career with a brand that values creativity, diversity, and innovation"
        breadcrumbs={[{ label: 'Careers' }]}
        backgroundImage="/assets/images/background 2.jpg"
        fullScreen={true}
      />

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

export default Careers;