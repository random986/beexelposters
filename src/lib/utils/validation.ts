/**
 * Input validation utilities
 */

import { PRICING } from '@/lib/constants/pricing'

export function validatePhoneNumber(phone: string): { valid: boolean; error?: string } {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Phone number is required' }
  }

  const clean = phone.replace(/[^\d]/g, '')

  // Accept 07/01XXXXXXXX (10 digits) or 254XXXXXXXXX (12 digits)
  if (!/^(07|01)\d{8}$/.test(clean) && !/^254\d{9}$/.test(clean)) {
    return { valid: false, error: 'Enter your number as 07/01XXXXXXXX (10 digits) or 254XXXXXXXXX (12 digits)' }
  }

  return { valid: true }
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email) {
    return { valid: true } // Email is optional
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' }
  }

  return { valid: true }
}

export function validateAmount(amount: number, min: number = PRICING.MIN_PURCHASE, max: number = PRICING.MAX_PURCHASE): { valid: boolean; error?: string } {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return { valid: false, error: 'Amount must be a number' }
  }

  if (amount < min) {
    return { valid: false, error: `Minimum amount is KES ${min}` }
  }

  if (amount > max) {
    return { valid: false, error: `Maximum amount is KES ${max}` }
  }

  if (amount % PRICING.TOKEN_PRICE !== 0) {
    return { valid: false, error: `Amount must be in multiples of KES ${PRICING.TOKEN_PRICE}` }
  }

  return { valid: true }
}

export function validateCode(code: string): { valid: boolean; error?: string } {
  if (!code || code.length !== 5) {
    return { valid: false, error: 'Code must be exactly 5 characters' }
  }

  if (!/^[A-Z0-9]+$/.test(code.toUpperCase())) {
    return { valid: false, error: 'Code contains invalid characters' }
  }

  return { valid: true }
}

