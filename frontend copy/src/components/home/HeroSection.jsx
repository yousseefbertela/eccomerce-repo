import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/videos/13705321_1920_1080_24fps.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img
            src="/assets/images/Screenshot 2025-10-16 003532.png"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Season Tag with inline CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] mb-6 text-gray-300 font-normal"
          >
            FALL WINTER 25 —{' '}
            <Link
              to="/collections/fw25"
              className="underline decoration-white/50 underline-offset-4 hover:decoration-white transition-colors"
            >
              SHOP NOW
            </Link>
          </motion.p>

          {/* Brand Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-6 tracking-tight"
          >
            ANGAL
          </motion.h1>

          {/* Tagline (thin uppercase) */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm md:text-base lg:text-lg mb-12 max-w-2xl mx-auto font-light uppercase tracking-[0.25em] text-gray-200"
          >
            Where Contemporary Meets Culture
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/collections/new-arrivals">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-neutral min-w-[200px] border border-white"
                icon={ArrowRight}
                iconPosition="right"
              >
                Shop New Arrivals
              </Button>
            </Link>
            <Link to="/collections/fw25">
              <Button
                size="lg"
                variant="secondary"
                className="border-white text-white hover:bg-white hover:text-black min-w-[200px]"
              >
                Explore Collection
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Removed scroll indicator and button duplication resolved */}
    </section>
  );
};

export default HeroSection;
