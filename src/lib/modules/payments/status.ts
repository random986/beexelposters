import { checkPaymentStatus } from './intasend'
import { prisma } from '@/lib/db/prisma'
import { processPaymentCompletion } from './intasend'

/**
 * Check payment status and return detailed information
 */
export async function getPaymentStatus(invoiceId: string): Promise<{
  success: boolean
  paymentComplete?: boolean
  paymentFailed?: boolean
  codeGenerated?: boolean
  redemptionCode?: string
  status?: string
  mpesaReceipt?: string
  msg?: string
}> {
  try {
    // Get transaction from database
    const transaction = await prisma.transaction.findUnique({
      where: { invoiceId },
      include: {
        code: true,
      },
    })

    if (!transaction) {
      return {
        success: false,
        msg: 'Transaction not found',
      }
    }

    // If already completed, return code
    if (transaction.status === 'completed' && transaction.code) {
      return {
        success: true,
        paymentComplete: true,
        codeGenerated: true,
        redemptionCode: transaction.code.code,
        status: 'completed',
        mpesaReceipt: transaction.mpesaReceipt || undefined,
      }
    }

    // Check with IntaSend API
    const statusCheck = await checkPaymentStatus(invoiceId)
    if (!statusCheck.success || !statusCheck.invoice) {
      return {
        success: false,
        msg: statusCheck.msg || 'Failed to check payment status',
      }
    }

    const invoice = statusCheck.invoice
    const status = (invoice.state || invoice.status || 'unknown').toString().toUpperCase()
    const isComplete = status === 'COMPLETE' || 
                      status === 'COMPLETED' || 
                      status === 'SUCCESS' || 
                      status === 'PAID' ||
                      status === 'SUCCESSFUL'
    const isFailed = status === 'FAILED' || status === 'CANCELLED'

    // Update transaction status
    if (isComplete && transaction.status !== 'completed') {
      // Process payment completion
      const result = await processPaymentCompletion(invoiceId, invoice)
      
      if (result.success && result.code) {
        return {
          success: true,
          paymentComplete: true,
          codeGenerated: true,
          redemptionCode: result.code,
          status: 'completed',
          mpesaReceipt: invoice.mpesa_receipt || invoice.receipt_number || undefined,
        }
      }
    }

    // Update last checked time
    await prisma.transaction.update({
      where: { invoiceId },
      data: {
        lastCheckedAt: new Date(),
        status: isComplete ? 'completed' : isFailed ? 'failed' : 'pending',
      },
    })

    return {
      success: true,
      paymentComplete: isComplete,
      paymentFailed: isFailed,
      codeGenerated: false,
      status: status.toLowerCase(),
      mpesaReceipt: invoice.mpesa_receipt || invoice.receipt_number || undefined,
    }
  } catch (error: any) {
    console.error('[PAYMENT-STATUS] Error:', error)
    return {
      success: false,
      msg: error?.message || 'Failed to check payment status',
    }
  }
}

/**
 * Sync pending payments
 */
export async function syncPendingPayments(): Promise<{
  success: boolean
  processed: number
  msg?: string
}> {
  try {
    const pendingTransactions = await prisma.transaction.findMany({
      where: {
        status: 'pending',
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
    })

    let processed = 0

    for (const transaction of pendingTransactions) {
      if (!transaction.invoiceId) continue

      const status = await getPaymentStatus(transaction.invoiceId)
      if (status.paymentComplete && status.codeGenerated) {
        processed++
      }
    }

    return {
      success: true,
      processed,
    }
  } catch (error: any) {
    return {
      success: false,
      processed: 0,
      msg: error?.message || 'Failed to sync payments',
    }
  }
}

