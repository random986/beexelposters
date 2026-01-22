import { prisma } from '@/lib/db/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

/**
 * Handle file upload
 */
export async function saveUploadedFile(
  file: File,
  userId?: string,
  directory: string = 'uploads'
): Promise<{
  success: boolean
  filePath?: string
  filename?: string
  msg?: string
}> {
  try {
    // Create directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', directory)
    await mkdir(uploadDir, { recursive: true })

    // Generate unique filename
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 9)
    const extension = file.name.split('.').pop() || 'jpg'
    const filename = `${timestamp}_${random}.${extension}`
    const filePath = join(uploadDir, filename)

    // Convert File to Buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Save to database
    const upload = await prisma.upload.create({
      data: {
        filename,
        originalFilename: file.name,
        filePath: `/public/${directory}/${filename}`,
        fileSize: file.size,
        mimeType: file.type,
        directory,
        userId,
      },
    })

    return {
      success: true,
      filePath: upload.filePath,
      filename: upload.filename,
    }
  } catch (error: any) {
    console.error('[UPLOAD] Error:', error)
    return {
      success: false,
      msg: error?.message || 'Failed to save file',
    }
  }
}

