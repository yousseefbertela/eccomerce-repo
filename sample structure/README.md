# File Management System

A modern, full-stack file management system built with the MERN stack, featuring role-based access control, real-time monitoring, and professional UI design.

## 🚀 Features

### Boss Dashboard
- **File Management**: Complete CRUD operations for files with permissions control
- **User Management**: Approve/reject user registrations, manage permissions, view user statistics
- **Active Sessions**: Real-time monitoring of user sessions with force logout capabilities
- **Activity Log**: Comprehensive audit trail with filtering, search, and export functionality
- **Statistics Dashboard**: Overview of system metrics and user activity

### Employee Interface
- **File Access**: View and download shared files based on permissions
- **Search & Filter**: Find files quickly with category-based filtering
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different interfaces for boss and employee roles
- **Rate Limiting**: API rate limiting to prevent abuse
- **User Approval System**: New users require boss approval before access

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern React with hooks and functional components
- **React Router**: Client-side routing with protected routes
- **DaisyUI**: Beautiful, semantic CSS framework
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Axios**: Promise-based HTTP client
- **Vite**: Fast build tool and development server

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Rate Limiting**: Using Upstash Redis for distributed rate limiting
- **CORS**: Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Redis instance (for rate limiting)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGO_URI=your_mongodb_connection_string

# Server
NODE_ENV=development
PORT=5002

# Authentication
JWT_SECRET=your_jwt_secret_key

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Boss Account (Created automatically)
BOSS_EMAIL=your_boss_email@company.com
BOSS_PASSWORD=your_secure_password

# Email (for notifications)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5002

## 🎯 Usage

### Default Boss Account
A boss account is automatically created on first startup with the credentials from your environment variables.

### User Registration Flow
1. New users register through the frontend
2. Boss receives notification of new registration
3. Boss approves or rejects the user from the Users page
4. Approved users can then log in and access files

### File Management
- Boss can upload, edit, delete files and manage permissions
- Employees can view and download files based on their permissions
- All file operations are logged in the activity system

## 🏗️ Project Structure

```
software-2.1/
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context providers
│   │   ├── lib/               # Utility libraries
│   │   └── index.css          # Global styles
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── controller/        # Route controllers
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Express middleware
│   │   ├── config/           # Configuration files
│   │   └── utils/            # Utility functions
│   └── package.json
└── .env                      # Environment variables
```

## 🔧 Development

### ESLint Configuration
The frontend includes ESLint configuration for code quality:

```bash
cd frontend
npm run lint
```

### Code Organization
- Components follow functional React patterns with hooks
- API calls are centralized in the `lib/axios.js` file
- Environment-specific configurations in `.env` file
- Consistent file naming and folder structure

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Files
- `GET /api/files` - List files
- `POST /api/files` - Create file
- `PUT /api/files/:id` - Update file
- `DELETE /api/files/:id` - Delete file

### Users (Boss only)
- `GET /api/users` - List all users
- `PUT /api/users/:id/approve` - Approve user
- `PUT /api/users/:id/reject` - Reject user

### System
- `GET /api/health` - Health check

## 🎨 UI/UX Features

- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Responsive Design**: Mobile-first design that works on all devices
- **Professional Animations**: Smooth transitions and loading states
- **Consistent Design System**: DaisyUI components with custom styling
- **Loading States**: Visual feedback for all async operations
- **Error Handling**: User-friendly error messages

## 🔒 Security Measures

- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting on API endpoints
- CORS configuration
- Input validation and sanitization
- Role-based route protection

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud MongoDB
2. Configure environment variables
3. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update API base URL for production

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using modern web technologies**