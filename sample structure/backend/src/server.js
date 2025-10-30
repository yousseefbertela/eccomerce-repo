import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import passwordResetRoutes from './routes/passwordResetRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { seedBossOnStartup, convertHashedPasswordsToPlainText } from './utils/startup.js';
import { healthCheck } from './controller/healthController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load root .env (one level up from backend, two from src)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Validate required environment variables early
const requiredVars = ['MONGO_URI', 'JWT_SECRET', 'PORT'];
const missing = requiredVars.filter(v => !process.env[v]);
if (missing.length) {
  console.error('Missing required environment variables:', missing.join(', '));
  process.exit(1);
}

const app = express();

// CORS Configuration - Allow both development and production origins
const allowedOrigins = [
  'http://localhost:5173',  // Development frontend
  process.env.FRONTEND_URL  // Production frontend (from .env)
].filter(Boolean); // Remove undefined values

app.use(cors({ 
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, or same-origin)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

app.use(express.json());
app.use(rateLimiter);

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/api/health', healthCheck);

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/password-reset', passwordResetRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT; // enforced above

connectDB().then(async () => {
  await seedBossOnStartup();
  // WARNING: Disabled password reset on startup - users keep their own passwords
  // await convertHashedPasswordsToPlainText();
  app.listen(PORT, () => console.log('Server started on http://localhost:' + PORT));
});
