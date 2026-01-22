import { NextRequest, NextResponse } from 'next/server'
import { getJobStatus } from '@/lib/modules/render/job'
import { createErrorResponse } from '@/lib/utils/errors'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const jobId = request.nextUrl.searchParams.get('jobId')

    if (!jobId) {
      return NextResponse.json({
        success: false,
        msg: 'Job ID is required',
      }, { status: 400 })
    }

    const result = await getJobStatus(jobId)

    return NextResponse.json(result)
  } catch (error) {
    console.error('[API] Get job status error:', error)
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}

