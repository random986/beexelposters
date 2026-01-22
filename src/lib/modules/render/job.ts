import { prisma } from '@/lib/db/prisma'
import { deductTokens } from '../tokens/manager'
import { createNanoBananaTask, getNanoBananaTaskStatus } from './seedream'
import { uploadToKie } from './kie'
import { composePrompt } from './prompt'

/**
 * Create a render job
 */
export async function createRenderJob(data: {
  userId: string
  prompt?: string
  settings: {
    timeOfDay?: string
    sky?: string
    imperfection?: string
    landscape?: string
  }
  aspect: string
  resolution: string
  maxImages?: number
  seed?: number
  images: File[]
  model?: 'basic' | 'pro'
}): Promise<{
  success: boolean
  jobId?: string
  taskId?: string
  msg?: string
}> {
  try {
    // Calculate token cost based on resolution and model
    // Calculate token cost based on resolution and model
    const { getRenderCost } = await import('@/lib/constants/pricing')
    const tokenCost = getRenderCost(data.resolution, data.model || 'pro')

    // Check tokens
    const { hasSufficientTokens } = await import('../tokens/validation')
    const hasTokens = await hasSufficientTokens(data.userId, tokenCost)

    if (!hasTokens) {
      return {
        success: false,
        msg: `Insufficient tokens. This render requires ${tokenCost} tokens.`,
      }
    }

    // Compose prompt
    const compiledPrompt = composePrompt({
      prompt: data.prompt,
      ...data.settings,
    })

    // Upload images to KIE
    const imageUrls: string[] = []
    for (const image of data.images) {
      const uploadResult = await uploadToKie(image)
      if (!uploadResult.success || !uploadResult.downloadUrl) {
        return {
          success: false,
          msg: `Failed to upload image: ${uploadResult.msg}`,
        }
      }
      imageUrls.push(uploadResult.downloadUrl)
    }

    // Create Render task via KIE.ai
    console.log('[RENDER] Creating task...', {
      promptLength: compiledPrompt.length,
      imageCount: imageUrls.length,
      aspect: data.aspect,
      resolution: data.resolution,
      cost: tokenCost
    })

    const taskResult = await createNanoBananaTask({
      prompt: compiledPrompt,
      imageUrls,
      aspectRatio: data.aspect,
      resolution: data.resolution,
      model: data.model === 'basic' ? 'flux-2/pro-image-to-image' : 'nano-banana-pro',
    })

    if (!taskResult.success || !taskResult.taskId) {
      return {
        success: false,
        msg: taskResult.msg || 'Failed to create render task',
      }
    }

    // Create job record
    const job = await prisma.job.create({
      data: {
        userId: data.userId,
        taskId: taskResult.taskId,
        prompt: data.prompt,
        enhancedPrompt: compiledPrompt,
        aspect: data.aspect,
        resolution: data.resolution,
        seed: data.seed,
        uploadedImage: imageUrls.join(','),
        status: 'processing',
        mode: data.model === 'basic' ? 'flux-2/pro-image-to-image' : 'nano-banana-pro',
      },
    })

    // Deduct tokens
    await deductTokens(data.userId, tokenCost)

    return {
      success: true,
      jobId: job.id,
      taskId: taskResult.taskId,
    }
  } catch (error: any) {
    console.error('[RENDER] Create job error:', error)
    return {
      success: false,
      msg: error?.message || 'Failed to create render job',
    }
  }
}

/**
 * Get job status
 */
export async function getJobStatus(jobId: string): Promise<{
  success: boolean
  status?: string
  resultUrls?: string[]
  error?: string
  msg?: string
}> {
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return {
        success: false,
        msg: 'Job not found',
      }
    }

    // If already completed, return results
    if (job.status === 'success' && job.resultUrls) {
      const urls = job.resultUrls as string[]
      return {
        success: true,
        status: 'success',
        resultUrls: Array.isArray(urls) ? urls : [],
      }
    }

    // Check with KIE.ai Nano Banana Pro API if processing
    if (job.taskId && job.status === 'processing') {
      const taskStatus = await getNanoBananaTaskStatus(job.taskId)

      if (taskStatus.success) {
        const status = taskStatus.status || 'processing'

        // Update job status
        await prisma.job.update({
          where: { id: jobId },
          data: {
            status: status === 'completed' || status === 'success' ? 'success' :
              status === 'failed' ? 'failed' : 'processing',
            resultUrls: taskStatus.resultUrls ? taskStatus.resultUrls : undefined,
            updatedAt: new Date(),
          },
        })

        if (status === 'completed' || status === 'success') {
          return {
            success: true,
            status: 'success',
            resultUrls: taskStatus.resultUrls || [],
          }
        }

        if (status === 'failed') {
          return {
            success: true,
            status: 'failed',
            error: 'Render task failed',
          }
        }
      }
    }

    return {
      success: true,
      status: job.status,
      resultUrls: job.resultUrls as string[] || [],
    }
  } catch (error: any) {
    return {
      success: false,
      msg: error?.message || 'Failed to get job status',
    }
  }
}

