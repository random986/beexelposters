import { getUserBalance } from './manager'

/**
 * Check if user has sufficient tokens
 */
export async function hasSufficientTokens(userId: string, required: number): Promise<boolean> {
  const balance = await getUserBalance(userId)
  return balance.balance >= required
}

/**
 * Validate token amount
 */
export function validateTokenAmount(amount: number): { valid: boolean; msg?: string } {
  if (!Number.isInteger(amount) || amount <= 0) {
    return { valid: false, msg: 'Token amount must be a positive integer' }
  }
  return { valid: true }
}

/**
 * Validate redemption code format
 */
export function validateCodeFormat(code: string): { valid: boolean; msg?: string } {
  if (!code || code.length !== 5) {
    return { valid: false, msg: 'Code must be exactly 5 characters' }
  }

  const validChars = /^[A-Z0-9]+$/
  if (!validChars.test(code.toUpperCase())) {
    return { valid: false, msg: 'Code contains invalid characters' }
  }

  return { valid: true }
}

