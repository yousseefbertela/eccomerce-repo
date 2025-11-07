import Category from '../models/Category.js';
import connectDB from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const categories = [
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    description: 'Latest drops and recently added products',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400'
  },
  {
    name: 'Men\'s Collection',
    slug: 'mens-collection',
    description: 'Premium men\'s clothing and streetwear essentials',
    image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400'
  },
  {
    name: 'Women\'s Collection',
    slug: 'womens-collection',
    description: 'Elegant and stylish women\'s fashion pieces',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400'
  },
  {
    name: 'Hoodies & Sweatshirts',
    slug: 'hoodies-sweatshirts',
    description: 'Comfortable luxury hoodies and premium sweatshirts',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'
  },
  {
    name: 'T-Shirts & Tops',
    slug: 'tshirts-tops',
    description: 'Premium cotton tees and stylish tops',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
  },
  {
    name: 'Jackets & Outerwear',
    slug: 'jackets-outerwear',
    description: 'Designer jackets and statement outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'
  },
  {
    name: 'Bottoms',
    slug: 'bottoms',
    description: 'Premium jeans, joggers, and tailored pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400'
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Hats, bags, belts, and premium accessories',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400'
  },
  {
    name: 'Footwear',
    slug: 'footwear',
    description: 'Sneakers, boots, and premium footwear collection',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
  }
];

const seedCategories = async () => {
  try {
    await connectDB();

    // Clear existing categories
    await Category.deleteMany({});
    console.log('🗑️  Cleared existing categories');

    // Insert categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    createdCategories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.slug})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
