/**
 * Payment-related types
 */

export interface PaymentTransaction {
  id: string
  invoiceId?: string
  amount: number
  mpesaNumber: string
  email?: string
  userId?: string
  tokens?: number
  status: 'pending' | 'completed' | 'failed'
  redemptionCode?: string
  mpesaReceipt?: string
  createdAt: Date
  completedAt?: Date
}

export interface IntaSendWebhook {
  event?: string
  type?: string
  invoice?: {
    invoice_id?: string
    id?: string
    amount?: number
    phone_number?: string
    phone?: string
    state?: string
    status?: string
    mpesa_receipt?: string
    receipt_number?: string
  }
  invoice_id?: string
  amount?: number
  phone_number?: string
  state?: string
}

