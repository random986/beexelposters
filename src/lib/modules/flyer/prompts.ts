import { PromptService } from './prompt-service'

interface FlyerContext {
    purpose: string
    industry: string
    visualStyle: string
    colorTheme: string
    tone: string
    content: {
        headline: string
        subheadline?: string
        cta?: string
        details?: string
    }
    customColors?: string[]
    figureType?: string
    productImageUrls?: string[]
    imageArrangement?: string
    fontSelection?: {
        headline: string
        subheadline: string
        body: string
    }
    useAiBackground?: boolean
    customFigurePrompt?: string
    influencerImageUrl?: string | null
    imageUrls?: string[]
    skinTone?: string
    // New
    sportType?: string
}

/**
 * Constructs the prompt by fetching the appropriate template from the DB and compiling it.
 */
export async function constructFlyerPrompt(context: FlyerContext): Promise<string> {

    // 1. Fetch Template
    // We use the 'visualStyle' (e.g., 'sport', 'party') to key into the DB templates
    const template = await PromptService.getTemplate(context.visualStyle)

    // 2. Compile
    const fullPrompt = PromptService.compilePrompt(template, context)

    return fullPrompt
}
