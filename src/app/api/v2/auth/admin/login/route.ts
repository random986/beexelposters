import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminCredentials, updateAdminLastLogin } from '@/lib/modules/auth/admin'
import { createSession } from '@/lib/modules/auth/session'
import { createErrorResponse } from '@/lib/utils/errors'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        msg: 'Username and password required',
      }, { status: 400 })
    }

    const admin = await verifyAdminCredentials(username, password)

    if (!admin) {
      return NextResponse.json({
        success: false,
        msg: 'Invalid credentials',
      }, { status: 401 })
    }

    // Update last login
    await updateAdminLastLogin(username)

    // Create session
    const token = await createSession(username)

    return NextResponse.json({
      success: true,
      token,
      msg: 'Login successful',
    })
  } catch (error) {
    console.error('[API] Admin login error:', error)
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}

