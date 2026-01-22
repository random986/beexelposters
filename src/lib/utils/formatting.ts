/**
 * Data formatting utilities
 */

export function formatCurrency(amount: number, currency: string = 'KES'): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function formatPhoneNumber(phone: string): string {
  const clean = phone.replace(/[^\d]/g, '')
  
  if (clean.startsWith('254')) {
    return `+${clean}`
  }
  
  if (clean.startsWith('07') || clean.startsWith('01')) {
    return `+254${clean.slice(1)}`
  }
  
  return phone
}

