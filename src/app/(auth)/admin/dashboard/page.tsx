'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, AdminMetricCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, AdminSelect } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'

// ==========================================
// ICON COMPONENTS
// ==========================================
function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  )
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  )
}

function TicketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
}

function CurrencyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  )
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}

// ==========================================
// TYPES
// ==========================================
type ActiveTab = 'overview' | 'codes' | 'payments' | 'users' | 'profile'

interface RedemptionCode {
  id: string
  code: string
  tokens: number
  remainingTokens: number
  isRevoked: boolean
  used: boolean
  usedBy: string | null
  usedAt: string | null
  createdAt: string
  expiresAt: string | null
}

interface Payment {
  id: string
  invoiceId: string
  phone: string
  amount: number
  currency: string
  state: string
  tokens: number
  createdAt: string
  updatedAt: string
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()

  // Codes management state
  const [codes, setCodes] = useState<RedemptionCode[]>([])
  const [codesLoading, setCodesLoading] = useState(false)
  const [showCreateCode, setShowCreateCode] = useState(false)
  const [newCodeTokens, setNewCodeTokens] = useState('100')
  const [newCodeCount, setNewCodeCount] = useState('1')
  const [creatingCode, setCreatingCode] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Payments state
  const [payments, setPayments] = useState<Payment[]>([])
  const [paymentsLoading, setPaymentsLoading] = useState(false)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)

  // Profile state
  const [profile, setProfile] = useState<{ name: string; username: string } | null>(null)
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileName, setProfileName] = useState('')
  const [profileUsername, setProfileUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profileSaving, setProfileSaving] = useState(false)
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Toast notifications
  const { showToast } = useToast()

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/v2/auth/admin/verify')
      const data = await response.json()

      if (data.authenticated) {
        setAuthenticated(true)
      } else {
        router.push('/admin/login')
      }
    } catch {
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  const loadAnalytics = useCallback(async () => {
    setAnalyticsLoading(true)
    try {
      const response = await fetch('/api/v2/admin/analytics')
      const data = await response.json()
      if (data.success) {
        setAnalytics(data.analytics)
      }
    } catch (err) {
      console.error('Failed to load analytics:', err)
    } finally {
      setAnalyticsLoading(false)
    }
  }, [])

  const loadCodes = useCallback(async () => {
    setCodesLoading(true)
    try {
      const response = await fetch('/api/v2/admin/codes')
      const data = await response.json()
      if (data.success) {
        setCodes(data.codes || [])
      }
    } catch (err) {
      console.error('Failed to load codes:', err)
    } finally {
      setCodesLoading(false)
    }
  }, [])

  const loadPayments = useCallback(async () => {
    setPaymentsLoading(true)
    try {
      const response = await fetch('/api/v2/admin/payments')
      const data = await response.json()
      if (data.success) {
        setPayments(data.payments || [])
      }
    } catch (err) {
      console.error('Failed to load payments:', err)
    } finally {
      setPaymentsLoading(false)
    }
  }, [])

  const loadProfile = useCallback(async () => {
    setProfileLoading(true)
    try {
      const response = await fetch('/api/v2/admin/profile')
      const data = await response.json()
      if (data.success) {
        setProfile(data.profile)
        setProfileName(data.profile.name || '')
        setProfileUsername(data.profile.username || '')
      }
    } catch (err) {
      console.error('Failed to load profile:', err)
    } finally {
      setProfileLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
    loadAnalytics()
  }, [checkAuth, loadAnalytics])

  useEffect(() => {
    if (authenticated && activeTab === 'codes') {
      loadCodes()
    }
    if (authenticated && activeTab === 'payments') {
      loadPayments()
    }
    if (authenticated && activeTab === 'profile') {
      loadProfile()
    }
  }, [authenticated, activeTab, loadCodes, loadPayments, loadProfile])

  const handleCreateCode = async () => {
    setCreatingCode(true)
    try {
      const response = await fetch('/api/v2/admin/codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokens: parseInt(newCodeTokens),
          count: parseInt(newCodeCount)
        })
      })
      const data = await response.json()
      if (data.success) {
        showToast(`✓ Created ${newCodeCount} code(s) with ${newCodeTokens} tokens each`, 'success')
        setShowCreateCode(false)
        setNewCodeTokens('100')
        setNewCodeCount('1')
        loadCodes()
      } else {
        showToast(data.msg || 'Failed to create code', 'error')
      }
    } catch (err) {
      console.error('Failed to create code:', err)
      showToast('Failed to create code', 'error')
    } finally {
      setCreatingCode(false)
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    showToast('Code copied to clipboard', 'success')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleLogout = async () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/admin/login')
  }

  const handleRevoke = async (code: string, isCurrentlyRevoked: boolean) => {
    setActionLoading(code)
    try {
      const response = await fetch('/api/v2/admin/codes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          action: isCurrentlyRevoked ? 'unrevoke' : 'revoke'
        })
      })
      const data = await response.json()
      if (data.success) {
        showToast(`Code ${isCurrentlyRevoked ? 'activated' : 'revoked'} successfully`, 'success')
        loadCodes()
      } else {
        showToast(data.msg || 'Failed to update code', 'error')
      }
    } catch (err) {
      console.error('Failed to revoke/unrevoke code:', err)
      showToast('Failed to update code status', 'error')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (code: string) => {
    if (!confirm(`Are you sure you want to permanently delete code "${code}"?`)) {
      return
    }
    setActionLoading(code)
    try {
      const response = await fetch(`/api/v2/admin/codes?code=${code}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (data.success) {
        showToast('Code deleted successfully', 'success')
        loadCodes()
      } else {
        showToast(data.msg || 'Failed to delete code', 'error')
      }
    } catch (err) {
      console.error('Failed to delete code:', err)
      showToast('Failed to delete code', 'error')
    } finally {
      setActionLoading(null)
    }
  }

  const saveProfile = async () => {
    setProfileSaving(true)
    setProfileMessage(null)
    try {
      const response = await fetch('/api/v2/admin/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileName,
          newUsername: profileUsername !== profile?.username ? profileUsername : undefined,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setProfileMessage({ type: 'success', text: 'Profile updated successfully!' })
        loadProfile()
      } else {
        setProfileMessage({ type: 'error', text: data.msg || 'Failed to update profile' })
      }
    } catch (err) {
      setProfileMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setProfileSaving(false)
    }
  }

  const savePassword = async () => {
    if (newPassword !== confirmPassword) {
      setProfileMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }
    if (newPassword.length < 6) {
      setProfileMessage({ type: 'error', text: 'Password must be at least 6 characters' })
      return
    }
    setPasswordSaving(true)
    setProfileMessage(null)
    try {
      const response = await fetch('/api/v2/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setProfileMessage({ type: 'success', text: 'Password updated successfully!' })
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setProfileMessage({ type: 'error', text: data.msg || 'Failed to update password' })
      }
    } catch (err) {
      setProfileMessage({ type: 'error', text: 'Failed to update password' })
    } finally {
      setPasswordSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="admin-layout min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="admin-spinner w-8 h-8"></div>
          <p className="text-sm text-[#6B7280]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: DashboardIcon },
    { id: 'codes', label: 'Redemption Codes', icon: TicketIcon },
    { id: 'payments', label: 'Payments', icon: CreditCardIcon },
    { id: 'users', label: 'Users', icon: UsersIcon },
    { id: 'profile', label: 'Profile', icon: UsersIcon },
  ] as const

  return (
    <div className="admin-layout flex min-h-screen">
      {/* Sidebar - Dark Stripe Style */}
      <aside
        className={`fixed left-0 top-0 h-screen transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}
        style={{ background: 'linear-gradient(180deg, #0A2540 0%, #0D2E4D 100%)' }}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {!sidebarCollapsed && (
            <span className="text-lg font-semibold text-white">Beexel Admin</span>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === item.id
                ? 'bg-[#635BFF]/20 text-white border-l-2 border-[#7A73FF] ml-1 pl-2'
                : 'text-white/70 hover:bg-white/8 hover:text-white/95'
                }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 space-y-1">
          <button
            onClick={() => router.push('/')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:bg-white/8 hover:text-white transition-all"
          >
            <HomeIcon className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Back to Site</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-[#FF5567] hover:bg-[#FF5567]/10 transition-all"
          >
            <LogoutIcon className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="text-2xl font-semibold text-[#111827]">
            {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                await loadAnalytics();
                if (activeTab === 'codes') await loadCodes();
                if (activeTab === 'payments') await loadPayments();
                showToast('Data refreshed', 'success')
              }}
              className="p-2 rounded-lg hover:bg-[#635BFF]/10 text-[#545969] hover:text-[#635BFF] transition-all duration-200 active:scale-95"
              title="Refresh data"
            >
              <RefreshIcon className={`w-5 h-5 ${analyticsLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Header with Quick Actions */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1F36]">Dashboard</h2>
                  <p className="text-sm text-[#545969] mt-1">Business overview and analytics</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('codes')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#635BFF] text-white text-sm font-medium rounded-md hover:bg-[#5851EA] transition-all shadow-sm"
                  >
                    <TicketIcon className="w-4 h-4" />
                    Manage Codes
                  </button>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#1A1F36] text-sm font-medium rounded-md border border-[#C1C9D2] hover:bg-[#F6F9FC] transition-all"
                  >
                    <CreditCardIcon className="w-4 h-4" />
                    View Payments
                  </button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white rounded-lg p-5 border border-[#E3E8EE]" style={{ boxShadow: '0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.07)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-[#8792A2] uppercase tracking-wider">Revenue</span>
                    <div className="w-8 h-8 rounded-full bg-[#635BFF]/10 flex items-center justify-center">
                      <CurrencyIcon className="w-4 h-4 text-[#635BFF]" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-[#1A1F36] tracking-tight">KES {analytics?.revenue?.total?.toLocaleString() || 0}</div>
                  <div className="mt-2 flex items-center text-xs text-[#00D4AA]">
                    <span className="font-medium">{analytics?.revenue?.transactions || 0} transactions</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 border border-[#E3E8EE]" style={{ boxShadow: '0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.07)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-[#8792A2] uppercase tracking-wider">Profit</span>
                    <div className="w-8 h-8 rounded-full bg-[#00D4AA]/10 flex items-center justify-center">
                      <CurrencyIcon className="w-4 h-4 text-[#00D4AA]" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-[#1A1F36] tracking-tight">KES {analytics?.profit?.total?.toLocaleString() || 0}</div>
                  <div className="mt-2 text-xs text-[#545969]">
                    from <span className="text-[#00D4AA] font-medium">{analytics?.tokens?.sold || 0}</span> tokens sold
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 border border-[#E3E8EE]" style={{ boxShadow: '0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.07)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-[#8792A2] uppercase tracking-wider">Renders</span>
                    <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
                      <DashboardIcon className="w-4 h-4 text-[#8B5CF6]" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-[#1A1F36] tracking-tight">{analytics?.renders?.successful || 0}</div>
                  <div className="mt-2 text-xs text-[#545969]">
                    <span className="text-[#00D4AA] font-medium">{analytics?.performance?.renderSuccessRate || '0%'}</span> success rate
                  </div>
                </div>

                <div className="bg-white rounded-lg p-5 border border-[#E3E8EE]" style={{ boxShadow: '0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.07)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-[#8792A2] uppercase tracking-wider">Tokens Used</span>
                    <div className="w-8 h-8 rounded-full bg-[#FFB800]/10 flex items-center justify-center">
                      <TicketIcon className="w-4 h-4 text-[#FFB800]" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-[#1A1F36] tracking-tight">{analytics?.tokens?.used || 0}</div>
                  <div className="mt-2 text-xs text-[#545969]">
                    of <span className="font-medium">{analytics?.tokens?.sold || 0}</span> sold
                  </div>
                </div>
              </div>

              {/* Analytics Section */}
              <div>
                <h3 className="text-sm font-semibold text-[#1A1F36] mb-4 uppercase tracking-wide">Analytics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Profit Analysis */}
                  <div className="bg-white rounded-lg border border-[#E3E8EE] overflow-hidden" style={{ boxShadow: '0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.07)' }}>
                    <div className="px-5 py-4 border-b border-[#E3E8EE]">
                      <h4 className="text-sm font-semibold text-[#1A1F36]">Profit Breakdown</h4>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#545969]">Realized</span>
                        <span className="text-sm font-semibold text-[#00D4AA]">KES {analytics?.profit?.realized?.toLocaleString() || 0}</span>
                      </div>
                      <div className="h-2 bg-[#E3E8EE] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00D4AA] to-[#00E5BB] rounded-full transition-all duration-500"
                          style={{ width: `${analytics?.profit?.total ? Math.min(((analytics?.profit?.realized || 0) / analytics.profit.total) * 100, 100) : 0}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-[#545969]">Unrealized</span>
                        <span className="text-sm font-semibold text-[#FFB800]">KES {analytics?.profit?.unrealized?.toLocaleString() || 0}</span>
                      </div>
                      <div className="pt-3 border-t border-[#E3E8EE] flex items-center justify-between">
                        <span className="text-xs text-[#8792A2]">Per token rate</span>
                        <span className="text-sm font-bold text-[#1A1F36]">KES 8</span>
                      </div>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="bg-white rounded-lg border border-[#E3E8EE] overflow-hidden" style={{ boxShadow: '0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.07)' }}>
                    <div className="px-5 py-4 border-b border-[#E3E8EE]">
                      <h4 className="text-sm font-semibold text-[#1A1F36]">Performance</h4>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#545969]">Payment Success</span>
                        <span className="text-sm font-semibold text-[#00D4AA]">{analytics?.performance?.paymentConversionRate || '0%'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#545969]">Render Success</span>
                        <span className="text-sm font-semibold text-[#00D4AA]">{analytics?.performance?.renderSuccessRate || '0%'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#545969]">Avg Renders/User</span>
                        <span className="text-sm font-semibold text-[#1A1F36]">{analytics?.performance?.avgRendersPerUser || 0}</span>
                      </div>
                      <div className="pt-3 border-t border-[#E3E8EE] flex items-center justify-between">
                        <span className="text-xs text-[#8792A2]">Active users</span>
                        <span className="text-sm font-bold text-[#635BFF]">{analytics?.users?.withRenders || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Section */}
              <div>
                <h3 className="text-sm font-semibold text-[#1A1F36] mb-4 uppercase tracking-wide">Activity</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {/* Render Jobs */}
                  <div className="bg-white rounded-lg border border-[#E3E8EE] overflow-hidden" style={{ boxShadow: '0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.07)' }}>
                    <div className="px-5 py-4 border-b border-[#E3E8EE] flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-[#1A1F36]">Render Jobs</h4>
                      <span className="text-xs text-[#8792A2]">All time</span>
                    </div>
                    <div className="p-5 grid grid-cols-4 gap-3">
                      <div className="text-center p-3 bg-[#F6F9FC] rounded-lg">
                        <div className="text-xl font-bold text-[#1A1F36]">{analytics?.renders?.total || 0}</div>
                        <div className="text-xs text-[#8792A2] mt-1">Total</div>
                      </div>
                      <div className="text-center p-3 bg-[#00D4AA]/5 rounded-lg">
                        <div className="text-xl font-bold text-[#00D4AA]">{analytics?.renders?.successful || 0}</div>
                        <div className="text-xs text-[#8792A2] mt-1">Success</div>
                      </div>
                      <div className="text-center p-3 bg-[#FF5567]/5 rounded-lg">
                        <div className="text-xl font-bold text-[#FF5567]">{analytics?.renders?.failed || 0}</div>
                        <div className="text-xs text-[#8792A2] mt-1">Failed</div>
                      </div>
                      <div className="text-center p-3 bg-[#FFB800]/5 rounded-lg">
                        <div className="text-xl font-bold text-[#FFB800]">{analytics?.renders?.pending || 0}</div>
                        <div className="text-xs text-[#8792A2] mt-1">Pending</div>
                      </div>
                    </div>
                  </div>

                  {/* Users & Codes */}
                  <div className="bg-white rounded-lg border border-[#E3E8EE] overflow-hidden" style={{ boxShadow: '0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.07)' }}>
                    <div className="px-5 py-4 border-b border-[#E3E8EE] flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-[#1A1F36]">Users & Codes</h4>
                      <span className="text-xs text-[#8792A2]">Platform stats</span>
                    </div>
                    <div className="p-5 grid grid-cols-4 gap-3">
                      <div className="text-center p-3 bg-[#F6F9FC] rounded-lg">
                        <div className="text-xl font-bold text-[#1A1F36]">{analytics?.users?.total || 0}</div>
                        <div className="text-xs text-[#8792A2] mt-1">Users</div>
                      </div>
                      <div className="text-center p-3 bg-[#00D4AA]/5 rounded-lg">
                        <div className="text-xl font-bold text-[#00D4AA]">{analytics?.users?.active || 0}</div>
                        <div className="text-xs text-[#8792A2] mt-1">Online</div>
                      </div>
                      <div className="text-center p-3 bg-[#635BFF]/5 rounded-lg">
                        <div className="text-xl font-bold text-[#635BFF]">{analytics?.codes?.active || 0}</div>
                        <div className="text-xs text-[#8792A2] mt-1">Active</div>
                      </div>
                      <div className="text-center p-3 bg-[#8792A2]/5 rounded-lg">
                        <div className="text-xl font-bold text-[#545969]">{analytics?.codes?.exhausted || 0}</div>
                        <div className="text-xs text-[#8792A2] mt-1">Used</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Summary */}
              <div>
                <h3 className="text-sm font-semibold text-[#1A1F36] mb-4 uppercase tracking-wide">Business Summary</h3>
                <div className="bg-white rounded-lg border border-[#E3E8EE] overflow-hidden" style={{ boxShadow: '0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.07)' }}>
                  <div className="px-5 py-4 border-b border-[#E3E8EE] flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-[#1A1F36]">Performance Overview</h4>
                    <span className="text-xs text-[#8792A2]">All time</span>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <div className="text-xs text-[#8792A2] uppercase tracking-wide mb-1">Gross Revenue</div>
                        <div className="text-2xl font-bold text-[#1A1F36]">KES {analytics?.revenue?.total?.toLocaleString() || 0}</div>
                        <div className="text-xs text-[#545969] mt-1">{analytics?.revenue?.transactions || 0} payments</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8792A2] uppercase tracking-wide mb-1">Net Profit</div>
                        <div className="text-2xl font-bold text-[#00D4AA]">KES {analytics?.profit?.total?.toLocaleString() || 0}</div>
                        <div className="text-xs text-[#545969] mt-1">KES 8/token margin</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8792A2] uppercase tracking-wide mb-1">Tokens Sold</div>
                        <div className="text-2xl font-bold text-[#635BFF]">{analytics?.tokens?.sold || 0}</div>
                        <div className="text-xs text-[#545969] mt-1">{analytics?.tokens?.used || 0} used ({analytics?.performance?.tokenUtilization || '0%'})</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#8792A2] uppercase tracking-wide mb-1">Total Renders</div>
                        <div className="text-2xl font-bold text-[#8B5CF6]">{analytics?.renders?.total || 0}</div>
                        <div className="text-xs text-[#545969] mt-1">{analytics?.renders?.successful || 0} successful</div>
                      </div>
                    </div>

                    {/* Conversion Funnel */}
                    <div className="mt-6 pt-6 border-t border-[#E3E8EE]">
                      <div className="text-xs text-[#8792A2] uppercase tracking-wide mb-3">Conversion Metrics</div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-[#F6F9FC] rounded-lg">
                          <div className="text-xl font-bold text-[#1A1F36]">{analytics?.users?.total || 0}</div>
                          <div className="text-xs text-[#545969] mt-1">Total Users</div>
                        </div>
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#C1C9D2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="text-center p-4 bg-[#00D4AA]/5 rounded-lg">
                          <div className="text-xl font-bold text-[#00D4AA]">{analytics?.users?.withRenders || 0}</div>
                          <div className="text-xs text-[#545969] mt-1">Active Customers</div>
                        </div>
                      </div>
                      <div className="mt-3 text-center text-xs text-[#8792A2]">
                        Conversion: <span className="font-semibold text-[#635BFF]">{analytics?.users?.total ? Math.round((analytics?.users?.withRenders || 0) / analytics.users.total * 100) : 0}%</span> of users made at least one render
                      </div>
                    </div>

                    {/* Key Rates */}
                    <div className="mt-6 pt-6 border-t border-[#E3E8EE]">
                      <div className="text-xs text-[#8792A2] uppercase tracking-wide mb-3">Success Rates</div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center justify-between p-3 bg-[#F6F9FC] rounded-lg">
                          <span className="text-sm text-[#545969]">Payment Success</span>
                          <span className="text-sm font-bold text-[#00D4AA]">{analytics?.performance?.paymentConversionRate || '0%'}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#F6F9FC] rounded-lg">
                          <span className="text-sm text-[#545969]">Render Success</span>
                          <span className="text-sm font-bold text-[#00D4AA]">{analytics?.performance?.renderSuccessRate || '0%'}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#F6F9FC] rounded-lg">
                          <span className="text-sm text-[#545969]">Avg Renders/User</span>
                          <span className="text-sm font-bold text-[#635BFF]">{analytics?.performance?.avgRendersPerUser || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Codes Tab */}
          {activeTab === 'codes' && (
            <div className="space-y-6">
              {/* Actions Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#6B7280]">
                    {codes.length} total codes
                  </span>
                </div>
                <Button variant="admin-primary" onClick={() => setShowCreateCode(true)}>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create Code
                </Button>
              </div>

              {/* Create Code Modal */}
              {showCreateCode && (
                <Card variant="admin" className="border-[#4D5BF9]/20 bg-[#F9FAFC]">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-base font-semibold text-[#111827]">Generate New Codes</h3>
                    <button
                      onClick={() => setShowCreateCode(false)}
                      className="p-1 rounded hover:bg-[#E5E7EB] text-[#6B7280]"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      variant="admin"
                      label="Tokens per code"
                      type="number"
                      value={newCodeTokens}
                      onChange={(e) => setNewCodeTokens(e.target.value)}
                      min="1"
                    />
                    <Input
                      variant="admin"
                      label="Number of codes"
                      type="number"
                      value={newCodeCount}
                      onChange={(e) => setNewCodeCount(e.target.value)}
                      min="1"
                      max="50"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="admin-primary" onClick={handleCreateCode} loading={creatingCode}>
                      Generate Codes
                    </Button>
                    <Button variant="admin-secondary" onClick={() => setShowCreateCode(false)}>
                      Cancel
                    </Button>
                  </div>
                </Card>
              )}

              {/* Codes Table */}
              <Card variant="admin" className="p-0 overflow-hidden">
                {codesLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="admin-spinner"></div>
                  </div>
                ) : codes.length === 0 ? (
                  <div className="admin-empty-state">
                    <TicketIcon className="admin-empty-state-icon" />
                    <h3 className="admin-empty-state-title">No codes yet</h3>
                    <p className="admin-empty-state-text">Create your first redemption code to get started</p>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead className="bg-[#F9FAFC]">
                      <tr>
                        <th>Code</th>
                        <th>Tokens</th>
                        <th>Remaining</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {codes.map((code) => {
                        const isExhausted = code.remainingTokens <= 0
                        const isRevoked = code.isRevoked
                        return (
                          <tr key={code.id} className={isRevoked ? 'opacity-60' : ''}>
                            <td>
                              <code className="px-2 py-1 bg-[#F3F4F6] rounded text-sm font-mono">
                                {code.code}
                              </code>
                            </td>
                            <td>{code.tokens}</td>
                            <td>
                              <span className={isExhausted ? 'text-[#EF4444]' : 'text-[#10B981]'}>
                                {code.remainingTokens}
                              </span>
                            </td>
                            <td>
                              {isRevoked ? (
                                <span className="admin-badge-red">Revoked</span>
                              ) : isExhausted ? (
                                <span className="admin-badge-gray">Exhausted</span>
                              ) : (
                                <span className="admin-badge-green">Active</span>
                              )}
                            </td>
                            <td className="text-[#6B7280]">
                              {new Date(code.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => copyToClipboard(code.code)}
                                  className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors"
                                  title="Copy code"
                                >
                                  {copiedCode === code.code ? (
                                    <CheckIcon className="w-4 h-4 text-[#10B981]" />
                                  ) : (
                                    <ClipboardIcon className="w-4 h-4" />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleRevoke(code.code, code.isRevoked)}
                                  disabled={actionLoading === code.code}
                                  className={`p-1.5 rounded-lg transition-colors ${code.isRevoked
                                    ? 'hover:bg-green-50 text-green-600'
                                    : 'hover:bg-yellow-50 text-yellow-600'
                                    }`}
                                  title={code.isRevoked ? 'Unrevoke' : 'Revoke'}
                                >
                                  {actionLoading === code.code ? (
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={code.isRevoked ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"} />
                                    </svg>
                                  )}
                                </button>
                                <button
                                  onClick={() => handleDelete(code.code)}
                                  disabled={actionLoading === code.code}
                                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                  title="Delete"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </Card>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <AdminMetricCard
                  value={`KES ${analytics?.revenue?.total?.toLocaleString() || 0}`}
                  label="Total Revenue"
                  accent="blue"
                />
                <AdminMetricCard
                  value={analytics?.payments?.completed || 0}
                  label="Successful"
                  accent="green"
                />
                <AdminMetricCard
                  value={analytics?.payments?.pending || 0}
                  label="Pending"
                  accent="yellow"
                />
                <AdminMetricCard
                  value={analytics?.payments?.failed || 0}
                  label="Failed"
                  accent="red"
                />
              </div>

              {/* Payments Table */}
              <Card variant="admin" className="p-0 overflow-hidden">
                {paymentsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="admin-spinner"></div>
                  </div>
                ) : payments.length === 0 ? (
                  <div className="admin-empty-state">
                    <CreditCardIcon className="admin-empty-state-icon" />
                    <h3 className="admin-empty-state-title">No payments yet</h3>
                    <p className="admin-empty-state-text">Payments will appear here once users make purchases</p>
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead className="bg-[#F9FAFC]">
                      <tr>
                        <th>Invoice ID</th>
                        <th>Phone</th>
                        <th>Amount</th>
                        <th>Tokens</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td>
                            <code className="text-xs font-mono text-[#6B7280]">
                              {payment.invoiceId?.slice(0, 12)}...
                            </code>
                          </td>
                          <td>{payment.phone}</td>
                          <td className="font-medium">
                            {payment.currency} {payment.amount?.toLocaleString()}
                          </td>
                          <td>{payment.tokens}</td>
                          <td>
                            <span className={
                              payment.state === 'COMPLETE' ? 'admin-badge-green' :
                                payment.state === 'PENDING' ? 'admin-badge-yellow' :
                                  payment.state === 'PROCESSING' ? 'admin-badge-blue' :
                                    'admin-badge-red'
                            }>
                              {payment.state}
                            </span>
                          </td>
                          <td className="text-[#6B7280]">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Card>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <AdminMetricCard
                value={analytics?.users?.total || 0}
                label="Total Registered Users"
                accent="blue"
                icon={<UsersIcon className="w-5 h-5" />}
              />

              <Card variant="admin">
                <div className="admin-empty-state">
                  <UsersIcon className="admin-empty-state-icon" />
                  <h3 className="admin-empty-state-title">User Management</h3>
                  <p className="admin-empty-state-text">
                    User management features coming soon. View analytics above.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {profileMessage && (
                <div className={`p-4 rounded-lg ${profileMessage.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                  {profileMessage.text}
                </div>
              )}

              {profileLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="admin-spinner"></div>
                </div>
              ) : (
                <>
                  {/* Profile Information */}
                  <Card variant="admin" title="Profile Information" subtitle="Update your display name and username">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-1">Display Name</label>
                        <input
                          type="text"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4D5BF9] focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-1">Username</label>
                        <input
                          type="text"
                          value={profileUsername}
                          onChange={(e) => setProfileUsername(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4D5BF9] focus:border-transparent"
                          placeholder="Enter username"
                        />
                      </div>
                      <Button
                        variant="admin-primary"
                        onClick={saveProfile}
                        loading={profileSaving}
                      >
                        Save Profile
                      </Button>
                    </div>
                  </Card>

                  {/* Change Password */}
                  <Card variant="admin" title="Change Password" subtitle="Update your password">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-1">Current Password</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4D5BF9] focus:border-transparent"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-1">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4D5BF9] focus:border-transparent"
                          placeholder="Enter new password (min 6 characters)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-1">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4D5BF9] focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <Button
                        variant="admin-primary"
                        onClick={savePassword}
                        loading={passwordSaving}
                        disabled={!currentPassword || !newPassword || !confirmPassword}
                      >
                        Change Password
                      </Button>
                    </div>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}



