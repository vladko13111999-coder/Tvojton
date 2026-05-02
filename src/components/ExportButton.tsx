'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function ExportButton({ 
  clip, 
  videoDuration,
  format = '9:16',
  quality = '720p',
  watermark = true,
  onExportStart,
  onExportComplete,
}: {
  clip: { start: number; end: number }
  videoDuration: number
  format?: string
  quality?: string
  watermark?: boolean
  onExportStart?: () => void
  onExportComplete?: (url: string) => void
}) {
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleExport = useCallback(async () => {
    setIsExporting(true)
    onExportStart?.()
    setProgress(10)

    try {
      const formData = new FormData()
      formData.append('startTime', clip.start.toString())
      formData.append('endTime', clip.end.toString())
      formData.append('format', format)
      formData.append('quality', quality)
      formData.append('watermark', watermark.toString())
      
      setProgress(30)

      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      })

      setProgress(70)

      if (!response.ok) {
        throw new Error('Export zlyhal')
      }

      const data = await response.json()
      
      setProgress(100)

      if (data.downloadUrl) {
        onExportComplete?.(data.downloadUrl)
        
        const link = document.createElement('a')
        link.href = data.downloadUrl
        link.download = `clip_${Date.now()}.mp4`
        link.click()
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('Export zlyhal. Skúste to znova.')
    } finally {
      setIsExporting(false)
      setProgress(0)
    }
  }, [clip, format, quality, watermark, onExportStart, onExportComplete])

  const clipDuration = clip.end - clip.start

  return (
    <button
      onClick={handleExport}
      disabled={isExporting || clipDuration < 5 || clipDuration > 60}
      className={`
        relative px-4 py-2 rounded-lg font-medium transition-all
        ${isExporting 
          ? 'bg-dark-700 cursor-not-allowed' 
          : 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600'
        }
        ${clipDuration < 5 || clipDuration > 60 ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {isExporting ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {progress}%
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <span>📥</span>
          Export
        </span>
      )}
    </button>
  )
}