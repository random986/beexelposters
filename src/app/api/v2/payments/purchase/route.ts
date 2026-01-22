import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/modules/auth/user'
import { initiateStkPush } from '@/lib/modules/payments/intasend'
import { validateAmount, validatePhoneNumber } from '@/lib/utils/validation'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, mpesaNumber, email } = body

    console.log('[PURCHASE] Request received:', { amount, mpesaNumber: mpesaNumber?.substring(0, 4) + '***' })

    // Validate amount
    const amountValidation = validateAmount(amount)
    if (!amountValidation.valid) {
      return NextResponse.json({
        success: false,
        msg: amountValidation.error,
      }, { status: 400 })
    }

    // Validate phone number
    const phoneValidation = validatePhoneNumber(mpesaNumber)
    if (!phoneValidation.valid) {
      return NextResponse.json({
        success: false,
        msg: phoneValidation.error,
      }, { status: 400 })
    }

    const userId = await getUserId({
      headers: request.headers,
      cookies: { get: (name: string) => request.cookies.get(name) },
      body,
    })

    console.log('[PURCHASE] User ID:', userId)

    const result = await initiateStkPush({
      amount,
      phoneNumber: mpesaNumber,
      userId,
      email,
    })

    console.log('[PURCHASE] Result:', { success: result.success, msg: result.msg })

    if (!result.success) {
      return NextResponse.json({
        success: false,
        msg: result.msg || 'Failed to initiate payment',
      }, { status: 400 }) // Changed from 500 to 400 for business logic errors
    }

    return NextResponse.json({
      success: true,
      invoiceId: result.invoiceId,
      apiRef: result.apiRef,
    })
  } catch (error: any) {
    console.error('[PURCHASE] Error:', error?.message || error)
    return NextResponse.json({
      success: false,
      msg: error?.message || 'Failed to process payment request',
    }, { status: 500 })
  }
}
