import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import NewArrivals from '../components/home/NewArrivals';
import EditorialBanner from '../components/home/EditorialBanner';
import FeaturedCollection from '../components/home/FeaturedCollection';
import InstagramFeed from '../components/home/InstagramFeed';
import Lookbook from '../components/home/Lookbook';
// import { mockProducts } from '../data/mockData';
import { useEffect, useState } from 'react';
import { productsAPI } from '../lib/api';
import MarqueeBar from '../components/layout/MarqueeBar';
import SEO from '../components/ui/SEO';

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        // New arrivals: use general list sorted by newest and take first 8
        const all = await productsAPI.getAll({ sort: 'newest' });
        setNewArrivals((all.data || []).slice(0, 8));
      } catch (e) {
        console.error('Failed to load new arrivals', e);
      }
      try {
        const feat = await productsAPI.getFeatured();
        setFeatured(feat.data || []);
      } catch (e) {
        console.error('Failed to load featured', e);
      }
    };
    load();
  }, []);
  return (
    <>
      <SEO 
        title="Home | ANGAL - Premium Fashion & Streetwear"
        description="Discover the latest trends in fashion and streetwear at ANGAL. Shop new arrivals, exclusive collections, and premium apparel for men and women."
        keywords="fashion, streetwear, clothing, apparel, online shopping, new arrivals, premium fashion, ANGAL"
        canonicalUrl="/"
      />
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
  <NewArrivals products={newArrivals} />

      {/* Editorial Banner */}
      <EditorialBanner />

  {/* Featured Collection */}
  <FeaturedCollection products={featured} />

      {/* Lookbook */}
      <Lookbook />

      {/* Instagram Feed */}
      <InstagramFeed />
      </motion.div>
    </>
  );
};

export default Home;
