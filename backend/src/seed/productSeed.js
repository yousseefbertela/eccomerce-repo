import Product from '../models/Product.js';
import Category from '../models/Category.js';
import connectDB from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Helper function to generate slug
const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const seedProducts = async () => {
  try {
    await connectDB();

    // Get categories
    const categories = await Category.find({});
    if (categories.length === 0) {
      console.log('❌ No categories found. Please run categorySeed first.');
      process.exit(1);
    }

    // Create a map of category names to IDs
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    const products = [
      // Men's Collection
      {
        name: 'Angal Signature Hoodie - Black',
        description: 'Premium heavyweight cotton hoodie with embroidered Angal logo. Features kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect blend of comfort and style.',
        price: 1299,
        comparePrice: 1799,
        category: categoryMap['Hoodies & Sweatshirts'],
        images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600'],
        stock: 50,
        isFeatured: true,
        tags: ['hoodie', 'premium', 'black', 'signature']
      },
      {
        name: 'Oversized Graphic T-Shirt - White',
        description: 'Ultra-soft oversized fit tee with exclusive Angal graphic print. Made from 100% organic cotton with a vintage washed finish.',
        price: 599,
        comparePrice: 799,
        category: categoryMap['T-Shirts & Tops'],
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'],
        stock: 100,
        isFeatured: true,
        tags: ['tshirt', 'oversized', 'graphic', 'white']
      },
      {
        name: 'Premium Denim Jacket - Indigo',
        description: 'Classic denim jacket with modern fit. Features Angal leather patch, vintage brass buttons, and premium Japanese denim fabric.',
        price: 2499,
        comparePrice: 3299,
        category: categoryMap['Jackets & Outerwear'],
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600'],
        stock: 30,
        isFeatured: true,
        tags: ['denim', 'jacket', 'indigo', 'premium']
      },

      // Women's Collection
      {
        name: 'Angal Cropped Hoodie - Cream',
        description: 'Luxury cropped hoodie in soft cream color. Features embroidered logo, dropped shoulders, and premium French terry fabric.',
        price: 1199,
        comparePrice: 1599,
        category: categoryMap['Women\'s Collection'],
        images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600'],
        stock: 45,
        isFeatured: true,
        tags: ['hoodie', 'cropped', 'cream', 'womens']
      },
      {
        name: 'Minimalist Long Sleeve Tee - Sand',
        description: 'Premium long sleeve t-shirt with clean design. Ultra-soft modal blend fabric with subtle Angal branding.',
        price: 699,
        comparePrice: 899,
        category: categoryMap['Women\'s Collection'],
        images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600'],
        stock: 60,
        tags: ['longsleeve', 'minimalist', 'sand', 'womens']
      },

      // Bottoms
      {
        name: 'Tapered Cargo Joggers - Olive',
        description: 'Modern cargo joggers with premium cotton twill. Features multiple utility pockets, adjustable waist, and tapered fit.',
        price: 1499,
        comparePrice: 1999,
        category: categoryMap['Bottoms'],
        images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600'],
        stock: 40,
        isFeatured: true,
        tags: ['joggers', 'cargo', 'olive', 'streetwear']
      },
      {
        name: 'Slim Fit Stretch Jeans - Raw Black',
        description: 'Premium stretch denim with slim fit. Features Angal leather patch, YKK zippers, and subtle fade finish.',
        price: 1799,
        comparePrice: 2399,
        category: categoryMap['Bottoms'],
        images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600'],
        stock: 55,
        isFeatured: true,
        tags: ['jeans', 'denim', 'black', 'slim']
      },

      // Jackets & Outerwear
      {
        name: 'Bomber Jacket - Navy',
        description: 'Classic bomber with modern details. Features premium nylon shell, quilted lining, and ribbed collar and cuffs.',
        price: 2999,
        comparePrice: 3999,
        category: categoryMap['Jackets & Outerwear'],
        images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600'],
        stock: 25,
        tags: ['bomber', 'jacket', 'navy', 'outerwear']
      },
      {
        name: 'Puffer Vest - Charcoal',
        description: 'Lightweight puffer vest perfect for layering. Water-resistant fabric with premium down fill and hidden pockets.',
        price: 1899,
        comparePrice: 2499,
        category: categoryMap['Jackets & Outerwear'],
        images: ['https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600'],
        stock: 35,
        tags: ['puffer', 'vest', 'charcoal', 'layering']
      },

      // Accessories
      {
        name: 'Angal Dad Cap - Black',
        description: 'Premium cotton dad cap with embroidered Angal logo. Features adjustable strap and curved brim.',
        price: 399,
        comparePrice: 549,
        category: categoryMap['Accessories'],
        images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600'],
        stock: 80,
        tags: ['hat', 'cap', 'black', 'accessories']
      },
      {
        name: 'Canvas Tote Bag - Natural',
        description: 'Heavy-duty canvas tote with leather handles. Features Angal logo print and inner pocket. Perfect everyday carry.',
        price: 799,
        comparePrice: 1099,
        category: categoryMap['Accessories'],
        images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600'],
        stock: 50,
        isFeatured: true,
        tags: ['bag', 'tote', 'canvas', 'natural']
      },

      // Footwear
      {
        name: 'Classic White Sneakers',
        description: 'Minimalist leather sneakers with Angal embossed logo. Premium Italian leather with cushioned insole.',
        price: 2299,
        comparePrice: 2999,
        category: categoryMap['Footwear'],
        images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600'],
        stock: 40,
        isFeatured: true,
        tags: ['sneakers', 'white', 'leather', 'minimal']
      },

      // T-Shirts & Tops
      {
        name: 'Essential Crew Neck Tee 3-Pack',
        description: 'Set of 3 premium crew neck tees in Black, White, and Grey. Made from soft combed cotton with reinforced seams.',
        price: 1299,
        comparePrice: 1799,
        category: categoryMap['T-Shirts & Tops'],
        images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600'],
        stock: 70,
        tags: ['tshirt', 'pack', 'essentials', 'basics']
      },
      {
        name: 'Vintage Wash Graphic Tee - Sage',
        description: 'Relaxed fit tee with vintage wash and exclusive Angal artwork. Soft-hand print on premium cotton.',
        price: 649,
        comparePrice: 849,
        category: categoryMap['T-Shirts & Tops'],
        images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600'],
        stock: 65,
        tags: ['tshirt', 'vintage', 'graphic', 'sage']
      },

      // More Men's Collection
      {
        name: 'Premium Zip Hoodie - Heather Grey',
        description: 'Full-zip hoodie in soft heather grey. Features YKK zipper, kangaroo pockets, and brushed fleece interior.',
        price: 1499,
        comparePrice: 1999,
        category: categoryMap['Men\'s Collection'],
        images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600'],
        stock: 45,
        tags: ['hoodie', 'zip', 'grey', 'mens']
      }
    ];

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Add slugs to products
    const productsWithSlugs = products.map(product => ({
      ...product,
      slug: generateSlug(product.name)
    }));

    // Insert products
    const createdProducts = await Product.insertMany(productsWithSlugs);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Update category product counts
    for (const category of categories) {
      const count = await Product.countDocuments({ category: category._id });
      await Category.findByIdAndUpdate(category._id, { productCount: count });
    }
    console.log('✅ Updated category product counts');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
