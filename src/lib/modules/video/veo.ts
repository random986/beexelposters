import axios from 'axios'
import { config } from '@/lib/constants/config'

const VEO_API_BASE = 'https://api.veo.ai'

interface VeoTaskParams {
  prompt: string
  imageUrl?: string
  imageUrls?: string[]
  model?: 'veo3_fast' | 'veo3' | 'veo-3.1'
  aspectRatio?: string
  seed?: number
  watermark?: string
}

/**
 * Create Veo video task
 */
export async function createVeoTask(params: VeoTaskParams): Promise<{
  success: boolean
  taskId?: string
  msg?: string
}> {
  try {
    const payload: any = {
      model: params.model || 'veo3_fast',
      prompt: params.prompt,
      aspect_ratio: params.aspectRatio || '16:9',
    }

    if (params.imageUrl) {
      payload.image_url = params.imageUrl
    } else if (params.imageUrls && params.imageUrls.length > 0) {
      payload.image_urls = params.imageUrls
    }

    if (params.seed) {
      payload.seed = params.seed
    }

    if (params.watermark) {
      payload.watermark = params.watermark
    }

    const response = await axios.post(
      `${VEO_API_BASE}/v1/tasks`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${config.apis.veo.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.data && response.data.task_id) {
      return {
        success: true,
        taskId: response.data.task_id,
      }
    }

    return {
      success: false,
      msg: 'Invalid response from Veo API',
    }
  } catch (error: any) {
    console.error('[VEO] Create task error:', error)
    return {
      success: false,
      msg: error?.response?.data?.message || error?.message || 'Failed to create Veo task',
    }
  }
}

/**
 * Check Veo task status
 */
export async function getVeoTaskStatus(taskId: string): Promise<{
  success: boolean
  status?: string
  videoUrl?: string
  msg?: string
}> {
  try {
    const response = await axios.get(`${VEO_API_BASE}/v1/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${config.apis.veo.apiKey}`,
      },
    })

    const task = response.data
    const status = task.status || 'unknown'
    const videoUrl = task.result?.video_url || task.video_url

    return {
      success: true,
      status,
      videoUrl,
    }
  } catch (error: any) {
    return {
      success: false,
      msg: error?.response?.data?.message || error?.message || 'Failed to check task status',
    }
  }
}

