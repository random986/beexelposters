import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const filePath = searchParams.get('path')

        if (!filePath) {
            return NextResponse.json({ success: false, msg: 'Path is required' }, { status: 400 })
        }

        // Security check: Only allow access to public/assets and public/images
        // Prevent path traversal
        let normalizedPath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '')

        // Ensure path starts with public/
        if (!normalizedPath.startsWith('public/') && !normalizedPath.startsWith('public\\')) {
            normalizedPath = path.join('public', normalizedPath)
        }

        if (!normalizedPath.startsWith('public/assets/') && !normalizedPath.startsWith('public/images/') &&
            !normalizedPath.startsWith('public\\assets\\') && !normalizedPath.startsWith('public\\images\\')) {
            return NextResponse.json({ success: false, msg: 'Invalid path' }, { status: 403 })
        }

        const absolutePath = path.join(process.cwd(), normalizedPath)

        if (!fs.existsSync(absolutePath)) {
            return NextResponse.json({ success: false, msg: 'Asset not found' }, { status: 404 })
        }

        const fileBuffer = fs.readFileSync(absolutePath)
        const ext = path.extname(absolutePath).toLowerCase()

        let contentType = 'image/jpeg'
        if (ext === '.png') contentType = 'image/png'
        else if (ext === '.webp') contentType = 'image/webp'
        else if (ext === '.svg') contentType = 'image/svg+xml'

        // Anti-download headers
        const headers = new Headers()
        headers.set('Content-Type', contentType)
        headers.set('Content-Disposition', 'inline') // Suggest opening in browser, not saving
        headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
        headers.set('Pragma', 'no-cache')
        headers.set('Expires', '0')
        headers.set('X-Content-Type-Options', 'nosniff')

        // Potential referer check (can be bypassed but adds a layer)
        const referer = request.headers.get('referer')
        const origin = request.headers.get('origin')
        const host = request.headers.get('host')

        // Relaxed check for local dev
        if (process.env.NODE_ENV === 'production') {
            if (referer && !referer.includes(host || '')) {
                return NextResponse.json({ success: false, msg: 'Unauthorized' }, { status: 403 })
            }
        }

        return new NextResponse(fileBuffer, {
            status: 200,
            headers,
        })
    } catch (error) {
        console.error('[ASSETS] Secure fetch error:', error)
        return NextResponse.json({ success: false, msg: 'Internal server error' }, { status: 500 })
    }
}
