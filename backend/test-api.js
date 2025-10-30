import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5002/api';

// Helper function to make requests
async function testEndpoint(name, method, endpoint, body = null, token = null) {
  console.log(`\n🧪 Testing: ${name}`);
  console.log(`   ${method} ${endpoint}`);
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();
    
    if (response.ok) {
      console.log(`   ✅ Status: ${response.status}`);
      console.log(`   📄 Response:`, JSON.stringify(data, null, 2).substring(0, 200) + '...');
      return { success: true, data };
    } else {
      console.log(`   ❌ Status: ${response.status}`);
      console.log(`   📄 Error:`, data);
      return { success: false, data };
    }
  } catch (error) {
    console.log(`   ❌ Error:`, error.message);
    return { success: false, error: error.message };
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting API Tests for Angal E-commerce Backend\n');
  console.log('='.repeat(60));

  let authToken = null;
  let productId = null;
  let categoryId = null;

  // 1. Health Check
  await testEndpoint('Health Check', 'GET', '/health');

  // 2. Get All Categories
  const categoriesResult = await testEndpoint('Get All Categories', 'GET', '/categories');
  if (categoriesResult.success && categoriesResult.data.data.categories.length > 0) {
    categoryId = categoriesResult.data.data.categories[0]._id;
    console.log(`   📌 Saved Category ID: ${categoryId}`);
  }

  // 3. Get All Products
  const productsResult = await testEndpoint('Get All Products', 'GET', '/products');
  if (productsResult.success && productsResult.data.data.products.length > 0) {
    productId = productsResult.data.data.products[0]._id;
    console.log(`   📌 Saved Product ID: ${productId}`);
  }

  // 4. Get Products with Pagination
  await testEndpoint('Get Products (Page 2)', 'GET', '/products?page=2&limit=5');

  // 5. Get Products by Category
  if (categoryId) {
    await testEndpoint('Get Products by Category', 'GET', `/products?category=${categoryId}`);
  }

  // 6. Search Products
  await testEndpoint('Search Products (Hoodie)', 'GET', '/products?search=hoodie');

  // 7. Get Featured Products
  await testEndpoint('Get Featured Products', 'GET', '/products?isFeatured=true');

  // 8. Get Single Product
  if (productId) {
    await testEndpoint('Get Single Product', 'GET', `/products/${productId}`);
  }

  // 9. Get Single Category
  if (categoryId) {
    await testEndpoint('Get Single Category', 'GET', `/categories/${categoryId}`);
  }

  // 10. Register New User
  const registerResult = await testEndpoint(
    'Register New User',
    'POST',
    '/auth/register',
    {
      name: 'Test Customer',
      email: 'customer@test.com',
      password: 'password123'
    }
  );

  // 11. Login with Super Admin
  const loginResult = await testEndpoint(
    'Login as Super Admin',
    'POST',
    '/auth/login',
    {
      email: 'youssef@gmail.com',
      password: 'youssef'
    }
  );

  if (loginResult.success && loginResult.data.token) {
    authToken = loginResult.data.token;
    console.log(`   🔑 Saved Auth Token`);
  }

  // 12. Get Current User Profile
  if (authToken) {
    await testEndpoint('Get Current User', 'GET', '/auth/me', null, authToken);
  }

  // 13. Update User Profile
  if (authToken) {
    await testEndpoint(
      'Update Profile',
      'PUT',
      '/users/profile',
      { name: 'Youssef Updated' },
      authToken
    );
  }

  // 14. Add to Cart
  if (authToken && productId) {
    await testEndpoint(
      'Add to Cart',
      'POST',
      '/cart',
      { productId, quantity: 2 },
      authToken
    );
  }

  // 15. Get Cart
  if (authToken) {
    await testEndpoint('Get Cart', 'GET', '/cart', null, authToken);
  }

  // 16. Add to Wishlist
  if (authToken && productId) {
    await testEndpoint(
      'Add to Wishlist',
      'POST',
      '/wishlist',
      { productId },
      authToken
    );
  }

  // 17. Get Wishlist
  if (authToken) {
    await testEndpoint('Get Wishlist', 'GET', '/wishlist', null, authToken);
  }

  // 18. Add Product Review
  if (authToken && productId) {
    await testEndpoint(
      'Add Product Review',
      'POST',
      `/reviews/${productId}`,
      {
        rating: 5,
        comment: 'Amazing premium quality! Love this hoodie!'
      },
      authToken
    );
  }

  // 19. Get Product Reviews
  if (productId) {
    await testEndpoint('Get Product Reviews', 'GET', `/reviews/${productId}`);
  }

  // 20. Get All Users (Admin only)
  if (authToken) {
    await testEndpoint('Get All Users (Admin)', 'GET', '/admin/users', null, authToken);
  }

  // 21. Get All Orders (Admin only)
  if (authToken) {
    await testEndpoint('Get All Orders (Admin)', 'GET', '/admin/orders', null, authToken);
  }

  // 22. Create Category (Admin only)
  if (authToken) {
    await testEndpoint(
      'Create Category (Admin)',
      'POST',
      '/categories',
      {
        name: 'Test Category',
        description: 'Testing category creation'
      },
      authToken
    );
  }

  // 23. Create Product (Admin only)
  if (authToken && categoryId) {
    await testEndpoint(
      'Create Product (Admin)',
      'POST',
      '/products',
      {
        name: 'Test Product',
        description: 'Testing product creation',
        price: 999,
        category: categoryId,
        stock: 10
      },
      authToken
    );
  }

  // 24. Update Cart Item
  if (authToken && productId) {
    await testEndpoint(
      'Update Cart Quantity',
      'PUT',
      `/cart/${productId}`,
      { quantity: 3 },
      authToken
    );
  }

  // 25. Remove from Wishlist
  if (authToken && productId) {
    await testEndpoint(
      'Remove from Wishlist',
      'DELETE',
      `/wishlist/${productId}`,
      null,
      authToken
    );
  }

  // 26. Create Order
  if (authToken) {
    await testEndpoint(
      'Create Order',
      'POST',
      '/orders',
      {
        shippingAddress: {
          street: '123 Main St',
          city: 'Cairo',
          state: 'Cairo',
          zipCode: '11511',
          country: 'Egypt'
        },
        paymentMethod: 'cash'
      },
      authToken
    );
  }

  // 27. Get User Orders
  if (authToken) {
    await testEndpoint('Get My Orders', 'GET', '/orders', null, authToken);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ All API Tests Completed!');
  console.log('='.repeat(60));
}

// Run the tests
runTests().catch(console.error);
