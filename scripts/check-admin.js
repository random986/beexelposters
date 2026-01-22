/**
 * Quick script to check admin user in database
 */

const { PrismaClient } = require('@prisma/client')
require('dotenv').config({ path: '.env.local' })

const prisma = new PrismaClient()

async function checkAdmin() {
    try {
        const admin = await prisma.adminUser.findUnique({
            where: { username: 'admin' },
        })

        if (admin) {
            console.log('✅ Admin user found in database:')
            console.log('   Username:', admin.username)
            console.log('   Password Hash:', admin.passwordHash.substring(0, 50) + '...')
            console.log('   Created:', admin.createdAt)
            console.log('   Last Login:', admin.lastLoginAt || 'Never')
        } else {
            console.log('❌ Admin user NOT found in database')
        }
    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        await prisma.$disconnect()
    }
}

checkAdmin()
