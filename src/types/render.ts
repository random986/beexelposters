/**
 * Render-related types
 */

export interface RenderSettings {
  timeOfDay?: 'midday' | 'sunset' | 'night' | 'sunrise'
  sky?: 'clear-sky' | 'less-clouds' | 'rainy-sky' | 'misty-sky' | 'cloudy-sky' | 'snowy-sky'
  imperfection?: 'building_imperfections' | 'people' | 'weeds_overgrowth' | 'vehicles' | 'shrubs_garden' | 'animals' | 'dirt_stains_ground' | 'garbage_debris' | 'trails_marks'
  landscape?: 'kenyan_modern' | 'cityscape' | 'forest' | 'mountain' | 'tropical' | 'tundra' | 'countryside' | 'desert' | 'coastal' | 'grassland' | 'wetland'
}

export interface RenderJob {
  id: string
  taskId?: string
  userId: string
  prompt?: string
  enhancedPrompt?: string
  aspect: string
  resolution: string
  status: 'pending' | 'processing' | 'success' | 'failed'
  resultUrls?: string[]
  createdAt: Date
  updatedAt: Date
}

