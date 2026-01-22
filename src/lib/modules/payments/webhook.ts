import { checkPaymentStatus, processPaymentCompletion } from './intasend'
import { prisma } from '@/lib/db/prisma'

/**
 * Process IntaSend webhook
 */
export async function processWebhook(webhookData: any): Promise<{
  received: boolean
  processed?: boolean
  error?: string
  invoiceId?: string
}> {
  try {
    const eventType = webhookData.event || webhookData.type
    const invoice = webhookData.invoice || webhookData.payload?.invoice || {}
    const invoiceId = invoice.invoice_id || invoice.id || webhookData.invoice_id

    if (!invoiceId) {
      return {
        received: true,
        processed: false,
        error: 'Missing invoice ID',
      }
    }

    const amount = parseFloat(invoice.amount || webhookData.amount || 0)
    const phoneNumber = invoice.phone_number || invoice.phone || webhookData.phone_number || ''
    const status = (invoice.state || invoice.status || webhookData.state || 'unknown').toString().toUpperCase()

    // Only process successful payments
    if (eventType !== 'payment_collected' && status !== 'COMPLETE' && status !== 'PROCESSING') {
      return {
        received: true,
        processed: false,
      }
    }

    // Validate data
    if (!amount || amount < 15 || !phoneNumber || !invoiceId) {
      return {
        received: true,
        processed: false,
        error: 'Invalid data',
      }
    }

    // Verify payment status with IntaSend API
    const statusCheck = await checkPaymentStatus(invoiceId)
    if (!statusCheck.success || !statusCheck.invoice) {
      return {
        received: true,
        processed: false,
        error: 'Failed to verify payment',
      }
    }

    const verifiedStatus = (statusCheck.invoice.state || statusCheck.invoice.status || 'unknown').toString().toUpperCase()
    const isComplete = verifiedStatus === 'COMPLETE' || 
                      verifiedStatus === 'COMPLETED' || 
                      verifiedStatus === 'SUCCESS' || 
                      verifiedStatus === 'PAID' ||
                      verifiedStatus === 'SUCCESSFUL'

    if (isComplete) {
      // Process payment completion
      const result = await processPaymentCompletion(invoiceId, statusCheck.invoice)
      
      return {
        received: true,
        processed: result.success,
        invoiceId,
      }
    }

    return {
      received: true,
      processed: false,
      invoiceId,
    }
  } catch (error: any) {
    console.error('[WEBHOOK] Processing error:', error)
    return {
      received: true,
      processed: false,
      error: error?.message || 'Internal error',
    }
  }
}

