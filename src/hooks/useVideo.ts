'use client'

import { useState, useCallback } from 'react'

interface VideoTaskParams {
  prompt: string
  imageUrl?: string
  imageUrls?: string[]
  template?: string
  model?: 'veo3_fast' | 'veo3'
  aspectRatio?: string
  seed?: number
  watermark?: string
}

export function useVideo() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [taskId, setTaskId] = useState<string | null>(null)

  const createVideo = useCallback(async (params: VideoTaskParams) => {
    try {
      setLoading(true)
      setError(null)
      setTaskId(null)
      
      const response = await fetch('/api/v2/video/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      })
      
      const data = await response.json()
      
      if (data.success && data.taskId) {
        setTaskId(data.taskId)
        return { success: true, taskId: data.taskId }
      } else {
        const errorMsg = data.msg || 'Failed to create video task'
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

  const checkStatus = useCallback(async (taskId: string) => {
    try {
      const response = await fetch(`/api/v2/video/status?taskId=${taskId}`)
      return await response.json()
    } catch (err) {
      return { success: false, msg: 'Failed to check video status' }
    }
  }, [])

  return {
    loading,
    error,
    taskId,
    createVideo,
    checkStatus,
  }
}

