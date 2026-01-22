/**
 * Video animation templates
 */

export interface VideoTemplate {
  id: string
  name: string
  description: string
  icon: string
  promptSuffix: string
}

export const VIDEO_TEMPLATES_SINGLE: VideoTemplate[] = [
  {
    id: 'camera-pan',
    name: 'Camera Pan',
    description: 'Smooth horizontal or vertical camera movement',
    icon: '🎥',
    promptSuffix: 'with smooth camera pan across the scene',
  },
  {
    id: 'clouds-moving',
    name: 'Moving Clouds',
    description: 'Dramatic cloud movement in the sky',
    icon: '☁️',
    promptSuffix: 'with dramatic clouds moving across the sky',
  },
  {
    id: 'gentle-breeze',
    name: 'Gentle Breeze',
    description: 'Subtle vegetation and fabric movement',
    icon: '🌿',
    promptSuffix: 'with gentle breeze moving leaves and fabrics',
  },
  {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    description: 'Evolving lighting transitioning to golden hour',
    icon: '🌅',
    promptSuffix: 'with lighting gradually transitioning to warm sunset glow',
  },
  {
    id: 'water-flow',
    name: 'Water Flow',
    description: 'Flowing water, fountains, or streams',
    icon: '💧',
    promptSuffix: 'with flowing water and gentle ripples',
  },
  {
    id: 'people-walking',
    name: 'People Walking',
    description: 'Subtle people movement in the scene',
    icon: '🚶',
    promptSuffix: 'with people casually walking through the scene',
  },
  {
    id: 'light-shadows',
    name: 'Moving Shadows',
    description: 'Evolving shadows and light patterns',
    icon: '🌓',
    promptSuffix: 'with shadows gradually moving and light patterns shifting',
  },
  {
    id: 'architectural-reveal',
    name: 'Architectural Reveal',
    description: 'Cinematic building reveal and exploration',
    icon: '🏛️',
    promptSuffix: 'with cinematic camera revealing the architecture from different angles',
  },
]

export const VIDEO_TEMPLATES_TWO: VideoTemplate[] = [
  {
    id: 'construction-animation',
    name: 'Construction Animation',
    description: 'Show building construction progression',
    icon: '🏗️',
    promptSuffix: 'showing progressive construction phases',
  },
  {
    id: 'viral-construction',
    name: 'Viral Construction',
    description: 'Trending high-energy construction timelapse',
    icon: '🚀',
    promptSuffix: 'showing a viral construction timelapse from foundation to completion, high speed, photorealistic, 4k detail',
  },
  {
    id: 'construction-phasing',
    name: 'Construction Phasing',
    description: 'Progressive construction phases over time',
    icon: '📐',
    promptSuffix: 'with progressive construction phases',
  },
  {
    id: 'house-warping',
    name: 'House Warping',
    description: 'Morphing and reshaping architectural elements',
    icon: '🌀',
    promptSuffix: 'with morphing and reshaping architectural elements',
  },
  {
    id: 'house-transform',
    name: 'House Transform',
    description: 'Complete architectural transformation',
    icon: '🔄',
    promptSuffix: 'with complete architectural transformation',
  },
  {
    id: 'season-changes',
    name: 'Season Changes',
    description: 'Transition through different seasons',
    icon: '🍂',
    promptSuffix: 'transitioning through different seasons',
  },
  {
    id: 'texture-changes',
    name: 'Texture Changes',
    description: 'Material and texture evolution',
    icon: '🎨',
    promptSuffix: 'with material and texture evolution',
  },
]

export function getTemplateById(id: string, mode: 'single' | 'two' = 'single'): VideoTemplate | undefined {
  const templates = mode === 'single' ? VIDEO_TEMPLATES_SINGLE : VIDEO_TEMPLATES_TWO
  return templates.find(t => t.id === id)
}

