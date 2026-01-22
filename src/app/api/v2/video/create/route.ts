
import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/modules/auth/user'
import { createVeoTask } from '@/lib/modules/video/veo'
import { getTemplateById } from '@/lib/modules/video/templates'
import { deductTokens } from '@/lib/modules/tokens/manager'
import { hasSufficientTokens } from '@/lib/modules/tokens/validation'
import { PRICING } from '@/lib/constants/pricing'
import { createErrorResponse } from '@/lib/utils/errors'
import { uploadToKie } from '@/lib/modules/render/kie'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const prompt = formData.get('prompt') as string
    const mode = formData.get('mode') as 'fast' | 'quality' || 'fast'
    const templateId = formData.get('template') as string
    const aspectRatio = formData.get('aspectRatio') as string || '16:9'
    const seed = formData.get('seed') ? parseInt(formData.get('seed') as string) : undefined

    // Extract images
    const images: File[] = []
    for (let i = 0; i < 2; i++) {
      const file = formData.get(`image_${i}`) as File
      if (file) images.push(file)
    }

    if (!prompt && images.length === 0) {
      return NextResponse.json({
        success: false,
        msg: 'Prompt or image is required',
      }, { status: 400 })
    }

    const userId = await getUserId({ headers: request.headers })
    if (!userId) {
      return NextResponse.json({ success: false, msg: 'Unauthorized' }, { status: 401 })
    }

    // Determine model and cost
    // Fast uses 'veo3_fast', Quality uses 'veo-3.1' (as requested)
    const model = mode === 'fast' ? 'veo3_fast' : 'veo-3.1'
    const tokensRequired = mode === 'fast' ? PRICING.VIDEO.FAST.tokens : PRICING.VIDEO.QUALITY.tokens

    const hasTokens = await hasSufficientTokens(userId, tokensRequired)
    if (!hasTokens) {
      return NextResponse.json({
        success: false,
        msg: 'Insufficient tokens. Please purchase more tokens.',
      }, { status: 400 })
    }

    // Upload images if present
    const imageUrls: string[] = []
    if (images.length > 0) {
      for (const img of images) {
        const upload = await uploadToKie(img, 'video-inputs')
        if (upload.success && upload.downloadUrl) {
          imageUrls.push(upload.downloadUrl)
        } else {
          throw new Error('Failed to upload image')
        }
      }
    }

    // Build prompt with template if provided
    let finalPrompt = prompt
    if (templateId) {
      const templateData = getTemplateById(templateId, imageUrls.length > 1 ? 'two' : 'single')
      if (templateData) {
        finalPrompt = `${prompt} ${templateData.promptSuffix}`
      }
    }

    // Create Veo task
    const result = await createVeoTask({
      prompt: finalPrompt,
      imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
      model,
      aspectRatio,
      seed,
    })

    if (!result.success || !result.taskId) {
      return NextResponse.json({
        success: false,
        msg: result.msg || 'Failed to create video task',
      }, { status: 500 })
    }

    // Deduct tokens
    await deductTokens(userId, tokensRequired)

    return NextResponse.json({
      success: true,
      taskId: result.taskId,
      msg: 'Video generation started',
    })
  } catch (error) {
    console.error('[API] Create video error:', error)
    return NextResponse.json(createErrorResponse(error), { status: 500 })
  }
}
