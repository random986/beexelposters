import { NextRequest, NextResponse } from 'next/server'
import { syncPendingPayments } from '@/lib/modules/payments/status'
import { createErrorResponse } from '@/lib/utils/errors'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const result = await syncPendingPayments()
    return NextResponse.json(result)
  } catch (error) {
    console.error('[API] Sync payments error:', error)
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}



