import axios from 'axios'
import { config } from '@/lib/constants/config'

const KIE_API_BASE = config.apis.kie.baseUrl || 'https://api.kie.ai/api/v1'

/**
 * Nano Banana Pro model parameters
 */
interface NanoBananaTaskParams {
  prompt: string
  imageUrls: string[]
  aspectRatio: string
  resolution: string
  outputFormat?: string
  callbackUrl?: string
  model?: string
}

/**
 * Map frontend aspect ratio IDs to KIE.ai format
 */
function mapAspectRatio(aspect: string): string {
  const mapping: Record<string, string> = {
    'square_hd': '1:1',
    'landscape_16_9': '16:9',
    'portrait_16_9': '9:16',
    'landscape_4_3': '4:3',
    'portrait_4_3': '3:4',
    'landscape_3_2': '3:2',
    'portrait_3_2': '2:3',
    // Direct mappings
    '1:1': '1:1',
    '16:9': '16:9',
    '9:16': '9:16',
    '4:3': '4:3',
    '3:4': '3:4',
    '3:2': '3:2',
    '2:3': '2:3',
    '4:5': '4:5',
    '5:4': '5:4',
    '21:9': '21:9',
  }
  return mapping[aspect] || '16:9' // Default to 16:9
}

/**
 * Ensure resolution is uppercase (KIE.ai requires uppercase)
 */
function normalizeResolution(resolution: string): string {
  const upper = resolution.toUpperCase()
  if (['1K', '2K', '4K'].includes(upper)) {
    return upper
  }
  return '1K' // Default
}

/**
 * Create Nano Banana Pro image generation task
 */
export async function createNanoBananaTask(params: NanoBananaTaskParams): Promise<{
  success: boolean
  taskId?: string
  msg?: string
}> {
  const apiKey = config.apis.kie.apiKey

  if (!apiKey) {
    console.error('[NANO-BANANA] API key not configured')
    return {
      success: false,
      msg: 'KIE API key not configured. Please add KIE_API_KEY to your environment variables.',
    }
  }

  try {
    // Different models use different input field names
    const isFluxModel = params.model?.includes('flux')

    const requestBody = {
      model: params.model || 'nano-banana-pro',
      callBackUrl: params.callbackUrl || undefined,
      input: {
        prompt: params.prompt,
        // flux-2/pro-image-to-image uses 'input_urls', nano-banana-pro uses 'image_input'
        ...(isFluxModel
          ? { input_urls: [params.imageUrls[0]] } // Flux takes an array with single URL
          : { image_input: params.imageUrls }     // Nano Banana takes an array
        ),
        aspect_ratio: mapAspectRatio(params.aspectRatio),
        resolution: normalizeResolution(params.resolution),
        output_format: params.outputFormat || 'png',
      },
    }

    console.log('[KIE-AI] Creating task...', {
      model: requestBody.model,
      prompt: params.prompt.substring(0, 100) + '...',
      imageCount: params.imageUrls.length,
      aspectRatio: requestBody.input.aspect_ratio,
      resolution: requestBody.input.resolution,
    })

    const response = await axios.post(
      `${KIE_API_BASE}/jobs/createTask`,
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('[KIE-AI] Create task response:', response.data)

    // Handle response
    const data = response.data
    if (data.code === 200 && data.data?.taskId) {
      console.log('[KIE-AI] Task created:', data.data.taskId)
      return {
        success: true,
        taskId: data.data.taskId,
      }
    }

    // Handle error codes
    if (data.code === 402) {
      return {
        success: false,
        msg: 'Server Error, Please contact Support',
      }
    }

    return {
      success: false,
      msg: data.msg || data.message || 'Failed to create task',
    }
  } catch (error: any) {
    console.error('[KIE-AI] Create task error:', error?.response?.data || error?.message || error)

    // Handle specific error codes
    const errorCode = error?.response?.data?.code
    if (errorCode === 402) {
      return {
        success: false,
        msg: 'Server Error, Please contact Support',
      }
    }

    return {
      success: false,
      msg: error?.response?.data?.msg || error?.response?.data?.message || error?.message || 'Failed to create render task',
    }
  }
}

/**
 * Get Nano Banana Pro task status
 * Task states: waiting, queuing, generating, success, fail
 */
export async function getNanoBananaTaskStatus(taskId: string): Promise<{
  success: boolean
  status?: string
  resultUrls?: string[]
  error?: string
  msg?: string
}> {
  const apiKey = config.apis.kie.apiKey

  if (!apiKey) {
    return {
      success: false,
      msg: 'KIE API key not configured',
    }
  }

  try {
    const response = await axios.get(`${KIE_API_BASE}/jobs/recordInfo`, {
      params: { taskId },
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    console.log('[NANO-BANANA] Task status response:', response.data)

    const data = response.data
    if (data.code !== 200) {
      return {
        success: false,
        msg: data.msg || data.message || 'Failed to get task status',
      }
    }

    const taskData = data.data
    const state = taskData.state || 'unknown'

    // Parse resultJson if present
    let resultUrls: string[] = []
    if (taskData.resultJson) {
      try {
        const resultData = typeof taskData.resultJson === 'string'
          ? JSON.parse(taskData.resultJson)
          : taskData.resultJson
        resultUrls = resultData.resultUrls || resultData.urls || []
      } catch (e) {
        console.error('[NANO-BANANA] Failed to parse resultJson:', e)
      }
    }

    // Map KIE states to our status format
    let status = 'processing'
    if (state === 'success') {
      status = 'success'
    } else if (state === 'fail') {
      status = 'failed'
    } else if (['waiting', 'queuing', 'generating'].includes(state)) {
      status = 'processing'
    }

    console.log('[NANO-BANANA] Task status:', { taskId, state, status, resultUrls: resultUrls.length })

    return {
      success: true,
      status,
      resultUrls,
      error: state === 'fail' ? (taskData.failMsg || 'Generation failed') : undefined,
    }
  } catch (error: any) {
    console.error('[NANO-BANANA] Get status error:', error?.response?.data || error?.message || error)
    return {
      success: false,
      msg: error?.response?.data?.msg || error?.response?.data?.message || error?.message || 'Failed to check task status',
    }
  }
}

// Export aliases for backward compatibility with seedream naming
export const createSeedreamTask = createNanoBananaTask
export const getSeedreamTaskStatus = getNanoBananaTaskStatus
