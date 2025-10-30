import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const EditorialBanner = () => {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <div className="relative w-full h-full">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: 'url(/assets/images/newbackground.png)' }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-xl text-white"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-sm uppercase tracking-[0.3em] mb-4"
            >
              Fall Winter 25
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
            >
              A Celebration of Community
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-lg mb-8 leading-relaxed"
            >
              In the dark, creativity thrives. This collection underlines the equal importance 
              of darkness and light—both essential, one not existing without the other. 
              A balanced interplay where brightness comes out of the shadows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Link to="/collections/fw25">
                <Button
                  size="lg"
                  className="bg-black text-black hover:bg-black"
                >
                  Explore More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EditorialBanner;
