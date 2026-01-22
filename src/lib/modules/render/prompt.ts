/**
 * Compose prompts from user settings
 */

interface PromptSettings {
  prompt?: string
  timeOfDay?: string
  sky?: string
  imperfection?: string | string[]
  landscape?: string
}

const PRE_PROMPT = 'A hyper-realistic architectural render of a building in its natural environment. Maintain the exact camera angle, perspective, and framing as in the input image - do not alter the camera or composition. Strictly preserve the original textures and material colors of the building, enhancing only their resolution and lighting quality without changing their fundamental appearance or structure. Keep the building true to its original geometry. Remove all visible modeling outlines or artifacts like black edges or software wires to achieve a clean, professional photo-realistic result.'

const TEXTURE_PROMPT = 'The building features highly realistic materials and textures with enhanced surface detail and lifelike reflections.'

const PARAMETER_FRAGMENTS = {
  timeOfDay: {
    'midday': 'The scene is illuminated by strong, clear bright overhead sun, crisp shadows, neutral white light (5600K). Minimal atmospheric haze, clean sky with faint scattered clouds. Suitable for showcasing design clarity and material detailing.',
    'sunset': 'Warm amber light fills the scene, stretching long soft shadows and bathing façades in radiant glow. Interior lights complement the setting sun with faint warm tones visible through the windows, creating a cinematic harmony between interior and exterior illumination.',
    'night': 'The environment glows under calm indigo skies, defined by soft artificial illumination. Exterior lights gently highlight architectural lines and textures, while warm interior glows radiate through windows, revealing hints of interior life.',
    'sunrise': 'Soft golden sunlight grazes the building from a low horizon, casting long shadows and subtle warmth across surfaces. Warm interior illumination softly blends with daylight through curtains and windows, giving the scene a serene, awakening atmosphere.',
  } as Record<string, string>,
  sky: {
    'clear sky': 'A bright, clear sky with soft blue tones and subtle atmospheric haze, enhancing daylight reflections and crisp building contrast.',
    'misty sky': 'A calm, misty atmosphere with gentle haze softening distance and reflections, creating depth and serene morning stillness.',
    'snowy sky': 'A cold-toned winter scene with snow falling gently on all surrounding vegetation, the entire landscape blanketed in fresh snow, creating a serene cold atmosphere with muted cool tones throughout the scene.',
    'rainy sky': 'A muted, rain-filled sky with dark, diffused clouds, visible rain streaks falling through the scene, water puddles forming on surfaces, wet vegetation glistening with moisture, and wet windows reflecting the overcast sky, creating a realistic rainy atmosphere.',
    'cloudy sky': 'A softly clouded sky with balanced light diffusion and mild tonal variation, preserving texture detail and natural ambience.',
    'less clouds': 'A bright, clear sky with soft blue tones and subtle atmospheric haze, enhancing daylight reflections and crisp building contrast.', // Fallback to clear sky
  } as Record<string, string>,
  landscape: {
    'cityscape': 'A realistic dense city environment surrounds the building, adapting to the input perspective. If a high or bird\'s-eye view, display a vast, detailed cityscape extending to the horizon with diverse building heights, roads, and urban infrastructure. If eye-level, show realistic glowing streetlights, paved sidewalks, and neighboring structures blending seamlessly. The environment reflects a vibrant, bustling city atmosphere with appropriate scale and depth.',
    'mountain': 'The mountain landscape rises majestically under a cool, clear horizon, draped in layers of deep-green conifers — towering pines, noble firs, and graceful cypresses standing tall across the slopes. Lower regions flourish with mountain ash, birch, and hardy alpine shrubs, their leaves shimmering under highland light. Meadows near open clearings bloom with wildflowers, and distant ridges fade into a misted emerald silhouette, painting a tranquil yet powerful composition of natural grandeur.',
    'tundra': 'The tundra stretches serene and expansive, its muted palette alive with subtle beauty. Dwarf birch and willow shrubs form gentle clusters across the terrain, surrounded by soft mosses, ground lichens, and tiny tundra flowers glowing faintly in the low light. Evergreen patches lend depth to the rolling openness, while the calm rhythm of the landscape evokes quiet resilience and an untouched, poetic stillness.',
    'desert': 'The desert glows beneath a wide, golden sky — a landscape of grace and simplicity adorned with tall date palms, slender acacias, and elegant saguaros reaching toward the horizon. Clusters of succulents and low desert shrubs fill the space between dunes, their muted greens and silvers shining softly under the warm light. Each plant stands deliberate and sculptural, creating a scene that feels both timeless and beautifully minimal.',
    'grassland': 'Endless grasslands stretch in waves of soft green and gold, gently moving with the breeze. Scattered acacias and iconic umbrella trees rise gracefully across the plain, their canopies painting rhythmic shadows on the open earth. Along natural paths, delicate wildflowers and slender herbs add bursts of color to the vast expanse. The horizon feels alive yet peaceful, blending elegance with boundless freedom.',
    'forest': 'The forest unfolds as a cathedral of green, layered in richness and calm. Towering oaks, maples, and elms form a majestic canopy filtering beams of soft light onto the dense undergrowth below. Ferns, laurels, and young saplings fill the middle layers, while vines climb elegantly around tree trunks. Every surface breathes depth and vitality, creating a world of harmony, shade, and luminous tranquility.',
    'tropical': 'A clean, harmonious tropical landscape that complements the architecture without overwhelming it. Elegant palm trees and broad-leafed plants are strategically placed to frame the building. The vegetation is curated and moderate, featuring organized clusters of lush broad leaves and monstera, with subtle touches of bird-of-paradise. The atmosphere is fresh and airy, with soft lighting enhancing the lush greenery while maintaining a structured, sophisticated, and serene tropical aesthetic.',
    'countryside': 'A lush, realistic African village setting full of life. The landscape features mature trees such as Gravellia, Cypress, and Blue Gum, along with diverse shrubs and organic greenery. Surround the house with short yellow hedges, vibrant flowers, and scattered dry leaves. The neighborhood includes semi-modern houses integrated naturally into the environment. The ground is textured with short shrubs and natural unevenness, avoiding stereotypical depictions, creating a vibrant, authentic, and verdant atmosphere.',
    'coastal': 'The coastal setting shimmers with bright, refreshing clarity — tall coconut and sea almond trees swaying in the breeze, their fronds catching the sunlight above soft dunes and clear sands. Salt-tolerant shrubs and low tropical grasses trace the shoreline, accented by bright flowering plants in coral and yellow. Inland, mangroves and palms meet the sea’s edge in perfect reflection, creating a vivid rhythm of wind, water, and greenery.',
    'wetland': 'The wetland glows with tranquil vitality — tall papyrus and reeds rising from still reflective water, surrounded by water lilies and soft aquatic ferns. Along the edges, elegant swamp cypresses and willows stretch their roots into the shallows, mirrored perfectly on the surface. The air feels fresh and alive, filled with light, reflection, and the serene balance of water and greenery in quiet harmony.',
    'modern kenyan': 'A highly realistic and professionally designed modern Kenyan landscape surrounds the building. The background features a suburban Nairobi setting with a lush, green environment and distant modern villas under a sunny sky, blending seamlessly with the foreground. The foreground is defined by a manicured Kentucky Bluegrass lawn. The garden arrangement is creatively improved with superior vegetation arrangement: tall, slender Cypress or Thuja trees line the boundary walls for privacy. Mid-level planting includes vibrant Crotons, Nandi Flame saplings, and sculptural Travelers Palms accentuating the corners. Low-level details feature organized clusters of Agapanthus, Aloe Vera, and colorful Bougainvillea hedges trimmed neatly. Terracotta and geometric concrete pots containing Snake Plants (Sansevieria) and Ferns are strategically placed. If road paths or car paths are clearly visible in the input, strictly maintain and improve them significantly. If no paths are present in the input, do not add any; instead, focus on integrating better vegetation arrangements and structured pedestrian walkways that enhance the modern Kenyan aesthetic. The overall atmosphere is vibrant, sunny, and authentically Kenyan.',
    'landscaping': 'A sophisticated and realistic modern landscape design surrounds the architecture. The setting is a well-maintained, upscale suburban environment with established greenery in the background. The landscape features a perfectly manicured lawn with clean, defined edges. Architectural plants such as Cycads, Dracaena, and ornamental grasses are arranged in modern, minimalist beds with white gravel or bark mulch. Geometric planters in dark grey or matte white finish hold sculptural succulents or topiary boxwoods near the entrance. The perimeter is softened by bamboo or tall hedging for a contemporary, private feel. The lighting is subtle but effective, highlighting the textures of the plants and the building materials. The composition maintains full fidelity to the input structure while presenting a polished, high-end landscape design.',
    'lumion look': 'Surround the building with a dense and diverse arrangement of realistic greenery, including: Mature deciduous and evergreen trees with natural variation in leaf density, tone, and height. Layered ornamental shrubs and neatly trimmed round bushes close to the façade. Ferns, ground cover plants, and low creeping foliage along the stone pavement edges. A green lawn with slightly uneven grass texture and scattered fallen dry leaves blending naturally into the environment. Wild undergrowth near the slope and shaded areas to introduce organic variation and realism. The background integrates a calm forested area composed of diverse tropical trees — both tall and mid-height — gradually fading into soft atmospheric depth. Add subtle ground shadows cast by the trees and soft reflections on the glass surfaces of the villa. The paved walkway should exhibit fine texture variations, and a few scattered dry leaves for added authenticity.',
    'flowery': 'Surround the building with a curated, elegant floral landscape featuring organized garden beds and a lush, beautiful background that blends seamlessly with the scene. Carefully arranged flower beds with bursting colors - reds, yellows, purples, and whites in deliberate patterns - accent the landscape. Clean, manicured green lawns provide breathing space and contrast. The garden features strategically placed layers: low-lying floral ground cover in the foreground, structured shrubs in the mid-ground. The background is defined by a dense, enclosed arrangement of mature ornamental trees including Japanese Maples and Flowering Dogwoods, spaced to provide natural framing. If road paths or car paths are visible in the input image, strictly maintain and improve their realistic texture; otherwise, do not add any new vehicle paths. Broad-leafed Hostas are placed in purposeful clusters at key focal points. The composition is sophisticated and uncluttered, emphasizing quality over quantity.',
    'lush garden': 'A fully covered professional garden landscape with a smooth, well-manicured green lawn forming the central flow. Both sides densely planted with layered flower beds of roses, petunias, geraniums, marigolds, begonias, hydrangeas, and mixed flowering perennials, tightly arranged with no exposed soil. Low rounded shrubs and boxwood hedges create continuous borders. Well-trimmed coniferous landscaping trees and small upright cypress are placed in repeating rows along the edges and background, evenly spaced for structure and symmetry. Taller evergreen and deciduous trees form a lush, dense, and fully enclosed natural backdrop that completely fills the horizon and blends perfectly with the landscape, ensuring no empty spaces or gaps. A rich, deep vegetative screen creates a fully immersive garden environment. If road paths or car paths are visible in the input image, strictly maintain and improve their realistic texture; otherwise, do not add any new vehicle paths. Vibrant healthy foliage, balanced color contrast, luxury residential landscape design, photorealistic , high detail.',
  } as Record<string, string>,
  imperfection: {
    'building imperfections': 'Slight weathering on concrete or plaster surfaces. Subtle discoloration and grime accumulation near corners, baseboards, and drainage lines. Light dust or water stains beneath window edges or roof gutters. Mild oxidation on metal frames, door handles, or railing joints. Minor cracks or uneven plaster texture on older walls. Slightly smudged or fingerprint-marked glass reflections. Gentle moss growth or faint damp marks near foundation zones. Naturally uneven shadowing from dirt, aging paint, or sunlight wear.',
    'interior lights': 'Warm, inviting interior lighting visible through windows, creating a cozy and lived-in atmosphere. Soft glow from lamps and overhead fixtures illuminating indoor spaces, casting realistic shadows on walls and furniture. The lighting varies in intensity and color temperature to suggest different room functions and activities, adding depth and life to the building interior, particularly effective in evening or night scenes.',
    'people in the scene': 'Minimal, contextually appropriate people that match the mood and time of day of the scene. Activity is subtle and natural - quiet morning residents during sunrise, peaceful afternoon strollers during midday, relaxed evening figures during sunset, or minimal nighttime presence during night scenes. People are sparsely placed and their activity complements the architectural atmosphere without overwhelming the composition.',
    'weeds & overgrowth': 'Small tufts of grass sprouting between pavement cracks. Random weeds along pathway edges or behind stone borders. Wild grass patches beside walls or near fences. Fine moss growth on shaded concrete or stone. Low native plants filling unmaintained soil corners.',
    'cars & vehicles': 'Minimal vehicles that match the mood and time of day of the scene. Quiet morning scenes show few parked cars, midday scenes have occasional passing vehicles, evening scenes feature vehicles with warm headlights, and night scenes show minimal vehicles with soft illumination. Vehicles are contextually placed and their presence complements the architectural atmosphere without overwhelming the composition.',
    'shrubs & garden additions': 'Slightly uneven hedges trimmed naturally, not perfectly geometric. Random ornamental shrubs near entryways. Overlapping branches or foliage casting irregular shadows. Minor gaps in plant arrangements, showing organic growth variation. Dried leaves caught under bush bases or corners.',
    'random animals': 'Two contextually appropriate animals that match the scene environment, placed perfectly in the vicinity. The animals are naturally positioned and integrated into the landscape, adding realistic life and scale to the architectural render without overwhelming the composition.',
    'dirt, stains & ground': 'Subtle dust buildup on steps and walkways. Mud traces near garden edges or unpaved paths. Light water puddles after rain reflecting sky color. Worn concrete patches and faint erosion marks on curbs. Natural unevenness in soil or gravel textures.',
    'garbage & debris': 'Scattered dry leaves, papers, or wrappers near corners. Small trash bins partially visible with lids closed. Recyclable bottles or cartons near maintenance zones. Wind-blown plastic or debris trapped in shrubs (subtle, not excessive). Street cleaning marks or faint broom trails.',
    'trails, footprints & marks': 'Footprints on wet soil, sand, or gravel paths. Bicycle or tire tracks slightly pressed into dirt. Garden paths with natural wear or compacted soil. Walking trails subtly curved and slightly uneven. Animal footprints near grass or water edges.',
  } as Record<string, string>,
}

export function composePrompt(settings: PromptSettings): string {
  const parts: string[] = []

  // 1. Pre-prompt
  parts.push(PRE_PROMPT)

  // 2. Settings Parameters
  if (settings.timeOfDay) {
    const key = settings.timeOfDay.toLowerCase()
    const text = PARAMETER_FRAGMENTS.timeOfDay[key]
    if (text) parts.push(text)
  }

  if (settings.sky) {
    const key = settings.sky.toLowerCase()
    const text = PARAMETER_FRAGMENTS.sky[key]
    if (text) parts.push(text)
  }

  if (settings.landscape) {
    const key = settings.landscape.toLowerCase()
    const text = PARAMETER_FRAGMENTS.landscape[key]
    if (text) {
      parts.push(text)
      parts.push('Maintain fidelity of the input model landscape while adding more realism to it in a professional way.')
      parts.push('If any road paths, car paths, or pedestrian walkways are visible in the input image, strictly maintain and improve their realistic texture and layout. If no such paths are present in the input, do not generate any new ones.')
    }
  }

  // 3. Texture Prompt
  parts.push(TEXTURE_PROMPT)

  // 4. Imperfection
  if (settings.imperfection) {
    const imperfectionValue = Array.isArray(settings.imperfection)
      ? settings.imperfection[0]
      : settings.imperfection
    if (imperfectionValue) {
      const key = imperfectionValue.toLowerCase()
      const text = PARAMETER_FRAGMENTS.imperfection[key]
      if (text) parts.push(text)
    }
  }

  // 5. Custom Prompt
  if (settings.prompt && settings.prompt.trim()) {
    parts.push(`Additional details: ${settings.prompt.trim()}`)
  }

  // 6. Finalizing Instruction
  parts.push('Give a exact elevation render, just as provided in the reference.')

  const composedPrompt = parts.join(' ')

  // Log for debugging
  console.log('[PROMPT] Composed prompt:', {
    timeOfDay: settings.timeOfDay,
    sky: settings.sky,
    landscape: settings.landscape,
    imperfection: settings.imperfection,
    customPrompt: settings.prompt,
    finalPromptLength: composedPrompt.length,
  })

  return composedPrompt
}
