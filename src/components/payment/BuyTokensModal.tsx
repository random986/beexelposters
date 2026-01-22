'use client'

import { useState, useEffect } from 'react'
import { X, Smartphone, Loader2, CreditCard, Tag, Minus, Plus, History } from 'lucide-react'
import { useToast } from '@/components/ui/toast'
import { useTokenContext } from '@/context/TokenContext'

interface BuyTokensModalProps {
    isOpen: boolean
    onClose: () => void
    initialTokens?: number
}

type Tab = 'buy' | 'confirm' | 'redeem'

export function BuyTokensModal({ isOpen, onClose, initialTokens = 5 }: BuyTokensModalProps) {
    const { showToast } = useToast()
    const { loadBalance } = useTokenContext()
    const [activeTab, setActiveTab] = useState<Tab>('buy')

    // Buy State
    const [tokenCount, setTokenCount] = useState<number>(initialTokens)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)

    // Polling State
    const [purchaseInvoiceId, setPurchaseInvoiceId] = useState<string | null>(null)

    // Confirm State
    const [transactionCode, setTransactionCode] = useState('')

    // Redeem State
    const [promoCode, setPromoCode] = useState('')

    // Phone History
    const [phoneHistory, setPhoneHistory] = useState<string[]>([])
    const [showHistory, setShowHistory] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setTokenCount(initialTokens)
            setPurchaseInvoiceId(null) // Reset polling on open
        }
    }, [isOpen, initialTokens])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('beexel_phone_history')
            if (stored) {
                setPhoneHistory(JSON.parse(stored))
            }
        }
    }, [])

    // Polling Effect
    useEffect(() => {
        let intervalId: NodeJS.Timeout
        let attempts = 0
        const maxAttempts = 30 // 2 minutes (30 * 4s)

        const checkStatus = async () => {
            if (!purchaseInvoiceId || activeTab !== 'confirm') return

            try {
                const res = await fetch('/api/v2/payments/status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ invoiceId: purchaseInvoiceId })
                })
                const data = await res.json()

                if (data.success && data.paymentComplete) {
                    // Success!
                    showToast('Payment confirmed! Tokens added.', 'success')
                    await loadBalance()
                    setPurchaseInvoiceId(null) // Stop polling
                    onClose()
                } else if (data.paymentFailed) {
                    showToast('Payment failed or cancelled.', 'error')
                    setPurchaseInvoiceId(null) // Stop polling
                    // Stay on confirm tab for manual retry if needed
                }
            } catch (e) {
                console.error('Polling error', e)
            }

            attempts++
            if (attempts >= maxAttempts) {
                setPurchaseInvoiceId(null) // Stop polling on timeout
                showToast('Automatic verification timed out. Please enter code manually if you paid.', 'warning')
            }
        }

        if (purchaseInvoiceId && activeTab === 'confirm') {
            const id = setInterval(checkStatus, 4000)
            intervalId = id
        }

        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [purchaseInvoiceId, activeTab, onClose, loadBalance, showToast])


    const savePhoneToHistory = (phone: string) => {
        // Basic duplicates removal
        const unique = new Set([phone, ...phoneHistory])
        const newHistory = Array.from(unique).slice(0, 5)
        setPhoneHistory(newHistory)
        localStorage.setItem('beexel_phone_history', JSON.stringify(newHistory))
    }

    if (!isOpen) return null

    const amount = tokenCount * 20

    const handleBuy = async () => {
        if (!phoneNumber) {
            showToast('Please enter a phone number', 'error')
            return
        }

        setIsProcessing(true)
        try {
            const res = await fetch('/api/v2/payments/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, mpesaNumber: phoneNumber, email })
            })
            const data = await res.json()

            if (data.success) {
                showToast('Please enter your M-PESA PIN when prompted on your phone.', 'info') // Prompt User
                savePhoneToHistory(phoneNumber)

                if (data.invoiceId) {
                    setPurchaseInvoiceId(data.invoiceId) // Start polling
                }

                setActiveTab('confirm')
            } else {
                showToast(data.msg || 'Payment initiation failed', 'error')
            }
        } catch (e) {
            console.error(e)
            showToast('Network error', 'error')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleConfirm = async () => {
        if (!transactionCode) return

        // If manual entry and we don't have phone number in state (rare if flow followed), warn
        if (!phoneNumber) {
            // We rely on user having entered it in Buy tab or we should add input here.
            // For now, let's assume if they are here they might have it. 
            // Or we should allow them to enter it if missing.
            // Adding phone input to Confirm tab is safest (done below).
        }

        setIsProcessing(true)
        try {
            const res = await fetch('/api/v2/payments/verify-receipt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mpesaReceipt: transactionCode, phoneNumber })
            })
            const data = await res.json()

            if (data.success) {
                showToast(`Success! ${data.tokensAdded} tokens added.`, 'success')
                await loadBalance()
                onClose()
            } else {
                showToast(data.msg || 'Verification failed', 'error')
            }
        } catch (e) {
            showToast('Verification error', 'error')
        } finally {
            setIsProcessing(false)
        }
    }

    const handleRedeem = async () => {
        if (!promoCode) return

        setIsProcessing(true)
        try {
            const res = await fetch('/api/v2/tokens/redeem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: promoCode })
            })
            const data = await res.json()

            if (data.success) {
                showToast(`Success! ${data.tokens} tokens redeemed.`, 'success')
                await loadBalance()
                onClose()
            } else {
                showToast(data.msg || 'Redemption failed', 'error')
            }
        } catch (e) {
            showToast('Redemption error', 'error')
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="relative bg-[#f0f4f8] p-6 text-[#1A1A1A] overflow-hidden border-b border-gray-100">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <CreditCard className="w-32 h-32" />
                    </div>
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors font-bold z-10">
                        <X className="w-5 h-5 text-gray-500 hover:text-black" />
                    </button>
                    <h2 className="text-2xl font-clash-display font-medium relative z-10">Top Up Tokens</h2>
                    <p className="text-gray-500 text-sm relative z-10">Instant M-PESA Payment</p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('buy')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'buy' ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A] bg-gray-50' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Buy Tokens
                    </button>
                    <button
                        onClick={() => setActiveTab('confirm')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'confirm' ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A] bg-gray-50' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Verify Payment
                    </button>
                    <button
                        onClick={() => setActiveTab('redeem')}
                        className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'redeem' ? 'text-[#1A1A1A] border-b-2 border-[#1A1A1A] bg-gray-50' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Redeem Code
                    </button>
                </div>

                {/* Body */}
                <div className="p-8">
                    {activeTab === 'buy' && (
                        <div className="space-y-6">

                            {/* Token Counter */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">Number of Tokens</label>
                                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-2xl border border-gray-200">
                                    <button
                                        onClick={() => setTokenCount(Math.max(1, tokenCount - 1))}
                                        className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-600 hover:text-black hover:scale-105 transition-all"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                    <div className="text-center">
                                        <span className="block text-3xl font-clash-display font-bold text-[#1A1A1A]">{tokenCount}</span>
                                        <span className="text-xs text-gray-500 font-medium">Tokens</span>
                                    </div>
                                    <button
                                        onClick={() => setTokenCount(tokenCount + 1)}
                                        className="w-12 h-12 flex items-center justify-center bg-[#1A1A1A] rounded-xl shadow-lg text-white hover:scale-105 transition-all"
                                    >
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="mt-3 text-center">
                                    <span className="text-sm font-medium text-gray-500">Total: </span>
                                    <span className="text-xl font-bold text-[#1A1A1A]">KES {amount}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">M-PESA Number</label>
                                <div className="relative">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        list="phone-history"
                                        placeholder="2547..."
                                        value={phoneNumber}
                                        onClick={() => setShowHistory(true)}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#1A1A1A] focus:bg-white outline-none font-medium transition-all"
                                    />
                                    {phoneHistory.length > 0 && (
                                        <datalist id="phone-history">
                                            {phoneHistory.map((phone, idx) => (
                                                <option key={idx} value={phone} />
                                            ))}
                                        </datalist>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email (Optional)</label>
                                <input
                                    type="email"
                                    placeholder="Receipt email..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#1A1A1A] focus:bg-white outline-none font-medium transition-all"
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={handleBuy}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-bold hover:bg-black transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin w-5 h-5" /> : `Pay KES ${amount} now`}
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                                    <CreditCard className="w-3 h-3" /> Secure M-PESA payment via Intasend
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'confirm' && (
                        <div className="space-y-6">
                            <div className="p-4 bg-green-50 text-green-700 text-sm rounded-xl flex items-start gap-3">
                                <div className="mt-0.5"><History className="w-4 h-4" /></div>
                                <div>
                                    {purchaseInvoiceId ? (
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Confirming Payment...</span>
                                            <span>We are automatically checking your payment status. If successful, this window will close.</span>
                                        </div>
                                    ) : (
                                        "If automatic verification failed (or you didn't receive a prompt), enter the M-PESA transaction code manually."
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">M-PESA Number</label>
                                <input
                                    type="text"
                                    list="phone-history"
                                    placeholder="2547..."
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#1A1A1A] focus:bg-white outline-none font-medium transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Transaction Code</label>
                                <input
                                    type="text"
                                    placeholder="e.g. QHB3..."
                                    value={transactionCode}
                                    onChange={(e) => setTransactionCode(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#1A1A1A] focus:bg-white outline-none font-medium transition-all uppercase placeholder:normal-case font-mono"
                                />
                            </div>
                            <button
                                onClick={handleConfirm}
                                disabled={isProcessing}
                                className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-bold hover:bg-black transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isProcessing ? <Loader2 className="animate-spin w-5 h-5" /> : 'Verify Payment'}
                            </button>
                        </div>
                    )}

                    {activeTab === 'redeem' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Promo Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter code..."
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    className="w-full px-4 py-4 bg-gray-50 rounded-xl border-2 border-transparent focus:border-[#1A1A1A] focus:bg-white outline-none font-medium transition-all"
                                />
                            </div>
                            <button
                                onClick={handleRedeem}
                                disabled={isProcessing}
                                className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-bold hover:bg-black transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isProcessing ? <Loader2 className="animate-spin w-5 h-5" /> : 'Redeem Token Code'}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
