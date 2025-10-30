import { ratelimit } from '../config/redis.js';

/**
 * Rate limiting middleware using Redis
 * @param {number} limit - Number of requests allowed
 * @param {string} window - Time window (e.g., '10 s', '1 m', '1 h')
 */
export const rateLimitMiddleware = async (req, res, next) => {
  try {
    // Use IP address as identifier
    const identifier = req.ip || req.connection.remoteAddress;

    const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', reset);

    if (!success) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil((reset - Date.now()) / 1000)
      });
    }

    next();
  } catch (error) {
    // If rate limiting fails, allow the request to proceed
    console.error('Rate limiting error:', error);
    next();
  }
};

/**
 * Strict rate limiting for sensitive endpoints (login, register)
 */
export const strictRateLimit = async (req, res, next) => {
  try {
    const identifier = req.ip || req.connection.remoteAddress;
    
    // Custom stricter limit for auth endpoints
    const { Ratelimit } = await import('@upstash/ratelimit');
    const { redis } = await import('../config/redis.js');
    
    const authLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 m') // 5 requests per minute
    });

    const { success, limit, reset, remaining } = await authLimiter.limit(identifier);

    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', reset);

    if (!success) {
      return res.status(429).json({
        success: false,
        message: 'Too many login attempts. Please try again later.',
        retryAfter: Math.ceil((reset - Date.now()) / 1000)
      });
    }

    next();
  } catch (error) {
    console.error('Strict rate limiting error:', error);
    next();
  }
};
