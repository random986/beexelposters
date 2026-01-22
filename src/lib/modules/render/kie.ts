import axios from 'axios'
import { config } from '@/lib/constants/config'

const KIE_UPLOAD_URL = config.apis.kie.uploadUrl || 'https://kieai.redpandaai.co/api'

/**
 * Convert File or Buffer to Base64 string (works on server-side)
 */
async function toBase64(file: File | Buffer): Promise<string> {
  if (Buffer.isBuffer(file)) {
    return file.toString('base64')
  }

  // For File objects in Node.js/server environment
  // Use arrayBuffer() which is available in both browser and Node.js
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    return buffer.toString('base64')
  } catch (error) {
    console.error('[KIE] Error converting file to base64:', error)
    throw new Error('Failed to convert file to base64')
  }
}

/**
 * Get MIME type from File or default for Buffer
 */
function getMimeType(file: File | Buffer): string {
  if (Buffer.isBuffer(file)) {
    return 'image/jpeg' // Default for buffers
  }
  return file.type || 'image/jpeg'
}

/**
 * Upload file to KIE AI using Base64 upload
 * Files are temporary and auto-deleted after 3 days
 */
export async function uploadToKie(file: File | Buffer, uploadPath: string = 'beexel-renders'): Promise<{
  success: boolean
  downloadUrl?: string
  msg?: string
}> {
  const apiKey = config.apis.kie.apiKey

  if (!apiKey) {
    console.error('[KIE] API key not configured')
    return {
      success: false,
      msg: 'KIE API key not configured. Please add KIE_API_KEY to your environment variables.',
    }
  }

  try {
    const base64Data = await toBase64(file)
    const mimeType = getMimeType(file)
    const fileName = `render-${Date.now()}.${mimeType.split('/')[1] || 'jpg'}`

    // Format as data URL for KIE API
    const dataUrl = `data:${mimeType};base64,${base64Data}`

    console.log('[KIE] Uploading file...', { uploadPath, fileName, mimeType })

    const response = await axios.post(
      `${KIE_UPLOAD_URL}/file-base64-upload`,
      {
        base64Data: dataUrl,
        uploadPath,
        fileName,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('[KIE] Upload response:', response.data)

    // Handle various response formats
    const data = response.data?.data || response.data
    const downloadUrl = data?.downloadUrl || data?.url || data?.fileUrl

    if (downloadUrl) {
      console.log('[KIE] Upload successful:', downloadUrl)
      return {
        success: true,
        downloadUrl,
      }
    }

    return {
      success: false,
      msg: 'Invalid response from KIE Upload API - no download URL returned',
    }
  } catch (error: any) {
    console.error('[KIE] Upload error:', error?.response?.data || error?.message || error)
    return {
      success: false,
      msg: error?.response?.data?.message || error?.response?.data?.msg || error?.message || 'Failed to upload to KIE',
    }
  }
}

/**
 * Check KIE API account credits
 */
export async function getKieCredits(): Promise<{
  success: boolean
  credits?: number
  message?: string
}> {
  const apiKey = config.apis.kie.apiKey

  if (!apiKey) {
    return {
      success: false,
      message: 'KIE API key not configured',
    }
  }

  try {
    const response = await axios.get(`${config.apis.kie.baseUrl}/common/credits`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    return {
      success: true,
      credits: response.data?.data?.credits || response.data?.credits || 0,
      message: response.data?.message,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || error?.message || 'Failed to check credits',
    }
  }
}
