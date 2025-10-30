import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageHeader = ({ title, subtitle, breadcrumbs, backgroundImage, fullScreen = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative bg-white overflow-hidden ${fullScreen ? 'min-h-screen' : 'py-16 md:py-24'} ${!backgroundImage && 'border-b border-gray-200'} flex items-center justify-center`}
    >
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <>
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </>
      )}

      <div className={`container mx-auto px-4 relative z-10 h-full ${fullScreen ? 'flex flex-col justify-center items-center text-center' : ''}`}>
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`flex items-center gap-2 text-sm ${fullScreen ? 'mb-8' : 'mb-4'} justify-center`}
          >
            <Link to="/" className={`${backgroundImage ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-black'} transition-colors`}>
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className={`w-4 h-4 ${backgroundImage ? 'text-white/60' : 'text-gray-400'}`} />
                {crumb.href ? (
                  <Link
                    to={crumb.href}
                    className={`${backgroundImage ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-black'} transition-colors`}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={`${backgroundImage ? 'text-white' : 'text-black'} font-medium`}>{crumb.label}</span>
                )}
              </div>
            ))}
          </motion.nav>
        )}

        {/* Title */}
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`${fullScreen ? 'text-5xl md:text-7xl lg:text-8xl' : 'text-4xl md:text-5xl lg:text-6xl'} font-['Archivo'] font-bold uppercase tracking-wider ${backgroundImage ? 'text-white' : 'text-black'} ${fullScreen ? 'mb-6' : ''}`}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`${fullScreen ? 'text-xl md:text-2xl lg:text-3xl max-w-3xl' : 'mt-3 text-lg md:text-xl'} font-light ${backgroundImage ? 'text-white/95' : 'text-gray-600'}`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default PageHeader;
