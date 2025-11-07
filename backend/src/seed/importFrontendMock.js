import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

// Import mock data from frontend
import { mockCategories, mockProducts } from '../../../frontend/src/data/mockData.js';

dotenv.config();

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const upsertCategoriesFromMock = async () => {
  const results = [];
  for (const c of mockCategories) {
    const doc = await Category.findOneAndUpdate(
      { name: c.name },
      {
        name: c.name,
        slug: c.slug || generateSlug(c.name),
        description: c.description || '',
        image: c.image || '',
        isActive: true,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    results.push(doc);
  }
  return results;
};

const seedFromFrontendMock = async () => {
  try {
    await connectDB();

    // 1) Ensure categories exist (upsert based on mock categories)
    const categories = await upsertCategoriesFromMock();
    const categoryMap = new Map(categories.map((c) => [c.name, c._id]));

    // 2) Clear products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // 3) Map mock products to Product schema
    const docs = mockProducts.map((p) => {
      const hasSale = typeof p.salePrice === 'number' && p.salePrice > 0 && p.salePrice < p.price;
      const price = hasSale ? p.salePrice : p.price;
      const comparePrice = hasSale ? p.price : 0;
      const categoryId = categoryMap.get(p.category);

      return {
        name: p.name,
        slug: p.slug || generateSlug(p.name),
        description: p.description || '',
        price,
        comparePrice,
        category: categoryId,
        images: Array.isArray(p.images) ? p.images : [],
        stock: typeof p.stock === 'number' ? p.stock : (p.inStock === false ? 0 : 20),
        lowStockThreshold: 10,
        sku: p.sku || undefined,
        brand: 'Angal',
        rating: typeof p.rating === 'number' ? p.rating : 0,
        reviewCount: typeof p.reviewCount === 'number' ? p.reviewCount : 0,
        tags: [
          p.categorySlug,
          ...(Array.isArray(p.colors) ? p.colors.map((c) => c.name).filter(Boolean) : []),
          ...(Array.isArray(p.sizes) ? p.sizes : []),
        ].filter(Boolean),
        isFeatured: Boolean(p.isFeatured || p.isBestSeller || p.isNew),
        isActive: true,
        weight: 0,
        dimensions: { length: 0, width: 0, height: 0 },
        soldCount: 0,
      };
    });

    // 4) Insert
    const created = await Product.insertMany(docs);
    console.log(`✅ Inserted ${created.length} products from frontend mock data`);

    // 5) Recompute category counts
    for (const c of categories) {
      const count = await Product.countDocuments({ category: c._id });
      await Category.findByIdAndUpdate(c._id, { productCount: count });
    }
    console.log('✅ Updated category product counts');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding from frontend mock:', err);
    process.exit(1);
  }
};

seedFromFrontendMock();
