import { NextRequest, NextResponse } from 'next/server'
import { uploadToKie } from '@/lib/modules/render/kie'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { success: false, msg: 'No file uploaded' },
                { status: 400 }
            )
        }

        // Upload to KIE
        // We pass the file directly, uploadToKie handles buffer conversion if needed
        const result = await uploadToKie(file, 'beexel-uploads')

        if (!result.success || !result.downloadUrl) {
            return NextResponse.json(
                { success: false, msg: result.msg || 'Failed to upload file' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            url: result.downloadUrl,
        })
    } catch (error: any) {
        console.error('[API] Upload error:', error)
        return NextResponse.json(
            { success: false, msg: error.message || 'Server upload error' },
            { status: 500 }
        )
    }
}
