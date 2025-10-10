import { Request, Response, NextFunction } from 'express';

type Store = Map<string, number[]>; // ip -> request timestamps (ms)

/** Options for the in-memory IP-based rate limiter. */
export interface RateLimitOptions {
  windowMs: number; // time window in ms
  max: number; // max requests per window per IP
  message?: string;
}

const store: Store = new Map();

/**
 * RateLimit
 * Simple in-memory per-IP limiter. Not for multi-instance deployments.
 */
export function RateLimit(options: RateLimitOptions) {
  const { windowMs, max, message = 'Too many requests, please try again later.' } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    const timestamps = store.get(ip) || [];
    // Remove entries outside the window
    const recent = timestamps.filter(ts => ts > windowStart);
    recent.push(now);
    store.set(ip, recent);

    if (recent.length > max) {
      return res.status(429).json({ message });
    }

    next();
  };
}
