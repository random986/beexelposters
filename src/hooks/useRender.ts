'use client'

import { useState, useCallback } from 'react'

interface RenderJobParams {
  prompt?: string
  settings: {
    timeOfDay?: string
    sky?: string
    imperfection?: string | string[]
    landscape?: string
  }
  aspect: string
  resolution: string
  maxImages?: number
  seed?: number
  images: File[]
  model?: 'basic' | 'pro'
}

// Get browser user ID from localStorage
function getBrowserUserId(): string {
  if (typeof window === 'undefined') return 'server_render'

  const storageKey = 'beexel_user_id'
  let userId = localStorage.getItem(storageKey)

  if (!userId) {
    userId = `browser_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    localStorage.setItem(storageKey, userId)
    document.cookie = `userId=${userId}; path=/; max-age=31536000; SameSite=Lax`
  }

  return userId
}

export function useRender() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)

  const generateRender = useCallback(async (params: RenderJobParams) => {
    try {
      setLoading(true)
      setError(null)
      setJobId(null)

      const userId = getBrowserUserId()

      const formData = new FormData()
      formData.append('prompt', params.prompt || '')
      formData.append('aspect', params.aspect)
      formData.append('resolution', params.resolution)
      formData.append('maxImages', String(params.maxImages || 1))
      if (params.model) formData.append('model', params.model)

      if (params.settings.timeOfDay) {
        formData.append('timeOfDay', params.settings.timeOfDay)
      }
      if (params.settings.sky) {
        formData.append('sky', params.settings.sky)
      }
      if (params.settings.imperfection) {
        const impValue = Array.isArray(params.settings.imperfection)
          ? params.settings.imperfection.join(',')
          : params.settings.imperfection
        formData.append('imperfection', impValue)
      }
      if (params.settings.landscape) {
        formData.append('landscape', params.settings.landscape)
      }
      if (params.seed) {
        formData.append('seed', String(params.seed))
      }


      params.images.forEach((image) => {
        formData.append('images', image)
      })

      const response = await fetch('/api/v2/render/generate', {
        method: 'POST',
        headers: {
          'x-user-id': userId,
        },
        body: formData,
      })

      const data = await response.json()

      if (data.success && data.jobId) {
        setJobId(data.jobId)
        return { success: true, jobId: data.jobId, taskId: data.taskId }
      } else {
        const errorMsg = data.msg || 'Failed to generate render'
        setError(errorMsg)
        return { success: false, msg: errorMsg }
      }
    } catch (err) {
      const errorMsg = 'Network error. Please try again.'
      setError(errorMsg)
      return { success: false, msg: errorMsg }
    } finally {
      setLoading(false)
    }
  }, [])

  const checkStatus = useCallback(async (jobId: string) => {
    try {
      const userId = getBrowserUserId()
      const response = await fetch(`/api/v2/render/status?jobId=${jobId}`, {
        headers: {
          'x-user-id': userId,
        },
      })
      return await response.json()
    } catch (err) {
      return { success: false, msg: 'Failed to check job status' }
    }
  }, [])

  return {
    loading,
    error,
    jobId,
    generateRender,
    checkStatus,
  }
}
