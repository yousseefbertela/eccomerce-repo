import { motion } from 'framer-motion';
import { Target, Users, Heart, Award } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To create contemporary streetwear that bridges cultures and inspires individuality.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a global community of like-minded individuals who value authenticity.',
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'Committed to ethical production and minimizing our environmental impact.',
    },
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Every piece is designed with meticulous attention to detail and premium materials.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHeader 
        title="About Us"
        subtitle="Creating contemporary streetwear that bridges cultures and inspires individuality"
        breadcrumbs={[{ label: 'About' }]}
        backgroundImage="/assets/images/bckground 6.webp"
        fullScreen={true}
      />

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-['Archivo'] font-bold uppercase mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Founded in 2025, ANGAL emerged from a vision to create a brand that celebrates
                diversity, authenticity, and contemporary culture. What started as a passion project
                has evolved into a global movement that resonates with individuals who value quality,
                creativity, and self-expression.
              </p>
              <p>
                Our designs draw inspiration from urban landscapes, street culture, and the vibrant
                communities that shape modern fashion. Each collection tells a story, blending
                traditional craftsmanship with innovative design techniques to create pieces that
                are both timeless and progressive.
              </p>
              <p>
                We believe fashion is more than just clothing—it's a form of personal expression,
                a way to connect with others, and a means to make a positive impact on the world.
                That's why we're committed to sustainable practices, ethical manufacturing, and
                supporting the communities that inspire us.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-['Archivo'] font-bold uppercase mb-16 text-center"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <value.icon className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-['Archivo'] font-bold uppercase mb-8">
              Global Team, Local Impact
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
              Our diverse team of designers, artists, and creators work together to bring you
              collections that celebrate individuality and cultural authenticity. We're united
              by our passion for creating meaningful fashion that makes a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-['Archivo'] font-bold uppercase mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of a community that values authenticity, creativity, and positive change.
            </p>
            <button className="bg-white text-black px-12 py-4 text-lg font-semibold uppercase hover:bg-gray-100 transition-colors">
              Explore Collections
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
