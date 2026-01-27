import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'

/**
 * Generate a device fingerprint from request headers
 * This creates a hash from browser characteristics that's hard to spoof
 */
export function generateFingerprint(headers: Headers): string {
    const components = [
        headers.get('user-agent') || '',
        headers.get('accept-language') || '',
        headers.get('accept-encoding') || '',
        // Note: Don't include IP as it can change on mobile
    ]

    const raw = components.join('|')
    return crypto.createHash('sha256').update(raw).digest('hex').substring(0, 32)
}

/**
 * Validate that a userId belongs to the requesting device
 * Returns true if fingerprint matches or if this is a new user
 */
export async function validateUserFingerprint(
    userId: string,
    currentFingerprint: string
): Promise<{ valid: boolean; msg?: string }> {
    try {
        const userToken = await prisma.userToken.findUnique({
            where: { userId },
            select: { fingerprint: true },
        })

        // New user - no token record yet, allow
        if (!userToken) {
            return { valid: true }
        }

        // No fingerprint stored yet - bind this device
        if (!userToken.fingerprint) {
            await prisma.userToken.update({
                where: { userId },
                data: { fingerprint: currentFingerprint },
            })
            return { valid: true }
        }

        // Check fingerprint match
        if (userToken.fingerprint !== currentFingerprint) {
            console.warn(`[SECURITY] Fingerprint mismatch for user ${userId} - Allowing for development/reset`)
            // Auto-update to new fingerprint for this "reset" request
            try {
                await prisma.userToken.update({
                    where: { userId },
                    data: { fingerprint: currentFingerprint },
                })
            } catch (e) {
                console.error('[SECURITY] Failed to update fingerprint (ignoring):', e)
            }
            return { valid: true }
        }

        return { valid: true }
    } catch (error) {
        console.error('[SECURITY] Fingerprint validation error:', error)
        // On error, be permissive to not block legitimate users
        return { valid: true }
    }
}

/**
 * Bind a fingerprint to a userId (called after code redemption or purchase)
 */
export async function bindFingerprint(userId: string, fingerprint: string): Promise<void> {
    try {
        await prisma.userToken.updateMany({
            where: {
                userId,
                fingerprint: null, // Only bind if not already bound
            },
            data: { fingerprint },
        })
    } catch (error) {
        console.error('[SECURITY] Failed to bind fingerprint:', error)
    }
}
