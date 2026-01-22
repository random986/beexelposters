import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/modules/auth/user'
import { redeemCode } from '@/lib/modules/tokens/codes'
import { getUserBalance } from '@/lib/modules/tokens/manager'
import { validateCodeFormat } from '@/lib/modules/tokens/validation'
import { createErrorResponse } from '@/lib/utils/errors'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code } = body

    // Validate code format
    const validation = validateCodeFormat(code)
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        msg: validation.msg,
      }, { status: 400 })
    }

    const userId = await getUserId({
      headers: request.headers,
      cookies: { get: (name: string) => request.cookies.get(name) },
      body,
    })

    const result = await redeemCode(code, userId)

    if (!result.success) {
      return NextResponse.json({
        success: false,
        msg: result.msg || 'Failed to redeem code',
      }, { status: 400 })
    }

    // Get updated balance
    const balance = await getUserBalance(userId)

    return NextResponse.json({
      success: true,
      tokens: result.tokens,
      balance: balance.balance,
      remainingTokens: result.remainingTokens,
      alreadyRedeemed: result.alreadyRedeemed,
    })
  } catch (error) {
    console.error('[API] Redeem code error:', error)
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}

