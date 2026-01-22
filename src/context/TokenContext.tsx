'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

interface TokenBalance {
    balance: number
    totalTokens: number
    usedTokens: number
    remainingFromCodes: number
    userBalance: number
}

interface TokenContextType {
    balance: number
    tokenBalance: number // Alias for compatibility
    loading: boolean
    error: string | null
    userId: string | null
    showTokenModal: boolean
    loadBalance: () => Promise<void>
    addTokensOptimistic: (tokens: number) => void
    deductTokensOptimistic: (tokens: number) => void
    openTokenModal: () => void
    closeTokenModal: () => void
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

// Generate a unique browser-based user ID
function getBrowserUserId(): string {
    if (typeof window === 'undefined') return 'server_render'

    const storageKey = 'beexel_user_id'
    let userId = localStorage.getItem(storageKey)

    if (!userId) {
        // Generate a new user ID
        userId = `browser_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
        localStorage.setItem(storageKey, userId)

        // Also set it as a cookie for server-side access
        document.cookie = `userId=${userId}; path=/; max-age=31536000; SameSite=Lax`
    }

    return userId
}

export function TokenProvider({ children }: { children: React.ReactNode }) {
    const [balance, setBalance] = useState<TokenBalance | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [showTokenModal, setShowTokenModal] = useState(false)
    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)

    // Initialize user ID on client
    useEffect(() => {
        const id = getBrowserUserId()
        setUserId(id)
        // Ensure cookie is set
        document.cookie = `userId=${id}; path=/; max-age=31536000; SameSite=Lax`
    }, [])

    const loadBalance = useCallback(async (isPolling = false) => {
        try {
            if (!isPolling) setLoading(true)

            const currentUserId = getBrowserUserId()
            const response = await fetch('/api/v2/tokens/balance', {
                headers: {
                    'x-user-id': currentUserId,
                },
            })
            const data = await response.json()

            if (data.success && data.tokens) {
                setBalance(data.tokens)
            } else {
                if (!isPolling) {
                    setError(data.msg || 'Failed to load balance')
                    setBalance({ balance: 0, totalTokens: 0, usedTokens: 0, remainingFromCodes: 0, userBalance: 0 })
                }
            }
        } catch (err) {
            if (!isPolling) {
                setError('Failed to load token balance')
                setBalance({ balance: 0, totalTokens: 0, usedTokens: 0, remainingFromCodes: 0, userBalance: 0 })
            }
        } finally {
            if (!isPolling) setLoading(false)
        }
    }, [])

    // Start polling when component mounts
    useEffect(() => {
        loadBalance()

        // Poll every 10 seconds for balance updates (important for M-PESA confirmations)
        pollIntervalRef.current = setInterval(() => {
            loadBalance(true)
        }, 10000)

        return () => {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current)
        }
    }, [loadBalance])

    const addTokensOptimistic = useCallback((tokens: number) => {
        setBalance((prev) => {
            if (!prev) return { balance: tokens, totalTokens: tokens, usedTokens: 0, remainingFromCodes: 0, userBalance: tokens }
            return {
                ...prev,
                balance: parseFloat((prev.balance + tokens).toFixed(2)),
                totalTokens: parseFloat((prev.totalTokens + tokens).toFixed(2)),
                userBalance: parseFloat((prev.userBalance + tokens).toFixed(2)),
            }
        })
    }, [])

    const deductTokensOptimistic = useCallback((tokens: number) => {
        setBalance((prev) => {
            if (!prev) return null
            return {
                ...prev,
                balance: Math.max(0, parseFloat((prev.balance - tokens).toFixed(2))),
                usedTokens: parseFloat((prev.usedTokens + tokens).toFixed(2)),
                userBalance: Math.max(0, parseFloat((prev.userBalance - tokens).toFixed(2))),
            }
        })
    }, [])

    const openTokenModal = useCallback(() => setShowTokenModal(true), [])
    const closeTokenModal = useCallback(() => setShowTokenModal(false), [])

    const value = {
        balance: balance?.balance || 0,
        tokenBalance: balance?.balance || 0, // Alias for compatibility
        loading,
        error,
        userId,
        showTokenModal,
        loadBalance,
        addTokensOptimistic,
        deductTokensOptimistic,
        openTokenModal,
        closeTokenModal
    }

    return <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
}

export function useTokenContext() {
    const context = useContext(TokenContext)
    if (context === undefined) {
        throw new Error('useTokenContext must be used within a TokenProvider')
    }
    return context
}
