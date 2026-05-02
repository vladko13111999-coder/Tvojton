import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL je povinná' },
        { status: 400 }
      )
    }

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/
    ]

    let videoId = ''
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        videoId = match[1]
        break
      }
    }

    if (!videoId) {
      return NextResponse.json(
        { error: 'Neplatná YouTube URL' },
        { status: 400 }
      )
    }

    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

    return NextResponse.json({
      success: true,
      videoId,
      thumbnailUrl,
      videoUrl,
      message: 'YouTube video nájdené - použite premium funkciu na stiahnutie',
    })

  } catch (error) {
    console.error('YouTube validation error:', error)
    return NextResponse.json(
      { error: 'Chyba pri overovaní YouTube URL' },
      { status: 500 }
    )
  }
}