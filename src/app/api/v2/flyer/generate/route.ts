import { NextRequest, NextResponse } from 'next/server'
import { getUserId } from '@/lib/modules/auth/user'
import { createFlyerJob } from '@/lib/modules/flyer/job'
import { createErrorResponse } from '@/lib/utils/errors'
import { generateFingerprint, validateUserFingerprint, bindFingerprint } from '@/lib/modules/security/fingerprint'
import { checkRateLimit, getClientIP, RATE_LIMITS } from '@/lib/modules/security/ratelimit'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        // Security: Rate limiting by IP
        const clientIP = getClientIP(request.headers)
        // Reuse render rate limits or define new defaults for flyers
        // Assuming RATE_LIMITS.render is suitable (e.g. 5 requests per hour)
        const rateLimitResult = checkRateLimit(`flyer:${clientIP}`, RATE_LIMITS.render)

        if (!rateLimitResult.allowed) {
            return NextResponse.json({
                success: false,
                msg: rateLimitResult.msg,
            }, { status: 429 })
        }

        const {
            purpose,
            format,
            industry,
            content,
            visualStyle,
            colorTheme,
            imageryStyle,
            layout,
            tone,
            customColors, // User-specified hex colors (up to 3)
            imageUrls, // Optional array of image URLs (uploaded via /api/upload)
            // New fields
            figureType,
            productImageUrls,
            imageArrangement,
            fontSelection,
            useAiBackground,
            customFigurePrompt,
            influencerImageUrl,
            skinTone,
            sportType // New field
        } = await request.json()

        const userId = await getUserId({
            headers: request.headers,
            cookies: { get: (name: string) => request.cookies.get(name) },
        })

        // Security: Device fingerprint validation
        const fingerprint = generateFingerprint(request.headers)
        const fingerprintValid = await validateUserFingerprint(userId, fingerprint)

        if (!fingerprintValid.valid) {
            return NextResponse.json({
                success: false,
                msg: fingerprintValid.msg,
            }, { status: 403 })
        }

        // Construct the prompt using our robust prompt engineering module
        const { constructFlyerPrompt } = await import('@/lib/modules/flyer/prompts')

        // Check if we are coming from simple generator (might miss some fields) or detailed wizard
        const safeContent = {
            headline: content.headline || '',
            subheadline: content.subheadline,
            cta: content.cta,
            details: content.details
        }

        const fullPrompt = await constructFlyerPrompt({
            purpose: purpose || 'promotional',
            industry: industry || 'general',
            visualStyle: visualStyle || 'modern',
            colorTheme: colorTheme || 'balanced',
            tone: tone || 'professional',
            content: safeContent,
            customColors: customColors || [],
            // New fields
            figureType: figureType || 'none',
            productImageUrls: productImageUrls || [],
            imageArrangement: imageArrangement || 'auto',
            fontSelection: fontSelection || { headline: 'Inter', subheadline: 'Inter', body: 'Inter' },
            useAiBackground: useAiBackground || false,
            customFigurePrompt: customFigurePrompt || '',
            influencerImageUrl: influencerImageUrl || null,
            skinTone: skinTone || '',
            sportType: sportType || ''
        })

        console.log('[API] Generated Prompt:', fullPrompt)

        // Determine aspect ratio based on format
        // Default mappings based on typical social media sizes
        let aspect = '2:3' // Default vertical
        let resolution = '1K'

        // Simple mapping logic (can be expanded)
        if (format) {
            if (format.includes('instagram_post') || format.includes('square')) aspect = '1:1'
            else if (format.includes('story') || format.includes('reel') || format.includes('tiktok') || format.includes('9:16')) aspect = '9:16'
            else if (format.includes('landscape') || format.includes('youtube') || format.includes('16:9')) aspect = '16:9'
            else if (format.includes('portrait') || format.includes('4:5')) aspect = '4:5'
        }

        const result = await createFlyerJob({
            userId,
            prompt: fullPrompt,
            rawState: { purpose, format, industry, content, visualStyle, colorTheme, imageryStyle, layout, tone },
            aspect,
            resolution,
            maxImages: 1,
            imageUrls: imageUrls || [],
        })

        if (!result.success) {
            return NextResponse.json({
                success: false,
                msg: result.msg || 'Failed to create flyer job',
            }, { status: 400 })
        }

        // Bind fingerprint
        await bindFingerprint(userId, fingerprint)

        return NextResponse.json({
            success: true,
            jobId: result.jobId,
            taskId: result.taskId,
        })

    } catch (error) {
        console.error('[API] Generate flyer error:', error)
        return NextResponse.json(createErrorResponse(error), { status: 500 })
    }
}
