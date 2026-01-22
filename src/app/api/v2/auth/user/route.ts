import { NextRequest, NextResponse } from 'next/server'
import { getUserId, generateUserId } from '@/lib/modules/auth/user'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    let userId = await getUserId({
      headers: request.headers,
      cookies: { get: (name: string) => request.cookies.get(name) },
    })

    // If anonymous, generate and set cookie
    if (userId === 'anonymous' || userId.startsWith('ip_')) {
      userId = generateUserId()
      const cookieStore = await cookies()
      cookieStore.set('userId', userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 365 * 24 * 60 * 60, // 1 year
        path: '/',
      })
    }

    return NextResponse.json({
      success: true,
      userId,
    })
  } catch (error) {
    console.error('[API] Get user error:', error)
    return NextResponse.json({
      success: false,
      msg: 'Failed to get user ID',
    }, { status: 500 })
  }
}

