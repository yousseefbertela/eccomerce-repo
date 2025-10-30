import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';

const InstagramFeed = () => {
  // Placeholder images - In production, you'd fetch from Instagram API or use a service like SnapWidget
  const instagramPosts = [
    {
      id: 1,
      image: '/assets/images/background1.jpeg',
      link: 'https://www.instagram.com/youssefaziz_764/',
    },
    {
      id: 2,
      image: '/assets/images/background 2.jpg',
      link: 'https://www.instagram.com/youssefaziz_764/',
    },
    {
      id: 3,
      image: '/assets/images/newbackground.png',
      link: 'https://www.instagram.com/youssefaziz_764/',
    },
    {
      id: 4,
      image: '/assets/images/background1.jpeg',
      link: 'https://www.instagram.com/youssefaziz_764/',
    },
    {
      id: 5,
      image: '/assets/images/background 2.jpg',
      link: 'https://www.instagram.com/youssefaziz_764/',
    },
    {
      id: 6,
      image: '/assets/images/newbackground.png',
      link: 'https://www.instagram.com/youssefaziz_764/',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-neutral">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Instagram className="w-8 h-8 text-accent" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                @youssefaziz_764
              </span>
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Follow us for daily inspiration and exclusive content
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden bg-black"
            >
              {/* Image */}
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <Instagram 
                  className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.instagram.com/youssefaziz_764/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Instagram className="w-5 h-5" />
            Follow @youssefaziz_764
          </a>
        </motion.div>

        {/* Note for developer */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <p className="font-semibold mb-2">🔧 Developer Note:</p>
          <p>
            To display real Instagram posts, integrate with:{' '}
            <a 
              href="https://developers.facebook.com/docs/instagram-basic-display-api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              Instagram Basic Display API
            </a>
            {' '}or use services like{' '}
            <a 
              href="https://snapwidget.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              SnapWidget
            </a>
            {' '}or{' '}
            <a 
              href="https://www.juicer.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              Juicer
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
