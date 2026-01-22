'use client'

import { useCallback } from 'react'
import { useTokenContext } from '@/context/TokenContext'

// Generate a unique browser-based user ID (kept for legacy support if needed, but Context handles it)
function getBrowserUserId(): string {
  if (typeof window === 'undefined') return 'server_render'
  const storageKey = 'beexel_user_id'
  return localStorage.getItem(storageKey) || ''
}

export function useTokens() {
  const {
    balance,
    loading,
    error,
    userId,
    loadBalance,
    addTokensOptimistic,
    deductTokensOptimistic
  } = useTokenContext()

  const redeemCode = useCallback(async (code: string) => {
    try {
      const currentUserId = getBrowserUserId()

      const response = await fetch('/api/v2/tokens/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUserId,
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (data.success) {
        // INSTANT update - add tokens immediately
        addTokensOptimistic(data.tokens || 1)
        return { success: true, tokens: data.tokens, balance: data.balance }
      } else {
        return { success: false, msg: data.msg }
      }
    } catch (err) {
      return { success: false, msg: 'Failed to redeem code' }
    }
  }, [addTokensOptimistic])

  const verifyReceipt = useCallback(async (mpesaReceipt: string, phoneNumber: string) => {
    try {
      const currentUserId = getBrowserUserId()

      const response = await fetch('/api/v2/payments/verify-receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUserId,
        },
        body: JSON.stringify({ mpesaReceipt, phoneNumber }),
      })

      const data = await response.json()

      if (data.success) {
        // INSTANT update - add tokens immediately
        addTokensOptimistic(data.tokens || 1)
        return {
          success: true,
          code: data.code,
          tokens: data.tokens,
          alreadyProcessed: data.alreadyProcessed,
          msg: data.msg
        }
      } else {
        return { success: false, msg: data.msg }
      }
    } catch (err) {
      return { success: false, msg: 'Failed to verify receipt' }
    }
  }, [addTokensOptimistic])

  return {
    balance,
    userId,
    loading,
    error,
    loadBalance,
    redeemCode,
    verifyReceipt,
    addTokensOptimistic,
    deductTokensOptimistic,
  }
}
