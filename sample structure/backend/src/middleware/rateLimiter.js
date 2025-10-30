import { rateLimit } from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    // Disable rate limiting in development mode
    if (process.env.NODE_ENV !== 'production') {
      return next();
    }
    
    if (!rateLimit || typeof rateLimit.limit !== 'function') {
      return next(); // rate limiting disabled due to missing env
    }
    const { success } = await rateLimit.limit(req.ip);
    if (success) return next();
    res.status(429).json({ message: 'Too many requests - try again later' });
  } catch (err) {
    console.error('Rate limiting error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default rateLimiter;
