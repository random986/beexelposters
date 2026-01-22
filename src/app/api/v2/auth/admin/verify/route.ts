import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/modules/auth/session'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json({
        success: false,
        authenticated: false,
      }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      username: session.username,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      authenticated: false,
    }, { status: 401 })
  }
}

