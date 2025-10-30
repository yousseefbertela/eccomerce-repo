import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import NewArrivals from '../components/home/NewArrivals';
import EditorialBanner from '../components/home/EditorialBanner';
import FeaturedCollection from '../components/home/FeaturedCollection';
import InstagramFeed from '../components/home/InstagramFeed';
import Lookbook from '../components/home/Lookbook';
import { mockProducts } from '../data/mockData';
import MarqueeBar from '../components/layout/MarqueeBar';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Flowing ANGAL Marquee at top */}
      <MarqueeBar />

      {/* Hero Section */}
      <HeroSection />

      {/* New Arrivals */}
      <NewArrivals products={mockProducts} />

      {/* Editorial Banner */}
      <EditorialBanner />

      {/* Featured Collection */}
      <FeaturedCollection products={mockProducts} />

      {/* Lookbook */}
      <Lookbook />

      {/* Instagram Feed */}
      <InstagramFeed />
    </motion.div>
  );
};

export default Home;
