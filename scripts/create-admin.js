/**
 * Script to create a new admin user
 * Usage: node scripts/create-admin.js [username] [password]
 * Example: node scripts/create-admin.js admin admin123
 */

const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto')

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

async function createAdmin(username, password, mothersMaidenName) {
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

async function main() {
  // Get username and password from command line args or use defaults
  const username = process.argv[2] || 'admin'
  const password = process.argv[3] || 'admin123'
  const mothersMaidenName = process.argv[4] || null

  try {
    // Check if admin already exists
    const existing = await prisma.adminUser.findUnique({
      where: { username },
    })

    if (existing) {
      console.log(`❌ Admin user "${username}" already exists!`)
      console.log('   Use a different username or delete the existing one first.')
      process.exit(1)
    }

    // Create the admin user
    const admin = await createAdmin(username, password, mothersMaidenName)

    console.log('✅ Admin user created successfully!')
    console.log('')
    console.log('📋 Login Credentials:')
    console.log(`   Username: ${admin.username}`)
    console.log(`   Password: ${password}`)
    console.log('')
    console.log('🔐 Please save these credentials securely!')
    console.log('')
    console.log(`   Login URL: http://localhost:3000/admin/login`)
    console.log('')

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()

