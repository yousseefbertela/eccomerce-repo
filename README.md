# Angal E-commerce Platform

A full-stack MERN e-commerce platform with customer shop, admin dashboard, and database management interface.

## 🚀 Features

### Customer Shop
- Product browsing and search
- Shopping cart functionality  
- User authentication and profiles
- Order management and tracking
- Wishlist
- Product reviews and ratings
- Secure checkout with payment integration
- Responsive design

### Admin Dashboard
- Product management (CRUD operations)
- Order management and fulfillment
- User management
- Category management
- Review moderation
- Analytics and reports
- Inventory management

### Database Dashboard
- Complete database overview
- Direct data management
- Query builder
- Export/Import functionality
- Statistics and metrics
- Data visualization

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Upstash Redis** - Rate limiting
- **Nodemailer** - Email notifications

### Frontend
- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **React Router 6** - Client-side routing
- **TailwindCSS 3** - Utility-first CSS framework
- **DaisyUI 4** - Component library
- **Axios** - HTTP client
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- Redis instance (Upstash recommended)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Seed Admin Account

```bash
npm run seed
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

## 🌐 Access Points

- **Customer Shop**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin (login with admin credentials)
- **Database Dashboard**: http://localhost:5173/database (login with database credentials)
- **Backend API**: http://localhost:5002/api

## 📁 Project Structure

```
e-commerce website/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── config/         # Database, Redis, Email configuration
│   │   ├── controller/     # Route controllers
│   │   ├── middleware/     # Auth, validation, rate limiting
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── seed/           # Database seeding
│   │   ├── utils/          # Helper functions
│   │   └── server.js       # Entry point
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── frontend/               # React frontend (unified app)
    ├── src/
    │   ├── pages/          # All pages (customer, admin, database)
    │   │   ├── admin/      # Admin dashboard pages
    │   │   └── database/   # Database dashboard pages
    │   ├── components/     # Reusable components
    │   │   ├── admin/      # Admin-specific components
    │   │   └── database/   # Database-specific components
    │   ├── context/        # React context providers
    │   ├── lib/            # API functions and utilities
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # Entry point
    ├── .env.example
    ├── .gitignore
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🔒 User Roles

1. **Customer** - Browse and purchase products
2. **Admin** - Manage products, orders, and users
3. **Database Admin** - Full database access and management

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Reviews
- `GET /api/reviews/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

See full API documentation in `/backend/README.md`

## 🔐 Environment Variables

### Backend (.env)
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
ADMIN_EMAIL=admin@angal.com
ADMIN_PASSWORD=your_admin_password
GMAIL_USER=your_email
GMAIL_APP_PASSWORD=your_app_password
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5002/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## 📝 Development Workflow

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Access app at http://localhost:5173

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Developed by the Angal Development Team

## 📧 Contact

For questions or support, contact: support@angal.com
