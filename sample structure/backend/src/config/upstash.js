import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load root .env explicitly (mirrors server.js strategy)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

let redisInstance;
try {
  redisInstance = Redis.fromEnv();
} catch (e) {
  console.warn('[RateLimit] Redis env vars missing (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN). Rate limiting disabled.');
}

export const rateLimit = redisInstance ? new Ratelimit({
  redis: redisInstance,
  limiter: Ratelimit.slidingWindow(20, '60 s'),
  analytics: true,
}) : {
  limit: async () => ({ success: true, pending: 0, remaining: 1 })
};

export default rateLimit;
