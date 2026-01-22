import { NextRequest, NextResponse } from 'next/server'
import { composePrompt } from '@/lib/modules/render/prompt'
import { createErrorResponse } from '@/lib/utils/errors'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, settings } = body

    const compiledPrompt = composePrompt({
      prompt,
      ...settings,
    })

    return NextResponse.json({
      success: true,
      compiledPrompt,
      length: compiledPrompt.length,
    })
  } catch (error) {
    console.error('[API] Compose prompt error:', error)
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}

