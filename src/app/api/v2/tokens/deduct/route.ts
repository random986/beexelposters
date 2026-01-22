import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/modules/auth/user'
import { deductTokens } from '@/lib/modules/tokens/manager'
import { createErrorResponse } from '@/lib/utils/errors'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount = 1 } = body

    const userId = await getUserId({
      headers: request.headers,
      cookies: { get: (name: string) => request.cookies.get(name) },
      body,
    })

    const result = await deductTokens(userId, amount)

    if (!result.success) {
      return NextResponse.json({
        success: false,
        msg: result.msg || 'Failed to deduct tokens',
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      newBalance: result.newBalance,
    })
  } catch (error) {
    console.error('[API] Deduct tokens error:', error)
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}

