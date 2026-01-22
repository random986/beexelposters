import { prisma } from '@/lib/db/prisma'

/**
 * Get user token balance - OPTIMIZED
 * Uses a single query to fetch user data and calculates balance efficiently
 */
export async function getUserBalance(userId: string): Promise<{
  balance: number
  totalTokens: number
  usedTokens: number
  remainingFromCodes: number
  userBalance: number
}> {
  // Get user token record - single query
  const userToken = await prisma.userToken.findUnique({
    where: { userId },
  })

  // Simple balance from UserToken - no need to query codes individually
  // Tokens are now added directly when payment completes
  const userBalance = userToken?.balance || 0
  const totalTokens = userToken?.totalTokens || 0
  const usedTokens = userToken?.usedTokens || 0

  return {
    balance: userBalance,
    totalTokens,
    usedTokens,
    remainingFromCodes: 0, // Deprecated - keeping for API compatibility
    userBalance,
  }
}

/**
 * Get or create user token record
 */
export async function getOrCreateUserToken(userId: string) {
  let userToken = await prisma.userToken.findUnique({
    where: { userId },
  })

  if (!userToken) {
    userToken = await prisma.userToken.create({
      data: {
        userId,
        totalTokens: 0,
        usedTokens: 0,
        balance: 0,
        redeemedCodes: [],
      },
    })
  }

  return userToken
}

/**
 * Deduct tokens from user
 */
export async function deductTokens(userId: string, amount: number): Promise<{
  success: boolean
  newBalance: number
  msg?: string
}> {
  const userToken = await getOrCreateUserToken(userId)

  if (userToken.balance < amount) {
    return {
      success: false,
      newBalance: userToken.balance,
      msg: 'Insufficient tokens',
    }
  }

  // Single update query
  const updated = await prisma.userToken.update({
    where: { userId },
    data: {
      balance: userToken.balance - amount,
      usedTokens: userToken.usedTokens + amount,
    },
  })

  return {
    success: true,
    newBalance: updated.balance,
  }
}

/**
 * Add tokens to user (used when redeeming codes or completing payments)
 */
export async function addTokens(userId: string, amount: number) {
  const userToken = await getOrCreateUserToken(userId)

  return await prisma.userToken.update({
    where: { userId },
    data: {
      totalTokens: userToken.totalTokens + amount,
      balance: userToken.balance + amount,
    },
  })
}
