import IntaSend from 'intasend-node'
import crypto from 'crypto'
import { config } from '@/lib/constants/config'
import { prisma } from '@/lib/db/prisma'
import { createCode } from '../tokens/codes'
import { sendPaymentConfirmation } from './notifications'
import { getOrCreateUserToken } from '../tokens/manager'
import { PRICING } from '@/lib/constants/pricing'

let intasendClient: IntaSend | null = null

/**
 * Initialize IntaSend client
 */
export function getIntaSendClient(): IntaSend | null {
  if (intasendClient) {
    return intasendClient
  }

  const publicKey = config.intasend.publicKey
  const secretKey = config.intasend.secretKey
  const testMode = config.intasend.testMode

  if (!publicKey || !secretKey) {
    console.warn('[INTASEND] API keys not configured')
    return null
  }

  intasendClient = new IntaSend(publicKey, secretKey, testMode)
  return intasendClient
}

/**
 * Normalize phone number to 254xxxxxxxxx format
 */
export function normalizePhoneNumber(phone: string): { success: boolean; phone?: string; error?: string } {
  // Remove all non-digits
  let cleanPhone = phone.replace(/[^\d]/g, '').trim()

  // Convert 07xxxxxxxx or 01xxxxxxxx to 254xxxxxxxxx
  if (/^(07|01)\d{8}$/.test(cleanPhone)) {
    cleanPhone = '254' + cleanPhone.slice(1)
  }

  // Validate final format: must be exactly 254xxxxxxxxx (12 digits)
  if (!/^254\d{9}$/.test(cleanPhone) || cleanPhone.length !== 12) {
    return {
      success: false,
      error: 'Enter your number as 07/01XXXXXXXX (10 digits) or 254XXXXXXXXX (12 digits).',
    }
  }

  return { success: true, phone: cleanPhone }
}

/**
 * Initiate M-PESA STK Push
 * All transactions are logged including failures for customer support
 */
export async function initiateStkPush(data: {
  amount: number
  phoneNumber: string
  userId?: string
  email?: string
}): Promise<{
  success: boolean
  invoiceId?: string
  apiRef?: string
  transactionId?: string
  msg?: string
}> {
  const client = getIntaSendClient()

  // Validate amount first (before creating transaction)
  // Validate amount first (before creating transaction)
  if (data.amount < PRICING.MIN_PURCHASE || data.amount % PRICING.TOKEN_PRICE !== 0) {
    return {
      success: false,
      msg: `Amount must be in multiples of KES ${PRICING.TOKEN_PRICE}. Each KES ${PRICING.TOKEN_PRICE} = 1 token.`,
    }
  }

  // Normalize phone number
  const phoneResult = normalizePhoneNumber(data.phoneNumber)
  if (!phoneResult.success) {
    return {
      success: false,
      msg: phoneResult.error || 'Invalid phone number format',
    }
  }

  const normalizedPhone = phoneResult.phone!
  const tokensToAward = Math.floor(data.amount / PRICING.TOKEN_PRICE)

  // Generate API reference
  const apiRef = `TXN${Date.now()}_${crypto.randomBytes(4).toString('hex').toUpperCase()}`

  // Ensure UserToken record exists if userId is provided
  let finalUserId = data.userId
  if (finalUserId) {
    await getOrCreateUserToken(finalUserId)
  }

  // Create transaction record BEFORE calling IntaSend (for logging all attempts)
  let transaction
  try {
    transaction = await prisma.transaction.create({
      data: {
        amount: data.amount,
        mpesaNumber: normalizedPhone,
        email: data.email,
        userId: finalUserId || null,
        tokens: tokensToAward,
        status: 'pending',
        apiRef,
        attempts: 1,
      },
    })
  } catch (dbError: any) {
    console.error('[INTASEND] Failed to create transaction record:', dbError)
    return {
      success: false,
      msg: 'Failed to initiate payment. Please try again.',
    }
  }

  // Check if payment service is configured
  if (!client) {
    // Log failure reason
    await updateTransactionFailed(transaction.id, 'Payment service not configured')
    return {
      success: false,
      transactionId: transaction.id,
      msg: 'Payment service not configured. Please contact support.',
    }
  }

  try {
    const collection = client.collection()

    // Try without + first
    let stkResponse
    let attemptCount = 1
    try {
      stkResponse = await collection.mpesaStkPush({
        amount: data.amount,
        phone_number: normalizedPhone,
        api_ref: apiRef,
        narrative: `Beexel AI Render - ${tokensToAward} tokens`,
      })
    } catch (error: any) {
      // If phone format error, retry with +254
      const isPhoneError = /phone|number|format/i.test(error?.message || '') || error?.response?.status === 400
      if (isPhoneError) {
        attemptCount = 2
        stkResponse = await collection.mpesaStkPush({
          amount: data.amount,
          phone_number: `+${normalizedPhone}`,
          api_ref: apiRef,
          narrative: `Beexel AI Render - ${tokensToAward} tokens`,
        })
      } else {
        throw error
      }
    }

    const invoiceId = stkResponse.invoice_id || stkResponse.invoice?.invoice_id

    if (!invoiceId) {
      // Log failure - no invoice ID returned
      await updateTransactionFailed(transaction.id, 'No invoice ID returned from payment provider')
      return {
        success: false,
        transactionId: transaction.id,
        msg: 'Failed to initiate payment. Please try again.',
      }
    }

    // Update transaction with success details
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        invoiceId,
        stkRequestId: stkResponse.request_id,
        attempts: attemptCount,
      },
    })

    return {
      success: true,
      invoiceId,
      apiRef,
      transactionId: transaction.id,
    }
  } catch (error: any) {
    console.error('[INTASEND] STK Push error:', error)

    // Log the failure with detailed reason
    const failureReason = extractErrorMessage(error)
    await updateTransactionFailed(transaction.id, failureReason)

    return {
      success: false,
      transactionId: transaction.id,
      msg: error?.message || 'Failed to initiate payment. Please try again.',
    }
  }
}

/**
 * Update transaction as failed with reason
 */
async function updateTransactionFailed(transactionId: string, reason: string): Promise<void> {
  try {
    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: 'failed',
        failureReason: reason,
        failedAt: new Date(),
      },
    })
  } catch (error) {
    console.error('[PAYMENT] Failed to update transaction failure:', error)
  }
}

/**
 * Extract a readable error message from various error formats
 */
function extractErrorMessage(error: any): string {
  if (!error) return 'Unknown error'

  // Check common error message locations
  if (error.response?.data?.message) return error.response.data.message
  if (error.response?.data?.error) return error.response.data.error
  if (error.response?.data?.detail) return error.response.data.detail
  if (error.message) return error.message
  if (typeof error === 'string') return error

  return JSON.stringify(error).substring(0, 500)
}

/**
 * Check payment status
 */
export async function checkPaymentStatus(invoiceId: string): Promise<{
  success: boolean
  status?: string
  invoice?: any
  msg?: string
}> {
  const client = getIntaSendClient()
  if (!client) {
    return {
      success: false,
      msg: 'Payment service not configured',
    }
  }

  try {
    const collection = client.collection()
    const statusResponse = await collection.status(invoiceId)

    const invoice = statusResponse.invoice || statusResponse
    const status = (invoice.state || invoice.status || 'unknown').toString().toUpperCase()

    return {
      success: true,
      status,
      invoice,
    }
  } catch (error: any) {
    return {
      success: false,
      msg: error?.message || 'Failed to check payment status',
    }
  }
}

/**
 * Process completed payment
 */
export async function processPaymentCompletion(
  invoiceId: string,
  invoiceData: any
): Promise<{
  success: boolean
  code?: string
  tokensAdded?: number
  msg?: string
}> {
  try {
    // Find transaction
    const transaction = await prisma.transaction.findUnique({
      where: { invoiceId },
    })

    if (!transaction) {
      return {
        success: false,
        msg: 'Transaction not found',
      }
    }

    if (transaction.status === 'completed') {
      // Already processed
      const code = await prisma.code.findFirst({
        where: {
          transactions: {
            some: {
              invoiceId,
            },
          },
        },
      })

      return {
        success: true,
        code: code?.code,
      }
    }

    const amount = Number(transaction.amount)
    const tokens = transaction.tokens || Math.floor(amount / PRICING.TOKEN_PRICE)
    const phoneNumber = transaction.mpesaNumber
    const email = transaction.email
    const mpesaReceipt = invoiceData.mpesa_receipt || invoiceData.receipt_number || ''
    const userId = transaction.userId

    // Create redemption code
    const codeData = await createCode({
      tokens,
      phoneNumber,
      amount,
      mpesaReceipt,
      autoGenerated: true,
      createdBy: 'system',
    })

    // IMPORTANT: If we have a userId, directly add tokens to their balance
    if (userId) {
      console.log('[PAYMENT] Adding tokens directly to user:', { userId, tokens })
      await addTokensToUser(userId, tokens)
    }

    // Update transaction
    await prisma.transaction.update({
      where: { invoiceId },
      data: {
        status: 'completed',
        redemptionCodeId: codeData.id,
        mpesaReceipt,
        completedAt: new Date(),
        paymentReceivedAt: new Date(),
        codeGeneratedAt: new Date(),
        codeGeneratedBy: 'system',
      },
    })

    // Send notifications
    await sendPaymentConfirmation(phoneNumber, codeData.code, email || undefined)

    console.log('[PAYMENT] Payment completed successfully:', { invoiceId, tokens, userId })

    return {
      success: true,
      code: codeData.code,
      tokensAdded: tokens,
    }
  } catch (error: any) {
    console.error('[PAYMENT] Process completion error:', error)
    return {
      success: false,
      msg: error?.message || 'Failed to process payment',
    }
  }
}

/**
 * Add tokens directly to user balance (used after successful payment)
 */
async function addTokensToUser(userId: string, tokens: number): Promise<void> {
  const userToken = await getOrCreateUserToken(userId)

  await prisma.userToken.update({
    where: { userId },
    data: {
      totalTokens: userToken.totalTokens + tokens,
      balance: userToken.balance + tokens,
    },
  })

  console.log('[PAYMENT] Tokens added to user:', { userId, tokens, newBalance: userToken.balance + tokens })
}

/**
 * Verify M-Pesa receipt and generate code if valid
 * Used for manual payment recovery when STK push notification was missed
 */
export async function verifyMpesaReceipt(data: {
  mpesaReceipt: string
  phoneNumber: string
}): Promise<{
  success: boolean
  code?: string
  alreadyProcessed?: boolean
  msg?: string
}> {
  // Normalize phone number
  const phoneResult = normalizePhoneNumber(data.phoneNumber)
  if (!phoneResult.success) {
    return {
      success: false,
      msg: phoneResult.error || 'Invalid phone number format',
    }
  }
  const normalizedPhone = phoneResult.phone!

  // Clean receipt code (remove spaces, uppercase)
  const receipt = data.mpesaReceipt.trim().toUpperCase()
  if (!receipt || receipt.length < 8) {
    return {
      success: false,
      msg: 'Please enter a valid M-Pesa receipt code (e.g., SJK1ABCDEF)',
    }
  }

  try {
    // First check if receipt already processed in our database
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        mpesaReceipt: receipt,
        status: 'completed',
      },
      include: {
        code: true,
      },
    })

    if (existingTransaction) {
      // Already processed - return existing code
      return {
        success: true,
        code: existingTransaction.code?.code,
        alreadyProcessed: true,
        msg: 'This payment has already been processed.',
      }
    }

    // Check if there's a pending transaction with matching phone that we can update
    const pendingTransaction = await prisma.transaction.findFirst({
      where: {
        mpesaNumber: normalizedPhone,
        status: 'pending',
        mpesaReceipt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Try to verify with IntaSend (if we have a pending transaction with invoice ID)
    if (pendingTransaction?.invoiceId) {
      const statusResult = await checkPaymentStatus(pendingTransaction.invoiceId)

      if (statusResult.success && statusResult.status === 'COMPLETE') {
        // Update with receipt and process
        await prisma.transaction.update({
          where: { id: pendingTransaction.id },
          data: { mpesaReceipt: receipt },
        })

        const result = await processPaymentCompletion(
          pendingTransaction.invoiceId,
          { mpesa_receipt: receipt }
        )

        if (result.success) {
          return {
            success: true,
            code: result.code,
            msg: 'Payment verified and code generated!',
          }
        }
      }
    }

    // If no pending transaction found, create a new one for manual verification
    // This allows admin to later verify and process if the user shows proof
    const manualTransaction = await prisma.transaction.create({
      data: {
        amount: 0, // Unknown amount - will be updated by admin
        mpesaNumber: normalizedPhone,
        mpesaReceipt: receipt,
        status: 'pending',
        apiRef: `MANUAL_${Date.now()}`,
        attempts: 1,
        failureReason: 'Manual receipt verification - awaiting admin review',
      },
    })

    return {
      success: false,
      msg: 'We could not automatically verify this receipt. Your request has been logged for manual review. Please contact support with your M-Pesa message for assistance.',
    }
  } catch (error: any) {
    console.error('[PAYMENT] Receipt verification error:', error)
    return {
      success: false,
      msg: 'Failed to verify receipt. Please try again or contact support.',
    }
  }
}

