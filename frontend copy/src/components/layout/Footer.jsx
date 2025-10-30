import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Instagram, Facebook, Twitter, Music } from 'lucide-react';
import { FOOTER_LINKS, SOCIAL_LINKS } from '../../utils/constants';
import Input from '../ui/Input';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);

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
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container-custom py-16 md:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Stay in the know
            </h2>
            <p className="text-gray-400 mb-8">
              Sign up to be the first to know about drops, special offers and more.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button type="submit" size="lg" className="sm:w-auto">
                  Sign Up
                </Button>
              </div>

              <label className="flex items-center justify-center gap-2 text-sm text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptsMarketing}
                  onChange={(e) => setAcceptsMarketing(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>
                  I agree to the{' '}
                  <Link to="/privacy" className="underline hover:text-white">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </form>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Shop */}
          <div>
            <h3 className="font-display font-semibold uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-display font-semibold uppercase tracking-wider mb-4">
              Help
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.help.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-display font-semibold uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.about.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-display font-semibold uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            {SOCIAL_LINKS.map((social, index) => {
              const Icon = iconMap[social.icon];
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                </a>
              );
            })}
          </div>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ANGAL. All rights reserved.
          </p>
        </div>
      </div>

      {/* Marquee Text */}
      <div className="bg-white text-black py-4 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-marquee">
          {Array(10)
            .fill('ANGAL')
            .map((text, i) => (
              <span key={i} className="text-2xl font-display font-bold mx-8">
                {text}
              </span>
            ))}
        </div>
        <div className="inline-block animate-marquee">
          {Array(10)
            .fill('ANGAL')
            .map((text, i) => (
              <span key={i} className="text-2xl font-display font-bold mx-8">
                {text}
              </span>
            ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
