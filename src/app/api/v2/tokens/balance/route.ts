import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/modules/auth/user'
import { getUserBalance } from '@/lib/modules/tokens/manager'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId({
      headers: request.headers,
      cookies: { get: (name: string) => request.cookies.get(name) },
      query: Object.fromEntries(request.nextUrl.searchParams),
    })

    console.log('[API] Getting balance for user:', userId)

    const balance = await getUserBalance(userId)

    return NextResponse.json({
      success: true,
      tokens: balance,
      userId,
    })
  } catch (error: any) {
    console.error('[API] Get balance error:', error)

    // Return default balance on error to prevent UI from breaking
    return NextResponse.json({
      success: true,
      tokens: {
        balance: 0,
        totalTokens: 0,
        usedTokens: 0,
        remainingFromCodes: 0,
        userBalance: 0,
      },
      error: error?.message || 'Database connection error',
    })
  }
}
