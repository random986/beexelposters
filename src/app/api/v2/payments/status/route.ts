import { NextRequest, NextResponse } from 'next/server'
import { getPaymentStatus } from '@/lib/modules/payments/status'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { invoiceId } = body

    if (!invoiceId) {
      return NextResponse.json({
        success: false,
        msg: 'Invoice ID is required',
      }, { status: 400 })
    }

    console.log('[STATUS] Checking payment status for:', invoiceId)

    const result = await getPaymentStatus(invoiceId)

    console.log('[STATUS] Result:', {
      success: result.success,
      paymentComplete: result.paymentComplete,
      paymentFailed: result.paymentFailed,
      status: result.status,
    })

    return NextResponse.json(result)
  } catch (error: any) {
    console.error('[STATUS] Error:', error?.message || error)
    return NextResponse.json({
      success: false,
      msg: error?.message || 'Failed to check payment status',
    }, { status: 500 })
  }
}
