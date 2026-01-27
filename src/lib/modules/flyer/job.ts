import { prisma } from '@/lib/db/prisma'
import { deductTokens } from '../tokens/manager'
import { createNanoBananaTask, getNanoBananaTaskStatus } from '../render/seedream'
import { composePrompt } from '../render/prompt'

/**
 * Create a flyer generation job
 */
export async function createFlyerJob(data: {
    userId: string
    prompt: string // Composed from state
    rawState: any // Store original state for reference
    aspect: string
    resolution: string
    maxImages?: number
    imageUrls?: string[]
}): Promise<{
    success: boolean
    jobId?: string
    taskId?: string
    msg?: string
}> {
    try {
        // 1. Calculate token cost
        // Flyers might have a different cost, for now using Render Pro pricing or a fixed rate
        // Hardcoding to 4 tokens for now as a default for "Pro" generation, or use pricing module if available
        const tokenCost = 4

        // 2. Check tokens
        const { hasSufficientTokens } = await import('../tokens/validation')
        const hasTokens = await hasSufficientTokens(data.userId, tokenCost)

        if (!hasTokens) {
            return {
                success: false,
                msg: `Insufficient tokens. This generation requires ${tokenCost} tokens.`,
            }
        }

        // 3. Create Task via KIE.ai (Nano Banana Pro matches the style well for posters)
        console.log('[FLYER] Creating task...', {
            promptLength: data.prompt.length,
            aspect: data.aspect,
            resolution: data.resolution,
            imageCount: data.imageUrls?.length || 0
        })

        const taskResult = await createNanoBananaTask({
            prompt: data.prompt,
            imageUrls: data.imageUrls || [], // Pass input images (reference, logo)
            aspectRatio: data.aspect,
            resolution: data.resolution,
            model: 'nano-banana-pro', // Good for text handling
            // If images are provided, use high strength to ensure template adherence
            strength: (data.imageUrls && data.imageUrls.length > 0) ? 0.85 : undefined,
        })

        if (!taskResult.success || !taskResult.taskId) {
            return {
                success: false,
                msg: taskResult.msg || 'Failed to create generation task',
            }
        }

        // 4. Create job record
        // We'll reuse the 'Job' table but maybe mark mode as 'flyer-generation'
        const job = await prisma.job.create({
            data: {
                userId: data.userId,
                taskId: taskResult.taskId,
                prompt: data.prompt,
                enhancedPrompt: JSON.stringify(data.rawState), // Store the raw state
                aspect: data.aspect,
                resolution: data.resolution,
                uploadedImage: data.imageUrls ? data.imageUrls.join(',') : '', // Store uploaded images
                status: 'processing',
                mode: 'flyer-generation',
            },
        })

        // 5. Deduct tokens
        await deductTokens(data.userId, tokenCost)

        return {
            success: true,
            jobId: job.id,
            taskId: taskResult.taskId,
        }
    } catch (error: any) {
        console.error('[FLYER] Create job error:', error)
        return {
            success: false,
            msg: error?.message || 'Failed to create flyer job',
        }
    }
}
