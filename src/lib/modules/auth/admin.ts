import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db/prisma'
import crypto from 'crypto'

const SALT_ROUNDS = 10
const PBKDF2_ITERATIONS = 100000

export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const salt = crypto.randomBytes(32)
  const hash = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 64, 'sha512')
  return {
    hash: hash.toString('hex'),
    salt: salt.toString('hex'),
  }
}

export async function verifyPassword(
  password: string,
  hash: string,
  salt: string
): Promise<boolean> {
  try {
    const saltBuffer = Buffer.from(salt, 'hex')
    const hashBuffer = Buffer.from(hash, 'hex')
    const verifyHash = crypto.pbkdf2Sync(password, saltBuffer, PBKDF2_ITERATIONS, 64, 'sha512')
    return crypto.timingSafeEqual(hashBuffer, verifyHash)
  } catch (error) {
    return false
  }
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export async function getAdminByUsername(username: string) {
  return await prisma.adminUser.findUnique({
    where: { username },
  })
}

export async function createAdmin(username: string, password: string, mothersMaidenName?: string) {
  const { hash, salt } = await hashPassword(password)
  // Store hash and salt together: "hash:salt" format
  const passwordHash = `${hash}:${salt}`
  return await prisma.adminUser.create({
    data: {
      username,
      passwordHash,
      mothersMaidenName,
    },
  })
}

export async function updateAdminLastLogin(username: string) {
  return await prisma.adminUser.update({
    where: { username },
    data: { lastLoginAt: new Date() },
  })
}

export async function verifyAdminCredentials(username: string, password: string) {
  const admin = await getAdminByUsername(username)
  if (!admin) {
    return null
  }

  // Check if password hash is in new format (hash:salt) or old format
  const parts = admin.passwordHash.split(':')
  let isValid = false

  if (parts.length === 2) {
    // New format: hash:salt
    const [hash, salt] = parts
    isValid = await verifyPassword(password, hash, salt)
  } else {
    // Old format: try bcrypt (for migration from old system)
    try {
      isValid = await bcrypt.compare(password, admin.passwordHash)
      if (isValid) {
        // Migrate to new format
        const { hash, salt } = await hashPassword(password)
        const passwordHash = `${hash}:${salt}`
        await prisma.adminUser.update({
          where: { username },
          data: { passwordHash },
        })
      }
    } catch {
      // If bcrypt fails, try old PBKDF2 format (using hash as salt - incorrect but for compatibility)
      try {
        isValid = await verifyPassword(password, admin.passwordHash, admin.passwordHash.substring(0, 64) || '')
      } catch {
        isValid = false
      }
    }
  }

  if (!isValid) {
    return null
  }

  return admin
}

export async function updateAdminProfile(username: string, data: { name?: string; newUsername?: string }) {
  const updateData: any = {}
  if (data.name !== undefined) updateData.name = data.name
  if (data.newUsername) updateData.username = data.newUsername

  return await prisma.adminUser.update({
    where: { username },
    data: updateData,
  })
}

export async function updateAdminPassword(username: string, currentPassword: string, newPassword: string) {
  // Verify current password first
  const admin = await verifyAdminCredentials(username, currentPassword)
  if (!admin) {
    return { success: false, msg: 'Current password is incorrect' }
  }

  // Hash new password
  const { hash, salt } = await hashPassword(newPassword)
  const passwordHash = `${hash}:${salt}`

  await prisma.adminUser.update({
    where: { username },
    data: { passwordHash },
  })

  return { success: true }
}
