import { NextRequest, NextResponse } from 'next/server'
import { verifyMpesaReceipt } from '@/lib/modules/payments/intasend'
import { createErrorResponse } from '@/lib/utils/errors'

export const dynamic = 'force-dynamic'

/**
 * POST /api/v2/payments/verify-receipt
 * Verify M-Pesa receipt and generate code if valid
 * Used for manual payment recovery when STK push notification was missed
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { mpesaReceipt, phoneNumber } = body

    // Validate required fields
    if (!mpesaReceipt || !phoneNumber) {
      return NextResponse.json({
        success: false,
        msg: 'M-Pesa receipt code and phone number are required',
      }, { status: 400 })
    }

    // Verify receipt and process payment
    const result = await verifyMpesaReceipt({
      mpesaReceipt,
      phoneNumber,
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        code: result.code,
        alreadyProcessed: result.alreadyProcessed || false,
        msg: result.msg || 'Payment verified successfully!',
      })
    } else {
      return NextResponse.json({
        success: false,
        msg: result.msg || 'Failed to verify receipt',
      }, { status: 400 })
    }
  } catch (error) {
    console.error('[API] Verify receipt error:', error)
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}

