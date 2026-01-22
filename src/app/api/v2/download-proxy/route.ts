import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const url = searchParams.get('url')
        const filename = searchParams.get('filename') || `beexel-render-${Date.now()}.png`

        if (!url) {
            return NextResponse.json({ success: false, msg: 'URL is required' }, { status: 400 })
        }

        // Validate URL is remote (simple check)
        if (!url.startsWith('http')) {
            return NextResponse.json({ success: false, msg: 'Invalid URL' }, { status: 400 })
        }

        const response = await fetch(url)
        if (!response.ok) {
            return NextResponse.json({ success: false, msg: 'Failed to fetch image' }, { status: 502 })
        }

        const contentType = response.headers.get('content-type') || 'image/png'
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Cache-Control': 'no-cache',
            },
        })
    } catch (error) {
        console.error('[DOWNLOAD_PROXY] Error:', error)
        return NextResponse.json({ success: false, msg: 'Internal Server Error' }, { status: 500 })
    }
}
