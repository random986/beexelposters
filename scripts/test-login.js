/**
 * Test password verification for admin user
 */

const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')
require('dotenv').config({ path: '.env.local' })

const prisma = new PrismaClient()
const PBKDF2_ITERATIONS = 100000

async function verifyPassword(password, hash, salt) {
    try {
        const saltBuffer = Buffer.from(salt, 'hex')
        const hashBuffer = Buffer.from(hash, 'hex')
        const verifyHash = crypto.pbkdf2Sync(password, saltBuffer, PBKDF2_ITERATIONS, 64, 'sha512')
        return crypto.timingSafeEqual(hashBuffer, verifyHash)
    } catch (error) {
        console.error('Verification error:', error.message)
        return false
    }
}

async function testLogin() {
    const username = 'admin'
    const password = 'admin123'

    try {
        const admin = await prisma.adminUser.findUnique({
            where: { username },
        })

        if (!admin) {
            console.log('❌ Admin user not found')
            return
        }

        console.log('✅ Admin user found')
        console.log('   Username:', admin.username)
        console.log('   Password Hash:', admin.passwordHash.substring(0, 50) + '...')

        // Check format
        const parts = admin.passwordHash.split(':')
        console.log('   Hash Format:', parts.length === 2 ? 'NEW (hash:salt)' : 'OLD')

        if (parts.length === 2) {
            const [hash, salt] = parts
            console.log('   Hash length:', hash.length)
            console.log('   Salt length:', salt.length)

            const isValid = await verifyPassword(password, hash, salt)
            console.log('')
            console.log(isValid ? '✅ Password VALID' : '❌ Password INVALID')

            if (!isValid) {
                console.log('')
                console.log('Testing with different password...')
                const testValid = await verifyPassword('wrongpassword', hash, salt)
                console.log('Wrong password result:', testValid ? 'VALID (ERROR!)' : 'INVALID (correct)')
            }
        } else {
            console.log('❌ Unexpected hash format')
        }

    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        await prisma.$disconnect()
    }
}

testLogin()
