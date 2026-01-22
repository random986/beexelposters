import { NextRequest, NextResponse } from 'next/server'
import { processWebhook } from '@/lib/modules/payments/webhook'

export const dynamic = 'force-dynamic'

// IntaSend webhook challenge code - set this to match what you configured on IntaSend
const WEBHOOK_CHALLENGE = process.env.INTASEND_WEBHOOK_CHALLENGE || '987'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('[WEBHOOK] Received:', JSON.stringify(body, null, 2))

    // Handle IntaSend webhook verification challenge
    if (body.challenge) {
      console.log('[WEBHOOK] Challenge request received')
      return NextResponse.json({
        challenge: WEBHOOK_CHALLENGE
      })
    }

    // Process webhook asynchronously
    const result = await processWebhook(body)

    console.log('[WEBHOOK] Processed:', result)

    // Respond immediately to prevent timeout
    return NextResponse.json(result)
  } catch (error) {
    console.error('[WEBHOOK] Error:', error)
    return NextResponse.json({
      received: true,
      processed: false,
      error: 'Internal error',
    }, { status: 500 })
  }
}

// GET endpoint for webhook verification
export async function GET(request: NextRequest) {
  // Check if this is a challenge verification
  const challenge = request.nextUrl.searchParams.get('challenge')
  if (challenge) {
    console.log('[WEBHOOK] GET Challenge verification')
    return NextResponse.json({
      challenge: WEBHOOK_CHALLENGE
    })
  }

  return NextResponse.json({
    status: 'ok',
    message: 'Webhook endpoint is accessible',
    challenge: WEBHOOK_CHALLENGE,
    timestamp: new Date().toISOString(),
  })
}
