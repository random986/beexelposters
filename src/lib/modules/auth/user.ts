import { headers } from 'next/headers'
import { cookies } from 'next/headers'

export interface UserIdentification {
  userId: string
  ipAddress?: string
}

/**
 * Get user ID from request
 * Priority: cookie > header > query > body > IP
 */
export async function getUserId(req?: {
  headers?: Headers
  cookies?: { get: (name: string) => { value: string } | undefined }
  body?: { userId?: string; userID?: string }
  query?: { userId?: string; userID?: string }
}): Promise<string> {
  // Try to get from cookies (Next.js)
  try {
    // Skip during build time
    if (process.env.NEXT_PHASE !== 'phase-production-build') {
      const cookieStore = await cookies()
      const userIdCookie = cookieStore.get('userId')?.value || cookieStore.get('userID')?.value
      if (userIdCookie) {
        return userIdCookie
      }
    }
  } catch {
    // Ignore if cookies not available
  }

  // Try to get from headers
  if (req?.headers) {
    const userIdHeader = req.headers.get('x-user-id') || req.headers.get('x-userid')
    if (userIdHeader) {
      return userIdHeader
    }
  }

  // Try to get from query params
  if (req?.query?.userId || req?.query?.userID) {
    return req.query.userId || req.query.userID || 'anonymous'
  }

  // Try to get from body
  if (req?.body?.userId || req?.body?.userID) {
    return req.body.userId || req.body.userID || 'anonymous'
  }

  // Fallback to IP address
  try {
    // Skip during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return 'anonymous'
    }
    
    const headersList = await headers()
    const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0] ||
                     headersList.get('x-real-ip') ||
                     'anonymous'
    return `ip_${ipAddress.replace(/[^a-zA-Z0-9]/g, '_')}`
  } catch {
    return 'anonymous'
  }
}

/**
 * Get IP address from request
 */
export async function getIpAddress(): Promise<string | undefined> {
  try {
    // Skip during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return undefined
    }
    
    const headersList = await headers()
    return headersList.get('x-forwarded-for')?.split(',')[0] ||
           headersList.get('x-real-ip') ||
           undefined
  } catch {
    return undefined
  }
}

/**
 * Generate a new user ID
 */
export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

