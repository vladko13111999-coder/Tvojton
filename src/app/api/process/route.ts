import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const startTime = parseFloat(formData.get('startTime') as string) || 0
    const endTime = parseFloat(formData.get('endTime') as string) || 30
    const format = (formData.get('format') as string) || '9:16'
    const quality = (formData.get('quality') as string) || '720p'
    const watermark = formData.get('watermark') === 'true'
    const hasWatermark = !watermark

    return NextResponse.json({
      success: true,
      message: 'Video spracované (demo mode)',
      downloadUrl: '/uploads/demo-clip.mp4',
      duration: endTime - startTime,
      format,
      quality,
      watermark: hasWatermark ? 'tvojton' : 'none',
    })

  } catch (error) {
    console.error('Processing error:', error)
    return NextResponse.json(
      { error: 'Vnútorná chyba servera' },
      { status: 500 }
    )
  }
}