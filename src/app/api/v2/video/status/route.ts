import { NextRequest, NextResponse } from 'next/server'
import { getVeoTaskStatus } from '@/lib/modules/video/veo'
import { createErrorResponse } from '@/lib/utils/errors'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const taskId = request.nextUrl.searchParams.get('taskId')

    if (!taskId) {
      return NextResponse.json({
        success: false,
        msg: 'Task ID is required',
      }, { status: 400 })
    }

    const result = await getVeoTaskStatus(taskId)

    return NextResponse.json(result)
  } catch (error) {
    console.error('[API] Get video status error:', error)
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}

