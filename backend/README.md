# Angal E-commerce Backend

# Angal E-commerce Backend API

Complete backend for Angal e-commerce platform with authentication, products, orders, payments, and admin dashboard.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Customer, Admin, Super Admin)
  - Password hashing with bcryptjs
  - Secure login/register/logout

- **Product Management**
  - CRUD operations for products
  - Category management
  - Product search and filtering
  - Featured products
  - Stock management
  - Product reviews and ratings

- **Shopping Cart & Wishlist**
  - Add/remove/update cart items
  - Stock validation
  - Wishlist management

- **Order Management**
  - Create orders
  - Order status tracking (pending, processing, shipped, delivered, cancelled)
  - Order history
  - Cash on delivery payment

- **Payment Processing**
  - Cash on delivery support
  - Payment status tracking
  - Order payment verification

- **User Management**
  - User profiles
  - Update profile information
  - Order history
  - Account deactivation

- **Admin Dashboard**
  - Dashboard statistics
  - User management
  - Order management
  - Sales analytics
  - Product inventory management

- **Security & Performance**
  - Rate limiting with Redis (Upstash)
  - Request validation
  - Error handling
  - CORS configuration

- **Email Notifications**
  - EmailJS integration
  - Order confirmations
  - Order status updates

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account
- Upstash Redis account
- EmailJS account

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   
   The `.env` file is already configured with:
   - MongoDB connection (database: `angal-ecommerce`)
   - JWT secret
   - Super admin credentials (youssef@gmail.com)
   - EmailJS configuration
   - Upstash Redis credentials
   - Server port (5002)

3. **Seed the database:**
   ```bash
   # Create super admin
   npm run seed:admin

   # Create sample categories
   npm run seed:categories

   # Create sample products
   npm run seed:products

   # Or run all seeds at once
   npm run seed:all
   ```

4. **Start the server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

The server will run on `http://localhost:5002`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `PUT /api/auth/update-password` - Update password

### Products
- `GET /api/products` - Get all products (with filtering, sorting, pagination)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `GET /api/products/:id/related` - Get related products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:productId` - Update cart item
- `DELETE /api/cart/items/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/:productId` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist
- `DELETE /api/wishlist` - Clear wishlist
- `GET /api/wishlist/check/:productId` - Check if in wishlist

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/admin/all` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Payments
- `GET /api/payments/order/:orderId` - Get payment by order
- `GET /api/payments` - Get all payments (Admin)
- `PUT /api/payments/:id/status` - Update payment status (Admin)

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/product/:productId` - Get product reviews
- `GET /api/reviews/my-reviews` - Get user's reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `DELETE /api/users/profile` - Deactivate account
- `GET /api/users/orders` - Get user's orders

### Admin
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/analytics/sales` - Get sales analytics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user by ID
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user (Super Admin only)

## 🔐 User Roles

### Customer
- Browse products
- Manage cart and wishlist
- Create orders
- Leave reviews
- View own orders and profile

### Admin
- All customer permissions
- Manage products and categories
- View all orders
- Update order status
- View dashboard statistics
- Manage users

### Super Admin
- All admin permissions
- Delete users
- Full database access (via Database Dashboard in frontend)

## 🧪 Testing

### Test Super Admin Login:
- Email: `youssef@gmail.com`
- Password: `youssef`

### Test Endpoints:

1. **Health Check:**
   ```bash
   curl http://localhost:5002/api/health
   ```

2. **Register User:**
   ```bash
   curl -X POST http://localhost:5002/api/auth/register \
   -H "Content-Type: application/json" \
   -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
   ```

3. **Login:**
   ```bash
   curl -X POST http://localhost:5002/api/auth/login \
   -H "Content-Type: application/json" \
   -d '{"email":"youssef@gmail.com","password":"youssef"}'
   ```

4. **Get Products:**
   ```bash
   curl http://localhost:5002/api/products
   ```

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.js        # MongoDB connection
│   │   ├── redis.js     # Redis setup
│   │   └── email.js     # EmailJS config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   │   ├── auth.js      # JWT authentication
│   │   ├── adminAuth.js # Role authorization
│   │   ├── rateLimit.js # Rate limiting
│   │   ├── upload.js    # File upload
│   │   ├── validation.js # Request validation
│   │   └── errorHandler.js # Error handling
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   │   ├── emailService.js # Email helpers
│   │   ├── tokenService.js # JWT helpers
│   │   ├── validators.js   # Validation utilities
│   │   ├── helpers.js      # General helpers
│   │   └── payment.js      # Payment utilities
│   ├── seed/            # Database seed scripts
│   └── server.js        # App entry point
├── .env                 # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Dependencies
└── README.md           # Documentation
```

## 🔧 Environment Variables

All environment variables are pre-configured in `.env`:

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `JWT_EXPIRE` - JWT expiration time
- `PORT` - Server port (5002)
- `FRONTEND_URL` - Frontend URL for CORS
- `ADMIN_EMAIL` - Super admin email
- `ADMIN_PASSWORD` - Super admin password
- `EMAILJS_PUBLIC_KEY` - EmailJS public key
- `EMAILJS_PRIVATE_KEY` - EmailJS private key
- `EMAILJS_SERVICE_ID` - EmailJS service ID
- `EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `REDIS_URL` - Upstash Redis URL
- `REDIS_TOKEN` - Upstash Redis token

## 🚦 Rate Limiting

- General endpoints: 10 requests per 10 seconds
- Auth endpoints: 5 requests per minute
- Powered by Upstash Redis

## 📝 Notes

- Database name is explicitly set to `angal-ecommerce`
- Payment method is Cash on Delivery only
- Super admin (youssef@gmail.com) has access to both Admin and Database dashboards
- All passwords are hashed with bcrypt (10 salt rounds)
- Email notifications sent via EmailJS

## 🐛 Troubleshooting

1. **MongoDB Connection Error:**
   - Verify MongoDB Atlas IP whitelist includes your IP
   - Check MONGO_URI in .env

2. **Redis Rate Limiting Error:**
   - Verify Upstash Redis credentials
   - Rate limiting will be bypassed on error

3. **Email Not Sending:**
   - Verify EmailJS configuration
   - Check EMAIL environment variables

## 📄 License

Private - Angal E-commerce Platform

## Features

- User authentication and authorization
- Product management (CRUD)
- Shopping cart functionality
- Order processing
- Category management
- Payment integration
- Admin panel API
- Rate limiting
- Email notifications

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`

3. Run development server:
```bash
npm run dev
```

4. Seed admin account:
```bash
npm run seed
```

## API Documentation

See main README for complete API documentation.
