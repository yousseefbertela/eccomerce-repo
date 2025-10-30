import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../shop/ProductCard';
import Button from '../ui/Button';

const NewArrivals = ({ products }) => {
  // Show first 8 products
  const displayProducts = products.slice(0, 8);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/images/background1.jpeg)' }}
      />
      <div className="absolute inset-0 bg-black/60" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              textShadow: ['0 0 20px rgba(37, 99, 235, 0.3)', '0 0 40px rgba(37, 99, 235, 0.5)', '0 0 20px rgba(37, 99, 235, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h2 className="text-4xl md:text-5xl font-archivo font-extrabold uppercase tracking-tight mb-4 text-white">
              New <span className="text-accent">Arrivals</span>
            </h2>
          </motion.div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-16">
          {displayProducts.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/collections/new-arrivals">
            <Button size="lg"
                className="bg-accent text-white hover:bg-accent-hover hover:scale-105 min-w-[200px] border-0 shadow-lg shadow-accent/30"
                icon={ArrowRight}
                iconPosition="right">
              View All New Arrivals
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default NewArrivals;
