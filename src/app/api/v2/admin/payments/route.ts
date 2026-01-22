import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/modules/auth/session'
import { prisma } from '@/lib/db/prisma'
import { createErrorResponse } from '@/lib/utils/errors'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await requireAdmin()

    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        code: true,
      },
    })

    // Transform to match UI expectations
    const payments = transactions.map(t => ({
      id: t.id,
      invoiceId: t.invoiceId || '',
      phone: t.mpesaNumber,
      amount: Number(t.amount),
      currency: 'KES',
      state: t.status?.toUpperCase() || 'PENDING',
      tokens: t.tokens || Math.floor(Number(t.amount) / 20),
      createdAt: t.createdAt.toISOString(),
      updatedAt: (t.completedAt || t.createdAt).toISOString(),
    }))

    return NextResponse.json({
      success: true,
      payments,
    })
  } catch (error) {
    console.error('[API] Get payments error:', error)
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({
        success: false,
        msg: 'Unauthorized',
      }, { status: 401 })
    }
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}

