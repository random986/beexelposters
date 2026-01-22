'use client'

import { useState, useEffect, useCallback } from 'react'

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const loadUserId = useCallback(async () => {
    try {
      const response = await fetch('/api/v2/auth/user')
      const data = await response.json()
      
      if (data.success && data.userId) {
        setUserId(data.userId)
        // Store in localStorage for persistence
        if (typeof window !== 'undefined') {
          localStorage.setItem('userId', data.userId)
        }
      }
    } catch (err) {
      console.error('Failed to load user ID:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Try to get from localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('userId')
      if (stored) {
        setUserId(stored)
        setLoading(false)
      } else {
        loadUserId()
      }
    }
  }, [loadUserId])

  return {
    userId,
    loading,
    refresh: loadUserId,
  }
}

