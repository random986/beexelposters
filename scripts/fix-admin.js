/**
 * Delete and recreate admin user with correct format
 */

const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')
require('dotenv').config({ path: '.env.local' })

const prisma = new PrismaClient()
const PBKDF2_ITERATIONS = 100000

async function hashPassword(password) {
    const salt = crypto.randomBytes(32)
    const hash = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 64, 'sha512')
    return {
        hash: hash.toString('hex'),
        salt: salt.toString('hex'),
    }
}

async function recreateAdmin() {
    const username = 'admin'
    const password = 'admin123'

    try {
        // Delete existing admin
        console.log('🗑️  Deleting existing admin user...')
        await prisma.adminUser.deleteMany({
            where: { username },
        })

        // Create new admin with correct format
        console.log('✨ Creating new admin user...')
        const { hash, salt } = await hashPassword(password)
        const passwordHash = `${hash}:${salt}` // Correct format: "hash:salt"

        const admin = await prisma.adminUser.create({
            data: {
                username,
                passwordHash,
            },
        })

        console.log('')
        console.log('✅ Admin user recreated successfully!')
        console.log('')
        console.log('📋 Login Credentials:')
        console.log(`   Username: ${admin.username}`)
        console.log(`   Password: ${password}`)
        console.log('')
        console.log('🔐 Hash format: NEW (hash:salt)')
        console.log(`   Hash length: ${hash.length}`)
        console.log(`   Salt length: ${salt.length}`)
        console.log('')
        console.log(`   Login URL: http://localhost:3000/admin/login`)
        console.log('')

    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        await prisma.$disconnect()
    }
}

recreateAdmin()
