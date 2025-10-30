import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Lookbook = () => {
  const lookbookItems = [
    {
      id: 1,
      title: 'Urban Explorer',
      subtitle: 'City Streets Collection',
      image: '/assets/images/background1.jpeg',
      products: ['Oversized Hoodie', 'Cargo Pants', 'Classic Sneakers'],
      link: '/collections/fw25',
    },
    {
      id: 2,
      title: 'Minimal Essence',
      subtitle: 'Clean Lines & Bold Statements',
      image: '/assets/images/background 2.jpg',
      products: ['Tailored Jacket', 'Essential Tee', 'Straight Denim'],
      link: '/collections/fw25',
    },
    {
      id: 3,
      title: 'Night Out',
      subtitle: 'Evening Essentials',
      image: '/assets/images/newbackground.png',
      products: ['Leather Jacket', 'Black Jeans', 'Chelsea Boots'],
      link: '/collections/fw25',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Style <span className="bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">Inspiration</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover curated looks from our latest collection. Complete outfits crafted for the modern wardrobe.
          </p>
        </motion.div>

        {/* Lookbook Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lookbookItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <Link to={item.link} className="block">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-neutral">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      {/* Product Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.products.map((product, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs uppercase tracking-wider rounded-full"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                      
                      {/* View Look Button */}
                      <div className="flex items-center gap-2 text-sm uppercase tracking-wider font-semibold">
                        View Full Look
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Number Badge */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-accent to-purple-600 text-white rounded-full flex items-center justify-center font-display font-bold text-lg shadow-lg"
                  >
                    {index + 1}
                  </motion.div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm uppercase tracking-wider">
                    {item.subtitle}
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
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-accent transition-colors duration-300 font-semibold rounded-full"
          >
            Shop All Looks
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Lookbook;
