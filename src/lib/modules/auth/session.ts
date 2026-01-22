import { cookies } from 'next/headers'
import { generateToken } from './admin'
import { prisma } from '@/lib/db/prisma'

const SESSION_COOKIE_NAME = 'admin-token'
const SESSION_MAX_AGE = 365 * 24 * 60 * 60 // 1 year in seconds

/**
 * Create a new admin session and store it in the database
 */
export async function createSession(username: string): Promise<string> {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE * 1000)

  // Store session in database
  await prisma.adminSession.create({
    data: {
      token,
      username,
      expiresAt,
    },
  })

  // Set cookie (skip during build)
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return token
  }
  
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })

  return token
}

/**
 * Get the current admin session from the database
 */
export async function getSession(): Promise<{ username: string } | null> {
  try {
    // Skip during build time
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return null
    }
    
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (!token) {
      return null
    }

    // Look up session in database
    const session = await prisma.adminSession.findUnique({
      where: { token },
    })

    if (!session) {
      return null
    }

    // Check if session expired
    if (new Date() > session.expiresAt) {
      // Delete expired session
      await prisma.adminSession.delete({
        where: { token },
      }).catch(() => {
        // Ignore delete errors
      })
      return null
    }

    return { username: session.username }
  } catch (error) {
    console.error('[SESSION] Error getting session:', error)
    return null
  }
}

/**
 * Delete the current admin session
 */
export async function deleteSession(): Promise<void> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

    if (token) {
      // Delete from database
      await prisma.adminSession.delete({
        where: { token },
      }).catch(() => {
        // Ignore if session doesn't exist
      })
    }

    cookieStore.delete(SESSION_COOKIE_NAME)
  } catch {
    // Ignore errors
  }
}

/**
 * Require admin authentication - throws if not authenticated
 */
export async function requireAdmin(): Promise<{ username: string }> {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}

/**
 * Clean up expired sessions (can be called periodically)
 */
export async function cleanupExpiredSessions(): Promise<number> {
  try {
    const result = await prisma.adminSession.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    })
    return result.count
  } catch (error) {
    console.error('[SESSION] Error cleaning up sessions:', error)
    return 0
  }
}
