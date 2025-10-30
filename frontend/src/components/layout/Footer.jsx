import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Music } from 'lucide-react';
import { motion } from 'framer-motion';
import { FOOTER_LINKS, SOCIAL_LINKS } from '../../utils/constants';
import Input from '../ui/Input';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);

  // Check if current page is homepage
  const isHomePage = location.pathname === '/';

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && acceptsMarketing) {
      // TODO: Implement newsletter signup
      toast.success('Thank you for subscribing!');
      setEmail('');
      setAcceptsMarketing(false);
    } else if (!acceptsMarketing) {
      toast.error('Please accept our privacy policy');
    }
  };

  const iconMap = {
    Instagram,
    Facebook,
    Twitter,
    Music, // TikTok
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 10 }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Newsletter Section with Background Image - Daily Paper Style */}
      <div className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/images/background 2.jpg)' }}
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Animated Vertical Text - Left Side */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center overflow-hidden">
          <motion.div
            animate={{ y: [0, -100, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="writing-mode-vertical transform rotate-180 text-xs uppercase tracking-[0.5em] text-white/60 pl-4 whitespace-nowrap"
          >
            ANGAL PLAYLIST • ANGAL PLAYLIST • ANGAL PLAYLIST • ANGAL PLAYLIST •
          </motion.div>
        </div>

        {/* Animated Vertical Text - Right Side */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center overflow-hidden">
          <motion.div
            animate={{ y: [0, -100, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 7.5 }}
            className="writing-mode-vertical transform rotate-180 text-xs uppercase tracking-[0.5em] text-white/60 pr-4 whitespace-nowrap"
          >
            KEEP IN TOUCH • KEEP IN TOUCH • KEEP IN TOUCH • KEEP IN TOUCH •
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="container-custom relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-white leading-tight">
                Stay in<br />the know
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Sign up to be the first to know about<br />
                drops, special offers and more.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-6 py-4 bg-transparent border-b-2 border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-accent transition-colors text-lg"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-accent to-purple-600 text-white hover:shadow-lg hover:shadow-accent/50 font-semibold transition-all uppercase tracking-wider text-sm"
                  >
                    Sign Up
                  </motion.button>
                </div>

                <label className="flex items-start gap-3 text-sm text-white/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptsMarketing}
                    onChange={(e) => setAcceptsMarketing(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-white/30"
                  />
                  <span>
                    I agree to the{' '}
                    <Link to="/privacy" className="underline hover:text-accent transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </form>
            </motion.div>

            {/* Right Side - Spinning Vinyl/CD with Playlist */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center relative"
            >
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white leading-tight">
                Sounds<br />of now
              </h2>
              <p className="text-gray-300 mb-8 max-w-md mx-auto">
                Making people dance with our curated flagship store Playlists since 2019.
              </p>
              
              {/* Spinning Vinyl/CD */}
              <div className="relative mt-12 mx-auto w-64 h-64 mb-8">
                {/* Outer spinning ring with text */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="text-[4px] fill-white/60 uppercase tracking-widest font-display">
                      <textPath href="#circlePath">
                        DAILY PAPER PLAYLIST • DAILY PAPER PLAYLIST • DAILY PAPER PLAYLIST •
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* Spinning vinyl/CD disc */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-6 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black border-4 border-white/10 shadow-2xl"
                  style={{
                    backgroundImage: 'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 31%, transparent 31%, transparent 45%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.03) 46%, transparent 46%)'
                  }}
                >
                  {/* Center hole */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-purple-600 shadow-lg flex items-center justify-center">
                      <Music className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Vinyl grooves effect */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full border border-white/5"
                      style={{ 
                        margin: `${8 + i * 6}px`,
                      }}
                    />
                  ))}
                </motion.div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl opacity-50" />
              </div>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://music.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black font-semibold transition-all uppercase tracking-wider text-sm"
              >
                Listen on Apple Music
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Links Section with Decorative Elements */}
      <div className="container-custom py-16 relative">
        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        
        {/* Subtle Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(37, 99, 235, 0.4) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 relative z-10">
          {/* Shop */}
          <div>
            <h3 className="font-display font-semibold uppercase tracking-wider mb-4 text-accent">
              Shop
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-display font-semibold uppercase tracking-wider mb-4 text-accent">
              Help
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.help.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-display font-semibold uppercase tracking-wider mb-4 text-accent">
              About
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.about.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold uppercase tracking-wider mb-4 text-accent">
              Legal
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-accent/20 relative">
          {/* Decorative gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            {SOCIAL_LINKS.map((social, index) => {
              const Icon = iconMap[social.icon];
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-accent transition-colors"
                  aria-label={social.name}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                </motion.a>
              );
            })}
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ANGAL. All rights reserved.
          </p>
        </div>
      </div>

      {/* Marquee Text */}
      <div className={`py-6 overflow-hidden ${isHomePage ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <div className="flex whitespace-nowrap">
          <div className="flex animate-marquee">
            {Array(15)
              .fill('ANGAL')
              .map((text, i) => (
                <span key={i} className="text-3xl md:text-4xl font-display font-bold mx-8">
                  {text}
                </span>
              ))}
          </div>
          <div className="flex animate-marquee" aria-hidden="true">
            {Array(15)
              .fill('ANGAL')
              .map((text, i) => (
                <span key={i} className="text-3xl md:text-4xl font-display font-bold mx-8">
                  {text}
                </span>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
