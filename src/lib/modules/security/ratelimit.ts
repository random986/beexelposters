/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or Upstash
 */

interface RateLimitEntry {
    count: number
    resetAt: number
}

// In-memory store (resets on server restart)
const store = new Map<string, RateLimitEntry>()

// Clean up old entries every 5 minutes
setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
        if (entry.resetAt < now) {
            store.delete(key)
        }
    }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
    windowMs: number  // Time window in milliseconds
    maxRequests: number  // Max requests per window
}

export interface RateLimitResult {
    allowed: boolean
    remaining: number
    resetIn: number  // Seconds until reset
    msg?: string
}

/**
 * Check if a request should be rate limited
 */
export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig
): RateLimitResult {
    const now = Date.now()
    const key = identifier

    let entry = store.get(key)

    // No entry or expired - create new
    if (!entry || entry.resetAt < now) {
        entry = {
            count: 1,
            resetAt: now + config.windowMs,
        }
        store.set(key, entry)

        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetIn: Math.ceil(config.windowMs / 1000),
        }
    }

    // Increment count
    entry.count++

    // Check if over limit
    if (entry.count > config.maxRequests) {
        const resetIn = Math.ceil((entry.resetAt - now) / 1000)
        return {
            allowed: false,
            remaining: 0,
            resetIn,
            msg: `Rate limit exceeded. Try again in ${resetIn} seconds.`,
        }
    }

    return {
        allowed: true,
        remaining: config.maxRequests - entry.count,
        resetIn: Math.ceil((entry.resetAt - now) / 1000),
    }
}

/**
 * Pre-configured rate limits for different operations
 */
export const RATE_LIMITS = {
    // 30 renders per hour per IP
    render: { windowMs: 60 * 60 * 1000, maxRequests: 30 },
    // 20 code redemptions per hour per IP
    redeem: { windowMs: 60 * 60 * 1000, maxRequests: 20 },
    // 5 failed login attempts per 15 minutes per IP
    adminLogin: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
}

/**
 * Get IP address from request headers
 */
export function getClientIP(headers: Headers): string {
    // Check common proxy headers first
    const forwarded = headers.get('x-forwarded-for')
    if (forwarded) {
        return forwarded.split(',')[0].trim()
    }

    const realIP = headers.get('x-real-ip')
    if (realIP) {
        return realIP
    }

    // Vercel-specific
    const vercelIP = headers.get('x-vercel-forwarded-for')
    if (vercelIP) {
        return vercelIP.split(',')[0].trim()
    }

    return 'unknown'
}
