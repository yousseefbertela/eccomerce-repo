import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const FeaturedCollection = ({ products }) => {
  // Get featured products
  const featured = products.filter(p => p.isFeatured).slice(0, 3);

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/images/background3.png)' }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            Season <span className="text-accent drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]">Highlights</span>
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Carefully curated pieces that define this season's aesthetic
          </p>
        </motion.div>

        {/* Featured Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link to={`/product/${product.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    style={index === 1 ? { opacity: 0 } : {}}
                  />
                  {/* Transparent background for middle product (PROD 16) */}
                  {index === 1 && (
                    <div className="absolute inset-0 bg-transparent" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-display font-semibold mb-2 group-hover:underline text-white">
                    {product.name}
                  </h3>
                  <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-lg font-semibold text-white">
                    €{product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/shop">
            <Button size="lg">Shop All</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
