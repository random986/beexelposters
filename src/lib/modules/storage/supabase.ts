/**
 * Supabase Storage integration (optional)
 * Can be used instead of local file storage
 */

// This is a placeholder for Supabase Storage integration
// Uncomment and configure if using Supabase Storage

/*
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadToSupabase(
  file: File,
  bucket: string = 'uploads'
): Promise<{
  success: boolean
  url?: string
  path?: string
  msg?: string
}> {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${bucket}/${fileName}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)

    if (error) {
      return {
        success: false,
        msg: error.message,
      }
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return {
      success: true,
      url: publicUrl,
      path: filePath,
    }
  } catch (error: any) {
    return {
      success: false,
      msg: error?.message || 'Failed to upload to Supabase',
    }
  }
}
*/




