import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/modules/auth/user'
import { createRenderJob } from '@/lib/modules/render/job'
import { createErrorResponse } from '@/lib/utils/errors'
import { generateFingerprint, validateUserFingerprint, bindFingerprint } from '@/lib/modules/security/fingerprint'
import { checkRateLimit, getClientIP, RATE_LIMITS } from '@/lib/modules/security/ratelimit'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Security: Rate limiting by IP
    const clientIP = getClientIP(request.headers)
    const rateLimitResult = checkRateLimit(`render:${clientIP}`, RATE_LIMITS.render)

    if (!rateLimitResult.allowed) {
      return NextResponse.json({
        success: false,
        msg: rateLimitResult.msg,
      }, { status: 429 })
    }

    const formData = await request.formData()

    const userId = await getUserId({
      headers: request.headers,
      cookies: { get: (name: string) => request.cookies.get(name) },
    })

    // Security: Device fingerprint validation
    const fingerprint = generateFingerprint(request.headers)
    const fingerprintValid = await validateUserFingerprint(userId, fingerprint)

    if (!fingerprintValid.valid) {
      return NextResponse.json({
        success: false,
        msg: fingerprintValid.msg,
      }, { status: 403 })
    }

    // Extract form data
    const prompt = formData.get('prompt') as string || undefined
    const timeOfDay = formData.get('timeOfDay') as string || undefined
    const sky = formData.get('sky') as string || undefined
    const imperfection = formData.get('imperfection') as string || undefined
    const landscape = formData.get('landscape') as string || undefined
    const aspect = formData.get('aspect') as string || 'landscape_16_9'
    const resolution = formData.get('resolution') as string || '1K'

    const maxImages = parseInt(formData.get('maxImages') as string) || 1
    const seed = formData.get('seed') ? parseInt(formData.get('seed') as string) : undefined
    const modelRaw = formData.get('model')?.toString().toLowerCase()
    const model = modelRaw === 'basic' ? 'basic' : 'pro'
    console.log('[API] Render Params:', { model, resolution, aspect })

    // Get uploaded images
    const images: File[] = []
    const imageFiles = formData.getAll('images') as File[]
    for (const file of imageFiles) {
      if (file && file.size > 0) {
        images.push(file)
      }
    }

    if (images.length === 0) {
      return NextResponse.json({
        success: false,
        msg: 'At least one image is required',
      }, { status: 400 })
    }

    const result = await createRenderJob({
      userId,
      prompt,
      settings: {
        timeOfDay,
        sky,
        imperfection,
        landscape,
      },
      aspect,
      resolution,
      maxImages,
      seed,
      images,
      model,
    })

    if (!result.success) {
      return NextResponse.json({
        success: false,
        msg: result.msg || 'Failed to create render job',
      }, { status: 400 })
    }

    // Bind fingerprint after successful render (if not already bound)
    await bindFingerprint(userId, fingerprint)

    return NextResponse.json({
      success: true,
      jobId: result.jobId,
      taskId: result.taskId,
    })
  } catch (error) {
    console.error('[API] Generate render error:', error)
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}
