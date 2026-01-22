'use client'

import { useState, useCallback } from 'react'

interface PurchaseTokensParams {
  amount: number
  mpesaNumber: string
  email?: string
}

export function usePayment() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const purchaseTokens = useCallback(async (params: PurchaseTokensParams) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/v2/payments/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
      
      const data = await response.json()
      
      if (data.success && data.invoiceId) {
        return { success: true, invoiceId: data.invoiceId }
      } else {
        const errorMsg = data.msg || 'Failed to initiate payment'
        setError(errorMsg)
        return { success: false, msg: errorMsg }
      }
    } catch (err) {
      const errorMsg = 'Network error. Please try again.'
      setError(errorMsg)
      return { success: false, msg: errorMsg }
    } finally {
      setLoading(false)
    }
  }, [])

  const checkPaymentStatus = useCallback(async (invoiceId: string) => {
    try {
      const response = await fetch('/api/v2/payments/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId }),
      })
      
      return await response.json()
    } catch (err) {
      return { success: false, msg: 'Failed to check payment status' }
    }
  }, [])

  return {
    loading,
    error,
    purchaseTokens,
    checkPaymentStatus,
  }
}

