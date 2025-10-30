// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api';

// Image paths
export const IMAGE_BASE_URL = '/assets/images';

// Navigation Menu Structure
export const NAVIGATION_MENU = {
  newArrivals: {
    title: 'New Arrivals',
    href: '/collections/new-arrivals',
    categories: [
      { name: 'T-Shirts', href: '/collections/new-arrivals/t-shirts' },
      { name: 'Hoodies & Sweaters', href: '/collections/new-arrivals/hoodies-sweaters' },
      { name: 'Jackets', href: '/collections/new-arrivals/jackets' },
      { name: 'Shirts', href: '/collections/new-arrivals/shirts' },
      { name: 'Longsleeves', href: '/collections/new-arrivals/longsleeves' },
      { name: 'Pants', href: '/collections/new-arrivals/pants' },
      { name: 'Accessories', href: '/collections/new-arrivals/accessories' },
      { name: 'Shop All', href: '/collections/new-arrivals' },
    ],
  },
  shop: {
    title: 'Shop',
    href: '/shop',
    megaMenu: {
      tops: {
        title: 'Tops',
        items: [
          { name: 'All Tops', href: '/shop/tops' },
          { name: 'T-Shirts', href: '/shop/t-shirts' },
          { name: 'Shirts', href: '/shop/shirts' },
          { name: 'Longsleeves', href: '/shop/longsleeves' },
          { name: 'Hoodies & Sweaters', href: '/shop/hoodies-sweaters' },
          { name: 'Jackets', href: '/shop/jackets' },
        ],
      },
      bottoms: {
        title: 'Bottoms',
        items: [
          { name: 'All Bottoms', href: '/shop/bottoms' },
          { name: 'Pants', href: '/shop/pants' },
          { name: 'Jeans', href: '/shop/jeans' },
          { name: 'Sweatpants', href: '/shop/sweatpants' },
          { name: 'Shorts', href: '/shop/shorts' },
        ],
      },
      accessories: {
        title: 'Accessories',
        items: [
          { name: 'Bags', href: '/shop/bags' },
          { name: 'Headwear', href: '/shop/headwear' },
          { name: 'Footwear', href: '/shop/footwear' },
          { name: 'Socks', href: '/shop/socks' },
          { name: 'Other', href: '/shop/other' },
        ],
      },
    },
  },
  collections: {
    title: 'Collections',
    href: '/collections',
    items: [
      { name: 'Fall Winter 2025', href: '/collections/fw25' },
      { name: 'Signature Collection', href: '/collections/signature' },
      { name: 'Essentials', href: '/collections/essentials' },
      { name: 'Collaborations', href: '/collections/collaborations' },
    ],
  },
};

// Product Sizes
export const PRODUCT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Product Colors (can be expanded with hex values)
export const PRODUCT_COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Gray', value: '#9CA3AF' },
  { name: 'Navy', value: '#1E3A8A' },
  { name: 'Beige', value: '#D4C5B9' },
  { name: 'Olive', value: '#6B7245' },
];

// Sort Options
export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Selling', value: 'best_selling' },
];

// Filter Options
export const FILTER_CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Tops', value: 'tops' },
  { label: 'Bottoms', value: 'bottoms' },
  { label: 'Accessories', value: 'accessories' },
];

// Price Ranges
export const PRICE_RANGES = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under €50', value: '0-50' },
  { label: '€50 - €100', value: '50-100' },
  { label: '€100 - €200', value: '100-200' },
  { label: 'Over €200', value: '200-999999' },
];

// Social Media Links
export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://instagram.com/angal', icon: 'Instagram' },
  { name: 'Twitter', url: 'https://twitter.com/angal', icon: 'Twitter' },
  { name: 'Facebook', url: 'https://facebook.com/angal', icon: 'Facebook' },
  { name: 'TikTok', url: 'https://tiktok.com/@angal', icon: 'Music' },
];

// Footer Links
export const FOOTER_LINKS = {
  shop: [
    { name: 'New Arrivals', href: '/collections/new-arrivals' },
    { name: 'Best Sellers', href: '/collections/best-sellers' },
    { name: 'Collections', href: '/collections' },
    { name: 'Sale', href: '/sale' },
  ],
  help: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping & Returns', href: '/shipping-returns' },
    { name: 'Size Guide', href: '/size-guide' },
  ],
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideInRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  slideInLeft: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};

// Transition Configs
export const TRANSITIONS = {
  default: { duration: 0.3, ease: 'easeInOut' },
  smooth: { duration: 0.6, ease: 'easeInOut' },
  spring: { type: 'spring', stiffness: 300, damping: 30 },
};
