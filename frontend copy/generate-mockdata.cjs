const fs = require('fs');
const path = require('path');

const categories = [
  'New Arrivals', 'T-Shirts', 'Hoodies', 'Jackets', 'Pants', 'Shorts', 'Accessories', 'Footwear'
];

const colors = [
  'Black', 'White', 'Navy', 'Gray', 'Beige', 'Olive', 'Brown', 'Burgundy'
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

let productsCode = `// Mock data for the e-commerce website - 120 Products

// Categories
export const mockCategories = [
  { id: 1, name: 'New Arrivals', slug: 'new-arrivals', description: 'Latest drops and fresh styles' },
  { id: 2, name: 'T-Shirts', slug: 't-shirts', description: 'Essential tees for every occasion' },
  { id: 3, name: 'Hoodies', slug: 'hoodies', description: 'Cozy and stylish hoodies' },
  { id: 4, name: 'Jackets', slug: 'jackets', description: 'Outerwear for all seasons' },
  { id: 5, name: 'Pants', slug: 'pants', description: 'Comfortable and trendy bottoms' },
  { id: 6, name: 'Shorts', slug: 'shorts', description: 'Summer essentials' },
  { id: 7, name: 'Accessories', slug: 'accessories', description: 'Complete your look' },
  { id: 8, name: 'Footwear', slug: 'footwear', description: 'Step up your style' },
];

// 120 Products with 3 images each
export const mockProducts = [
`;

for (let i = 1; i <= 120; i++) {
  const category = categories[i % categories.length];
  const color = colors[i % colors.length];
  const basePrice = Math.floor(Math.random() * 150) + 50;
  const isOnSale = i % 5 === 0;
  const discount = isOnSale ? Math.floor(Math.random() * 30) + 10 : 0;
  const originalPrice = isOnSale ? Math.floor(basePrice / (1 - discount / 100)) : basePrice;
  
  productsCode += `  {
    _id: '${i}',
    id: ${i},
    name: 'Product ${i}',
    slug: 'product-${i}',
    description: 'Premium quality ${category.toLowerCase()} featuring contemporary design and exceptional comfort. Crafted with attention to detail and sustainable materials.',
    price: ${basePrice},
    ${isOnSale ? `originalPrice: ${originalPrice},\n    discount: ${discount},\n    salePrice: ${basePrice},` : ''}
    category: '${category}',
    categorySlug: '${category.toLowerCase().replace(' ', '-')}',
    images: [
      '/assets/images/products/product-${i}-1.jpg',
      '/assets/images/products/product-${i}-2.jpg',
      '/assets/images/products/product-${i}-3.jpg',
    ],
    colors: [
      { name: '${color}', value: '${color === 'Black' ? '#000000' : color === 'White' ? '#FFFFFF' : color === 'Navy' ? '#1E3A8A' : color === 'Gray' ? '#6B7280' : color === 'Beige' ? '#F5F5DC' : color === 'Olive' ? '#556B2F' : color === 'Brown' ? '#8B4513' : '#800020'}' },
      { name: '${colors[(i + 1) % colors.length]}', value: '${colors[(i + 1) % colors.length] === 'Black' ? '#000000' : '#FFFFFF'}' },
    ],
    sizes: ${JSON.stringify(sizes)},
    inStock: ${i % 10 !== 0},
    stock: ${Math.floor(Math.random() * 50) + 5},
    isNew: ${i <= 20},
    isFeatured: ${i % 8 === 0},
    isBestSeller: ${i % 7 === 0},
    rating: ${(Math.random() * 2 + 3).toFixed(1)},
    reviewCount: ${Math.floor(Math.random() * 200) + 10},
    material: '${['100% Cotton', '80% Cotton 20% Polyester', 'Premium Blend', 'Organic Cotton'][i % 4]}',
    fit: '${['Regular Fit', 'Slim Fit', 'Relaxed Fit', 'Oversized'][i % 4]}',
  },
`;
}

productsCode += `];

// Orders for account page
export const mockOrders = [
  {
    id: '1001',
    date: '2025-10-01',
    status: 'Delivered',
    total: 189.99,
    items: [
      {
        id: 1,
        name: 'Product 1',
        image: '/assets/images/products/product-1-1.jpg',
        price: 89.99,
        quantity: 1,
        size: 'M',
        color: 'Black',
      },
      {
        id: 2,
        name: 'Product 2',
        image: '/assets/images/products/product-2-1.jpg',
        price: 99.99,
        quantity: 1,
        size: 'L',
        color: 'White',
      },
    ],
  },
  {
    id: '1002',
    date: '2025-10-10',
    status: 'In Transit',
    total: 129.99,
    items: [
      {
        id: 3,
        name: 'Product 3',
        image: '/assets/images/products/product-3-1.jpg',
        price: 129.99,
        quantity: 1,
        size: 'L',
        color: 'Navy',
      },
    ],
  },
];

// Size guide data
export const sizeGuide = {
  tops: [
    { size: 'XS', chest: '86-91', length: '68-70', sleeve: '61-63' },
    { size: 'S', chest: '91-96', length: '70-72', sleeve: '63-65' },
    { size: 'M', chest: '96-101', length: '72-74', sleeve: '65-67' },
    { size: 'L', chest: '101-106', length: '74-76', sleeve: '67-69' },
    { size: 'XL', chest: '106-111', length: '76-78', sleeve: '69-71' },
    { size: 'XXL', chest: '111-116', length: '78-80', sleeve: '71-73' },
  ],
  bottoms: [
    { size: 'XS', waist: '71-76', hip: '86-91', inseam: '76-78' },
    { size: 'S', waist: '76-81', hip: '91-96', inseam: '78-80' },
    { size: 'M', waist: '81-86', hip: '96-101', inseam: '80-82' },
    { size: 'L', waist: '86-91', hip: '101-106', inseam: '82-84' },
    { size: 'XL', waist: '91-96', hip: '106-111', inseam: '84-86' },
    { size: 'XXL', waist: '96-101', hip: '111-116', inseam: '86-88' },
  ],
};

// FAQ data
export const faqs = [
  {
    id: 1,
    category: 'Orders',
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 3-5 business days within the continental US. International shipping varies by location and usually takes 7-14 business days.',
  },
  {
    id: 2,
    category: 'Orders',
    question: 'Can I track my order?',
    answer: 'Yes! Once your order ships, you will receive a tracking number via email. You can also track your order in the Orders section of your account.',
  },
  {
    id: 3,
    category: 'Returns',
    question: 'What is your return policy?',
    answer: 'We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with tags attached.',
  },
  {
    id: 4,
    category: 'Returns',
    question: 'How do I initiate a return?',
    answer: 'Log into your account, go to Orders, select the item you want to return, and follow the return process. You will receive a prepaid return label via email.',
  },
  {
    id: 5,
    category: 'Products',
    question: 'How do I know what size to order?',
    answer: 'Check our Size Guide page for detailed measurements. We recommend measuring a similar item you own and comparing it to our size chart.',
  },
  {
    id: 6,
    category: 'Products',
    question: 'Are your products sustainable?',
    answer: 'Yes! We are committed to sustainability. We use organic and recycled materials wherever possible and maintain ethical manufacturing practices.',
  },
  {
    id: 7,
    category: 'Account',
    question: 'Do I need an account to place an order?',
    answer: 'No, you can checkout as a guest. However, creating an account lets you track orders, save your wishlist, and checkout faster.',
  },
  {
    id: 8,
    category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay.',
  },
];

// Reviews data template
export const mockReviews = [
  {
    id: 1,
    productId: 1,
    userName: 'Alex M.',
    rating: 5,
    date: '2025-10-01',
    title: 'Amazing quality!',
    comment: 'Exceeded my expectations. The fit is perfect and the material feels premium. Definitely worth the price.',
    verified: true,
    helpful: 24,
  },
  {
    id: 2,
    productId: 1,
    userName: 'Jordan K.',
    rating: 4,
    date: '2025-09-28',
    title: 'Great purchase',
    comment: 'Really happy with this purchase. Only minor issue is it runs slightly large, but overall fantastic quality.',
    verified: true,
    helpful: 12,
  },
  {
    id: 3,
    productId: 1,
    userName: 'Sam R.',
    rating: 5,
    date: '2025-09-25',
    title: 'Love it!',
    comment: 'Third item I have bought from this brand and they never disappoint. Will definitely order more.',
    verified: true,
    helpful: 8,
  },
];
`;

const outputPath = path.join(__dirname, 'src', 'data', 'mockData.js');
fs.writeFileSync(outputPath, productsCode, 'utf8');

console.log('✅ Generated mockData.js with 120 products!');
console.log(`📁 File saved to: ${outputPath}`);
