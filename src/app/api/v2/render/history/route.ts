
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { getUserId } from '@/lib/modules/auth/user'

/*
 * GET /api/v2/render/history
 * Returns the list of successful render jobs for the current user.
 */
export async function GET(request: NextRequest) {
    try {
        const userId = await getUserId()
        if (!userId) {
            return NextResponse.json({ success: false, msg: 'Unauthorized' }, { status: 401 })
        }

        const jobs = await prisma.job.findMany({
            where: {
                userId: userId,
                status: 'success',
                resultUrls: { not: null as any }, // Cast to avoid strict null checks on Json
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 50, // Limit to last 50 renders
            select: {
                id: true,
                resultUrls: true,
                aspect: true,
                prompt: true,
                createdAt: true,
                // settings column does not exist in schema
            },
        })

        // Map to frontend history format
        const history = jobs.map(job => {
            let url = null
            if (Array.isArray(job.resultUrls) && job.resultUrls.length > 0) {
                url = job.resultUrls[0]
            } else if (typeof job.resultUrls === 'string') {
                url = job.resultUrls
            }

            return {
                id: job.id,
                url: url,
                title: job.prompt || 'Render',
                timestamp: new Date(job.createdAt).getTime(),
            }
        }).filter(item => item.url) // Filter out items without URL

        return NextResponse.json({ success: true, history })
    } catch (error) {
        console.error('[API] History error:', error)
        return NextResponse.json({ success: false, msg: 'Failed to fetch history' }, { status: 500 })
    }
}
