'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type VideoFile = {
  id: string
  file: File
  preview: string
  duration: number
  name: string
}

type Clip = {
  id: string
  start: number
  end: number
  thumbnail: string
}

export default function AppPage() {
  const [video, setVideo] = useState<VideoFile | null>(null)
  const [clips, setClips] = useState<Clip[]>([])
  const [processing, setProcessing] = useState(false)
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null)
  const [clipName, setClipName] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateId = () => Math.random().toString(36).substring(2, 9)

  const handleFileDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file && file.type.startsWith('video/')) {
      const preview = URL.createObjectURL(file)
      const videoEl = document.createElement('video')
      videoEl.src = preview
      videoEl.onloadedmetadata = () => {
        setVideo({
          id: generateId(),
          file,
          preview,
          duration: videoEl.duration,
          name: file.name
        })
        generateAutoClips(videoEl.duration)
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.mov', '.avi']
    },
    maxFiles: 1
  })

  const generateAutoClips = (duration: number) => {
    const clipLength = 30 // 30 seconds per clip
    const newClips: Clip[] = []
    const numClips = Math.min(Math.floor(duration / clipLength), 10) // Max 10 clips
    
    for (let i = 0; i < numClips; i++) {
      newClips.push({
        id: generateId(),
        start: i * clipLength,
        end: Math.min((i + 1) * clipLength, duration),
        thumbnail: ''
      })
    }
    
    setClips(newClips)
  }

  const handleAddManualClip = () => {
    const newClip: Clip = {
      id: generateId(),
      start: 0,
      end: video ? Math.min(30, video.duration) : 30,
      thumbnail: ''
    }
    setClips([...clips, newClip])
  }

  const handleUpdateClip = (id: string, start: number, end: number) => {
    setClips(clips.map(clip => 
      clip.id === id ? { ...clip, start, end } : clip
    ))
  }

  const handleDeleteClip = (id: string) => {
    setClips(clips.filter(clip => clip.id !== id))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleExport = async (clip: Clip) => {
    setProcessing(true)
    setSelectedClip(clip)
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In real implementation, this would use FFmpeg
    setProcessing(false)
    alert(`Klip ${formatTime(clip.start)} - ${formatTime(clip.end)} bol exportovaný!`)
  }

  const handleYoutubeSubmit = async () => {
    // Extract video ID from YouTube URL
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/
    ]
    
    let videoId = ''
    for (const pattern of patterns) {
      const match = youtubeUrl.match(pattern)
      if (match) {
        videoId = match[1]
        break
      }
    }
    
    if (videoId) {
      // Create YouTube video with embed preview
      const embedUrl = `https://www.youtube.com/embed/${videoId}`
      setVideo({
        id: videoId,
        file: new File([], `youtube_${videoId}.mp4`),
        preview: embedUrl,
        duration: 0, // YouTube embed doesn't give duration directly
        name: `YouTube: ${videoId}`
      })
      setYoutubeUrl('')
    } else {
      alert('Neplatná YouTube URL. Použite: youtube.com/watch?v=VIDEO_ID')
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">TK</span>
              </div>
              <span className="text-xl font-bold gradient-text">TvojKlip</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-dark-400 text-sm">Free plan</span>
            <Link href="/cennik" className="btn-primary text-sm py-2 px-4">
              Upgrade
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel - Upload */}
          <div className="lg:col-span-2">
            {!video ? (
              <div className="card">
                {/* YouTube URL Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">YouTube URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="input-field flex-1"
                    />
                    <button 
                      onClick={handleYoutubeSubmit}
                      className="btn-secondary whitespace-nowrap"
                    >
                      Načítať 🔗
                    </button>
                  </div>
                </div>

                {/* Drop Zone */}
                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
                    ${isDragActive 
                      ? 'border-primary-500 bg-primary-500/10' 
                      : 'border-dark-600 hover:border-primary-500 hover:bg-dark-800/50'
                    }
                  `}
                >
                  <input {...getInputProps()} />
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg font-medium mb-2">
                    {isDragActive ? 'Pusti video tu' : 'Potiahni a pusti video'}
                  </p>
                  <p className="text-dark-400 text-sm">
                    alebo klikni na výber súboru
                  </p>
                  <p className="text-dark-500 text-xs mt-4">
                    Podporované formáty: MP4, WebM, MOV (max 500MB)
                  </p>
                </div>

                {/* Watermark Info */}
                <div className="mt-4 p-4 bg-dark-900/50 rounded-xl">
                  <div className="flex items-center space-x-2 text-sm text-dark-400">
                    <span>ℹ️</span>
                    <span>Free verzia obsahuje watermark "tvojton"</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                {/* Video Player */}
                <div className="relative rounded-xl overflow-hidden bg-black aspect-video mb-4">
                  {video.preview.startsWith('http') && video.preview.includes('youtube') ? (
                    <iframe
                      src={video.preview}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={video.preview}
                      className="w-full h-full object-contain"
                      controls
                    />
                  )}
                  <canvas ref={canvasRef} className="hidden" />
                </div>

                {/* Video Info */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium truncate max-w-md">{video.name}</h3>
                    <p className="text-sm text-dark-400">
                      {formatTime(video.duration)} • {(video.file.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setVideo(null)
                      setClips([])
                    }}
                    className="text-dark-400 hover:text-white"
                  >
                    ✕ Zmeniť
                  </button>
                </div>

                {/* Clip Editor */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Klípy ({clips.length})</h4>
                    <button 
                      onClick={handleAddManualClip}
                      className="text-primary-400 text-sm hover:text-primary-300"
                    >
                      + Pridať manuálny klip
                    </button>
                  </div>

                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    <AnimatePresence>
                      {clips.map((clip) => (
                        <motion.div
                          key={clip.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`
                            p-3 rounded-xl bg-dark-900 border border-dark-700 flex items-center gap-4
                            ${selectedClip?.id === clip.id ? 'border-primary-500' : ''}
                          `}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <input
                                type="number"
                                value={clip.start}
                                onChange={(e) => handleUpdateClip(clip.id, parseInt(e.target.value), clip.end)}
                                className="w-16 bg-dark-800 border border-dark-700 rounded px-2 py-1 text-sm"
                                min="0"
                                max={video.duration}
                              />
                              <span className="text-dark-400">→</span>
                              <input
                                type="number"
                                value={clip.end}
                                onChange={(e) => handleUpdateClip(clip.id, clip.start, parseInt(e.target.value))}
                                className="w-16 bg-dark-800 border border-dark-700 rounded px-2 py-1 text-sm"
                                min="0"
                                max={video.duration}
                              />
                              <span className="text-dark-400 text-sm">({formatTime(clip.end - clip.start)})</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleExport(clip)}
                              disabled={processing}
                              className="px-3 py-1 bg-primary-500 hover:bg-primary-600 rounded text-sm"
                            >
                              Export 📥
                            </button>
                            <button
                              onClick={() => handleDeleteClip(clip.id)}
                              className="px-3 py-1 bg-dark-700 hover:bg-dark-600 rounded text-sm"
                            >
                              🗑️
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Auto Generate */}
                  <button 
                    onClick={() => generateAutoClips(video.duration)}
                    className="w-full btn-secondary"
                  >
                    ⚡ Auto vygenerovať klípy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Info & Settings */}
          <div className="space-y-6">
            {/* Export Settings */}
            <div className="card">
              <h3 className="font-semibold mb-4">Nastavenia exportu</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-dark-400 mb-2">Formát</label>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-3 bg-primary-500 rounded-lg text-sm">9:16</button>
                    <button className="flex-1 py-2 px-3 bg-dark-700 rounded-lg text-sm hover:bg-dark-600">16:9</button>
                    <button className="flex-1 py-2 px-3 bg-dark-700 rounded-lg text-sm hover:bg-dark-600">1:1</button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-dark-400 mb-2">Kvalita</label>
                  <select className="input-field w-full">
                    <option>HD (720p)</option>
                    <option>Full HD (1080p)</option>
                    <option>4K (2160p) - Premium</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dark-400">Watermark</span>
                  <span className="text-sm text-primary-400">tvojton</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="card">
              <h3 className="font-semibold mb-4">Štatistiky</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-dark-400">Celkový čas videa</span>
                  <span>{video ? formatTime(video.duration) : '0:00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Počet klipov</span>
                  <span>{clips.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-400">Celkový čas klipov</span>
                  <span>
                    {formatTime(clips.reduce((acc, clip) => acc + (clip.end - clip.start), 0))}
                  </span>
                </div>
              </div>
            </div>

            {/* Processing Modal */}
            <AnimatePresence>
              {processing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-dark-900/90 flex items-center justify-center z-50"
                >
                  <div className="card text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    <h3 className="text-xl font-semibold mb-2">Spracovávam klip...</h3>
                    <p className="text-dark-400">Počkaj prosím</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}