
import { prisma } from '@/lib/db/prisma'

interface FlyerContext {
    purpose: string // e.g., 'promotional'
    visualStyle: string // e.g., 'sport', 'corporate'
    tone: string
    content: {
        headline: string
        subheadline?: string
        cta?: string
        details?: string
    }
    customColors?: string[]
    figureType?: string
    imageUrls?: string[]
    // Extra fields
    sportType?: string
    industry?: string
    fontSelection?: any
}

// Fallback template if DB fails or missing
const FALLBACK_TEMPLATE = `
You are a professional visual designer.
Create a premium poster for: {TITLE}
Context: {VISUAL_STYLE} Event.
Headline: {TITLE}
Tagline: {TYPOGRAPHY}
Style: Premium, High Quality.
`

export class PromptService {
    /**
     * Fetch the template string from DB based on visualStyle (mapped to name).
     * Falls back to 'general' or hardcoded logic if not found.
     */
    static async getTemplate(visualStyle: string): Promise<string> {
        try {
            // Try specific style first
            let template = await prisma.promptTemplate.findUnique({
                where: { name: visualStyle.toLowerCase() }
            })

            // Fallback to 'general' if specific not found
            if (!template) {
                template = await prisma.promptTemplate.findUnique({
                    where: { name: 'general' }
                })
            }

            return template ? template.template : FALLBACK_TEMPLATE
        } catch (error) {
            console.error('[PromptService] Error fetching template:', error)
            return FALLBACK_TEMPLATE
        }
    }

    /**
     * Replace placeholders in the template with actual data.
     */
    static compilePrompt(template: string, context: FlyerContext): string {
        // 1. Prepare Data Blocks
        const title = context.content.headline || 'Untitled Event'
        const typography = [
            context.content.headline,
            context.content.subheadline,
            context.content.details,
            context.content.cta
        ].filter(Boolean).join(' | ')

        const sport = context.sportType || 'General Sport'
        const industry = context.industry || 'General Industry'

        // Typography Instruction Generator
        const fontInfo = context.fontSelection
            ? `Preferred Fonts: ${context.fontSelection.headline || 'Sans Serif'} (Headline), ${context.fontSelection.body || 'Sans Serif'} (Body).`
            : ''

        const typoInstruction = context.content.headline
            ? `- Use user text: "${typography}"\n- Ensure hierarchy: Headline (${context.content.headline}) is dominant.\n${fontInfo}`
            : `- Auto-generate powerful text based on "${title}".\n- Include Headline, Tagline, Date, CTA.`

        // 2. Replacements
        let compiled = template
            .replace(/{TITLE}/g, title)
            .replace(/{VISUAL_STYLE}/g, context.visualStyle)
            .replace(/{THEME}/g, context.visualStyle) // Alias
            .replace(/{TYPOGRAPHY}/g, typography)
            .replace(/{TYPOGRAPHY_INSTRUCTION}/g, typoInstruction)
            .replace(/{SPORT}/g, sport)
            .replace(/{INDUSTRY}/g, industry)

        // 3. User Custom Colors Injection (if not explicitly handled in template, append it)
        if (context.customColors && context.customColors.length > 0) {
            compiled += `\n\nAdditional Branding Colors: ${context.customColors.join(', ')}`
        }



        return compiled.trim()
    }
}
